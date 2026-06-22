import React, { useState } from "react";
import { Play, Heart, Shield, Map, Users, ArrowRight, Moon } from "lucide-react";

const LinkedinIcon = ({ size = 15, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ size = 15, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function K2JourneysAbout() {
  const [, setDarkToggle] = useState(false);

  const navLinks = ["Home", "Destinations", "Experiences", "About", "Blog", "Contact"];

  const promises = [
    {
      icon: Shield,
      title: "Authentic Experiences",
      desc: "Real places. Real people. Real stories.",
    },
    {
      icon: Map,
      title: "Small Groups",
      desc: "We keep our groups small for deeper connections.",
    },
    {
      icon: Users,
      title: "Responsible Travel",
      desc: "We travel responsibly and leave only footprints.",
    },
  ];

  const journey = [
    {
      icon: "flag",
      iconBg: "#1F8A8C",
      num: "01",
      numColor: "#1F8A8C",
      title: "Why we started",
      desc: "K2 Journeys began with a simple frustration: most travel companies sell a checklist, not an experience. We wanted to build trips around the places, not the other way around.",
    },
    {
      icon: "map",
      iconBg: "#D45B72",
      num: "02",
      numColor: "#D45B72",
      title: "How we plan",
      desc: "Every route is walked or scouted by someone on our team before it's offered to you. No outsourced itineraries, no recycled brochures — just routes we'd send our own friends on.",
    },
    {
      icon: "users",
      iconBg: "#D79A3B",
      num: "03",
      numColor: "#D79A3B",
      title: "Who we travel with",
      desc: "Small groups, local guides, and a refusal to overbook. We'd rather run a trip at half capacity than crowd the experience for everyone on it.",
    },
  ];

  const team = [
    {
      name: "Kabir Thakur",
      role: "Founder & Lead Guide",
      roleColor: "#3FB6B0",
      bio: "Explorer at heart. Kabir has spent over a decade in the mountains curating unforgettable journeys.",
      img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=300&h=300&fit=crop&crop=faces",
    },
    {
      name: "Saanvi Rao",
      role: "Route Planning",
      roleColor: "#D45B72",
      bio: "Saanvi maps experiences that blend culture, adventure, and authentic local connections.",
      img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=300&fit=crop&crop=faces",
    },
    {
      name: "Imran Sheikh",
      role: "Operations",
      roleColor: "#D79A3B",
      bio: "Imran ensures every journey runs smoothly so you can focus on what truly matters—experiencing.",
      img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=300&h=300&fit=crop&crop=faces",
    },
  ];

  const iconFor = (name) => {
    if (name === "flag")
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 22V4a1 1 0 0 1 1-1h13.2a1 1 0 0 1 .8 1.6L15.5 9l3.5 4.4a1 1 0 0 1-.8 1.6H5" />
        </svg>
      );
    if (name === "map")
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
          <line x1="9" y1="3" x2="9" y2="18" />
          <line x1="15" y1="6" x2="15" y2="21" />
        </svg>
      );
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#F4F0E8", color: "#1A1A1A" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        button { font-family: inherit; cursor: pointer; border: none; }
      `}</style>

      {/* ===== NAVBAR ===== */}
      <header style={{ background: "#0D1321", padding: "20px 64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#fff" }}>
          <span style={{ fontWeight: 800, fontSize: 22, letterSpacing: 1 }}>K2</span>
          <span style={{ fontSize: 9, letterSpacing: 2, lineHeight: 1.1, opacity: 0.85 }}>
            JOURNEYS
          </span>
          <svg width="26" height="18" viewBox="0 0 26 18" style={{ marginLeft: 2 }}>
            <path d="M1 17 L7 6 L11 12 L16 3 L25 17 Z" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
        </div>

        <nav style={{ display: "flex", gap: 40 }}>
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              style={{
                color: link === "About" ? "#fff" : "#C9CBD3",
                fontSize: 14.5,
                fontWeight: 500,
                paddingBottom: 6,
                borderBottom: link === "About" ? "2px solid #D45B72" : "2px solid transparent",
              }}
            >
              {link}
            </a>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            style={{
              background: "#1F8A8C",
              color: "#fff",
              padding: "11px 20px",
              borderRadius: 24,
              fontSize: 14,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Plan Your Journey
            <span
              style={{
                background: "rgba(255,255,255,0.25)",
                borderRadius: "50%",
                width: 20,
                height: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArrowRight size={12} />
            </span>
          </button>
          <button
            onClick={() => setDarkToggle((d) => !d)}
            aria-label="Toggle theme"
            style={{
              background: "transparent",
              border: "1px solid #3A3F4B",
              borderRadius: "50%",
              width: 38,
              height: 38,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#C9CBD3",
            }}
          >
            <Moon size={16} />
          </button>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section
        style={{
          position: "relative",
          minHeight: 520,
          padding: "72px 64px 56px",
          backgroundImage:
            "linear-gradient(100deg, rgba(8,12,22,0.92) 5%, rgba(8,12,22,0.55) 45%, rgba(8,12,22,0.25) 100%), url('https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "space-between",
          gap: 40,
        }}
      >
        <div style={{ maxWidth: 600, paddingTop: 24 }}>
          <p style={{ color: "#E07A8B", fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 18 }}>
            ABOUT K2 JOURNEYS
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 48,
              lineHeight: 1.18,
              color: "#fff",
              fontWeight: 600,
              marginBottom: 22,
            }}
          >
            We plan journeys like
            <br />
            <span style={{ fontStyle: "italic", color: "#E08A98", fontWeight: 500 }}>
              we'd take them ourselves.
            </span>
          </h1>
          <p style={{ color: "#C7CAD3", fontSize: 16, lineHeight: 1.7, maxWidth: 480, marginBottom: 32 }}>
            Founded by a small team of passionate travelers and route planners, K2 Journeys is built
            on the belief that travel should be real, raw, and deeply personal.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button
              style={{
                background: "#1F8A8C",
                width: 44,
                height: 44,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
              aria-label="Watch our story"
            >
              <Play size={16} fill="#fff" style={{ marginLeft: 2 }} />
            </button>
            <span style={{ color: "#fff", fontWeight: 500, fontSize: 15 }}>Watch Our Story</span>
          </div>
        </div>

        {/* Our Promise card */}
        <div
          style={{
            background: "rgba(28,33,46,0.55)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            padding: "28px 30px",
            width: 380,
            height: "fit-content",
            marginTop: 16,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: 21, fontWeight: 500 }}>
              Our Promise
            </h3>
            <Heart size={18} color="#E07A8B" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {promises.map((p) => (
              <div key={p.title} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div
                  style={{
                    background: "rgba(63,182,176,0.18)",
                    border: "1px solid rgba(63,182,176,0.4)",
                    borderRadius: "50%",
                    width: 36,
                    height: 36,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#3FB6B0",
                  }}
                >
                  <p.icon size={16} />
                </div>
                <div>
                  <p style={{ color: "#fff", fontWeight: 600, fontSize: 14.5, marginBottom: 3 }}>{p.title}</p>
                  <p style={{ color: "#A8ABB6", fontSize: 13.5, lineHeight: 1.5 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OUR JOURNEY ===== */}
      <section style={{ background: "#F4F0E8", padding: "76px 64px" }}>
        <div style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>
          <div style={{ width: 280, flexShrink: 0 }}>
            <p style={{ color: "#D45B72", fontSize: 12.5, fontWeight: 700, letterSpacing: 2, marginBottom: 14 }}>
              OUR JOURNEY
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 32,
                lineHeight: 1.25,
                fontWeight: 600,
                color: "#15171C",
                marginBottom: 16,
              }}
            >
              Our story, one waypoint at a time.
            </h2>
            <div style={{ width: 46, height: 3, background: "#D45B72" }} />
          </div>

          <div style={{ display: "flex", flex: 1, gap: 0 }}>
            {journey.map((j, i) => (
              <React.Fragment key={j.title}>
                <div style={{ flex: 1, paddingRight: 28 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: j.iconBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 22,
                    }}
                  >
                    {iconFor(j.icon)}
                  </div>
                  <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: "#15171C" }}>
                    {j.title}
                  </h4>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: "#5B5E66", marginBottom: 22, minHeight: 150 }}>
                    {j.desc}
                  </p>
                  <span style={{ fontSize: 15, fontWeight: 700, color: j.numColor }}>{j.num}</span>
                </div>
                {i < journey.length - 1 && (
                  <div
                    style={{
                      borderTop: "2px dashed #C9C3B5",
                      width: 60,
                      marginTop: 22,
                      height: 1,
                      flexShrink: 0,
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section style={{ background: "#0D1321", padding: "76px 64px" }}>
        <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>
          <div style={{ width: 280, flexShrink: 0 }}>
            <p style={{ color: "#3FB6B0", fontSize: 12.5, fontWeight: 700, letterSpacing: 2, marginBottom: 14 }}>
              MEET OUR TEAM
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 32,
                lineHeight: 1.25,
                fontWeight: 600,
                color: "#fff",
                marginBottom: 16,
              }}
            >
              The people behind the routes.
            </h2>
            <div style={{ width: 46, height: 3, background: "#3FB6B0", marginBottom: 22 }} />
            <p style={{ color: "#A8ABB6", fontSize: 14, lineHeight: 1.7, marginBottom: 18 }}>
              We're explorers, planners, and storytellers who believe the best journeys are the ones
              that stay with you forever.
            </p>
            <svg width="40" height="30" viewBox="0 0 40 30">
              <path
                d="M2 5 Q 10 28, 36 18"
                fill="none"
                stroke="#3FB6B0"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path d="M27 14 L37 18 L31 27" fill="none" stroke="#3FB6B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div style={{ display: "flex", gap: 20, flex: 1 }}>
            {team.map((member) => (
              <div
                key={member.name}
                style={{
                  background: "#161B27",
                  border: "1px solid #262B38",
                  borderRadius: 14,
                  padding: "28px 22px",
                  flex: 1,
                  textAlign: "center",
                }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  style={{
                    width: 84,
                    height: 84,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "3px solid #2A3040",
                    marginBottom: 16,
                  }}
                />
                <h4 style={{ color: "#fff", fontSize: 16.5, fontWeight: 700, marginBottom: 4 }}>
                  {member.name}
                </h4>
                <p style={{ color: member.roleColor, fontSize: 13, fontWeight: 600, marginBottom: 14 }}>
                  {member.role}
                </p>
                <p style={{ color: "#A8ABB6", fontSize: 13, lineHeight: 1.6, marginBottom: 20, minHeight: 80 }}>
                  {member.bio}
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: 14 }}>
                  <LinkedinIcon size={15} color="#A8ABB6" />
                  <InstagramIcon size={15} color="#A8ABB6" />
                </div>
              </div>
            ))}

            {/* Adventure CTA card */}
            <div
              style={{
                flex: 1,
                borderRadius: 14,
                overflow: "hidden",
                position: "relative",
                minHeight: 320,
                backgroundImage:
                  "linear-gradient(180deg, rgba(13,19,33,0.15) 0%, rgba(13,19,33,0.05) 50%, rgba(13,19,33,0.2) 100%), url('https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                padding: 22,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <h4
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#fff",
                  fontSize: 23,
                  fontWeight: 500,
                  lineHeight: 1.3,
                }}
              >
                Adventure is better together.
              </h4>
              <button
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  border: "1.5px solid rgba(255,255,255,0.6)",
                  background: "rgba(255,255,255,0.08)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label="Explore"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
