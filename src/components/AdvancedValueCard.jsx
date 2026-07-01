import { useRef, useState } from "react";

const AdvancedValueCard = ({ v, index, isHovered, onHover, onLeave }) => {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();

    // Calculate mouse position relative to the card
    const x = e.clientX - left;
    const y = e.clientY - top;
    setMousePosition({ x, y });

    // Calculate rotation based on mouse position (max 15 degrees)
    const rotateX = ((height / 2 - y) / height) * 25;
    const rotateY = ((x - width / 2) / width) * 25;

    // Add translateZ for depth effect
    setTransformStyle(
      `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale3d(1.01, 1.01, 1.01)`
    );
  };

  const handleMouseEnter = () => onHover(index);

  const handleMouseLeave = () => {
    onLeave();
    setTransformStyle("perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: 268,
        flexShrink: 0,
        marginRight: 28,
        background: isHovered ? v.bg : "rgba(255,255,255,0.10)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderRadius: 22,
        padding: "30px 26px",
        border: `1.5px solid ${isHovered ? v.color + "44" : "rgba(255,255,255,0.18)"}`,
        boxShadow: isHovered
          ? `0 10px 28px ${v.color}22, 0 20px 50px rgba(0,0,0,0.4)`
          : "0 8px 32px rgba(0,0,0,0.25)",
        transform: isHovered ? transformStyle : "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)",
        transition: isHovered
          ? "transform 0.08s ease-out, border-color 0.3s, background 0.3s, box-shadow 0.3s"
          : "background 0.3s, border-color 0.3s, box-shadow 0.3s, transform 0.4s cubic-bezier(0.34,1.4,0.64,1)",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
        transformStyle: "preserve-3d",
        opacity: 1,
        animation: `slideUp 0.6s ease ${index * 0.12}s both`,
      }}
    >
      {/* Dynamic Spotlight Glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, ${v.color}15, transparent 60%)`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Content Container with Z-depth */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          transform: isHovered ? "translateZ(15px)" : "translateZ(0px)",
          transition: "transform 0.3s ease-out",
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${v.bg}, ${v.color}20)`,
            borderRadius: 16,
            width: 60,
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
            border: `1.5px solid ${v.color}30`,
            boxShadow: `0 4px 12px ${v.color}15`,
            transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
            transform: isHovered ? "rotate(-10deg) scale(1.12) translateZ(10px)" : "rotate(0) scale(1) translateZ(0px)",
            transformStyle: "preserve-3d",
          }}
        >
          <v.icon size={28} color={v.color} />
        </div>

        <h4
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: isHovered ? "#0D1321" : "#fff",
            marginBottom: 10,
            transition: "color 0.3s",
          }}
        >
          {v.title}
        </h4>

        <p
          style={{
            fontSize: 13.5,
            lineHeight: 1.75,
            color: isHovered ? "#374151" : "rgba(255,255,255,0.72)",
            transition: "color 0.3s",
          }}
        >
          {v.desc}
        </p>
      </div>
    </div>
  );
};

export default AdvancedValueCard;
