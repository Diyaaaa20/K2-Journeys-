import { useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);

  // Cached layout metrics — computed once (on mount / resize / image load),
  // never read from the DOM inside the scroll handler. This is what kills
  // the layout-thrashing jank: offsetTop/getBoundingClientRect reads are
  // forced-synchronous reflows when they happen right after a style write.
  const metricsRef = useRef({ cards: [] });
  const rafScheduledRef = useRef(false);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const getScrollTop = useCallback(() => {
    return useWindowScroll ? window.scrollY : scrollerRef.current?.scrollTop || 0;
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    element => {
      if (useWindowScroll) {
        const rect = element.getBoundingClientRect();
        return rect.top + window.scrollY;
      } else {
        return element.offsetTop;
      }
    },
    [useWindowScroll]
  );

  // Re-measure every card's position and precompute its trigger points.
  // Only this function ever touches offsetTop/getBoundingClientRect —
  // the scroll handler reads exclusively from the cache it produces.
  const measure = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    const containerHeight = useWindowScroll
      ? window.innerHeight
      : scrollerRef.current?.clientHeight || 0;

    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElement = useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : scrollerRef.current?.querySelector('.scroll-stack-end');
    const endElementTop = endElement ? getElementOffset(endElement) : 0;

    const cardMetrics = cards.map((card, i) => {
      const cardTop = getElementOffset(card);
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      return {
        triggerStart: pinStart,
        triggerEnd: cardTop - scaleEndPositionPx,
        pinStart,
        pinEnd: endElementTop - containerHeight / 2
      };
    });

    metricsRef.current = { cards: cardMetrics };
  }, [
    getElementOffset,
    itemStackDistance,
    parsePercentage,
    scaleEndPosition,
    stackPosition,
    useWindowScroll
  ]);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    const scrollTop = getScrollTop();
    const { cards: cardMetrics } = metricsRef.current;

    // Single pass to find the deepest card past its trigger point —
    // replaces the old O(n^2) inner loop (and its DOM reads) that ran
    // once per card, per scroll event.
    let topCardIndex = 0;
    for (let j = 0; j < cardMetrics.length; j++) {
      if (scrollTop >= cardMetrics[j].triggerStart) topCardIndex = j;
    }

    cardsRef.current.forEach((card, i) => {
      if (!card || !cardMetrics[i]) return;

      const { triggerStart, triggerEnd, pinStart, pinEnd } = cardMetrics[i];

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount && i < topCardIndex) {
        blur = Math.max(0, (topCardIndex - i) * blurAmount);
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - pinStart;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - pinStart;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        card.style.filter = filter;

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [baseScale, blurAmount, calculateProgress, getScrollTop, itemScale, onStackComplete, rotationAmount]);

  // Throttle to one update per animation frame no matter how often Lenis
  // fires 'scroll' — keeps CPU usage flat during a fast fling instead of
  // spiking, which is a common cause of visible stutter.
  const handleScroll = useCallback(() => {
    if (rafScheduledRef.current) return;
    rafScheduledRef.current = true;
    requestAnimationFrame(() => {
      rafScheduledRef.current = false;
      updateCardTransforms();
    });
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    if (!useWindowScroll && !scrollerRef.current) return;

    const lenisOptions = useWindowScroll
      ? {
          duration: 1.2,
          easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          touchMultiplier: 2,
          infinite: false,
          wheelMultiplier: 1,
          lerp: 0.1,
          syncTouch: true,
          syncTouchLerp: 0.075
        }
      : {
          wrapper: scrollerRef.current,
          content: scrollerRef.current.querySelector('.scroll-stack-inner'),
          duration: 1.2,
          easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          touchMultiplier: 2,
          infinite: false,
          gestureOrientationHandler: true,
          normalizeWheel: true,
          wheelMultiplier: 1,
          touchInertiaMultiplier: 35,
          lerp: 0.1,
          syncTouch: true,
          syncTouchLerp: 0.075,
          touchInertia: 0.6
        };

    const lenis = new Lenis(lenisOptions);
    lenis.on('scroll', handleScroll);

    const raf = time => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    lenisRef.current = lenis;
    return lenis;
  }, [handleScroll, useWindowScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : scroller.querySelectorAll('.scroll-stack-card')
    );

    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
      // Isolate paint/layout per card so one card's repaint doesn't force
      // the browser to re-check its siblings.
      card.style.contain = 'layout paint';
    });

    measure();
    setupLenis();
    updateCardTransforms();

    // Re-measure on resize (throttled to one rAF) since card positions and
    // container height change.
    let resizeRaf = null;
    const onResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        measure();
        updateCardTransforms();
      });
    };
    window.addEventListener('resize', onResize);

    // Re-measure once any lazy-loaded images inside the stack finish
    // loading — image load changes card height (and therefore the
    // offsetTop of every card after it) without firing a resize event.
    const images = Array.from(scroller.querySelectorAll('img'));
    const onImageLoad = () => {
      measure();
      updateCardTransforms();
    };
    images.forEach(img => {
      if (img.complete) return;
      img.addEventListener('load', onImageLoad, { once: true });
    });

    return () => {
      window.removeEventListener('resize', onResize);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      images.forEach(img => img.removeEventListener('load', onImageLoad));
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    setupLenis,
    updateCardTransforms,
    measure
  ]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        {/* Spacer so the last pin can release cleanly */}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
