import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, CheckCircle, Clock, AlertCircle, Globe, Shield, Phone, ChevronDown, ChevronUp, User, Mail, MapPin, Calendar, ChevronRight, ChevronLeft, Share2, Link2, X, ExternalLink, TrendingUp, Zap } from "lucide-react";

const NAV = ["Itinerary", "Visa", "Hotel & Air", "MICE", "Blogs", "About Us", "Contact"];
const navRoutes = { "Visa": "/visa", "Blogs": "/blog", "About Us": "/about", "Contact": "/contact" };

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

const ALL_VISAS = [
  { type: "domestic", flag: "🇮🇳", country: "India (Domestic)", label: "No Visa Required", labelColor: "#0ABFBC", labelBg: "#E6F9F9", desc: "Indian citizens only need a valid photo ID for all domestic destinations.", duration: "—", processing: "Instant", fee: "Free", docs: ["Valid Government ID (Aadhar/Passport)", "Booking confirmation"], process: ["Book your trip", "Carry valid ID", "Travel!"], glow: "#0ABFBC" },
  { type: "international", flag: "🇹🇭", country: "Thailand", label: "Visa on Arrival", labelColor: "#FBBF24", labelBg: "#FFFBEB", desc: "Indian passport holders can get a visa on arrival at major Thai airports.", duration: "15 days", processing: "30–60 mins", fee: "₹2,000", docs: ["Valid Passport (6 months validity)", "Passport size photos (2)", "Return flight ticket", "Hotel booking proof", "Foreign currency (₹10,000+)"], process: ["Land at BKK/DMK airport", "Head to VOA counter", "Fill immigration form", "Pay fee in cash", "Get stamp & enter"], glow: "#FBBF24" },
  { type: "international", flag: "🇳🇵", country: "Nepal", label: "Visa on Arrival", labelColor: "#FBBF24", labelBg: "#FFFBEB", desc: "Most nationalities can obtain a visa at Tribhuvan Airport or land borders.", duration: "15/30/90 days", processing: "15–30 mins", fee: "$30–$100 USD", docs: ["Valid Passport", "Passport photos (2)", "USD cash for fee", "Return ticket"], process: ["Arrive at Tribhuvan Airport", "Complete online form at kiosk", "Queue at VOA counter", "Pay fee (USD/EUR/INR)", "Collect visa sticker"], glow: "#FBBF24" },
  { type: "international", flag: "🇧🇹", country: "Bhutan", label: "Pre-Approved", labelColor: "#F87171", labelBg: "#FEF2F2", desc: "A Bhutan visa must be arranged in advance through an authorized tour operator.", duration: "As per itinerary", processing: "5–7 working days", fee: "₹2,500/day (SDF)", docs: ["Valid Passport (6 months+)", "Visa approval letter from K2 Journeys", "2 passport photos", "Travel insurance"], process: ["Contact K2 Journeys", "We apply on your behalf", "Receive approval letter", "Show letter at border", "Collect visa on arrival"], glow: "#F87171" },
  { type: "international", flag: "🇱🇰", country: "Sri Lanka", label: "e-Visa", labelColor: "#A78BFA", labelBg: "#F5F3FF", desc: "Apply online through the official Sri Lanka ETA portal before travel.", duration: "30 days", processing: "24–72 hours", fee: "~$35 USD", docs: ["Valid Passport", "Credit/Debit card", "Return ticket", "Hotel booking"], process: ["Visit eta.gov.lk", "Fill online form", "Pay fee online", "Receive e-visa via email", "Print and carry to airport"], glow: "#A78BFA" },
  { type: "international", flag: "🇦🇪", country: "UAE (Dubai)", label: "e-Visa", labelColor: "#A78BFA", labelBg: "#F5F3FF", desc: "Apply through travel agencies, airlines, or the official ICP portal.", duration: "14/30/90 days", processing: "3–5 working days", fee: "₹5,000–₹15,000", docs: ["Valid Passport (6 months+)", "Passport photo", "Bank statement (3 months)", "Salary slips / ITR", "Hotel booking", "Return ticket"], process: ["Submit docs to K2 Journeys", "We file via approved channel", "Track status together", "Receive visa via email", "Print visa + travel"], glow: "#A78BFA" },
];

const STEPS = [
  { num: "01", icon: FileText, color: "#0ABFBC", bg: "#E6F9F9", title: "Share Your Itinerary", desc: "Tell us where you're going and when. Our visa team reviews requirements for your nationality." },
  { num: "02", icon: CheckCircle, color: "#FBBF24", bg: "#FFFBEB", title: "Document Checklist", desc: "We send a precise list — passport, photos, bank statements, and more." },
  { num: "03", icon: Globe, color: "#A78BFA", bg: "#F5F3FF", title: "We File the Application", desc: "Our team handles the entire submission, whether e-visa, embassy, or consulate." },
  { num: "04", icon: Zap, color: "#F87171", bg: "#FEF2F2", title: "Visa in Hand", desc: "We notify you the moment your visa is approved and walk you through what to carry." },
];

const STATS = [
  { value: 99, suffix: "%", label: "Approval Rate" },
  { value: 5000, suffix: "+", label: "Visas Processed" },
  { value: 48, suffix: "hr", label: "Avg Processing" },
  { value: 40, suffix: "+", label: "Countries Covered" },
];

const FAQS = [
  { q: "How far in advance should I apply for a visa?", a: "We recommend starting at least 4–6 weeks before travel. Some destinations like Bhutan or Schengen may require earlier applications." },
  { q: "Can K2 Journeys handle the full visa process for me?", a: "Yes — for most destinations, we manage end to end: collecting documents, filling forms, submitting to the right authority, and tracking status." },
  { q: "What happens if my visa is rejected?", a: "Rejections are rare when filed correctly. We help you understand the reason, prepare a stronger resubmission if possible, and adjust plans if needed." },
  { q: "Do I need travel insurance for a visa application?", a: "Several countries (especially Schengen) require proof of travel insurance. We can help you get a policy meeting the specific requirements for your destination." },
];

function StatCounter({ value, suffix, label, start }) {
  const count = useCountUp(value, 1800, start);
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 700, color: "#0ABFBC", lineHeight: 1 }}>{count.toLocaleString()}{suffix}</div>
      <div style={{ fontSize: 13.5, color: "#6B7280", marginTop: 8, fontWeight: 500 }}>{label}</div>
    </div>
  );
}

export default function VisaPage() {
  const [filter, setFilter] = useState("all");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedVisa, setSelectedVisa] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", destination: "", date: "" });
  const [activeStep, setActiveStep] = useState(0);
  const [statsRef, statsInView] = useInView(0.3);
  const [processRef, processInView] = useInView(0.2);

  const filtered = ALL_VISAS.filter(v => filter === "all" || v.type === filter);

  useEffect(() => {
    if (!processInView) return;
    let i = 0;
    const t = setInterval(() => { i++; setActiveStep(s => (s + 1) % STEPS.length); if (i > 20) clearInterval(t); }, 2000);
    return () => clearInterval(t);
  }, [processInView]);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", color: "#1A1A2E", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        button { font-family: inherit; cursor: pointer; border: none; }
        input, select { font-family: inherit; }
        input::placeholder { color: #9CA3AF; }
        input:focus, select:focus { outline: 2px solid #0ABFBC; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes glow { 0%,100% { box-shadow: 0 0 0 0 rgba(10,191,188,0); } 50% { box-shadow: 0 0 24px 4px rgba(10,191,188,0.35); } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.94) translateY(16px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
        @keyframes progressFill { from { width: 0%; } to { width: 100%; } }
      `}</style>

      {/* NAVBAR */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "#fff", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", padding: "0 48px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ background: "#0D1321", color: "#fff", fontWeight: 800, fontSize: 20, padding: "5px 10px", borderRadius: 6 }}>K2</div>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "#0D1321" }}>JOURNEYS</span>
        </div>
        <nav style={{ display: "flex", gap: 32 }}>
          {NAV.map(l => {
            const to = navRoutes[l];
            const isActive = l === "Visa";
            const style = { fontSize: 14, fontWeight: 500, color: isActive ? "#0ABFBC" : "#374151", borderBottom: isActive ? "2px solid #0ABFBC" : "2px solid transparent", paddingBottom: 4 };
            return to ? <Link key={l} to={to} style={style}>{l}</Link> : <span key={l} style={style}>{l}</span>;
          })}
        </nav>
        <button style={{ background: "#0ABFBC", color: "#fff", fontWeight: 700, fontSize: 14, padding: "10px 22px", borderRadius: 24, display: "flex", alignItems: "center", gap: 8 }}>
          Book Now <ArrowRight size={14} />
        </button>
      </header>

      {/* HERO */}
      <section style={{ minHeight: 400, padding: "72px 64px 60px", backgroundImage: "linear-gradient(105deg,rgba(255,255,255,0.97) 38%,rgba(255,255,255,0.6) 65%,rgba(255,255,255,0.05) 100%),url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80')", backgroundSize: "cover", backgroundPosition: "center", display: "flex", justifyContent: "space-between", gap: 48, alignItems: "center" }}>
        <div style={{ maxWidth: 520, animation: "fadeUp 0.8s ease both" }}>
          <p style={{ color: "#0ABFBC", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 16 }}>— VISA ASSISTANCE</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 700, lineHeight: 1.18, color: "#0D1321", marginBottom: 20 }}>
            Visas made simple,<br /><span style={{ color: "#0ABFBC", fontStyle: "italic" }}>so you can just go.</span>
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: "#4B5563", marginBottom: 32 }}>
            From e-visas to embassy submissions, our team handles every form, every document, and every deadline.
          </p>
          <div style={{ display: "flex", gap: 14 }}>
            <button style={{ background: "#0ABFBC", color: "#fff", fontWeight: 700, fontSize: 14, padding: "13px 28px", borderRadius: 24, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 16px rgba(10,191,188,0.3)", transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform = ""}>
              Get Visa Help <ArrowRight size={15} />
            </button>
            <button style={{ background: "transparent", color: "#0D1321", fontWeight: 600, fontSize: 14, padding: "13px 28px", borderRadius: 24, border: "1.5px solid #D1D5DB", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "#0ABFBC"; e.currentTarget.style.color = "#0ABFBC"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "#D1D5DB"; e.currentTarget.style.color = "#0D1321"; }}>
              Check Requirements <Globe size={15} />
            </button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, animation: "fadeUp 0.8s ease 0.15s both" }}>
          {[{ icon: CheckCircle, color: "#0ABFBC", bg: "#E6F9F9", title: "99% Approval Rate", desc: "Correctly filed applications, every time." }, { icon: Clock, color: "#FBBF24", bg: "#FFFBEB", title: "Fast Processing", desc: "We submit within 24 hours of receiving your docs." }, { icon: Shield, color: "#A78BFA", bg: "#F5F3FF", title: "Secure & Private", desc: "Your documents handled with complete confidentiality." }].map((b) => (
            <div key={b.title} style={{ background: "rgba(255,255,255,0.95)", border: "1px solid #E5E7EB", borderRadius: 14, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, width: 320, boxShadow: "0 4px 16px rgba(0,0,0,0.06)", transition: "transform 0.2s,box-shadow 0.2s", animation: "float 3s ease-in-out infinite" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"} onMouseLeave={e => e.currentTarget.style.transform = ""}>
              <div style={{ background: b.bg, borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><b.icon size={19} color={b.color} /></div>
              <div><p style={{ fontWeight: 700, fontSize: 14, color: "#0D1321", marginBottom: 2 }}>{b.title}</p><p style={{ fontSize: 12.5, color: "#6B7280" }}>{b.desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} style={{ background: "#F0FAFA", padding: "48px 64px" }}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ animation: statsInView ? `fadeUp 0.5s ease ${i * 0.1}s both` : "none" }}>
              <StatCounter value={s.value} suffix={s.suffix} label={s.label} start={statsInView} />
            </div>
          ))}
        </div>
      </section>

      {/* POWER SECTION */}
      <section style={{ background: "linear-gradient(135deg, #0D1321 0%, #1a2744 50%, #0D1321 100%)", padding: "64px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 280, height: 280, borderRadius: "50%", background: "rgba(10,191,188,0.08)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(10,191,188,0.06)", pointerEvents: "none" }} />
        <div style={{ position: "relative", display: "flex", gap: 40, alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <p style={{ color: "#0ABFBC", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 14 }}>WHY CHOOSE K2 VISA SERVICES</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: "#fff", lineHeight: 1.3, marginBottom: 16 }}>Your passport to a<br />stress-free journey</h2>
            <p style={{ color: "#9CA3AF", fontSize: 15, lineHeight: 1.7, maxWidth: 440 }}>We've processed over 5,000 visas across 40+ countries. Our team knows exactly what each embassy looks for — so your application gets approved, not rejected.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, flex: 1 }}>
            {[{ icon: TrendingUp, color: "#0ABFBC", title: "Zero Hidden Fees", desc: "We charge only what we quote." }, { icon: Zap, color: "#FBBF24", title: "48-Hour Turnaround", desc: "Express processing for urgent trips." }, { icon: Shield, color: "#A78BFA", title: "Embassy Contacts", desc: "Direct lines to 40+ embassies." }, { icon: Globe, color: "#F87171", title: "Worldwide Coverage", desc: "Europe, Asia, Americas & beyond." }].map((f) => (
              <div key={f.title} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "20px 18px", transition: "background 0.3s" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(10,191,188,0.1)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}>
                <f.icon size={22} color={f.color} style={{ marginBottom: 12 }} />
                <p style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{f.title}</p>
                <p style={{ color: "#9CA3AF", fontSize: 12.5 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISA LISTING with filter */}
      <section style={{ background: "#F9FAFB", padding: "80px 64px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ color: "#0ABFBC", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 14 }}>DESTINATION VISA GUIDE</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 700, color: "#0D1321", marginBottom: 14 }}>Popular Destinations & Visa Types</h2>
          <p style={{ fontSize: 15, color: "#6B7280", maxWidth: 520, margin: "0 auto 28px" }}>Requirements are for Indian passport holders. Contact us for other nationalities.</p>

          {/* Filter */}
          <div style={{ display: "inline-flex", background: "#fff", borderRadius: 28, border: "1.5px solid #E5E7EB", padding: 4, gap: 4, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
            {[["all", "All Destinations"], ["domestic", "🇮🇳 Domestic"], ["international", "🌍 International"]].map(([val, label]) => (
              <button key={val} onClick={() => setFilter(val)} style={{ padding: "10px 22px", borderRadius: 22, fontSize: 14, fontWeight: 600, background: filter === val ? "#0ABFBC" : "transparent", color: filter === val ? "#fff" : "#374151", transition: "all 0.25s", boxShadow: filter === val ? "0 4px 14px rgba(10,191,188,0.3)" : "none" }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
          {filtered.map((v, i) => (
            <div
              key={v.country}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setSelectedVisa(v)}
              style={{
                background: "#fff",
                border: `1.5px solid ${hoveredCard === i ? v.glow + "66" : "#E5E7EB"}`,
                borderRadius: 18,
                padding: "26px 24px",
                boxShadow: hoveredCard === i ? `0 16px 48px ${v.glow}22, 0 0 0 2px ${v.glow}22` : "0 2px 12px rgba(0,0,0,0.04)",
                transform: hoveredCard === i ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
                transition: "all 0.35s cubic-bezier(0.34,1.2,0.64,1)",
                cursor: "pointer",
                animation: `fadeUp 0.5s ease ${i * 0.07}s both`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div>
                  <span style={{ fontSize: 32, display: "block", marginBottom: 8, transform: hoveredCard === i ? "scale(1.15)" : "scale(1)", transition: "transform 0.3s" }}>{v.flag}</span>
                  <h4 style={{ fontSize: 17, fontWeight: 700, color: "#0D1321" }}>{v.country}</h4>
                </div>
                <span style={{ background: v.labelBg, color: v.labelColor, fontSize: 11.5, fontWeight: 700, padding: "5px 12px", borderRadius: 12, whiteSpace: "nowrap" }}>{v.label}</span>
              </div>
              <p style={{ fontSize: 13.5, color: "#6B7280", lineHeight: 1.65, marginBottom: 18 }}>{v.desc}</p>
              <div style={{ borderTop: "1px solid #F3F4F6", paddingTop: 16, display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                {[["Duration", v.duration], ["Processing", v.processing], ["Approx. Fee", v.fee]].map(([k, val]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12.5, color: "#9CA3AF", fontWeight: 500 }}>{k}</span>
                    <span style={{ fontSize: 12.5, color: "#0D1321", fontWeight: 600 }}>{val}</span>
                  </div>
                ))}
              </div>
              <button style={{ width: "100%", background: hoveredCard === i ? "#0ABFBC" : "#F9FAFB", color: hoveredCard === i ? "#fff" : "#374151", fontWeight: 600, fontSize: 13.5, padding: "10px", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "all 0.3s", border: `1px solid ${hoveredCard === i ? "#0ABFBC" : "#E5E7EB"}` }}>
                View Full Details <ExternalLink size={13} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section ref={processRef} style={{ padding: "80px 64px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ color: "#0ABFBC", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 14 }}>THE PROCESS</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 700, color: "#0D1321" }}>How our visa service works</h2>
        </div>
        <div style={{ display: "flex", gap: 0, position: "relative", alignItems: "flex-start" }}>
          {STEPS.map((s, i) => (
            <div key={s.num} onClick={() => setActiveStep(i)} style={{ flex: 1, textAlign: "center", padding: "0 16px", position: "relative", cursor: "pointer" }}>
              {i < STEPS.length - 1 && (
                <div style={{ position: "absolute", top: 28, left: "58%", right: "-8%", height: 3, background: "#F3F4F6", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", background: "#0ABFBC", width: i < activeStep ? "100%" : "0%", transition: "width 0.8s ease", borderRadius: 2 }} />
                </div>
              )}
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: i <= activeStep ? s.bg : "#F9FAFB", border: `2.5px solid ${i <= activeStep ? s.color : "#E5E7EB"}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", transition: "all 0.4s ease", transform: i === activeStep ? "scale(1.15)" : "scale(1)", boxShadow: i === activeStep ? `0 0 0 6px ${s.color}22, 0 8px 24px ${s.color}30` : "none" }}>
                <s.icon size={22} color={i <= activeStep ? s.color : "#D1D5DB"} />
              </div>
              <div style={{ fontSize: 11, fontWeight: 800, color: i <= activeStep ? s.color : "#D1D5DB", letterSpacing: 2, marginBottom: 8, transition: "color 0.3s" }}>{s.num}</div>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: i <= activeStep ? "#0D1321" : "#9CA3AF", marginBottom: 8, transition: "color 0.3s" }}>{s.title}</h4>
              <p style={{ fontSize: 13.5, color: "#6B7280", lineHeight: 1.7, maxWidth: 220, margin: "0 auto", opacity: i === activeStep ? 1 : 0.6, transition: "opacity 0.3s" }}>{s.desc}</p>
              {i === activeStep && (
                <div style={{ width: 32, height: 3, background: s.color, borderRadius: 2, margin: "14px auto 0", animation: "progressFill 2s linear forwards" }} />
              )}
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <div style={{ display: "inline-flex", gap: 10 }}>
            <button onClick={() => setActiveStep(s => Math.max(0, s - 1))} style={{ width: 36, height: 36, borderRadius: "50%", border: "1.5px solid #E5E7EB", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><ChevronLeft size={16} /></button>
            <button onClick={() => setActiveStep(s => Math.min(STEPS.length - 1, s + 1))} style={{ width: 36, height: 36, borderRadius: "50%", background: "#0ABFBC", color: "#fff", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><ChevronRight size={16} /></button>
          </div>
        </div>
      </section>

      {/* FAQ + FORM */}
      <section style={{ background: "#F9FAFB", padding: "80px 64px" }}>
        <div style={{ display: "flex", gap: 56, alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <p style={{ color: "#0ABFBC", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 14 }}>FAQ</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 700, color: "#0D1321", marginBottom: 32 }}>Common Visa Questions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {FAQS.map((f, i) => (
                <div key={i} style={{ background: "#fff", border: `1.5px solid ${openFaq === i ? "#0ABFBC44" : "#E5E7EB"}`, borderRadius: 14, overflow: "hidden", boxShadow: openFaq === i ? "0 4px 20px rgba(10,191,188,0.1)" : "0 1px 6px rgba(0,0,0,0.04)", transition: "all 0.3s" }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "transparent", fontWeight: 600, fontSize: 15, color: openFaq === i ? "#0ABFBC" : "#0D1321", textAlign: "left", transition: "color 0.3s" }}>
                    {f.q}
                    <span style={{ transition: "transform 0.3s", transform: openFaq === i ? "rotate(180deg)" : "rotate(0)" }}>
                      {openFaq === i ? <ChevronUp size={18} color="#0ABFBC" /> : <ChevronDown size={18} color="#9CA3AF" />}
                    </span>
                  </button>
                  <div style={{ maxHeight: openFaq === i ? 200 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
                    <div style={{ padding: "0 20px 18px", fontSize: 14, lineHeight: 1.75, color: "#6B7280" }}>{f.a}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 32, background: "linear-gradient(135deg, #0ABFBC, #0891b2)", borderRadius: 18, padding: "28px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, animation: "fadeUp 0.6s ease both" }}>
              <div>
                <h4 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Still have questions?</h4>
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 14 }}>Chat with our visa experts. We reply within 2 hours.</p>
              </div>
              <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
                <button style={{ background: "#fff", color: "#0ABFBC", fontWeight: 700, fontSize: 13.5, padding: "12px 20px", borderRadius: 20, display: "flex", alignItems: "center", gap: 8 }}>Contact Us <ArrowRight size={13} /></button>
                <button style={{ background: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 700, fontSize: 13.5, padding: "12px 20px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", gap: 8 }}>Start Planning <Zap size={13} /></button>
              </div>
            </div>
          </div>

          <div style={{ width: 380, flexShrink: 0, background: "#fff", borderRadius: 20, padding: "32px 30px", border: "1px solid #E5E7EB", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <FileText size={22} color="#0ABFBC" />
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#0D1321" }}>Quick Visa Enquiry</h3>
            </div>
            <div style={{ width: 44, height: 3, background: "#0ABFBC", marginBottom: 24 }} />
            <form onSubmit={e => { e.preventDefault(); alert("Thanks! Our visa team will reach out within 24 hours."); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[{ f: "name", icon: User, placeholder: "Your Name", type: "text" }, { f: "email", icon: Mail, placeholder: "Your Email", type: "email" }, { f: "destination", icon: MapPin, placeholder: "Destination Country", type: "text" }, { f: "date", icon: Calendar, placeholder: "Travel Date", type: "date" }].map(({ f, icon: Icon, placeholder, type }) => (
                <div key={f} style={{ position: "relative" }}>
                  <Icon size={15} color="#9CA3AF" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                  <input type={type} placeholder={placeholder} value={form[f]} onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))} style={{ width: "100%", padding: "13px 14px 13px 40px", borderRadius: 10, border: "1.5px solid #E5E7EB", fontSize: 14, color: "#0D1321", background: "#F9FAFB", transition: "border-color 0.2s" }} onFocus={e => e.target.style.borderColor = "#0ABFBC"} onBlur={e => e.target.style.borderColor = "#E5E7EB"} />
                </div>
              ))}
              <button type="submit" style={{ background: "#0ABFBC", color: "#fff", fontWeight: 700, fontSize: 15, padding: "15px", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 6, boxShadow: "0 4px 16px rgba(10,191,188,0.3)", transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform = ""}>
                Request Visa Help <ArrowRight size={16} />
              </button>
            </form>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 18, padding: "12px 16px", background: "#F0FAFA", borderRadius: 10 }}>
              <Phone size={15} color="#0ABFBC" />
              <span style={{ fontSize: 13, color: "#374151" }}>Or call: <strong>+91 98765 43210</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section style={{ padding: "0 64px 72px" }}>
        <div style={{ background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 16, padding: "20px 24px", display: "flex", gap: 14, alignItems: "flex-start" }}>
          <AlertCircle size={20} color="#F59E0B" style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: 13.5, color: "#78350F", lineHeight: 1.65 }}>
            <strong>Disclaimer:</strong> Visa requirements, fees, and processing times change frequently. Always verify with the official embassy or consulate before travelling. K2 Journeys is not responsible for visa rejections due to incomplete documentation provided by the applicant.
          </p>
        </div>
      </section>

      <Footer />

      {/* VISA DETAIL MODAL */}
      {selectedVisa && (
        <div onClick={() => setSelectedVisa(null)} style={{ position: "fixed", inset: 0, background: "rgba(13,19,33,0.7)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)", animation: "popIn 0.3s ease" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 24, padding: "40px", width: "min(680px, 95vw)", maxHeight: "85vh", overflowY: "auto", position: "relative", animation: "popIn 0.3s ease" }}>
            <button onClick={() => setSelectedVisa(null)} style={{ position: "absolute", top: 20, right: 20, width: 36, height: 36, borderRadius: "50%", background: "#F3F4F6", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><X size={16} /></button>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <span style={{ fontSize: 44 }}>{selectedVisa.flag}</span>
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: "#0D1321", marginBottom: 4 }}>{selectedVisa.country} Visa Guide</h2>
                <span style={{ background: selectedVisa.labelBg, color: selectedVisa.labelColor, fontSize: 12.5, fontWeight: 700, padding: "4px 14px", borderRadius: 12 }}>{selectedVisa.label}</span>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 28 }}>
              {[["Duration", selectedVisa.duration], ["Processing", selectedVisa.processing], ["Fee", selectedVisa.fee]].map(([k, v]) => (
                <div key={k} style={{ background: "#F9FAFB", borderRadius: 12, padding: "14px 16px", textAlign: "center" }}>
                  <div style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 600, marginBottom: 4 }}>{k}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#0D1321" }}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: "#0D1321", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}><CheckCircle size={16} color="#0ABFBC" /> Required Documents</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {selectedVisa.docs.map((d, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#E6F9F9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#0ABFBC" }}>{i + 1}</span>
                      </div>
                      <span style={{ fontSize: 13.5, color: "#374151", lineHeight: 1.5 }}>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: "#0D1321", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}><ArrowRight size={16} color="#0ABFBC" /> Application Process</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {selectedVisa.process.map((p, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#0ABFBC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>{i + 1}</span>
                      </div>
                      <span style={{ fontSize: 13.5, color: "#374151" }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={() => setSelectedVisa(null)} style={{ width: "100%", marginTop: 28, background: "#0ABFBC", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              Get Help With This Visa <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
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
            {[Share2, Link2].map((Icon, i) => <div key={i} style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid #374151", display: "flex", alignItems: "center", justifyContent: "center", color: "#9CA3AF" }}><Icon size={14} /></div>)}
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
            {destinations.map(d => <a key={d} href="#" style={{ display: "flex", alignItems: "center", gap: 6, color: "#9CA3AF", fontSize: 13.5 }}><ChevronRight size={13} color="#0ABFBC" />{d}</a>)}
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
        <div style={{ display: "flex", gap: 20 }}><a href="#" style={{ color: "#6B7280" }}>Privacy Policy</a><a href="#" style={{ color: "#6B7280" }}>Terms & Conditions</a></div>
      </div>
    </footer>
  );
}
