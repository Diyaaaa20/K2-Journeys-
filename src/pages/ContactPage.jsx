import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Mail, Phone, Clock, User, Tag, Edit3, Send, Shield, Heart, CheckCircle, ChevronRight } from "lucide-react";

const Instagram = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const Linkedin = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const navLinks = ["Itinerary", "Visa", "Hotel & Air", "MICE", "Blogs", "About Us", "Contact"];
const navRoutes = { "Visa": "/visa", "Blogs": "/blog", "About Us": "/about", "Contact": "/contact" };

const trustPoints = [
  { icon: Clock, color: "#0ABFBC", bg: "#E6F9F9", title: "Quick Response", desc: "We usually reply within 24 hours." },
  { icon: Heart, color: "#F87171", bg: "#FEF2F2", title: "Personalized Support", desc: "Real people. Real conversations. No bots." },
  { icon: Shield, color: "#FBBF24", bg: "#FFFBEB", title: "Safe & Secure", desc: "Your information is always protected with care." },
];

const contactCards = [
  { icon: MapPin, color: "#0ABFBC", bg: "#E6F9F9", title: "Our Office", lines: ["K2 Journeys, 123 Mountain View Street,", "Manali, Himachal Pradesh, India"] },
  { icon: Mail, color: "#F87171", bg: "#FEF2F2", title: "Email Us", lines: ["hello@k2journeys.com", "info@k2journeys.com"] },
  { icon: Phone, color: "#FBBF24", bg: "#FFFBEB", title: "Call Us", lines: ["+91 98765 43210", "+91 87654 32109"] },
  { icon: Clock, color: "#A78BFA", bg: "#F5F3FF", title: "Business Hours", lines: ["Mon – Sat: 9:00 AM – 7:00 PM", "Sunday: 10:00 AM – 4:00 PM"] },
];

export default function ContactPage() {
  const [, setDark] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", color: "#1A1A2E" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Caveat:wght@600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        button { font-family: inherit; cursor: pointer; border: none; }
        input, textarea { font-family: inherit; }
        input::placeholder, textarea::placeholder { color: #9CA3AF; }
        input:focus, textarea:focus { outline: 2px solid #0ABFBC; outline-offset: 0; }
        textarea { resize: none; }
      `}</style>

      {/* NAVBAR */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "#fff", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", padding: "0 48px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ background: "#0D1321", color: "#fff", fontWeight: 800, fontSize: 20, padding: "5px 10px", borderRadius: 6 }}>K2</div>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "#0D1321" }}>JOURNEYS</span>
        </div>
        <nav style={{ display: "flex", gap: 32 }}>
          {navLinks.map((l) => {
            const to = navRoutes[l];
            const isActive = l === "Contact";
            const style = { fontSize: 14, fontWeight: 500, color: isActive ? "#0ABFBC" : "#374151", borderBottom: isActive ? "2px solid #0ABFBC" : "2px solid transparent", paddingBottom: 4 };
            return to ? <Link key={l} to={to} style={style}>{l}</Link> : <span key={l} style={style}>{l}</span>;
          })}
        </nav>
        <button onClick={() => setDark(d => !d)} style={{ background: "#0ABFBC", color: "#fff", fontWeight: 700, fontSize: 14, padding: "10px 22px", borderRadius: 24, display: "flex", alignItems: "center", gap: 8 }}>
          Book Now <ArrowRight size={14} />
        </button>
      </header>

      {/* HERO */}
      <section style={{
        position: "relative", minHeight: 420, padding: "72px 64px 60px",
        backgroundImage: "linear-gradient(105deg, rgba(255,255,255,0.97) 38%, rgba(255,255,255,0.6) 65%, rgba(255,255,255,0.05) 100%), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')",
        backgroundSize: "cover", backgroundPosition: "center",
        display: "flex", justifyContent: "space-between", gap: 40, alignItems: "center",
      }}>
        <div style={{ maxWidth: 520 }}>
          <p style={{ color: "#0ABFBC", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 16 }}>— GET IN TOUCH</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 700, lineHeight: 1.18, color: "#0D1321", marginBottom: 20 }}>
            We'd love to hear<br />from <span style={{ color: "#0ABFBC", fontStyle: "italic" }}>you.</span>
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: "#4B5563", marginBottom: 20 }}>
            Have a question, a dream destination in mind, or ready to plan your next adventure? Our team is here to help you every step of the way.
          </p>
          <p style={{ fontFamily: "'Caveat', cursive", color: "#0ABFBC", fontSize: 24, fontWeight: 600 }}>
            Let's plan something unforgettable.
          </p>
        </div>

        {/* Trust card */}
        <div style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", border: "1px solid #E5E7EB", borderRadius: 20, padding: "28px 30px", width: 340, boxShadow: "0 8px 40px rgba(0,0,0,0.1)" }}>
          {trustPoints.map((t, i) => (
            <div key={t.title} style={{ display: "flex", gap: 16, alignItems: "flex-start", paddingBottom: i < trustPoints.length - 1 ? 20 : 0, marginBottom: i < trustPoints.length - 1 ? 20 : 0, borderBottom: i < trustPoints.length - 1 ? "1px solid #F3F4F6" : "none" }}>
              <div style={{ background: t.bg, borderRadius: "50%", width: 44, height: 44, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <t.icon size={20} color={t.color} />
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 15, color: "#0D1321", marginBottom: 4 }}>{t.title}</p>
                <p style={{ fontSize: 13.5, color: "#6B7280", lineHeight: 1.5 }}>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REACH US */}
      <section style={{ background: "#F9FAFB", padding: "80px 64px" }}>
        <div style={{ display: "flex", gap: 52, alignItems: "flex-start" }}>
          {/* Contact info */}
          <div style={{ width: 420, flexShrink: 0 }}>
            <p style={{ color: "#0ABFBC", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 14 }}>REACH US</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, lineHeight: 1.25, color: "#0D1321", marginBottom: 16 }}>
              Let's Start<br />a Conversation
            </h2>
            <div style={{ width: 48, height: 3, background: "#0ABFBC", marginBottom: 32 }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {contactCards.map((c) => (
                <div key={c.title} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "20px 18px", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                  <div style={{ background: c.bg, borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <c.icon size={18} color={c.color} />
                  </div>
                  <p style={{ fontWeight: 700, fontSize: 14.5, color: "#0D1321", marginBottom: 8 }}>{c.title}</p>
                  {c.lines.map((line) => (
                    <p key={line} style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.65 }}>{line}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div style={{ flex: 1, background: "#fff", borderRadius: 20, padding: "36px 38px", border: "1px solid #E5E7EB", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: "#0D1321", marginBottom: 10 }}>Send us a message</h3>
            <div style={{ width: 48, height: 3, background: "#0ABFBC", marginBottom: 28 }} />

            {sent && (
              <div style={{ background: "#E6F9F9", border: "1px solid #0ABFBC", borderRadius: 10, padding: "14px 18px", marginBottom: 22, display: "flex", alignItems: "center", gap: 10 }}>
                <CheckCircle size={18} color="#0ABFBC" />
                <span style={{ fontSize: 14, color: "#0D1321", fontWeight: 600 }}>Message sent! We'll get back to you shortly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                <InputWrap icon={User}><input type="text" placeholder="Your Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={iStyle} /></InputWrap>
                <InputWrap icon={Mail}><input type="email" placeholder="Your Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={iStyle} /></InputWrap>
              </div>
              <div style={{ marginBottom: 16 }}>
                <InputWrap icon={Tag}><input type="text" placeholder="Subject" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} style={iStyle} /></InputWrap>
              </div>
              <div style={{ marginBottom: 24 }}>
                <InputWrap icon={Edit3} top><textarea placeholder="Your Message" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={6} style={{ ...iStyle, paddingTop: 14 }} /></InputWrap>
              </div>
              <button type="submit" style={{ width: "100%", background: "#0ABFBC", color: "#fff", fontWeight: 700, fontSize: 15, padding: "16px 0", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                Send Message <Send size={16} />
              </button>
              <p style={{ textAlign: "center", color: "#9CA3AF", fontSize: 12.5, marginTop: 14 }}>We'll get back to you as soon as possible!</p>
            </form>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: "0 64px 72px", background: "#F9FAFB" }}>
        <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 20, padding: "32px 40px", display: "flex", alignItems: "center", gap: 28, boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
          <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=200&h=200&fit=crop" alt="Adventure" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#0D1321", marginBottom: 6 }}>Ready for your next adventure?</h4>
            <p style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.6 }}>Tell us your travel dreams and we'll help turn them into an unforgettable journey.</p>
          </div>
          <div style={{ width: 1, alignSelf: "stretch", background: "#E5E7EB" }} />
          <button style={{ background: "#0ABFBC", color: "#fff", fontWeight: 700, fontSize: 14, padding: "13px 26px", borderRadius: 24, display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            Plan Your Journey <ArrowRight size={15} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function InputWrap({ icon: Icon, children, top }) {
  return (
    <div style={{ position: "relative", flex: 1, display: "flex" }}>
      <span style={{ position: "absolute", left: 14, top: top ? 16 : "50%", transform: top ? "none" : "translateY(-50%)", color: "#9CA3AF", display: "flex", pointerEvents: "none" }}>
        <Icon size={15} />
      </span>
      {children}
    </div>
  );
}

const iStyle = {
  width: "100%",
  background: "#F9FAFB",
  border: "1.5px solid #E5E7EB",
  borderRadius: 10,
  padding: "13px 14px 13px 40px",
  color: "#0D1321",
  fontSize: 14,
};

function Footer() {
  const quickLinks = { "Itinerary": null, "Visa": "/visa", "Hotel & Air": null, "MICE": null, "Blogs": "/blog", "About Us": "/about", "Contact": "/contact" };
  const destinations = ["Ladakh", "Manali", "Spiti Valley", "Uttarakhand", "Kashmir", "Kerala"];
  return (
    <footer style={{ background: "#0D1321", padding: "56px 64px 24px" }}>
      <div style={{ display: "flex", gap: 48, marginBottom: 40 }}>
        <div style={{ width: 260, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
            <div style={{ background: "#0ABFBC", color: "#fff", fontWeight: 800, fontSize: 18, padding: "4px 9px", borderRadius: 5 }}>K2</div>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: "#fff" }}>JOURNEYS</span>
          </div>
          <p style={{ color: "#9CA3AF", fontSize: 13.5, lineHeight: 1.7, marginBottom: 20 }}>We curate authentic, responsible, and unforgettable travel experiences across the world.</p>
          <div style={{ display: "flex", gap: 10 }}>
            {[Instagram, Linkedin].map((Icon, i) => (
              <div key={i} style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid #374151", display: "flex", alignItems: "center", justifyContent: "center", color: "#9CA3AF" }}>
                <Icon size={14} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: 180 }}>
          <h5 style={{ color: "#fff", fontSize: 15, fontWeight: 700, marginBottom: 18 }}>Quick Links</h5>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {Object.entries(quickLinks).map(([l, to]) =>
              to
                ? <Link key={l} to={to} style={{ display: "flex", alignItems: "center", gap: 6, color: "#9CA3AF", fontSize: 13.5 }}><ChevronRight size={13} color="#0ABFBC" />{l}</Link>
                : <span key={l} style={{ display: "flex", alignItems: "center", gap: 6, color: "#9CA3AF", fontSize: 13.5 }}><ChevronRight size={13} color="#0ABFBC" />{l}</span>
            )}
          </div>
        </div>
        <div style={{ width: 200 }}>
          <h5 style={{ color: "#fff", fontSize: 15, fontWeight: 700, marginBottom: 18 }}>Popular Destinations</h5>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {destinations.map(d => <span key={d} style={{ display: "flex", alignItems: "center", gap: 6, color: "#9CA3AF", fontSize: 13.5 }}><ChevronRight size={13} color="#0ABFBC" />{d}</span>)}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h5 style={{ color: "#fff", fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Newsletter</h5>
          <p style={{ color: "#9CA3AF", fontSize: 13.5, lineHeight: 1.7, marginBottom: 16 }}>Subscribe to get travel tips, updates & exclusive offers.</p>
          <div style={{ display: "flex", gap: 8 }}>
            <input type="email" placeholder="Your email address" style={{ flex: 1, background: "#161B27", border: "1px solid #374151", borderRadius: 8, padding: "11px 14px", color: "#fff", fontSize: 13 }} />
            <button style={{ background: "#0ABFBC", color: "#fff", borderRadius: 8, padding: "0 16px", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>Send <ArrowRight size={13} /></button>
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid #1F2937", paddingTop: 20, display: "flex", justifyContent: "space-between", color: "#6B7280", fontSize: 12.5 }}>
        <span>© 2025 K2 Journeys. All rights reserved.</span>
        <div style={{ display: "flex", gap: 20 }}>
          <span style={{ color: "#6B7280" }}>Privacy Policy</span>
          <span style={{ color: "#6B7280" }}>Terms & Conditions</span>
        </div>
      </div>
    </footer>
  );
}
