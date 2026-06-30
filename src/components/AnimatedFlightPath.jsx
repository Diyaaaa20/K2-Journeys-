import { ImAirplane } from "react-icons/im";

const STYLE = `
  .k2-flt {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    overflow: visible;
  }
  .k2-flt-l { right: calc(100% + 40px); }
  .k2-flt-r { left:  calc(100% + 40px); }
  @media (max-width: 960px) { .k2-flt { display: none; } }
`;

/*
  S-curve paths, bottom → top (plane flies upward).
  Control points pushed far from centre so the curve is very pronounced.
  ViewBox is 100 × 210; centre-x = 50.
  Left:  first bulges LEFT  (x≈2), then RIGHT (x≈98) → classic S
  Right: mirror             (x≈98 first, then x≈2)
*/
const PATHS = {
  left:  "M 50 202 C  2 162,  98 122, 50 100 C  2 78,  98 38, 50 6",
  right: "M 50 202 C 98 162,   2 122, 50 100 C 98 78,   2 38, 50 6",
};

/*
  ImAirplane from react-icons/im points to the upper-right (~45° above +x).
  rotate="auto" on animateMotion aligns the element's +x axis with the path tangent.
  We pre-rotate by +45° so the plane's nose sits on +x, then auto-rotation
  steers it correctly along the curve.
  x="-7" y="-7" centres the 14 × 14 icon on the animation origin (0,0).
*/
function Plane() {
  return (
    <g transform="rotate(120)">
      <ImAirplane size={14} color="#0ABFBC" x="-7" y="-7" />
    </g>
  );
}

function FlightSVG({ side }) {
  const isLeft = side === "left";
  const pathId = `k2-flt-path-${side}`;
  const glowId = `k2-flt-glow-${side}`;
  const dur    = isLeft ? "10s" : "12.5s";
  const pathD  = PATHS[side];

  return (
    <svg
      className={`k2-flt k2-flt-${isLeft ? "l" : "r"}`}
      width="100"
      height="210"
      viewBox="0 0 100 210"
      aria-hidden="true"
    >
      <defs>
        <path id={pathId} d={pathD} />
        <filter id={glowId} x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Dashed trail — full S-curve, subtle */}
      <use
        href={`#${pathId}`}
        fill="none"
        stroke="#0ABFBC"
        strokeWidth="1.4"
        strokeDasharray="4 9"
        strokeLinecap="round"
        opacity="0.30"
      />

      {/* Animated airplane */}
      <g filter={`url(#${glowId})`}>
        {/* Fade in at start, fade out at end to hide the invisible snap-reset */}
        <animate
          attributeName="opacity"
          values="0;1;1;0"
          keyTimes="0;0.07;0.93;1"
          dur={dur}
          repeatCount="indefinite"
        />
        {/* Ease-in-out motion along the S-curve */}
        <animateMotion
          dur={dur}
          repeatCount="indefinite"
          rotate="auto"
          calcMode="spline"
          keyTimes="0;1"
          keySplines="0.42 0 0.58 1"
        >
          <mpath href={`#${pathId}`} />
        </animateMotion>
        <Plane />
      </g>
    </svg>
  );
}

export default function AnimatedFlightPath() {
  return (
    <>
      <style>{STYLE}</style>
      <FlightSVG side="left" />
      <FlightSVG side="right" />
    </>
  );
}
