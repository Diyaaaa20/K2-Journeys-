import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Users, Star, Award, Heart, Globe, ChevronRight } from "lucide-react";

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

const stats = [
  { num: "12+", label: "Years of Experience" },
  { num: "8,500+", label: "Happy Travellers" },
  { num: "120+", label: "Destinations Covered" },
  { num: "98%", label: "Satisfaction Rate" },
];

const values = [
  { icon: Shield, color: "#0ABFBC", title: "Authentic Experiences", desc: "We never sell a checklist. Every route is walked, scouted, and felt by our team before it reaches you." },
  { icon: Users, color: "#F87171", title: "Small Groups", desc: "Intimate groups mean deeper connections — with the place, the culture, and the people around you." },
  { icon: Globe, color: "#FBBF24", title: "Responsible Travel", desc: "We leave footprints only in our memories. Local communities, ethical choices, real impact." },
  { icon: Heart, color: "#A78BFA", title: "Always With You", desc: "24/7 support from real humans, not bots. Before, during, and after every journey." },
];

const team = [
  { name: "Kabir Thakur", role: "Founder & Lead Guide", roleColor: "#0ABFBC", bio: "Over a decade in the mountains, curating journeys that stay with you forever.", img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=300&h=300&fit=crop&crop=faces" },
  { name: "Saanvi Rao", role: "Route Planning", roleColor: "#F87171", bio: "Saanvi maps experiences that blend culture, adventure, and authentic local connections.", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=300&fit=crop&crop=faces" },
  { name: "Imran Sheikh", role: "Operations", roleColor: "#FBBF24", bio: "Imran ensures every journey runs smoothly so you can focus on what matters — experiencing.", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=300&h=300&fit=crop&crop=faces" },
];

const awards = [
  { icon: Award, title: "Best Adventure Tour Operator", year: "2023 — Travel India Awards" },
  { icon: Star, title: "Travellers' Choice", year: "2022 & 2023 — TripAdvisor" },
  { icon: Globe, title: "Responsible Tourism Badge", year: "2021 — Ministry of Tourism, India" },
];

export default function AboutPage() {
  const [, setDark] = useState(false);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", color: "#1A1A2E" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        button { font-family: inherit; cursor: pointer; border: none; }
      `}</style>

      {/* NAVBAR */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "#fff", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", padding: "0 48px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ background: "#0D1321", color: "#fff", fontWeight: 800, fontSize: 20, letterSpacing: 1, padding: "5px 10px", borderRadius: 6 }}>K2</div>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "#0D1321" }}>JOURNEYS</span>
        </div>
        <nav style={{ display: "flex", gap: 32 }}>
          {navLinks.map((l) => {
            const to = navRoutes[l];
            const isActive = l === "About Us";
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
        position: "relative", minHeight: 460, padding: "72px 64px 60px",
        backgroundImage: "linear-gradient(105deg, rgba(255,255,255,0.97) 40%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0.1) 100%), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')",
        backgroundSize: "cover", backgroundPosition: "center",
        display: "flex", flexDirection: "column", justifyContent: "center",
      }}>
        <p style={{ color: "#0ABFBC", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 14 }}>— ABOUT K2 JOURNEYS</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, fontWeight: 700, lineHeight: 1.15, color: "#0D1321", maxWidth: 600, marginBottom: 20 }}>
          We plan journeys like<br /><span style={{ fontStyle: "italic", color: "#0ABFBC" }}>we'd take them ourselves.</span>
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: "#4B5563", maxWidth: 520, marginBottom: 32 }}>
          Founded by passionate travelers and route planners, K2 Journeys is built on the belief that travel should be real, raw, and deeply personal.
        </p>
        <div style={{ display: "flex", gap: 14 }}>
          <button style={{ background: "#0ABFBC", color: "#fff", fontWeight: 700, fontSize: 14, padding: "13px 28px", borderRadius: 24, display: "flex", alignItems: "center", gap: 8 }}>
            Our Story <ArrowRight size={15} />
          </button>
          <button style={{ background: "transparent", color: "#0D1321", fontWeight: 600, fontSize: 14, padding: "13px 28px", borderRadius: 24, border: "1.5px solid #D1D5DB", display: "flex", alignItems: "center", gap: 8 }}>
            Meet the Team <ChevronRight size={15} />
          </button>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: "#F0FAFA", padding: "48px 64px" }}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 700, color: "#0ABFBC", lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 14, color: "#6B7280", marginTop: 6, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* OUR STORY */}
      <section style={{ padding: "80px 64px", display: "flex", gap: 64, alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <p style={{ color: "#0ABFBC", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 14 }}>OUR STORY</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, lineHeight: 1.25, color: "#0D1321", marginBottom: 20 }}>
            Our story, one<br />waypoint at a time.
          </h2>
          <div style={{ width: 48, height: 3, background: "#0ABFBC", marginBottom: 24 }} />
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "#4B5563", marginBottom: 18 }}>
            K2 Journeys began with a simple frustration: most travel companies sell a checklist, not an experience. We wanted to build trips around the places, not the other way around.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "#4B5563", marginBottom: 18 }}>
            Every route is walked or scouted by someone on our team before it's offered to you. No outsourced itineraries, no recycled brochures — just routes we'd send our own friends on.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "#4B5563" }}>
            Small groups, local guides, and a refusal to overbook. We'd rather run a trip at half capacity than crowd the experience for everyone on it.
          </p>
        </div>
        <div style={{ flex: 1, position: "relative" }}>
          <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=700&q=80" alt="Trekkers" style={{ width: "100%", borderRadius: 20, objectFit: "cover", height: 420 }} />
          <div style={{ position: "absolute", bottom: 24, left: 24, background: "#fff", borderRadius: 14, padding: "16px 20px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "#0ABFBC" }}>12+</div>
            <div style={{ fontSize: 13, color: "#6B7280", fontWeight: 500 }}>Years curating journeys</div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ background: "#F9FAFB", padding: "72px 64px" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <p style={{ color: "#0ABFBC", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 12 }}>WHAT WE STAND FOR</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: "#0D1321" }}>Our values in action</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {values.map((v) => (
            <div key={v.title} style={{ background: "#fff", borderRadius: 16, padding: "28px 22px", border: "1px solid #F3F4F6", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div style={{ background: `${v.color}18`, borderRadius: "50%", width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                <v.icon size={22} color={v.color} />
              </div>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: "#0D1321", marginBottom: 10 }}>{v.title}</h4>
              <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "#6B7280" }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section style={{ padding: "80px 64px" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <p style={{ color: "#0ABFBC", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 12 }}>MEET OUR TEAM</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: "#0D1321" }}>The people behind the routes.</h2>
        </div>
        <div style={{ display: "flex", gap: 28, justifyContent: "center" }}>
          {team.map((m) => (
            <div key={m.name} style={{ background: "#fff", border: "1px solid #F3F4F6", borderRadius: 18, padding: "32px 24px", textAlign: "center", width: 280, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
              <img src={m.img} alt={m.name} style={{ width: 88, height: 88, borderRadius: "50%", objectFit: "cover", border: `3px solid ${m.roleColor}`, marginBottom: 16 }} />
              <h4 style={{ fontSize: 17, fontWeight: 700, color: "#0D1321", marginBottom: 4 }}>{m.name}</h4>
              <p style={{ fontSize: 13, fontWeight: 600, color: m.roleColor, marginBottom: 12 }}>{m.role}</p>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: "#6B7280", marginBottom: 18 }}>{m.bio}</p>
              <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
                <Linkedin size={15} color="#9CA3AF" />
                <Instagram size={15} color="#9CA3AF" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AWARDS */}
      <section style={{ background: "#F0FAFA", padding: "72px 64px" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <p style={{ color: "#0ABFBC", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 12 }}>RECOGNITION</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: "#0D1321" }}>Awards & Milestones</h2>
        </div>
        <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>
          {awards.map((a) => (
            <div key={a.title} style={{ background: "#fff", borderRadius: 16, padding: "28px 28px", display: "flex", alignItems: "center", gap: 18, flex: 1, maxWidth: 360, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              <div style={{ background: "#0ABFBC18", borderRadius: "50%", width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <a.icon size={24} color="#0ABFBC" />
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 15, color: "#0D1321", marginBottom: 4 }}>{a.title}</p>
                <p style={{ fontSize: 12.5, color: "#6B7280" }}>{a.year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 64px", textAlign: "center" }}>
        <p style={{ color: "#0ABFBC", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 16 }}>READY TO EXPLORE?</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: "#0D1321", marginBottom: 16 }}>Adventure is better together.</h2>
        <p style={{ fontSize: 16, color: "#6B7280", marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>Let us plan your next chapter. Real routes, real people, real memories.</p>
        <button style={{ background: "#0ABFBC", color: "#fff", fontWeight: 700, fontSize: 15, padding: "15px 36px", borderRadius: 28, display: "inline-flex", alignItems: "center", gap: 10 }}>
          Plan Your Journey <ArrowRight size={16} />
        </button>
      </section>

      <Footer />
    </div>
  );
}

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
