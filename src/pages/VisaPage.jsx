import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, CheckCircle, Clock, AlertCircle, Globe, Shield, Phone, ChevronDown, ChevronUp, User, Mail, MapPin, Calendar, ChevronRight } from "lucide-react";

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

const visaTypes = [
  { flag: "🇮🇳", country: "India (Domestic)", label: "No Visa Required", color: "#0ABFBC", bg: "#E6F9F9", desc: "Indian citizens only need a valid photo ID for all domestic destinations.", duration: "—", processing: "Instant", fee: "Free" },
  { flag: "🇳🇵", country: "Nepal", label: "Visa on Arrival", color: "#FBBF24", bg: "#FFFBEB", desc: "Most nationalities can obtain a visa at Tribhuvan Airport or land borders.", duration: "15 / 30 / 90 days", processing: "15–30 mins", fee: "$30–$100 USD" },
  { flag: "🇧🇹", country: "Bhutan", label: "Visa Required", color: "#F87171", bg: "#FEF2F2", desc: "A Bhutan visa must be arranged in advance through an authorized tour operator.", duration: "As per itinerary", processing: "5–7 working days", fee: "₹2,500/day (SDF)" },
  { flag: "🇱🇰", country: "Sri Lanka", label: "e-Visa", color: "#A78BFA", bg: "#F5F3FF", desc: "Apply online through the official Sri Lanka ETA portal before travel.", duration: "30 days", processing: "24–72 hours", fee: "~$35 USD" },
  { flag: "🇹🇭", country: "Thailand", label: "Visa on Arrival", color: "#0ABFBC", bg: "#E6F9F9", desc: "Indian passport holders can get a visa on arrival at major Thai airports.", duration: "15 days", processing: "30–60 mins", fee: "₹2,000 (~2,000 THB)" },
  { flag: "🇦🇪", country: "UAE (Dubai)", label: "e-Visa", color: "#FBBF24", bg: "#FFFBEB", desc: "Apply through travel agencies, airlines, or the official ICP portal.", duration: "14 / 30 / 90 days", processing: "3–5 working days", fee: "₹5,000–₹15,000" },
];

const steps = [
  { num: "01", title: "Share Your Itinerary", desc: "Tell us where you're going and when. Our visa team reviews the requirements for your nationality and destination." },
  { num: "02", title: "Document Checklist", desc: "We send you a precise list of documents needed — passport, photos, bank statements, and more." },
  { num: "03", title: "We File the Application", desc: "Our team handles the entire submission process, whether it's an e-visa portal, embassy, or consulate." },
  { num: "04", title: "Visa in Hand", desc: "We notify you the moment your visa is approved and walk you through what to carry at the border." },
];

const faqs = [
  { q: "How far in advance should I apply for a visa?", a: "We recommend starting the visa process at least 4–6 weeks before travel for most countries. Some destinations like Bhutan or Schengen countries may require even earlier applications. Contact us and we'll tell you exactly what your timeline should look like." },
  { q: "Can K2 Journeys handle the full visa process for me?", a: "Yes — for most destinations, we manage the entire process end to end. This includes collecting your documents, filling forms, submitting to the right authority, and tracking the status. You just need to provide the required paperwork." },
  { q: "What happens if my visa is rejected?", a: "Visa rejections are rare when applications are filed correctly. In the event of a rejection, we help you understand the reason, prepare a stronger application if a resubmission is possible, and adjust your travel plans if needed." },
  { q: "Do I need travel insurance for a visa application?", a: "Several countries (especially Schengen) require proof of travel insurance as part of the visa application. We can help you get a policy that meets the specific requirements for your destination." },
];

export default function VisaPage() {
  const [, setDark] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", destination: "", date: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks! Our visa team will reach out within 24 hours.");
    setForm({ name: "", email: "", destination: "", date: "" });
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", color: "#1A1A2E" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        button { font-family: inherit; cursor: pointer; border: none; }
        input, select { font-family: inherit; }
        input::placeholder, select::placeholder { color: #9CA3AF; }
        input:focus, select:focus { outline: 2px solid #0ABFBC; }
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
            const isActive = l === "Visa";
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
        minHeight: 400, padding: "72px 64px 60px",
        backgroundImage: "linear-gradient(105deg, rgba(255,255,255,0.97) 38%, rgba(255,255,255,0.7) 60%, rgba(255,255,255,0.1) 100%), url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80')",
        backgroundSize: "cover", backgroundPosition: "center",
        display: "flex", justifyContent: "space-between", gap: 48, alignItems: "center",
      }}>
        <div style={{ maxWidth: 520 }}>
          <p style={{ color: "#0ABFBC", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 16 }}>— VISA ASSISTANCE</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 700, lineHeight: 1.18, color: "#0D1321", marginBottom: 20 }}>
            Visas made simple,<br /><span style={{ color: "#0ABFBC", fontStyle: "italic" }}>so you can just go.</span>
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: "#4B5563", marginBottom: 32 }}>
            From e-visas to embassy submissions, our team handles every form, every document, and every deadline — so you can focus on packing.
          </p>
          <div style={{ display: "flex", gap: 14 }}>
            <button style={{ background: "#0ABFBC", color: "#fff", fontWeight: 700, fontSize: 14, padding: "13px 28px", borderRadius: 24, display: "flex", alignItems: "center", gap: 8 }}>
              Get Visa Help <ArrowRight size={15} />
            </button>
            <button style={{ background: "transparent", color: "#0D1321", fontWeight: 600, fontSize: 14, padding: "13px 28px", borderRadius: 24, border: "1.5px solid #D1D5DB", display: "flex", alignItems: "center", gap: 8 }}>
              Check Requirements <Globe size={15} />
            </button>
          </div>
        </div>

        {/* Trust badges */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { icon: CheckCircle, color: "#0ABFBC", bg: "#E6F9F9", title: "99% Approval Rate", desc: "Correctly filed applications, every time." },
            { icon: Clock, color: "#FBBF24", bg: "#FFFBEB", title: "Fast Processing", desc: "We submit within 24 hours of receiving your documents." },
            { icon: Shield, color: "#A78BFA", bg: "#F5F3FF", title: "Secure & Private", desc: "Your documents are handled with complete confidentiality." },
          ].map((b) => (
            <div key={b.title} style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(6px)", border: "1px solid #E5E7EB", borderRadius: 14, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, width: 300, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
              <div style={{ background: b.bg, borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <b.icon size={19} color={b.color} />
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 14, color: "#0D1321", marginBottom: 2 }}>{b.title}</p>
                <p style={{ fontSize: 12.5, color: "#6B7280" }}>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VISA TYPES */}
      <section style={{ background: "#F9FAFB", padding: "80px 64px" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <p style={{ color: "#0ABFBC", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 14 }}>DESTINATION VISA GUIDE</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 700, color: "#0D1321", marginBottom: 14 }}>Popular Destinations & Visa Types</h2>
          <p style={{ fontSize: 15, color: "#6B7280", maxWidth: 520, margin: "0 auto" }}>Requirements are for Indian passport holders. Contact us for other nationalities.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
          {visaTypes.map((v) => (
            <div key={v.country} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 18, padding: "26px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div>
                  <span style={{ fontSize: 32 }}>{v.flag}</span>
                  <h4 style={{ fontSize: 17, fontWeight: 700, color: "#0D1321", marginTop: 8 }}>{v.country}</h4>
                </div>
                <span style={{ background: v.bg, color: v.color, fontSize: 12, fontWeight: 700, padding: "5px 12px", borderRadius: 12 }}>{v.label}</span>
              </div>
              <p style={{ fontSize: 13.5, color: "#6B7280", lineHeight: 1.65, marginBottom: 18 }}>{v.desc}</p>
              <div style={{ borderTop: "1px solid #F3F4F6", paddingTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                {[["Duration", v.duration], ["Processing", v.processing], ["Approx. Fee", v.fee]].map(([k, val]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12.5, color: "#9CA3AF", fontWeight: 500 }}>{k}</span>
                    <span style={{ fontSize: 12.5, color: "#0D1321", fontWeight: 600 }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "80px 64px" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <p style={{ color: "#0ABFBC", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 14 }}>THE PROCESS</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 700, color: "#0D1321" }}>How our visa service works</h2>
        </div>
        <div style={{ display: "flex", gap: 0, position: "relative" }}>
          {steps.map((s, i) => (
            <div key={s.num} style={{ flex: 1, textAlign: "center", padding: "0 24px", position: "relative" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#0ABFBC", color: "#fff", fontSize: 18, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>{s.num}</div>
              {i < steps.length - 1 && <div style={{ position: "absolute", top: 28, left: "60%", right: "-10%", height: 2, background: "#E5E7EB", zIndex: 0 }} />}
              <h4 style={{ fontSize: 17, fontWeight: 700, color: "#0D1321", marginBottom: 10 }}>{s.title}</h4>
              <p style={{ fontSize: 13.5, color: "#6B7280", lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ + FORM */}
      <section style={{ background: "#F9FAFB", padding: "80px 64px" }}>
        <div style={{ display: "flex", gap: 56, alignItems: "flex-start" }}>
          {/* FAQ */}
          <div style={{ flex: 1 }}>
            <p style={{ color: "#0ABFBC", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 14 }}>FAQ</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 700, color: "#0D1321", marginBottom: 32 }}>Common Visa Questions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {faqs.map((f, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: "100%", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "transparent", fontWeight: 600, fontSize: 15, color: "#0D1321", textAlign: "left" }}
                  >
                    {f.q}
                    {openFaq === i ? <ChevronUp size={18} color="#0ABFBC" /> : <ChevronDown size={18} color="#9CA3AF" />}
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: "0 20px 18px", fontSize: 14, lineHeight: 1.75, color: "#6B7280" }}>{f.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick enquiry form */}
          <div style={{ width: 380, flexShrink: 0, background: "#fff", borderRadius: 20, padding: "32px 30px", border: "1px solid #E5E7EB", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <FileText size={22} color="#0ABFBC" />
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#0D1321" }}>Quick Visa Enquiry</h3>
            </div>
            <div style={{ width: 44, height: 3, background: "#0ABFBC", marginBottom: 24 }} />
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { field: "name", icon: User, placeholder: "Your Name", type: "text" },
                { field: "email", icon: Mail, placeholder: "Your Email", type: "email" },
                { field: "destination", icon: MapPin, placeholder: "Destination Country", type: "text" },
                { field: "date", icon: Calendar, placeholder: "Travel Date", type: "date" },
              ].map(({ field, icon: Icon, placeholder, type }) => (
                <div key={field} style={{ position: "relative" }}>
                  <Icon size={15} color="#9CA3AF" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[field]}
                    onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    style={{ width: "100%", padding: "13px 14px 13px 40px", borderRadius: 10, border: "1.5px solid #E5E7EB", fontSize: 14, color: "#0D1321", background: "#F9FAFB" }}
                  />
                </div>
              ))}
              <button type="submit" style={{ background: "#0ABFBC", color: "#fff", fontWeight: 700, fontSize: 15, padding: "15px", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 6 }}>
                Request Visa Help <ArrowRight size={16} />
              </button>
            </form>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 18, padding: "12px 16px", background: "#F0FAFA", borderRadius: 10 }}>
              <Phone size={15} color="#0ABFBC" />
              <span style={{ fontSize: 13, color: "#374151" }}>Or call us: <strong>+91 98765 43210</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* IMPORTANT NOTICE */}
      <section style={{ padding: "0 64px 72px" }}>
        <div style={{ background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 16, padding: "20px 24px", display: "flex", gap: 14, alignItems: "flex-start" }}>
          <AlertCircle size={20} color="#F59E0B" style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: 13.5, color: "#78350F", lineHeight: 1.65 }}>
            <strong>Disclaimer:</strong> Visa requirements, fees, and processing times change frequently. The information on this page is a general guide and may not reflect the most current regulations. Always verify with the official embassy or consulate before travelling. K2 Journeys takes no responsibility for visa rejections due to incomplete documentation provided by the applicant.
          </p>
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
    <footer style={{ background: "#0D1321", padding: "56px 64px 24px" }}>
      <div style={{ display: "flex", gap: 48, marginBottom: 40 }}>
        <div style={{ width: 260, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
            <div style={{ background: "#0ABFBC", color: "#fff", fontWeight: 800, fontSize: 18, padding: "4px 9px", borderRadius: 5 }}>K2</div>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: "#fff" }}>JOURNEYS</span>
          </div>
          <p style={{ color: "#9CA3AF", fontSize: 13.5, lineHeight: 1.7, marginBottom: 20 }}>We curate authentic, responsible, and unforgettable travel experiences across the world.</p>
          <div style={{ display: "flex", gap: 10 }}>
            {[Instagram, Linkedin].map((Icon, i) => <div key={i} style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid #374151", display: "flex", alignItems: "center", justifyContent: "center", color: "#9CA3AF" }}><Icon size={14} /></div>)}
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
