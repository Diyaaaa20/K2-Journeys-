import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaClock, FaUserCircle, FaTag, FaEdit, FaPaperPlane, FaShieldAlt, FaHeart, FaCheckCircle, FaShareAlt, FaLink, FaChevronRight, FaBolt, FaCommentDots, FaGlobeAsia } from "react-icons/fa";

const NAV = ["Itinerary", "Visa", "Hotel & Air", "MICE", "Blogs", "About Us", "Contact"];
const navRoutes = { "Visa": "/visa", "MICE": "/mice", "Blogs": "/blog", "About Us": "/about", "Contact": "/contact" };

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

const CONTACT_CARDS = [
  { icon: FaMapMarkerAlt, color: "#00bcd4", bg: "#E6F9F9", title: "Our Office", lines: ["K2 Journeys, 123 Mountain View Street,", "Manali, Himachal Pradesh, India"] },
  { icon: FaEnvelope, color: "#F87171", bg: "#FEF2F2", title: "Email Us", lines: ["hello@k2journeys.com", "info@k2journeys.com"] },
  { icon: FaPhoneAlt, color: "#FBBF24", bg: "#FFFBEB", title: "Call Us", lines: ["+91 98765 43210", "+91 87654 32109"] },
  { icon: FaClock, color: "#A78BFA", bg: "#F5F3FF", title: "Business Hours", lines: ["Mon – Sat: 9:00 AM – 7:00 PM", "Sunday: 10:00 AM – 4:00 PM"] },
];

const TRUST = [
  { icon: FaClock, color: "#00bcd4", bg: "#E6F9F9", title: "Quick Response", desc: "We usually reply within 24 hours." },
  { icon: FaHeart, color: "#F87171", bg: "#FEF2F2", title: "Personalized Support", desc: "Real people. Real conversations. No bots." },
  { icon: FaShieldAlt, color: "#FBBF24", bg: "#FFFBEB", title: "Safe & Secure", desc: "Your information is always protected with care." },
];

const FIELD_CONFIGS = [
  { name: "name", label: "Your Name", icon: FaUserCircle, type: "text", placeholder: "Kabir Thakur", half: true },
  { name: "email", label: "Your Email", icon: FaEnvelope, type: "email", placeholder: "you@example.com", half: true },
  { name: "subject", label: "Subject", icon: FaTag, type: "text", placeholder: "I'd like to plan a trip to Ladakh", half: false },
  { name: "message", label: "Your Message", icon: FaEdit, type: "textarea", placeholder: "Tell us about your dream destination, dates, group size…", half: false },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [focused, setFocused] = useState(null);
  const [sent, setSent] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formRef, formInView] = useInView(0.1);
  const [cardsRef, cardsInView] = useInView(0.1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  const half = FIELD_CONFIGS.filter(f => f.half);
  const full = FIELD_CONFIGS.filter(f => !f.half);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", color: "#1A1A2E", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Caveat:wght@600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        button { font-family: inherit; cursor: pointer; border: none; }
        input, textarea { font-family: inherit; }
        input::placeholder, textarea::placeholder { color: #C4C9D4; }
        textarea { resize: none; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(10,191,188,0.4); } 50% { box-shadow: 0 0 0 10px rgba(10,191,188,0); } }
        @keyframes checkPop { 0% { transform: scale(0) rotate(-20deg); } 80% { transform: scale(1.15) rotate(3deg); } 100% { transform: scale(1) rotate(0); } }
        @keyframes cinematicZoom {
          0%   { transform: scale(1)    translate(0%,    0%); }
          25%  { transform: scale(1.06) translate(-0.8%, -0.6%); }
          50%  { transform: scale(1.12) translate(0.4%,  -1.2%); }
          75%  { transform: scale(1.07) translate(-0.3%, -0.4%); }
          100% { transform: scale(1)    translate(0%,    0%); }
        }
        .field-group { position: relative; }
        .floating-label { position: absolute; left: 44px; color: #9CA3AF; pointer-events: none; transition: all 0.22s ease; font-size: 14px; top: 50%; transform: translateY(-50%); }
        .floating-label.textarea-label { top: 16px; transform: none; }
        .floating-label.active { top: -10px; transform: translateY(0); font-size: 11px; color: #00bcd4; font-weight: 600; background: #fff; padding: 0 4px; left: 40px; }
        .floating-label.textarea-label.active { top: -10px; }
      `}</style>

      {/* NAVBAR */}
      <header className="k2-header" style={{ position: "sticky", top: 0, zIndex: 100, background: "#fff", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", padding: "0 48px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ background: "#0D1321", color: "#fff", fontWeight: 800, fontSize: 20, padding: "5px 10px", borderRadius: 6 }}>K2</div>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "#0D1321" }}>JOURNEYS</span>
        </div>
        <nav className="k2-nav-links" style={{ display: "flex", gap: 32 }}>
          {NAV.map(l => {
            const to = navRoutes[l];
            const isActive = l === "Contact";
            const style = { fontSize: 14, fontWeight: 500, color: isActive ? "#00bcd4" : "#374151", borderBottom: isActive ? "2px solid #00bcd4" : "2px solid transparent", paddingBottom: 4 };
            return to ? <Link key={l} to={to} style={style}>{l}</Link> : <span key={l} style={style}>{l}</span>;
          })}
        </nav>
        <button className="k2-book-btn" style={{ background: "#00bcd4", color: "#fff", fontWeight: 700, fontSize: 14, padding: "10px 22px", borderRadius: 24, display: "flex", alignItems: "center", gap: 8 }}>
          Book Now <FaArrowRight size={14} />
        </button>
        <button className="k2-hamburger" onClick={() => setMenuOpen(m => !m)} aria-label="Menu" style={{ display: "none", flexDirection: "column", gap: 5, background: "transparent", border: "none", padding: 8, cursor: "pointer" }}>
          <span style={{ display: "block", width: 22, height: 2, background: "#0D1321", borderRadius: 2, transition: "transform 0.3s", transform: menuOpen ? "rotate(45deg) translate(0, 7px)" : "none" }} />
          <span style={{ display: "block", width: 22, height: 2, background: "#0D1321", borderRadius: 2, transition: "opacity 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: 22, height: 2, background: "#0D1321", borderRadius: 2, transition: "transform 0.3s", transform: menuOpen ? "rotate(-45deg) translate(0, -7px)" : "none" }} />
        </button>
        <div className={`k2-mobile-menu${menuOpen ? " open" : ""}`}>
          {NAV.map(l => {
            const to = navRoutes[l];
            const isActive = l === "Contact";
            return to ?
              <Link key={l} to={to} onClick={() => setMenuOpen(false)} style={{ fontSize: 15, fontWeight: 600, color: isActive ? "#00bcd4" : "#374151", padding: "10px 0", borderBottom: "1px solid #F3F4F6" }}>{l}</Link> :
              <span key={l} style={{ fontSize: 15, fontWeight: 600, color: "#374151", padding: "10px 0", borderBottom: "1px solid #F3F4F6" }}>{l}</span>;
          })}
          <Link to="/contact" onClick={() => setMenuOpen(false)} style={{ background: "#00bcd4", color: "#fff", fontWeight: 700, fontSize: 14, padding: "12px 22px", borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 8 }}>
            Book Now <FaArrowRight size={14} />
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: 480, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')", backgroundSize: "cover", backgroundPosition: "center", animation: "cinematicZoom 22s ease-in-out infinite", willChange: "transform" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.75) 45%, rgba(255,255,255,0.05) 100%)" }} />
        <div style={{ position: "absolute", top: -80, left: -80, width: 320, height: 320, borderRadius: "50%", background: "rgba(10,191,188,0.06)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: 200, width: 220, height: 220, borderRadius: "50%", background: "rgba(10,191,188,0.04)", pointerEvents: "none" }} />

        <div className="k2-contact-hero-inner" style={{ position: "relative", padding: "72px 64px 60px", display: "flex", justifyContent: "space-between", gap: 40, alignItems: "center" }}>
          <div style={{ maxWidth: 520, animation: "fadeLeft 0.8s ease both" }}>
            <p style={{ color: "#00bcd4", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 16 }}>— GET IN TOUCH</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 50, fontWeight: 700, lineHeight: 1.15, color: "#0D1321", marginBottom: 20 }}>
              We'd love to hear<br />from <span style={{ color: "#00bcd4", fontStyle: "italic" }}>you.</span>
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "#4B5563", marginBottom: 22 }}>
              Have a question, a dream destination in mind, or ready to plan your next adventure? Our team is here to help you every step of the way.
            </p>
            <p style={{ fontFamily: "'Caveat', cursive", color: "#00bcd4", fontSize: 26, fontWeight: 600, marginBottom: 28 }}>
              Let's plan something unforgettable.
            </p>
            <div style={{ display: "flex", gap: 14 }}>
              {[{ label: "Chat With Us", icon: FaCommentDots, primary: true }, { label: "View Destinations", icon: FaGlobeAsia, primary: false }].map(({ label, icon: Icon, primary }) => (
                <button key={label} style={{ background: primary ? "#00bcd4" : "transparent", color: primary ? "#fff" : "#0D1321", fontWeight: 700, fontSize: 14, padding: "12px 22px", borderRadius: 24, border: primary ? "none" : "1.5px solid #D1D5DB", display: "flex", alignItems: "center", gap: 8, boxShadow: primary ? "0 4px 16px rgba(10,191,188,0.3)" : "none", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform = ""}>
                  <Icon size={14} /> {label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.9)", borderRadius: 24, padding: "30px 28px", width: 360, boxShadow: "0 20px 60px rgba(0,0,0,0.12)", animation: "fadeRight 0.8s ease 0.1s both" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#0D1321", marginBottom: 22 }}>Why reach out to us?</h3>
            {TRUST.map((t, i) => (
              <div key={t.title} style={{ display: "flex", gap: 14, alignItems: "flex-start", paddingBottom: i < TRUST.length - 1 ? 18 : 0, marginBottom: i < TRUST.length - 1 ? 18 : 0, borderBottom: i < TRUST.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
                <div style={{ background: t.bg, borderRadius: "50%", width: 44, height: 44, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 12px ${t.color}22` }}>
                  <t.icon size={20} color={t.color} />
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 15, color: "#0D1321", marginBottom: 4 }}>{t.title}</p>
                  <p style={{ fontSize: 13.5, color: "#6B7280", lineHeight: 1.5 }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPLIT LAYOUT: Contact Info + Form */}
      <section className="k2-contact-split" style={{ display: "flex", minHeight: 600 }}>
        <div ref={cardsRef} className="k2-contact-info-panel" style={{ width: "38%", background: "#0D1321", padding: "64px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p style={{ color: "#00bcd4", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 14, animation: cardsInView ? "fadeLeft 0.6s ease both" : "none" }}>REACH US</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, lineHeight: 1.3, color: "#fff", marginBottom: 16, animation: cardsInView ? "fadeLeft 0.6s ease 0.1s both" : "none" }}>
            Let's Start<br />a Conversation
          </h2>
          <div style={{ width: 44, height: 3, background: "#00bcd4", marginBottom: 36, animation: cardsInView ? "fadeLeft 0.6s ease 0.15s both" : "none" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {CONTACT_CARDS.map((c, i) => (
              <div
                key={c.title}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: hoveredCard === i ? "rgba(10,191,188,0.12)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${hoveredCard === i ? "#00bcd444" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 16, padding: "18px 18px", display: "flex", alignItems: "center", gap: 16,
                  cursor: "default", transition: "all 0.3s ease",
                  transform: hoveredCard === i ? "translateX(6px)" : "translateX(0)",
                  animation: cardsInView ? `fadeLeft 0.6s ease ${0.2 + i * 0.08}s both` : "none",
                }}
              >
                <div style={{ background: c.bg, borderRadius: "50%", width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: hoveredCard === i ? `0 6px 20px ${c.color}40` : "none", transition: "box-shadow 0.3s" }}>
                  <c.icon size={18} color={c.color} />
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 4 }}>{c.title}</p>
                  {c.lines.map(l => <p key={l} style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.6 }}>{l}</p>)}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <p style={{ color: "#6B7280", fontSize: 12.5, fontWeight: 600, letterSpacing: 1.5, marginBottom: 16 }}>FOLLOW US</p>
            <div style={{ display: "flex", gap: 10 }}>
              {[FaShareAlt, FaLink].map((Icon, i) => (
                <div key={i} style={{ width: 38, height: 38, borderRadius: "50%", border: "1px solid #374151", display: "flex", alignItems: "center", justifyContent: "center", color: "#9CA3AF", cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.background = "#00bcd4"; e.currentTarget.style.borderColor = "#00bcd4"; e.currentTarget.style.color = "#fff"; }} onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "#374151"; e.currentTarget.style.color = "#9CA3AF"; }}>
                  <Icon size={16} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div ref={formRef} className="k2-contact-form-panel" style={{ flex: 1, background: "#F9FAFB", padding: "40px 52px 52px", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
          <div style={{ animation: formInView ? "fadeRight 0.7s ease 0.1s both" : "none" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "#0D1321", marginBottom: 8 }}>Send us a message</h3>
            <div style={{ width: 44, height: 3, background: "#00bcd4", marginBottom: 32 }} />

            {sent && (
              <div style={{ background: "#E6F9F9", border: "1px solid #00bcd4", borderRadius: 14, padding: "18px 20px", marginBottom: 24, display: "flex", alignItems: "center", gap: 12, animation: "fadeUp 0.4s ease" }}>
                <FaCheckCircle size={22} color="#00bcd4" style={{ animation: "checkPop 0.4s ease", flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 15, color: "#0D1321", fontWeight: 700 }}>Message sent successfully!</p>
                  <p style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>We'll get back to you within 24 hours.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="k2-contact-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                {half.map(({ name, label, icon: Icon, type }) => {
                  const isFocused = focused === name || form[name];
                  return (
                    <div key={name} className="field-group" style={{ position: "relative" }}>
                      <Icon size={15} color={focused === name ? "#00bcd4" : "#9CA3AF"} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", transition: "color 0.2s", zIndex: 2, pointerEvents: "none" }} />
                      <label className={`floating-label${isFocused ? " active" : ""}`}>{label}</label>
                      <input
                        type={type}
                        value={form[name]}
                        onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
                        onFocus={() => setFocused(name)}
                        onBlur={() => setFocused(null)}
                        style={{ width: "100%", padding: "16px 14px 16px 42px", borderRadius: 12, border: `1.5px solid ${focused === name ? "#00bcd4" : "#E5E7EB"}`, fontSize: 14, color: "#0D1321", background: "#fff", boxShadow: focused === name ? "0 0 0 4px rgba(10,191,188,0.1)" : "none", transition: "all 0.25s", outline: "none" }}
                      />
                    </div>
                  );
                })}
              </div>

              {full.map(({ name, label, icon: Icon, type }) => {
                const isFocused = focused === name || form[name];
                const isTextarea = type === "textarea";
                return (
                  <div key={name} className="field-group" style={{ position: "relative", marginBottom: 16 }}>
                    <Icon size={15} color={focused === name ? "#00bcd4" : "#9CA3AF"} style={{ position: "absolute", left: 16, top: isTextarea ? 16 : "50%", transform: isTextarea ? "none" : "translateY(-50%)", transition: "color 0.2s", zIndex: 2, pointerEvents: "none" }} />
                    <label className={`floating-label${isTextarea ? " textarea-label" : ""}${isFocused ? " active" : ""}`}>{label}</label>
                    {isTextarea ? (
                      <textarea
                        rows={5}
                        value={form[name]}
                        onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
                        onFocus={() => setFocused(name)}
                        onBlur={() => setFocused(null)}
                        style={{ width: "100%", padding: "16px 14px 14px 42px", borderRadius: 12, border: `1.5px solid ${focused === name ? "#00bcd4" : "#E5E7EB"}`, fontSize: 14, color: "#0D1321", background: "#fff", boxShadow: focused === name ? "0 0 0 4px rgba(10,191,188,0.1)" : "none", transition: "all 0.25s", outline: "none", resize: "none" }}
                      />
                    ) : (
                      <input
                        type={type}
                        value={form[name]}
                        onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
                        onFocus={() => setFocused(name)}
                        onBlur={() => setFocused(null)}
                        style={{ width: "100%", padding: "16px 14px 16px 42px", borderRadius: 12, border: `1.5px solid ${focused === name ? "#00bcd4" : "#E5E7EB"}`, fontSize: 14, color: "#0D1321", background: "#fff", boxShadow: focused === name ? "0 0 0 4px rgba(10,191,188,0.1)" : "none", transition: "all 0.25s", outline: "none" }}
                      />
                    )}
                  </div>
                );
              })}

              <button
                type="submit"
                style={{ width: "100%", background: "#00bcd4", color: "#fff", fontWeight: 700, fontSize: 15, padding: "17px", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 8, boxShadow: "0 6px 24px rgba(10,191,188,0.35)", transition: "all 0.25s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = ""}
              >
                <FaPaperPlane size={16} /> Send Message
              </button>
              <p style={{ textAlign: "center", color: "#9CA3AF", fontSize: 12.5, marginTop: 14 }}>
                We'll get back to you as soon as possible!
              </p>
            </form>
          </div>

          {/* Google Maps embed */}
          <div style={{ marginTop: 40, animation: formInView ? "fadeRight 0.7s ease 0.4s both" : "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
              <FaMapMarkerAlt size={18} color="#00bcd4" />
              <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#0D1321" }}>Find Us in Pune</h4>
            </div>
            <div style={{ borderRadius: 18, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.10)", border: "1.5px solid #E5E7EB" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.404014804257!2d73.83385117423713!3d18.510636169479497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x677d6e93664f668d%3A0x808fa190a4270ff!2sK2%20Journeys%20%7C%20Tours%20and%20Travel%20Agency%20in%20Pune!5e0!3m2!1sen!2sin!4v1782435638248!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="K2 Journeys Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="k2-contact-cta" style={{ background: "#fff", padding: "56px 64px" }}>
        <div className="k2-cta-inner" style={{ background: "linear-gradient(135deg, #0D1321 0%, #133048 60%, #0D1321 100%)", borderRadius: 24, padding: "48px 52px", display: "flex", alignItems: "center", gap: 36, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -40, right: 120, width: 180, height: 180, borderRadius: "50%", background: "rgba(10,191,188,0.1)", animation: "float 4s ease-in-out infinite" }} />
          <div style={{ position: "absolute", bottom: -50, right: 40, width: 140, height: 140, borderRadius: "50%", background: "rgba(10,191,188,0.06)", animation: "float 5s ease-in-out infinite 1s" }} />
          <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=200&h=200&fit=crop" alt="" style={{ width: 88, height: 88, borderRadius: "50%", objectFit: "cover", border: "3px solid #00bcd4", flexShrink: 0, position: "relative" }} />
          <div style={{ flex: 1, position: "relative" }}>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Ready for your next adventure?</h4>
            <p style={{ color: "#9CA3AF", fontSize: 15, lineHeight: 1.6 }}>Tell us your travel dreams and we'll help turn them into an unforgettable journey.</p>
          </div>
          <div className="k2-cta-buttons" style={{ display: "flex", gap: 12, flexShrink: 0, position: "relative" }}>
            <button style={{ background: "#00bcd4", color: "#fff", fontWeight: 700, fontSize: 14.5, padding: "14px 26px", borderRadius: 24, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 20px rgba(10,191,188,0.4)", transition: "transform 0.2s", animation: "pulse 2.5s infinite" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"} onMouseLeave={e => e.currentTarget.style.transform = ""}>
              Plan Your Journey <FaArrowRight size={15} />
            </button>
            <button style={{ background: "rgba(255,255,255,0.08)", color: "#fff", fontWeight: 600, fontSize: 14, padding: "14px 22px", borderRadius: 24, border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", gap: 8, transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}>
              <FaBolt size={14} /> Quick Enquiry
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Footer() {
  const quickLinks = { "Itinerary": null, "Visa": "/visa", "Hotel & Air": null, "MICE": null, "Blogs": "/blog", "About Us": "/about", "Contact": "/contact" };
  const destinations = ["Ladakh", "Manali", "Spiti Valley", "Uttarakhand", "Kashmir", "Kerala"];
  return (
    <footer className="k2-footer" style={{ background: "#0D1321", padding: "56px 64px 24px" }}>
      <div className="k2-footer-inner" style={{ display: "flex", gap: 48, marginBottom: 40 }}>
        <div style={{ width: 260, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
            <div style={{ background: "#00bcd4", color: "#fff", fontWeight: 800, fontSize: 18, padding: "4px 9px", borderRadius: 5 }}>K2</div>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: "#fff" }}>JOURNEYS</span>
          </div>
          <p style={{ color: "#9CA3AF", fontSize: 13.5, lineHeight: 1.7, marginBottom: 20 }}>We curate authentic, responsible, and unforgettable travel experiences across the world.</p>
          <div style={{ display: "flex", gap: 10 }}>
            {[FaShareAlt, FaLink].map((Icon, i) => <div key={i} style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid #374151", display: "flex", alignItems: "center", justifyContent: "center", color: "#9CA3AF" }}><Icon size={14} /></div>)}
          </div>
        </div>
        <div style={{ width: 180 }}>
          <h5 style={{ color: "#fff", fontSize: 15, fontWeight: 700, marginBottom: 18 }}>Quick Links</h5>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {Object.entries(quickLinks).map(([l, to]) =>
              to
                ? <Link key={l} to={to} style={{ display: "flex", alignItems: "center", gap: 6, color: "#9CA3AF", fontSize: 13.5 }}><FaChevronRight size={13} color="#00bcd4" />{l}</Link>
                : <span key={l} style={{ display: "flex", alignItems: "center", gap: 6, color: "#9CA3AF", fontSize: 13.5 }}><FaChevronRight size={13} color="#00bcd4" />{l}</span>
            )}
          </div>
        </div>
        <div style={{ width: 200 }}>
          <h5 style={{ color: "#fff", fontSize: 15, fontWeight: 700, marginBottom: 18 }}>Popular Destinations</h5>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {destinations.map(d => <span key={d} style={{ display: "flex", alignItems: "center", gap: 6, color: "#9CA3AF", fontSize: 13.5 }}><FaChevronRight size={13} color="#00bcd4" />{d}</span>)}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h5 style={{ color: "#fff", fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Newsletter</h5>
          <p style={{ color: "#9CA3AF", fontSize: 13.5, lineHeight: 1.7, marginBottom: 16 }}>Subscribe to get travel tips, updates & exclusive offers.</p>
          <div style={{ display: "flex", gap: 8 }}>
            <input type="email" placeholder="Your email address" style={{ flex: 1, background: "#161B27", border: "1px solid #374151", borderRadius: 8, padding: "11px 14px", color: "#fff", fontSize: 13 }} />
            <button style={{ background: "#00bcd4", color: "#fff", borderRadius: 8, padding: "0 16px", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>Send <FaArrowRight size={13} /></button>
          </div>
        </div>
      </div>
      <div className="k2-footer-bottom" style={{ borderTop: "1px solid #1F2937", paddingTop: 20, display: "flex", justifyContent: "space-between", color: "#6B7280", fontSize: 12.5 }}>
        <span>© 2025 K2 Journeys. All rights reserved.</span>
        <div style={{ display: "flex", gap: 20 }}><a href="#" style={{ color: "#6B7280" }}>Privacy Policy</a><a href="#" style={{ color: "#6B7280" }}>Terms & Conditions</a></div>
      </div>
    </footer>
  );
}
