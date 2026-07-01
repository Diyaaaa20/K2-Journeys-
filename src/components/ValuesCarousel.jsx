import { useState, useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import AdvancedValueCard from "./AdvancedValueCard";

const ValuesCarousel = ({ values }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const autoplayRef = useRef(null);

  // 3D slot positions (center, wing left, wing right, edge left, edge right)
  const SLOT_CONFIG = {
    '-2': { translateX: -520, translateZ: -300, rotateY: 45, scale: 0.6, opacity: 0.5 },
    '-1': { translateX: -280, translateZ: -120, rotateY: 25, scale: 0.8, opacity: 0.8 },
    '0':  { translateX: 0,    translateZ: 0,    rotateY: 0,  scale: 1,   opacity: 1 },
    '1':  { translateX: 280,  translateZ: -120, rotateY: -25, scale: 0.8, opacity: 0.8 },
    '2':  { translateX: 520,  translateZ: -300, rotateY: -45, scale: 0.6, opacity: 0.5 },
  };

  const TRANSITION_MS = 900;
  const AUTOPLAY_MS = 3500;

  // Get offset from active index (accounts for circular wrapping)
  const getOffset = (cardIndex) => {
    let offset = cardIndex - activeIndex;
    if (offset > values.length / 2) offset -= values.length;
    if (offset < -values.length / 2) offset += values.length;
    return offset;
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + values.length) % values.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % values.length);
  };

  // Autoplay logic
  useEffect(() => {
    if (isHovering) {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      return;
    }

    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % values.length);
    }, AUTOPLAY_MS);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isHovering, values.length]);

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        position: "relative",
        padding: "20px 100px",
        perspective: "1200px",
      }}
    >
      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        style={{
          position: "absolute",
          left: 24,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(10px)",
          border: "1.5px solid rgba(255,255,255,0.22)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#00bcd4";
          e.currentTarget.style.borderColor = "#00bcd4";
          e.currentTarget.style.boxShadow = "0 0 20px rgba(0,188,212,0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.12)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <FaArrowRight size={20} style={{ transform: "rotate(180deg)" }} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        style={{
          position: "absolute",
          right: 24,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(10px)",
          border: "1.5px solid rgba(255,255,255,0.22)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#00bcd4";
          e.currentTarget.style.borderColor = "#00bcd4";
          e.currentTarget.style.boxShadow = "0 0 20px rgba(0,188,212,0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.12)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <FaArrowRight size={20} />
      </button>

      {/* Carousel Stage */}
      <div
        style={{
          position: "relative",
          height: 280,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          perspective: "1200px",
        }}
      >
        {values.map((v, i) => {
          const offset = getOffset(i);
          const clampedOffset = Math.max(-2, Math.min(2, offset));
          const slot = SLOT_CONFIG[String(clampedOffset)];

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) translateX(${slot.translateX}px) translateZ(${slot.translateZ}px) rotateY(${slot.rotateY}deg) scale(${slot.scale})`,
                opacity: slot.opacity,
                transition: `transform ${TRANSITION_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity ${TRANSITION_MS}ms ease`,
                pointerEvents: offset === 0 ? "auto" : "none",
                zIndex: 5 - Math.abs(offset),
              }}
            >
              <AdvancedValueCard
                v={v}
                index={i}
                isHovered={offset === 0}
                onHover={() => {}}
                onLeave={() => {}}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ValuesCarousel;
