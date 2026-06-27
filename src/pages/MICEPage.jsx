import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Users, Zap, Globe, Award, ChevronRight,
  MapPin, Calendar, Phone, Mail, CheckCircle, Star,
  Briefcase, Coffee, Mic, Package, Link as LinkIcon,
  TrendingUp, Shield, Clock, HeartHandshake, ChevronDown, ChevronUp, Send
} from "lucide-react";

const NAV = ["Itinerary", "Visa", "Hotel & Air", "MICE", "Blogs", "About Us", "Contact"];
const navRoutes = { "Visa": "/visa", "MICE": "/mice", "Blogs": "/blog", "About Us": "/about", "Contact": "/contact" };

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}



// ── Data ──────────────────────────────────────────────
const MICE_PILLARS = [
  {
    letter: "M",
    icon: Briefcase,
    color: "#0ABFBC",
    bg: "#E6F9F9",
    title: "Meetings",
    subtitle: "Strategic Corporate Gatherings",
    desc: "From boardroom sessions to large offsite leadership summits, we coordinate every detail — venue, AV, catering, transfers — so your team can focus entirely on the agenda.",
    features: ["Boardroom & Conference Rooms", "Leadership Summits", "Sales Kickoffs", "Board Retreats", "AGMs & Shareholder Meets"],
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  },
  {
    letter: "I",
    icon: Star,
    color: "#FBBF24",
    bg: "#FFFBEB",
    title: "Incentives",
    subtitle: "Reward. Motivate. Inspire.",
    desc: "Reward your top performers with once-in-a-lifetime travel experiences. We design luxury incentive trips that boost morale, loyalty, and productivity long after the trip ends.",
    features: ["Luxury Destination Retreats", "Team Building Programs", "Recognition Ceremonies", "Adventure & Experiential", "Employee Reward Trips"],
    img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80",
  },
  {
    letter: "C",
    icon: Mic,
    color: "#A78BFA",
    bg: "#F5F3FF",
    title: "Conferences",
    subtitle: "Knowledge. Networking. Growth.",
    desc: "Multi-day conferences demand flawless logistics. We handle venue sourcing, speaker coordination, registration, breakout sessions, and social programs for 50 to 5,000 delegates.",
    features: ["Keynote & Speaker Logistics", "Convention Centre Booking", "Delegate Registration", "Panel & Workshop Setup", "Hybrid / Virtual Options"],
    img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80",
  },
  {
    letter: "E",
    icon: Package,
    color: "#F87171",
    bg: "#FEF2F2",
    title: "Exhibitions",
    subtitle: "Showcase. Connect. Expand.",
    desc: "Trade shows and product launches require impact. We provide end-to-end exhibition management — from booth design to networking events — helping your brand stand out.",
    features: ["Trade Show Management", "Product Launch Events", "Booth & Stall Design", "Gala Dinners", "Brand Activation"],
    img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80",
  },
];


const DESTINATIONS = [
  { name: "Goa", tag: "Beach & Leisure", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&q=80", capacity: "Up to 2,000 delegates", highlight: "Beach resorts, water sports, sunset galas" },
  { name: "Ladakh", tag: "Adventure", img: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=500&q=80", capacity: "Up to 500 delegates", highlight: "High-altitude treks, monastery visits, stargazing" },
  { name: "Jaipur", tag: "Culture & Heritage", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=500&q=80", capacity: "Up to 3,000 delegates", highlight: "Palace venues, camel safaris, royal dinners" },
  { name: "Kerala", tag: "Wellness", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&q=80", capacity: "Up to 1,000 delegates", highlight: "Houseboat cruises, Ayurveda, backwater events" },
  { name: "Shimla", tag: "Mountain Retreat", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80", capacity: "Up to 800 delegates", highlight: "Colonial venues, nature walks, snow activities" },
  { name: "Dubai", tag: "International", img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=500&q=80", capacity: "Up to 10,000 delegates", highlight: "World-class convention centres, desert safaris" },
];

const WHY_US = [
  { icon: HeartHandshake, color: "#0ABFBC", bg: "#E6F9F9", title: "Single Point of Contact", desc: "One dedicated event manager handles everything from first brief to post-event report." },
  { icon: Globe, color: "#A78BFA", bg: "#F5F3FF", title: "40+ Destinations", desc: "Domestic and international venues, handpicked for corporate events and experiences." },
  { icon: Shield, color: "#FBBF24", bg: "#FFFBEB", title: "Zero Surprises", desc: "Transparent pricing, detailed SOPs, and real-time updates throughout the event." },
  { icon: Zap, color: "#F87171", bg: "#FEF2F2", title: "48-Hour Proposals", desc: "Submit an enquiry, get a full proposal with venue options and budget breakdown in 48 hours." },
  { icon: TrendingUp, color: "#34D399", bg: "#ECFDF5", title: "ROI-Focused Planning", desc: "We measure event success beyond logistics — engagement, satisfaction, and business outcomes." },
  { icon: Clock, color: "#FB923C", bg: "#FFF7ED", title: "24/7 On-Ground Support", desc: "Our team is present throughout the event, from setup to teardown and everything in between." },
];

const PROCESS = [
  { num: "01", icon: Mail, color: "#0ABFBC", bg: "#E6F9F9", title: "Submit Your Brief", desc: "Share your event type, dates, group size, destination preference, and budget range." },
  { num: "02", icon: Briefcase, color: "#FBBF24", bg: "#FFFBEB", title: "Receive Proposal", desc: "Within 48 hours, get a detailed proposal with venue options, pricing, and itinerary." },
  { num: "03", icon: CheckCircle, color: "#A78BFA", bg: "#F5F3FF", title: "Plan Together", desc: "Work with your dedicated event manager to refine every detail to perfection." },
  { num: "04", icon: Star, color: "#F87171", bg: "#FEF2F2", title: "Flawless Execution", desc: "We handle everything on the ground. You show up, connect, and leave the rest to us." },
];

const TESTIMONIALS = [
  { name: "Riya Sharma", role: "HR Head, FinTech Corp", quote: "K2 organised our annual incentive trip to Goa for 300 employees. Flawless execution, zero stress, and our team still talks about it.", rating: 5, img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&q=80" },
  { name: "Arjun Mehta", role: "VP Operations, TechStart India", quote: "They turned our product launch in Jaipur into a truly iconic event. The heritage venue, the branding, the gala dinner — all spot on.", rating: 5, img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&q=80" },
  { name: "Priya Nair", role: "Events Manager, Pharma Global", quote: "We've been working with K2 for our annual conference for 3 years. Their 48-hour proposals and single-contact model saves us weeks of back-and-forth.", rating: 5, img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80" },
];

const FAQS = [
  { q: "What is the minimum group size for MICE bookings?", a: "We work with groups as small as 20 and as large as 5,000+. Our packages are fully customised to your group size, budget, and objectives — there is no fixed minimum." },
  { q: "Do you handle international MICE destinations?", a: "Yes. We manage MICE events across 40+ destinations including Dubai, Singapore, Bali, Thailand, Sri Lanka, and European cities. Our team has on-ground contacts at every key destination." },
  { q: "How far in advance should we book a MICE event?", a: "For large conferences (500+ delegates), we recommend 4–6 months in advance. For incentive trips and smaller meetings, 6–8 weeks is usually sufficient. The earlier you brief us, the more venue options we can secure." },
  { q: "Can you handle both the travel and event logistics?", a: "Absolutely. We offer a fully integrated MICE package — flights, accommodation, venue, AV production, catering, team-building activities, and ground transfers. One team, one invoice, zero coordination headache." },
  { q: "Do you provide post-event reporting?", a: "Yes. We provide a full post-event report covering delegate feedback, logistics summary, budget reconciliation, and recommendations for future events." },
];

// ── Component ──────────────────────────────────────────
export default function MICEPage() {
  const [activePillar, setActivePillar] = useState(0);
  const [hoveredDest, setHoveredDest] = useState(null);
  const [hoveredWhy, setHoveredWhy] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", type: "", size: "", destination: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [visibleWhy, setVisibleWhy] = useState([]);

  
  const [whyRef, whyInView] = useInView(0.1);
  const [processRef, processInView] = useInView(0.2);

  useEffect(() => {
    if (!whyInView) return;
    WHY_US.forEach((_, i) => setTimeout(() => setVisibleWhy(v => [...v, i]), i * 100));
  }, [whyInView]);

  useEffect(() => {
    if (!processInView) return;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setActiveStep(s => (s + 1) % PROCESS.length);
      if (i > 16) clearInterval(t);
    }, 2000);
    return () => clearInterval(t);
  }, [processInView]);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(a => (a + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setForm({ name: "", company: "", email: "", phone: "", type: "", size: "", destination: "", message: "" });
    setTimeout(() => setFormSent(false), 5000);
  };

  const PillarIcon = MICE_PILLARS[activePillar].icon;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", color: "#1A1A2E", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        button { font-family: inherit; cursor: pointer; border: none; }
        input, textarea, select { font-family: inherit; }
        input::placeholder, textarea::placeholder { color: #9CA3AF; }
        input:focus, textarea:focus, select:focus { outline: 2px solid #0ABFBC; }
        textarea { resize: none; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeLeft { from { opacity:0; transform:translateX(-30px); } to { opacity:1; transform:translateX(0); } }
        @keyframes fadeRight { from { opacity:0; transform:translateX(30px); } to { opacity:1; transform:translateX(0); } }
        @keyframes popIn { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }
        @keyframes float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(10,191,188,0.4);} 50%{box-shadow:0 0 0 12px rgba(10,191,188,0);} }
        @keyframes shimmer { 0%{background-position:-400px 0;} 100%{background-position:400px 0;} }
        @keyframes progressFill { from{width:0%} to{width:100%} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>

      {/* ── NAVBAR ── */}
      <header style={{ position:"sticky", top:0, zIndex:100, background:"#fff", boxShadow:"0 2px 16px rgba(0,0,0,0.07)", padding:"0 48px", display:"flex", alignItems:"center", justifyContent:"space-between", height:68 }}>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <div style={{ background:"#0D1321", color:"#fff", fontWeight:800, fontSize:20, padding:"5px 10px", borderRadius:6 }}>K2</div>
          <span style={{ fontSize:11, fontWeight:700, letterSpacing:3, color:"#0D1321" }}>JOURNEYS</span>
        </div>
        <nav style={{ display:"flex", gap:32 }}>
          {NAV.map(l => {
            const to = navRoutes[l];
            const style = { fontSize:14, fontWeight:500, color:l==="MICE"?"#0ABFBC":"#374151", borderBottom:l==="MICE"?"2px solid #0ABFBC":"2px solid transparent", paddingBottom:4, transition:"color 0.2s" };
            return to ? <Link key={l} to={to} style={style}>{l}</Link> : <span key={l} style={style}>{l}</span>;
          })}
        </nav>
        <button style={{ background:"#0ABFBC", color:"#fff", fontWeight:700, fontSize:14, padding:"10px 22px", borderRadius:24, display:"flex", alignItems:"center", gap:8 }}>
          Get a Quote <ArrowRight size={14} />
        </button>
      </header>

      {/* ── HERO ── */}
      <section style={{ position:"relative", minHeight:560, overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80')", backgroundSize:"cover", backgroundPosition:"center" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(105deg, rgba(13,19,33,0.92) 0%, rgba(13,19,33,0.7) 50%, rgba(13,19,33,0.3) 100%)" }} />
        {/* Floating decorative ring */}
        <div style={{ position:"absolute", top:-80, right:-80, width:400, height:400, borderRadius:"50%", border:"1.5px solid rgba(10,191,188,0.15)", pointerEvents:"none", animation:"spin 30s linear infinite" }} />
        <div style={{ position:"absolute", top:40, right:40, width:260, height:260, borderRadius:"50%", border:"1px solid rgba(10,191,188,0.08)", pointerEvents:"none" }} />

        <div style={{ position:"relative", padding:"80px 64px 72px", maxWidth:720 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(10,191,188,0.15)", border:"1px solid rgba(10,191,188,0.3)", borderRadius:20, padding:"6px 16px", marginBottom:22, animation:"fadeUp 0.6s ease both" }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:"#0ABFBC", animation:"pulse 2s infinite" }} />
            <span style={{ color:"#0ABFBC", fontSize:12.5, fontWeight:700, letterSpacing:2 }}>CORPORATE EVENTS & MICE</span>
          </div>
          <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:56, fontWeight:700, lineHeight:1.12, color:"#fff", marginBottom:22, animation:"fadeUp 0.7s ease 0.1s both" }}>
            Corporate Events<br />That Leave a<br /><span style={{ color:"#0ABFBC", fontStyle:"italic" }}>Lasting Impact.</span>
          </h1>
          <p style={{ fontSize:17, lineHeight:1.75, color:"rgba(255,255,255,0.8)", maxWidth:520, marginBottom:36, animation:"fadeUp 0.7s ease 0.2s both" }}>
            From boardroom meetings to grand incentive retreats — K2 Journeys delivers end-to-end MICE solutions for India's leading corporates. One team, zero hassle, unforgettable results.
          </p>
          <div style={{ display:"flex", gap:14, animation:"fadeUp 0.7s ease 0.3s both" }}>
            <button style={{ background:"#0ABFBC", color:"#fff", fontWeight:700, fontSize:15, padding:"14px 30px", borderRadius:28, display:"flex", alignItems:"center", gap:10, boxShadow:"0 6px 24px rgba(10,191,188,0.4)", transition:"transform 0.2s" }} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform=""}>
              Request a Proposal <ArrowRight size={16} />
            </button>
            <button style={{ background:"rgba(255,255,255,0.1)", color:"#fff", fontWeight:600, fontSize:15, padding:"14px 28px", borderRadius:28, border:"1px solid rgba(255,255,255,0.25)", display:"flex", alignItems:"center", gap:10, transition:"background 0.2s" }} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.18)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.1)"}>
              Explore Destinations <Globe size={15} />
            </button>
          </div>

          {/* Pill tags */}
          <div style={{ display:"flex", gap:10, marginTop:36, flexWrap:"wrap", animation:"fadeUp 0.7s ease 0.4s both" }}>
            {["Meetings", "Incentives", "Conferences", "Exhibitions", "Team Building", "Gala Dinners"].map(tag => (
              <span key={tag} style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", color:"rgba(255,255,255,0.85)", fontSize:12.5, fontWeight:600, padding:"6px 14px", borderRadius:14 }}>{tag}</span>
            ))}
          </div>
        </div>
      </section>


      {/* ── WHAT IS MICE (4 Pillars Interactive Tabs) ── */}
      <section style={{ padding:"80px 64px" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <p style={{ color:"#0ABFBC", fontSize:12.5, fontWeight:700, letterSpacing:3, marginBottom:14 }}>WHAT WE OFFER</p>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:40, fontWeight:700, color:"#0D1321", marginBottom:14 }}>
            The Four Pillars of MICE
          </h2>
          <p style={{ fontSize:15, color:"#6B7280", maxWidth:520, margin:"0 auto" }}>
            MICE stands for Meetings, Incentives, Conferences & Exhibitions. We excel at all four.
          </p>
        </div>

        {/* Tab buttons */}
        <div style={{ display:"flex", gap:12, justifyContent:"center", marginBottom:40 }}>
          {MICE_PILLARS.map((p, i) => (
            <button
              key={p.letter}
              onClick={() => setActivePillar(i)}
              style={{
                display:"flex", alignItems:"center", gap:10,
                padding:"12px 24px", borderRadius:28,
                background: activePillar===i ? p.color : "#F9FAFB",
                color: activePillar===i ? "#fff" : "#374151",
                fontWeight:700, fontSize:14,
                border: `2px solid ${activePillar===i ? p.color : "#E5E7EB"}`,
                transition:"all 0.3s cubic-bezier(0.34,1.2,0.64,1)",
                transform: activePillar===i ? "scale(1.06)" : "scale(1)",
                boxShadow: activePillar===i ? `0 6px 20px ${p.color}40` : "none",
              }}
            >
              <span style={{ width:28, height:28, borderRadius:"50%", background: activePillar===i ? "rgba(255,255,255,0.25)" : p.bg, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:15, color: activePillar===i ? "#fff" : p.color }}>
                {p.letter}
              </span>
              {p.title}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div key={activePillar} style={{ display:"flex", gap:56, alignItems:"center", animation:"popIn 0.4s ease both" }}>
          <div style={{ flex:1 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:MICE_PILLARS[activePillar].bg, borderRadius:12, padding:"6px 14px", marginBottom:18 }}>
              <PillarIcon size={16} color={MICE_PILLARS[activePillar].color} />
              <span style={{ color:MICE_PILLARS[activePillar].color, fontSize:12.5, fontWeight:700 }}>{MICE_PILLARS[activePillar].subtitle}</span>
            </div>
            <h3 style={{ fontFamily:"'Playfair Display', serif", fontSize:34, fontWeight:700, color:"#0D1321", marginBottom:18, lineHeight:1.3 }}>
              {MICE_PILLARS[activePillar].title}
            </h3>
            <div style={{ width:48, height:3, background:MICE_PILLARS[activePillar].color, marginBottom:22, borderRadius:2 }} />
            <p style={{ fontSize:15.5, lineHeight:1.8, color:"#4B5563", marginBottom:28 }}>{MICE_PILLARS[activePillar].desc}</p>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:32 }}>
              {MICE_PILLARS[activePillar].features.map(f => (
                <div key={f} style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <CheckCircle size={16} color={MICE_PILLARS[activePillar].color} />
                  <span style={{ fontSize:14.5, color:"#374151", fontWeight:500 }}>{f}</span>
                </div>
              ))}
            </div>
            <button style={{ background:MICE_PILLARS[activePillar].color, color:"#fff", fontWeight:700, fontSize:14, padding:"13px 26px", borderRadius:24, display:"inline-flex", alignItems:"center", gap:8, boxShadow:`0 4px 18px ${MICE_PILLARS[activePillar].color}40`, transition:"transform 0.2s" }} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform=""}>
              Plan a {MICE_PILLARS[activePillar].title} <ArrowRight size={14} />
            </button>
          </div>
          <div style={{ flex:1, borderRadius:22, overflow:"hidden", height:400, position:"relative", boxShadow:"0 20px 60px rgba(0,0,0,0.14)" }}>
            <img src={MICE_PILLARS[activePillar].img} alt={MICE_PILLARS[activePillar].title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
            <div style={{ position:"absolute", bottom:0, left:0, right:0, background:`linear-gradient(transparent, ${MICE_PILLARS[activePillar].color}DD)`, padding:"32px 24px 24px" }}>
              <div style={{ display:"flex", gap:8 }}>
                {MICE_PILLARS.map((_, i) => (
                  <div key={i} onClick={() => setActivePillar(i)} style={{ height:4, flex:1, borderRadius:2, background: i===activePillar ? "#fff" : "rgba(255,255,255,0.35)", cursor:"pointer", transition:"background 0.3s" }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS ── */}
      <section style={{ background:"#F9FAFB", padding:"80px 64px" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <p style={{ color:"#0ABFBC", fontSize:12.5, fontWeight:700, letterSpacing:3, marginBottom:14 }}>HANDPICKED FOR CORPORATES</p>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:40, fontWeight:700, color:"#0D1321", marginBottom:14 }}>Top MICE Destinations</h2>
          <p style={{ fontSize:15, color:"#6B7280", maxWidth:520, margin:"0 auto" }}>
            From beach resorts in Goa to heritage palaces in Jaipur — we've got the perfect backdrop for your event.
          </p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:22 }}>
          {DESTINATIONS.map((d, i) => (
            <div
              key={d.name}
              onMouseEnter={() => setHoveredDest(i)}
              onMouseLeave={() => setHoveredDest(null)}
              style={{ position:"relative", height:260, borderRadius:20, overflow:"hidden", cursor:"pointer", boxShadow: hoveredDest===i ? "0 20px 50px rgba(0,0,0,0.2)" : "0 4px 18px rgba(0,0,0,0.08)", transform: hoveredDest===i ? "translateY(-8px)" : "translateY(0)", transition:"all 0.35s cubic-bezier(0.34,1.2,0.64,1)", animation:`fadeUp 0.5s ease ${i*0.08}s both` }}
            >
              <img src={d.img} alt={d.name} style={{ width:"100%", height:"100%", objectFit:"cover", transform: hoveredDest===i ? "scale(1.08)" : "scale(1)", transition:"transform 0.5s ease" }} />
              <div style={{ position:"absolute", inset:0, background: hoveredDest===i ? "linear-gradient(transparent 20%, rgba(13,19,33,0.9) 100%)" : "linear-gradient(transparent 40%, rgba(13,19,33,0.75) 100%)", transition:"background 0.4s" }} />
              {/* Tag */}
              <div style={{ position:"absolute", top:16, left:16, background:"rgba(255,255,255,0.15)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,0.25)", borderRadius:14, padding:"4px 12px" }}>
                <span style={{ color:"#fff", fontSize:11.5, fontWeight:700 }}>{d.tag}</span>
              </div>
              {/* Default info */}
              <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"20px" }}>
                <h4 style={{ color:"#fff", fontSize:20, fontWeight:700, marginBottom: hoveredDest===i ? 10 : 0 }}>{d.name}</h4>
                <div style={{ maxHeight: hoveredDest===i ? 80 : 0, overflow:"hidden", transition:"max-height 0.35s ease" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}>
                    <Users size={13} color="#0ABFBC" />
                    <span style={{ color:"rgba(255,255,255,0.85)", fontSize:13 }}>{d.capacity}</span>
                  </div>
                  <p style={{ color:"rgba(255,255,255,0.7)", fontSize:12.5, lineHeight:1.5 }}>{d.highlight}</p>
                </div>
                {hoveredDest===i && (
                  <button style={{ marginTop:12, background:"#0ABFBC", color:"#fff", fontWeight:700, fontSize:12.5, padding:"8px 16px", borderRadius:16, display:"flex", alignItems:"center", gap:6 }}>
                    Explore <ArrowRight size={12} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY US ── */}
      <section ref={whyRef} style={{ padding:"80px 64px" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <p style={{ color:"#0ABFBC", fontSize:12.5, fontWeight:700, letterSpacing:3, marginBottom:14 }}>WHY K2 JOURNEYS</p>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:40, fontWeight:700, color:"#0D1321" }}>What sets us apart</h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:22 }}>
          {WHY_US.map((w, i) => (
            <div
              key={w.title}
              onMouseEnter={() => setHoveredWhy(i)}
              onMouseLeave={() => setHoveredWhy(null)}
              style={{
                background: hoveredWhy===i ? w.bg : "#fff",
                border:`1.5px solid ${hoveredWhy===i ? w.color+"44" : "#F3F4F6"}`,
                borderRadius:18, padding:"28px 24px",
                boxShadow: hoveredWhy===i ? `0 12px 40px ${w.color}22` : "0 2px 12px rgba(0,0,0,0.04)",
                transform: visibleWhy.includes(i) ? (hoveredWhy===i ? "translateY(-6px) scale(1.02)" : "translateY(0)") : "translateY(32px)",
                opacity: visibleWhy.includes(i) ? 1 : 0,
                transition:"all 0.4s cubic-bezier(0.34,1.2,0.64,1)",
                cursor:"default",
              }}
            >
              <div style={{ background:w.bg, borderRadius:"50%", width:52, height:52, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:18, transform: hoveredWhy===i ? "rotate(-8deg) scale(1.1)" : "none", transition:"transform 0.3s" }}>
                <w.icon size={24} color={w.color} />
              </div>
              <h4 style={{ fontSize:16, fontWeight:700, color:"#0D1321", marginBottom:10 }}>{w.title}</h4>
              <p style={{ fontSize:13.5, lineHeight:1.7, color:"#6B7280" }}>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section ref={processRef} style={{ background:"#0D1321", padding:"80px 64px" }}>
        <div style={{ textAlign:"center", marginBottom:56 }}>
          <p style={{ color:"#0ABFBC", fontSize:12.5, fontWeight:700, letterSpacing:3, marginBottom:14 }}>HOW IT WORKS</p>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:40, fontWeight:700, color:"#fff" }}>From brief to brilliant event</h2>
        </div>
        <div style={{ display:"flex", position:"relative", alignItems:"flex-start" }}>
          {/* Connector lines */}
          {PROCESS.slice(0, -1).map((_, i) => (
            <div key={`line-${i}`} style={{ position:"absolute", top:27, left:`calc(${(i+1)/PROCESS.length*100}% - ${100/PROCESS.length/2}% + 28px)`, width:`calc(${100/PROCESS.length}% - 56px)`, height:3, background:"#1F2937", borderRadius:2, overflow:"hidden", zIndex:0 }}>
              <div style={{ height:"100%", background:`linear-gradient(90deg, ${PROCESS[i].color}, ${PROCESS[i+1].color})`, width: i < activeStep ? "100%" : "0%", transition:"width 0.8s ease", borderRadius:2 }} />
            </div>
          ))}
          {PROCESS.map((s, i) => (
            <div key={s.num} onClick={() => setActiveStep(i)} style={{ flex:1, textAlign:"center", padding:"0 16px", position:"relative", zIndex:1, cursor:"pointer" }}>
              <div style={{ width:56, height:56, borderRadius:"50%", background: i<=activeStep ? s.bg : "#1F2937", border:`2.5px solid ${i<=activeStep ? s.color : "#374151"}`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", transition:"all 0.4s ease", transform: i===activeStep ? "scale(1.15)" : "scale(1)", boxShadow: i===activeStep ? `0 0 0 6px ${s.color}22, 0 8px 24px ${s.color}40` : "none" }}>
                <s.icon size={22} color={i<=activeStep ? s.color : "#4B5563"} />
              </div>
              <div style={{ fontSize:11, fontWeight:800, color: i<=activeStep ? s.color : "#4B5563", letterSpacing:2, marginBottom:8 }}>{s.num}</div>
              <h4 style={{ fontSize:16, fontWeight:700, color: i<=activeStep ? "#fff" : "#6B7280", marginBottom:8, transition:"color 0.3s" }}>{s.title}</h4>
              <p style={{ fontSize:13.5, color:"#6B7280", lineHeight:1.7, maxWidth:200, margin:"0 auto", opacity: i===activeStep ? 1 : 0.55, transition:"opacity 0.3s" }}>{s.desc}</p>
              {i===activeStep && <div style={{ width:28, height:3, background:s.color, borderRadius:2, margin:"14px auto 0", animation:"progressFill 2s linear forwards" }} />}
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding:"80px 64px", background:"#F0FAFA" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <p style={{ color:"#0ABFBC", fontSize:12.5, fontWeight:700, letterSpacing:3, marginBottom:14 }}>CLIENT STORIES</p>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:40, fontWeight:700, color:"#0D1321" }}>What our clients say</h2>
        </div>
        <div style={{ maxWidth:720, margin:"0 auto", position:"relative" }}>
          <div key={activeTestimonial} style={{ background:"#fff", borderRadius:24, padding:"40px 44px", boxShadow:"0 8px 40px rgba(0,0,0,0.08)", animation:"popIn 0.4s ease both", border:"1px solid #E5E7EB" }}>
            <div style={{ display:"flex", gap:4, marginBottom:22 }}>
              {Array(5).fill(0).map((_,i) => <Star key={i} size={18} color="#FBBF24" fill="#FBBF24" />)}
            </div>
            <p style={{ fontFamily:"'Playfair Display', serif", fontSize:21, lineHeight:1.65, color:"#0D1321", fontStyle:"italic", marginBottom:28 }}>
              "{TESTIMONIALS[activeTestimonial].quote}"
            </p>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <img src={TESTIMONIALS[activeTestimonial].img} alt="" style={{ width:52, height:52, borderRadius:"50%", objectFit:"cover", border:"2px solid #0ABFBC" }} />
              <div>
                <p style={{ fontWeight:700, fontSize:15, color:"#0D1321" }}>{TESTIMONIALS[activeTestimonial].name}</p>
                <p style={{ fontSize:13, color:"#6B7280" }}>{TESTIMONIALS[activeTestimonial].role}</p>
              </div>
            </div>
          </div>
          <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:24 }}>
            {TESTIMONIALS.map((_,i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} style={{ width: i===activeTestimonial ? 28 : 10, height:10, borderRadius:5, background: i===activeTestimonial ? "#0ABFBC" : "#D1D5DB", border:"none", transition:"all 0.3s", cursor:"pointer" }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding:"80px 64px" }}>
        <div style={{ display:"flex", gap:64, alignItems:"flex-start" }}>
          <div style={{ width:340, flexShrink:0 }}>
            <p style={{ color:"#0ABFBC", fontSize:12.5, fontWeight:700, letterSpacing:3, marginBottom:14 }}>FAQ</p>
            <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:34, fontWeight:700, color:"#0D1321", lineHeight:1.3, marginBottom:18 }}>Common MICE Questions</h2>
            <div style={{ width:44, height:3, background:"#0ABFBC", marginBottom:22 }} />
            <p style={{ fontSize:14.5, color:"#6B7280", lineHeight:1.75, marginBottom:28 }}>
              Can't find your answer here? Our corporate events team replies within 2 hours.
            </p>
            <button style={{ background:"#0ABFBC", color:"#fff", fontWeight:700, fontSize:14, padding:"13px 24px", borderRadius:22, display:"flex", alignItems:"center", gap:8 }}>
              Ask Us Directly <ArrowRight size={14} />
            </button>
          </div>
          <div style={{ flex:1, display:"flex", flexDirection:"column", gap:12 }}>
            {FAQS.map((f, i) => (
              <div key={i} style={{ background:"#fff", border:`1.5px solid ${openFaq===i ? "#0ABFBC44" : "#E5E7EB"}`, borderRadius:14, overflow:"hidden", boxShadow: openFaq===i ? "0 4px 20px rgba(10,191,188,0.1)" : "0 1px 6px rgba(0,0,0,0.04)", transition:"all 0.3s" }}>
                <button onClick={() => setOpenFaq(openFaq===i ? null : i)} style={{ width:"100%", padding:"18px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", background:"transparent", fontWeight:600, fontSize:15, color: openFaq===i ? "#0ABFBC" : "#0D1321", textAlign:"left", transition:"color 0.3s" }}>
                  {f.q}
                  <span style={{ transition:"transform 0.3s", transform: openFaq===i ? "rotate(180deg)" : "rotate(0)", flexShrink:0, marginLeft:12 }}>
                    <ChevronDown size={18} color={openFaq===i ? "#0ABFBC" : "#9CA3AF"} />
                  </span>
                </button>
                <div style={{ maxHeight: openFaq===i ? 200 : 0, overflow:"hidden", transition:"max-height 0.4s ease" }}>
                  <div style={{ padding:"0 20px 18px", fontSize:14, lineHeight:1.8, color:"#6B7280" }}>{f.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENQUIRY FORM ── */}
      <section style={{ background:"linear-gradient(135deg, #0D1321 0%, #132240 100%)", padding:"80px 64px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-80, right:-80, width:360, height:360, borderRadius:"50%", background:"rgba(10,191,188,0.07)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-60, left:60, width:240, height:240, borderRadius:"50%", background:"rgba(10,191,188,0.04)", pointerEvents:"none" }} />
        <div style={{ position:"relative", display:"flex", gap:64, alignItems:"flex-start" }}>
          <div style={{ width:360, flexShrink:0 }}>
            <p style={{ color:"#0ABFBC", fontSize:12.5, fontWeight:700, letterSpacing:3, marginBottom:14 }}>GET A PROPOSAL</p>
            <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:36, fontWeight:700, color:"#fff", lineHeight:1.3, marginBottom:18 }}>
              Let's plan your next corporate event
            </h2>
            <div style={{ width:44, height:3, background:"#0ABFBC", marginBottom:22 }} />
            <p style={{ color:"#9CA3AF", fontSize:14.5, lineHeight:1.75, marginBottom:32 }}>
              Share your requirements and we'll send a full proposal with venue options, itinerary, and pricing within 48 hours.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {[{ icon:Phone, text:"+91 98765 43210" }, { icon:Mail, text:"mice@k2journeys.com" }, { icon:MapPin, text:"Manali, Himachal Pradesh, India" }].map(({ icon:Icon, text }) => (
                <div key={text} style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:36, height:36, borderRadius:"50%", background:"rgba(10,191,188,0.15)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Icon size={16} color="#0ABFBC" />
                  </div>
                  <span style={{ color:"#D1D5DB", fontSize:14 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex:1, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:22, padding:"36px 36px", backdropFilter:"blur(10px)" }}>
            {formSent && (
              <div style={{ background:"rgba(10,191,188,0.15)", border:"1px solid #0ABFBC", borderRadius:12, padding:"16px 20px", marginBottom:22, display:"flex", alignItems:"center", gap:12, animation:"fadeUp 0.4s ease" }}>
                <CheckCircle size={20} color="#0ABFBC" />
                <div>
                  <p style={{ color:"#fff", fontWeight:700, fontSize:15 }}>Enquiry received!</p>
                  <p style={{ color:"#9CA3AF", fontSize:13, marginTop:2 }}>We'll send your proposal within 48 hours.</p>
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
                {[{ f:"name", placeholder:"Your Name", icon:Users }, { f:"company", placeholder:"Company Name", icon:Briefcase }].map(({ f, placeholder, icon:Icon }) => (
                  <div key={f} style={{ position:"relative" }}>
                    <Icon size={15} color="#6B7280" style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }} />
                    <input type="text" placeholder={placeholder} value={form[f]} onChange={e => setForm(p => ({...p, [f]:e.target.value}))} style={{ width:"100%", padding:"13px 14px 13px 40px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.12)", fontSize:14, color:"#fff", background:"rgba(255,255,255,0.06)", transition:"border-color 0.2s" }} onFocus={e=>e.target.style.borderColor="#0ABFBC"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.12)"} />
                  </div>
                ))}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
                {[{ f:"email", placeholder:"Email Address", icon:Mail, type:"email" }, { f:"phone", placeholder:"Phone Number", icon:Phone, type:"tel" }].map(({ f, placeholder, icon:Icon, type }) => (
                  <div key={f} style={{ position:"relative" }}>
                    <Icon size={15} color="#6B7280" style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }} />
                    <input type={type} placeholder={placeholder} value={form[f]} onChange={e => setForm(p => ({...p, [f]:e.target.value}))} style={{ width:"100%", padding:"13px 14px 13px 40px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.12)", fontSize:14, color:"#fff", background:"rgba(255,255,255,0.06)", transition:"border-color 0.2s" }} onFocus={e=>e.target.style.borderColor="#0ABFBC"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.12)"} />
                  </div>
                ))}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
                <div style={{ position:"relative" }}>
                  <Package size={15} color="#6B7280" style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", zIndex:1 }} />
                  <select value={form.type} onChange={e=>setForm(p=>({...p,type:e.target.value}))} style={{ width:"100%", padding:"13px 14px 13px 40px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.12)", fontSize:14, color: form.type?"#fff":"#6B7280", background:"rgba(255,255,255,0.06)", appearance:"none", transition:"border-color 0.2s" }} onFocus={e=>e.target.style.borderColor="#0ABFBC"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.12)"}>
                    <option value="" style={{background:"#1a2744",color:"#fff"}}>Event Type</option>
                    {["Meeting","Incentive Trip","Conference","Exhibition","Team Building","Gala Dinner"].map(o=><option key={o} value={o} style={{background:"#1a2744",color:"#fff"}}>{o}</option>)}
                  </select>
                </div>
                <div style={{ position:"relative" }}>
                  <Users size={15} color="#6B7280" style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", zIndex:1 }} />
                  <select value={form.size} onChange={e=>setForm(p=>({...p,size:e.target.value}))} style={{ width:"100%", padding:"13px 14px 13px 40px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.12)", fontSize:14, color: form.size?"#fff":"#6B7280", background:"rgba(255,255,255,0.06)", appearance:"none", transition:"border-color 0.2s" }} onFocus={e=>e.target.style.borderColor="#0ABFBC"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.12)"}>
                    <option value="" style={{background:"#1a2744"}}>Group Size</option>
                    {["20–50","50–100","100–300","300–500","500–1000","1000+"].map(o=><option key={o} value={o} style={{background:"#1a2744"}}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ position:"relative", marginBottom:14 }}>
                <MapPin size={15} color="#6B7280" style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }} />
                <input type="text" placeholder="Preferred Destination (optional)" value={form.destination} onChange={e=>setForm(p=>({...p,destination:e.target.value}))} style={{ width:"100%", padding:"13px 14px 13px 40px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.12)", fontSize:14, color:"#fff", background:"rgba(255,255,255,0.06)", transition:"border-color 0.2s" }} onFocus={e=>e.target.style.borderColor="#0ABFBC"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.12)"} />
              </div>
              <div style={{ position:"relative", marginBottom:20 }}>
                <Coffee size={15} color="#6B7280" style={{ position:"absolute", left:14, top:15, pointerEvents:"none" }} />
                <textarea rows={3} placeholder="Tell us more about your event goals, dates, special requirements..." value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))} style={{ width:"100%", padding:"13px 14px 13px 40px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.12)", fontSize:14, color:"#fff", background:"rgba(255,255,255,0.06)", resize:"none", transition:"border-color 0.2s" }} onFocus={e=>e.target.style.borderColor="#0ABFBC"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.12)"} />
              </div>
              <button type="submit" style={{ width:"100%", background:"#0ABFBC", color:"#fff", fontWeight:700, fontSize:15, padding:"16px", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", gap:10, boxShadow:"0 6px 24px rgba(10,191,188,0.4)", transition:"transform 0.2s" }} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform=""}>
                <Send size={16} /> Send Event Brief
              </button>
              <p style={{ textAlign:"center", color:"#6B7280", fontSize:12.5, marginTop:14 }}>We'll respond with a full proposal within 48 hours.</p>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Footer() {
  const quickLinks = ["Itinerary", "Visa", "Hotel & Air", "MICE", "Blogs", "About Us", "Contact"];
  const destinations = ["Ladakh", "Manali", "Spiti Valley", "Uttarakhand", "Kashmir", "Kerala"];
  return (
    <footer style={{ background:"#0D1321", padding:"56px 64px 24px" }}>
      <div style={{ display:"flex", gap:48, marginBottom:40 }}>
        <div style={{ width:260, flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:16 }}>
            <div style={{ background:"#0ABFBC", color:"#fff", fontWeight:800, fontSize:18, padding:"4px 9px", borderRadius:5 }}>K2</div>
            <span style={{ fontSize:10, fontWeight:700, letterSpacing:3, color:"#fff" }}>JOURNEYS</span>
          </div>
          <p style={{ color:"#9CA3AF", fontSize:13.5, lineHeight:1.7, marginBottom:20 }}>We curate authentic, responsible, and unforgettable travel experiences across the world.</p>
          <div style={{ display:"flex", gap:10 }}>
            {[Globe, LinkIcon].map((Icon, i) => <div key={i} style={{ width:34, height:34, borderRadius:"50%", border:"1px solid #374151", display:"flex", alignItems:"center", justifyContent:"center", color:"#9CA3AF" }}><Icon size={14} /></div>)}
          </div>
        </div>
        <div style={{ width:180 }}>
          <h5 style={{ color:"#fff", fontSize:15, fontWeight:700, marginBottom:18 }}>Quick Links</h5>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {quickLinks.map(l => {
              const to = navRoutes[l];
              const inner = <><ChevronRight size={13} color="#0ABFBC" />{l}</>;
              return to
                ? <Link key={l} to={to} style={{ display:"flex", alignItems:"center", gap:6, color:"#9CA3AF", fontSize:13.5 }}>{inner}</Link>
                : <span key={l} style={{ display:"flex", alignItems:"center", gap:6, color:"#9CA3AF", fontSize:13.5 }}>{inner}</span>;
            })}
          </div>
        </div>
        <div style={{ width:200 }}>
          <h5 style={{ color:"#fff", fontSize:15, fontWeight:700, marginBottom:18 }}>Popular Destinations</h5>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {destinations.map(d => <a key={d} href="#" style={{ display:"flex", alignItems:"center", gap:6, color:"#9CA3AF", fontSize:13.5 }}><ChevronRight size={13} color="#0ABFBC" />{d}</a>)}
          </div>
        </div>
        <div style={{ flex:1 }}>
          <h5 style={{ color:"#fff", fontSize:15, fontWeight:700, marginBottom:14 }}>Newsletter</h5>
          <p style={{ color:"#9CA3AF", fontSize:13.5, lineHeight:1.7, marginBottom:16 }}>Subscribe to get travel tips, updates & exclusive offers.</p>
          <div style={{ display:"flex", gap:8 }}>
            <input type="email" placeholder="Your email address" style={{ flex:1, background:"#161B27", border:"1px solid #374151", borderRadius:8, padding:"11px 14px", color:"#fff", fontSize:13 }} />
            <button style={{ background:"#0ABFBC", color:"#fff", borderRadius:8, padding:"0 16px", fontWeight:600, fontSize:13, display:"flex", alignItems:"center", gap:6 }}>Send <ArrowRight size={13} /></button>
          </div>
        </div>
      </div>
      <div style={{ borderTop:"1px solid #1F2937", paddingTop:20, display:"flex", justifyContent:"space-between", color:"#6B7280", fontSize:12.5 }}>
        <span>© 2025 K2 Journeys. All rights reserved.</span>
        <div style={{ display:"flex", gap:20 }}>
          <a href="#" style={{ color:"#6B7280" }}>Privacy Policy</a>
          <a href="#" style={{ color:"#6B7280" }}>Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
}
