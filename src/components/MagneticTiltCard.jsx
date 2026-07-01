import { useRef, useState } from "react";
import { FaChevronRight } from "react-icons/fa";

const MagneticTiltCard = ({ w, index, isVisible }) => {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();

    // Calculate mouse position relative to the card
    const x = e.clientX - left;
    const y = e.clientY - top;
    setMousePosition({ x, y });

    // Calculate rotation (max 10 degrees)
    const rotateX = ((height / 2 - y) / height) * 20;
    const rotateY = ((x - width / 2) / width) * 20;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Snap back to original position
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  return (
    <div
      ref={cardRef}
      className="wsa-card"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: 16,
        padding: "28px 20px 20px",
        position: "relative",
        overflow: "hidden",
        opacity: isVisible ? 1 : 0,
        transform: isHovered
          ? transformStyle
          : (isVisible ? "perspective(1000px) translateY(0) rotateX(0) rotateY(0)" : "perspective(1000px) translateY(30px) rotateX(5deg) rotateY(0)"),
        transition: isHovered
          ? "transform 0.1s ease-out"
          : `opacity 0.8s ease ${index * 0.15}s, transform 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${isHovered ? '0s' : `${index * 0.15}s`}, border-color 0.4s ease`,
        boxShadow: isHovered ? "0 20px 40px rgba(0,0,0,0.4)" : "0 4px 10px rgba(0,0,0,0.2)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Dynamic Mouse Spotlight Glow */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(10, 191, 188, 0.12), transparent 40%)`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Floating Background Icon */}
      <w.icon
        size={90}
        strokeWidth={0.5}
        style={{
          position: "absolute",
          bottom: -15,
          right: -15,
          color: w.color,
          opacity: 0.05,
          transform: isHovered ? "translateZ(30px) scale(1.1)" : "translateZ(0px) scale(1)",
          transition: "transform 0.4s ease-out"
        }}
        aria-hidden="true"
      />

      <div style={{ position: "relative", zIndex: 1, transform: isHovered ? "translateZ(40px)" : "translateZ(0)", transition: "transform 0.3s ease-out" }}>
        <div className="wsa-icon-wrap" style={{ width: 60, height: 60, borderRadius: "50%", background: w.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
          <w.icon size={24} color={w.color} strokeWidth={1.8} />
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
          <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 28, height: 20, padding: "0 6px", borderRadius: 999, border: `1px solid ${w.color}`, color: w.color, fontSize: 10, fontWeight: 700, letterSpacing: 0.3, flexShrink: 0, marginTop: 2 }}>
            {w.title.split(" ")[0].slice(0, 2).toUpperCase()}
          </span>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.3 }}>{w.title}</h3>
        </div>

        <span className="wsa-underline" style={{ display: "block", width: 32, height: 1.5, background: w.color, marginBottom: 12, transition: "width 0.4s ease" }} />

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.65)", margin: "0 0 18px" }}>{w.desc}</p>

        <button className="wsa-arrow" aria-label={`Learn more about ${w.title}`} style={{ width: 28, height: 28, borderRadius: "50%", border: `1.2px solid ${w.color}`, background: "transparent", color: w.color, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }}>
          <FaChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default MagneticTiltCard;
