import { useState } from "react";
import {
  ArrowRight,
  Moon,
  Clock,
  Heart,
  Shield,
  MapPin,
  Mail,
  Phone,
  User,
  Tag,
  Edit3,
  Send,
  ChevronRight,
} from "lucide-react";

const InstagramIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const FacebookIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const YoutubeIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);
const LinkedinIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ContactPage() {
  const [, setDarkToggle] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const navLinks = ["Home", "Destinations", "Experiences", "About", "Blog", "Contact"];

  const trustPoints = [
    {
      icon: Clock,
      iconBg: "#1F8A8C",
      title: "Quick Response",
      desc: "We usually reply within 24 hours.",
    },
    {
      icon: Heart,
      iconBg: "#D45B72",
      title: "Personalized Support",
      desc: "Real people. Real conversations. No bots.",
    },
    {
      icon: Shield,
      iconBg: "#D79A3B",
      title: "Safe & Secure",
      desc: "Your information is always protected with care.",
    },
  ];

  const contactCards = [
    {
      icon: MapPin,
      iconBg: "#1F8A8C",
      title: "Our Office",
      lines: ["K2 Journeys, 123 Mountain", "View Street, Manali,", "Himachal Pradesh, India"],
    },
    {
      icon: Mail,
      iconBg: "#D45B72",
      title: "Email Us",
      lines: ["hello@k2journeys.com", "info@k2journeys.com"],
    },
    {
      icon: Phone,
      iconBg: "#D79A3B",
      title: "Call Us",
      lines: ["+91 98765 43210", "+91 87654 32109"],
    },
    {
      icon: Clock,
      iconBg: "#1F8A8C",
      title: "Business Hours",
      lines: ["Mon - Sat: 9:00 AM - 7:00 PM", "Sunday: 10:00 AM - 4:00 PM"],
    },
  ];

  const quickLinks = ["Home", "Destinations", "Experiences", "About Us", "Blog", "Contact Us"];
  const destinations = ["Ladakh", "Manali", "Spiti Valley", "Uttarakhand", "Kashmir", "Himachal Pradesh"];

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", form);
  };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#F4F0E8", color: "#1A1A1A" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Caveat:wght@600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        button { font-family: inherit; cursor: pointer; border: none; }
        input, textarea { font-family: inherit; }
        input::placeholder, textarea::placeholder { color: #7A7E8A; }
        input:focus, textarea:focus { outline: 1.5px solid #3FB6B0; }
      `}</style>

      {/* ===== NAVBAR ===== */}
      <header style={{ background: "#0D1321", padding: "20px 64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#fff" }}>
          <span style={{ fontWeight: 800, fontSize: 22, letterSpacing: 1 }}>K2</span>
          <span style={{ fontSize: 9, letterSpacing: 2, lineHeight: 1.1, opacity: 0.85 }}>JOURNEYS</span>
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
                color: link === "Contact" ? "#D45B72" : "#C9CBD3",
                fontSize: 14.5,
                fontWeight: 500,
                paddingBottom: 6,
                borderBottom: link === "Contact" ? "2px solid #D45B72" : "2px solid transparent",
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
          minHeight: 480,
          padding: "64px 64px 56px",
          backgroundImage:
            "linear-gradient(100deg, rgba(8,12,22,0.88) 5%, rgba(8,12,22,0.45) 45%, rgba(8,12,22,0.15) 100%), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "space-between",
          gap: 40,
        }}
      >
        <div style={{ maxWidth: 560, paddingTop: 28 }}>
          <p style={{ color: "#E07A8B", fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 18 }}>
            GET IN TOUCH
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 46,
              lineHeight: 1.18,
              color: "#fff",
              fontWeight: 700,
              marginBottom: 22,
            }}
          >
            We'd love to hear
            <br />
            from <span style={{ color: "#E26B7A" }}>you.</span>
          </h1>
          <p style={{ color: "#C7CAD3", fontSize: 16, lineHeight: 1.7, maxWidth: 460, marginBottom: 22 }}>
            Have a question, a dream destination in mind, or ready to plan your next adventure?
            Our team is here to help you every step of the way.
          </p>
          <p
            style={{
              fontFamily: "'Caveat', cursive",
              color: "#3FB6B0",
              fontSize: 24,
              fontWeight: 600,
              marginBottom: 18,
            }}
          >
            Let's plan something unforgettable.
          </p>
          <svg width="190" height="50" viewBox="0 0 190 50">
            <path
              d="M3 35 Q 20 10, 40 30 Q 55 45, 70 25 Q 80 12, 95 22 Q 110 32, 130 18 Q 145 8, 160 20"
              fill="none"
              stroke="#3A3F4B"
              strokeWidth="1.5"
              strokeDasharray="3 4"
              strokeLinecap="round"
            />
            <path d="M155 12 L172 20 L156 30" fill="none" stroke="#E26B7A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Trust points card */}
        <div
          style={{
            background: "rgba(28,33,46,0.6)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            padding: "26px 28px",
            width: 360,
            height: "fit-content",
            marginTop: 26,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {trustPoints.map((t, i) => (
            <div
              key={t.title}
              style={{
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
                paddingBottom: i < trustPoints.length - 1 ? 18 : 0,
                marginBottom: i < trustPoints.length - 1 ? 18 : 0,
                borderBottom: i < trustPoints.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
              }}
            >
              <div
                style={{
                  background: t.iconBg,
                  borderRadius: "50%",
                  width: 42,
                  height: 42,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                }}
              >
                <t.icon size={19} />
              </div>
              <div>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{t.title}</p>
                <p style={{ color: "#A8ABB6", fontSize: 13.5, lineHeight: 1.5 }}>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== REACH US ===== */}
      <section style={{ background: "#F4F0E8", padding: "72px 64px 56px" }}>
        <div style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>
          {/* Left column */}
          <div style={{ width: 420, flexShrink: 0 }}>
            <p style={{ color: "#D45B72", fontSize: 12.5, fontWeight: 700, letterSpacing: 2, marginBottom: 14 }}>
              REACH US
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 34,
                lineHeight: 1.25,
                fontWeight: 700,
                color: "#15171C",
                marginBottom: 16,
              }}
            >
              Let's Start
              <br />a Conversation
            </h2>
            <div style={{ width: 46, height: 3, background: "#3FB6B0", marginBottom: 32 }} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {contactCards.map((c) => (
                <div
                  key={c.title}
                  style={{
                    background: "#FAF8F3",
                    border: "1px solid #E8E2D4",
                    borderRadius: 14,
                    padding: "20px 18px",
                  }}
                >
                  <div
                    style={{
                      background: c.iconBg,
                      borderRadius: "50%",
                      width: 38,
                      height: 38,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      marginBottom: 14,
                    }}
                  >
                    <c.icon size={17} />
                  </div>
                  <p style={{ fontWeight: 700, fontSize: 15, color: "#15171C", marginBottom: 8 }}>{c.title}</p>
                  {c.lines.map((line) => (
                    <p key={line} style={{ fontSize: 13, color: "#5B5E66", lineHeight: 1.6 }}>
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Right column: form */}
          <div
            style={{
              flex: 1,
              background: "#0D1321",
              borderRadius: 16,
              padding: "36px 38px",
            }}
          >
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#fff",
                fontSize: 26,
                fontWeight: 600,
                marginBottom: 14,
              }}
            >
              Send us a message
            </h3>
            <div style={{ width: 46, height: 3, background: "#3FB6B0", marginBottom: 26 }} />

            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                <FieldWrap icon={User}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange("name")}
                    style={inputStyle}
                  />
                </FieldWrap>
                <FieldWrap icon={Mail}>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange("email")}
                    style={inputStyle}
                  />
                </FieldWrap>
              </div>

              <div style={{ marginBottom: 16 }}>
                <FieldWrap icon={Tag}>
                  <input
                    type="text"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={handleChange("subject")}
                    style={inputStyle}
                  />
                </FieldWrap>
              </div>

              <div style={{ marginBottom: 24 }}>
                <FieldWrap icon={Edit3} alignTop>
                  <textarea
                    placeholder="Your Message"
                    value={form.message}
                    onChange={handleChange("message")}
                    rows={6}
                    style={{ ...inputStyle, resize: "none", paddingTop: 14 }}
                  />
                </FieldWrap>
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  background: "#1F8A8C",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 15,
                  padding: "16px 0",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                Send Message
                <Send size={16} />
              </button>
              <p style={{ textAlign: "center", color: "#7A7E8A", fontSize: 12.5, marginTop: 14 }}>
                We'll get back to you as soon as possible!
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section style={{ background: "#F4F0E8", padding: "0 64px 64px", position: "relative" }}>
        <div
          style={{
            background: "#FAF8F3",
            border: "1px solid #E8E2D4",
            borderRadius: 18,
            padding: "32px 40px",
            display: "flex",
            alignItems: "center",
            gap: 28,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=200&h=200&fit=crop"
            alt="Adventure"
            style={{ width: 84, height: 84, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
          />
          <div style={{ flex: 1 }}>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#15171C", marginBottom: 6 }}>
              Ready for your next adventure?
            </h4>
            <p style={{ color: "#5B5E66", fontSize: 14, lineHeight: 1.6 }}>
              Tell us your travel dreams and we'll help turn them into an unforgettable journey.
            </p>
          </div>
          <div style={{ width: 1, alignSelf: "stretch", background: "#DCD6C8" }} />
          <button
            style={{
              background: "#D45B72",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14.5,
              padding: "14px 26px",
              borderRadius: 24,
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexShrink: 0,
            }}
          >
            Plan Your Journey
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ background: "#0D1321", padding: "56px 64px 28px" }}>
        <div style={{ display: "flex", gap: 60, marginBottom: 44 }}>
          <div style={{ width: 260, flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#fff", marginBottom: 18 }}>
              <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: 1 }}>K2</span>
              <span style={{ fontSize: 8.5, letterSpacing: 2, opacity: 0.85 }}>JOURNEYS</span>
              <svg width="22" height="15" viewBox="0 0 26 18">
                <path d="M1 17 L7 6 L11 12 L16 3 L25 17 Z" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
            </div>
            <p style={{ color: "#A8ABB6", fontSize: 13.5, lineHeight: 1.7, marginBottom: 20 }}>
              We curate authentic, responsible, and unforgettable travel experiences across the world.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {[InstagramIcon, FacebookIcon, YoutubeIcon, LinkedinIcon].map((Icon, i) => (
                <div
                  key={i}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    border: "1px solid #2A3040",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#C9CBD3",
                  }}
                >
                  <Icon size={14} />
                </div>
              ))}
            </div>
          </div>

          <FooterCol title="Quick Links" items={quickLinks} />
          <FooterCol title="Popular Destinations" items={destinations} />

          <div style={{ width: 280, flexShrink: 0 }}>
            <h5 style={{ color: "#fff", fontSize: 15.5, fontWeight: 700, marginBottom: 16 }}>Newsletter</h5>
            <p style={{ color: "#A8ABB6", fontSize: 13.5, lineHeight: 1.7, marginBottom: 16 }}>
              Subscribe to get travel tips, updates & exclusive offers.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="email"
                placeholder="Your email address"
                style={{
                  flex: 1,
                  background: "#161B27",
                  border: "1px solid #262B38",
                  borderRadius: 8,
                  padding: "11px 14px",
                  color: "#fff",
                  fontSize: 13,
                }}
              />
              <button
                style={{
                  background: "#1F8A8C",
                  width: 42,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  flexShrink: 0,
                }}
                aria-label="Subscribe"
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid #262B38",
            paddingTop: 22,
            display: "flex",
            justifyContent: "space-between",
            color: "#7A7E8A",
            fontSize: 12.5,
          }}
        >
          <span>© 2025 K2 Journeys. All rights reserved.</span>
          <div style={{ display: "flex", gap: 24 }}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FieldWrap({ icon: Icon, children, alignTop }) {
  return (
    <div
      style={{
        position: "relative",
        flex: 1,
        display: "flex",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: 16,
          top: alignTop ? 16 : "50%",
          transform: alignTop ? "none" : "translateY(-50%)",
          color: "#7A7E8A",
          display: "flex",
        }}
      >
        <Icon size={16} />
      </span>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  background: "#161B27",
  border: "1px solid #262B38",
  borderRadius: 10,
  padding: "14px 16px 14px 44px",
  color: "#fff",
  fontSize: 14,
};

function FooterCol({ title, items }) {
  return (
    <div style={{ width: 200, flexShrink: 0 }}>
      <h5 style={{ color: "#fff", fontSize: 15.5, fontWeight: 700, marginBottom: 18 }}>{title}</h5>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map((item) => (
          <a key={item} href="#" style={{ display: "flex", alignItems: "center", gap: 6, color: "#A8ABB6", fontSize: 13.5 }}>
            <ChevronRight size={13} />
            {item}
          </a>
        ))}
      </div>
    </div>
  );
}
