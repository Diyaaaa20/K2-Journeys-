import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaUsers, FaBolt, FaGlobeAsia, FaChevronRight, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaCheckCircle, FaStar, FaBriefcase, FaLink as FaLinkIcon, FaChartLine, FaShieldAlt, FaClock, FaHandshake, FaChevronDown, FaPaperPlane, FaSearch, FaTimes } from "react-icons/fa";
import { Users, Gift, Presentation, Building2, ArrowRight, Globe } from "lucide-react";

import AnimatedFlightPath from "../components/AnimatedFlightPath";
import Particles from "../components/Particles";
import HowItWorksStack from "../components/HowItWorksStack";
import MagneticTiltCard from "../components/MagneticTiltCard";

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


const DESTINATIONS = [
  { name: "Goa", tag: "Beach & Leisure", type: "domestic", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&q=80", capacity: "Up to 2,000 delegates", highlight: "Beach resorts, water sports, sunset galas" },
  { name: "Ladakh", tag: "Adventure", type: "domestic", img: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=500&q=80", capacity: "Up to 500 delegates", highlight: "High-altitude treks, monastery visits, stargazing" },
  { name: "Jaipur", tag: "Culture & Heritage", type: "domestic", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=500&q=80", capacity: "Up to 3,000 delegates", highlight: "Palace venues, camel safaris, royal dinners" },
  { name: "Kerala", tag: "Wellness", type: "domestic", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&q=80", capacity: "Up to 1,000 delegates", highlight: "Houseboat cruises, Ayurveda, backwater events" },
  { name: "Shimla", tag: "Mountain Retreat", type: "domestic", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80", capacity: "Up to 800 delegates", highlight: "Colonial venues, nature walks, snow activities" },
  { name: "Manali", tag: "Adventure", type: "domestic", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80", capacity: "Up to 600 delegates", highlight: "Mountain retreats, adventure sports, scenic venues" },
  { name: "Udaipur", tag: "Luxury Retreat", type: "domestic", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&q=80", capacity: "Up to 1,500 delegates", highlight: "Palace hotels, lakeside venues, royal experiences" },
  { name: "Bangalore", tag: "Tech & Business", type: "domestic", img: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=500&q=80", capacity: "Up to 5,000 delegates", highlight: "Modern convention centers, tech hubs, luxury hotels" },
  { name: "Dubai", tag: "Luxury International", type: "international", img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=500&q=80", capacity: "Up to 10,000 delegates", highlight: "World-class convention centres, desert safaris, luxury venues" },
  { name: "Singapore", tag: "Business Hub", type: "international", img: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=500&q=80", capacity: "Up to 8,000 delegates", highlight: "State-of-the-art venues, business district, cosmopolitan city" },
  { name: "Bali", tag: "Tropical Paradise", type: "international", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&q=80", capacity: "Up to 3,000 delegates", highlight: "Beachfront resorts, cultural venues, tropical backdrop" },
  { name: "Bangkok", tag: "Vibrant City", type: "international", img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=500&q=80", capacity: "Up to 4,000 delegates", highlight: "Grand hotels, cultural experiences, street market glamour" },
  { name: "Maldives", tag: "Exclusive Resort", type: "international", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&q=80", capacity: "Up to 1,000 delegates", highlight: "Overwater venues, island retreats, ultimate luxury" },
  { name: "Sri Lanka", tag: "Scenic Retreat", type: "international", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&q=80", capacity: "Up to 2,500 delegates", highlight: "Tea plantations, ancient temples, coastal venues" },
];

const WHY_US = [
  { icon: FaHandshake, color: "#0ABFBC", bg: "#E6F9F9", title: "Single Point of Contact", desc: "One dedicated event manager handles everything from first brief to post-event report." },
  { icon: FaGlobeAsia, color: "#A78BFA", bg: "#F5F3FF", title: "40+ Destinations", desc: "Domestic and international venues, handpicked for corporate events and experiences." },
  { icon: FaShieldAlt, color: "#FBBF24", bg: "#FFFBEB", title: "Zero Surprises", desc: "Transparent pricing, detailed SOPs, and real-time updates throughout the event." },
  { icon: FaBolt, color: "#F87171", bg: "#FEF2F2", title: "48-Hour Proposals", desc: "Submit an enquiry, get a full proposal with venue options and budget breakdown in 48 hours." },
  { icon: FaChartLine, color: "#34D399", bg: "#ECFDF5", title: "ROI-Focused Planning", desc: "We measure event success beyond logistics — engagement, satisfaction, and business outcomes." },
  { icon: FaClock, color: "#FB923C", bg: "#FFF7ED", title: "24/7 On-Ground Support", desc: "Our team is present throughout the event, from setup to teardown and everything in between." },
];

const PROCESS = [
  { num: "01", icon: FaEnvelope, color: "#0ABFBC", bg: "#E6F9F9", title: "Submit Your Brief", desc: "Share your event type, dates, group size, destination preference, and budget range." },
  { num: "02", icon: FaBriefcase, color: "#FBBF24", bg: "#FFFBEB", title: "Receive Proposal", desc: "Within 48 hours, get a detailed proposal with venue options, pricing, and itinerary." },
  { num: "03", icon: FaCheckCircle, color: "#A78BFA", bg: "#F5F3FF", title: "Plan Together", desc: "Work with your dedicated event manager to refine every detail to perfection." },
  { num: "04", icon: FaStar, color: "#F87171", bg: "#FEF2F2", title: "Flawless Execution", desc: "We handle everything on the ground. You show up, connect, and leave the rest to us." },
];

const TESTIMONIALS = [
  { name: "Riya Sharma", role: "HR Head, FinTech Corp", quote: "K2 organised our annual incentive trip to Goa for 300 employees. Flawless execution, zero stress, and our team still talks about it.", rating: 5, img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&q=80" },
  { name: "Arjun Mehta", role: "VP Operations, TechStart India", quote: "They turned our product launch in Jaipur into a truly iconic event. The heritage venue, the branding, the gala dinner — all spot on.", rating: 5, img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&q=80" },
  { name: "Priya Nair", role: "Events Manager, Pharma Global", quote: "We've been working with K2 for our annual conference for 3 years. Their 48-hour proposals and single-contact model saves us weeks of back-and-forth.", rating: 5, img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80" },
];

const PILLARS = [
  {
    id: "01",
    title: "MEETINGS",
    Icon: Users,
    description: "Productive meetings in inspiring locations, designed for focus and results.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85",
    cardBg: "linear-gradient(175deg, #00bcd4 0%, #050e1a 100%)",
    borderColor: "rgba(100,160,220,0.4)",
    glowColor: "rgba(80,140,200,0.25)",
    iconRingColor: "rgba(100,160,220,0.3)",
    overlayColor: "rgba(79, 124, 182, 0.7)",
  },
  {
    id: "02",
    title: "INCENTIVES",
    Icon: Gift,
    description: "Reward, motivate and celebrate with unforgettable incentive experiences worldwide.",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85",
    cardBg: "linear-gradient(175deg, #49dd49 0%, #030f0d 100%)",
    borderColor: "rgba(60,180,130,0.4)",
    glowColor: "rgba(40,160,110,0.22)",
    iconRingColor: "rgba(60,180,130,0.3)",
    overlayColor: "rgba(3,15,13,0.7)",
  },
  {
    id: "03",
    title: "CONFERENCES",
    Icon: Presentation,
    description: "Seamless conference management that connects people and ideas.",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=85",
    cardBg: "linear-gradient(175deg, #e91e8c 0%, #0a0514 100%)",
    borderColor: "rgba(150,100,230,0.45)",
    glowColor: "rgba(130,80,210,0.25)",
    iconRingColor: "rgba(150,100,230,0.3)",
    overlayColor: "rgba(10,5,20,0.7)",
  },
  {
    id: "04",
    title: "EXHIBITIONS",
    Icon: Building2,
    description: "End-to-end solutions for impactful exhibitions that showcase your brand to the world.",
    img: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=85",
    cardBg: "linear-gradient(175deg, #ffc107 0%, #0d0802 100%)",
    borderColor: "rgba(200,155,50,0.4)",
    glowColor: "rgba(180,135,40,0.22)",
    iconRingColor: "rgba(200,155,50,0.3)",
    overlayColor: "rgba(13,8,2,0.7)",
  },
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
  const [search, setSearch] = useState("");
  const [hoveredDest, setHoveredDest] = useState(null);
  const [hoveredWhy, setHoveredWhy] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredPillar, setHoveredPillar] = useState(null);
  const [planePx, setPlanePx] = useState({ x: 0, y: 0, angle: -90 });
  const [pillarContainerW, setPillarContainerW] = useState(1160);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", type: "", size: "", destination: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [proposalForm, setProposalForm] = useState({ name: "", org: "", email: "", phone: "", eventType: "", groupSize: "", destination: "", eventDate: "", message: "" });
  const [proposalSent, setProposalSent] = useState(false);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const [destinationFilter, setDestinationFilter] = useState("all");
  const [destSearchQuery, setDestSearchQuery] = useState("");
  const [showAllDestinations, setShowAllDestinations] = useState(false);

  
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

  // ── Pillar animated plane ──
  const PILLAR_CARD_T = [0.08, 0.35, 0.62, 0.89];
  const targetPillarT = useRef(0.08);
  const currentPillarT = useRef(0.08);
  const pillarRafRef = useRef(null);
  const pillarPathRef = useRef(null);
  const pillarContainerRef = useRef(null);

  useEffect(() => {
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setPillarContainerW(e.contentRect.width);
    });
    if (pillarContainerRef.current) ro.observe(pillarContainerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    targetPillarT.current = hoveredPillar !== null ? PILLAR_CARD_T[hoveredPillar] : 0.08;
  }, [hoveredPillar]);

  const getPillarPoint = useCallback((t) => {
    const el = pillarPathRef.current;
    if (!el) return { x: 0, y: 0, angle: -90 };
    const len = el.getTotalLength();
    const clamped = Math.max(0.001, Math.min(0.999, t));
    const pt = el.getPointAtLength(len * clamped);
    const pt2 = el.getPointAtLength(Math.min(len * clamped + 4, len));
    const angle = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * (180 / Math.PI);
    return { x: pt.x, y: pt.y, angle };
  }, []);

  useEffect(() => {
    const animate = () => {
      currentPillarT.current += (targetPillarT.current - currentPillarT.current) * 0.055;
      setPlanePx(getPillarPoint(currentPillarT.current));
      pillarRafRef.current = requestAnimationFrame(animate);
    };
    pillarRafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(pillarRafRef.current);
  }, [getPillarPoint]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setForm({ name: "", company: "", email: "", phone: "", type: "", size: "", destination: "", message: "" });
    setTimeout(() => setFormSent(false), 5000);
  };

  const pillarW = pillarContainerW;
  const PILLAR_SVG_H = 130;
  const pillarMidY = PILLAR_SVG_H * 0.5;
  const pillarWavePath = `M 0 ${pillarMidY} C ${pillarW * 0.12} ${pillarMidY + 60}, ${pillarW * 0.3} ${pillarMidY - 60}, ${pillarW * 0.5} ${pillarMidY} S ${pillarW * 0.76} ${pillarMidY + 60}, ${pillarW} ${pillarMidY}`;

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
        @keyframes searchGlow { 0%,100%{box-shadow:0 0 0 0 rgba(10,191,188,0.25);} 50%{box-shadow:0 0 0 8px rgba(10,191,188,0);} }
        .k2-search-bar { display:flex; align-items:center; background:#fff; border-radius:50px; border:2px solid transparent; transition:border-color 0.25s, box-shadow 0.25s; overflow:hidden; }
        .k2-search-bar:focus-within { border-color:#0ABFBC; box-shadow:0 0 0 4px rgba(10,191,188,0.15); }
        .k2-search-input { flex:1; border:none; outline:none; font-size:15px; font-family:inherit; color:#0D1321; background:transparent; padding:0; }
        .k2-search-input::placeholder { color:#9CA3AF; }
        .k2-search-btn { background:#0ABFBC; color:#fff; border:none; border-radius:40px; font-weight:700; font-size:14px; font-family:inherit; cursor:pointer; transition:background 0.2s, transform 0.15s; white-space:nowrap; }
        .k2-search-btn:hover { background:#099fa1; transform:scale(1.03); }
        .k2-search-chip { background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.18); color:rgba(255,255,255,0.75); font-size:12.5px; font-weight:600; border-radius:20px; cursor:pointer; transition:background 0.18s, color 0.18s; white-space:nowrap; }
        .k2-search-chip:hover { background:#0ABFBC; border-color:#0ABFBC; color:#fff; }
        /* ── responsive ── */
        .k2-search-wrap { padding:32px 64px; }
        @media(max-width:768px) { .k2-search-wrap { padding:24px 20px; } .k2-search-bar { border-radius:16px; } .k2-search-btn { border-radius:12px; font-size:13px; } .k2-search-chips { display:none; } }
        @media(max-width:480px) { .k2-search-input { font-size:14px; } }
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
          Get a Quote <FaArrowRight size={14} />
        </button>
      </header>

      {/* ── HERO ── */}
      <section style={{ position:"relative", minHeight:400, overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80')", backgroundSize:"cover", backgroundPosition:"center" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(105deg, rgba(13,19,33,0.92) 0%, rgba(13,19,33,0.7) 50%, rgba(13,19,33,0.3) 100%)" }} />
        {/* Floating decorative ring */}
        <div style={{ position:"absolute", top:-80, right:-80, width:400, height:400, borderRadius:"50%", border:"1.5px solid rgba(10,191,188,0.15)", pointerEvents:"none", animation:"spin 30s linear infinite" }} />
        <div style={{ position:"absolute", top:40, right:40, width:260, height:260, borderRadius:"50%", border:"1px solid rgba(10,191,188,0.08)", pointerEvents:"none" }} />

        <div style={{ position:"relative", padding:"48px 64px 44px", maxWidth:720 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(10,191,188,0.15)", border:"1px solid rgba(10,191,188,0.3)", borderRadius:20, padding:"6px 16px", marginBottom:14, animation:"fadeUp 0.6s ease both" }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:"#0ABFBC", animation:"pulse 2s infinite" }} />
            <span style={{ color:"#0ABFBC", fontSize:12.5, fontWeight:700, letterSpacing:2 }}>CORPORATE EVENTS & MICE</span>
          </div>
          <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:56, fontWeight:700, lineHeight:1.12, color:"#fff", marginBottom:14, animation:"fadeUp 0.7s ease 0.1s both" }}>
            Corporate Events<br />That Leave a<br /><span style={{ color:"#0ABFBC", fontStyle:"italic" }}>Lasting Impact.</span>
          </h1>
          <p style={{ fontSize:17, lineHeight:1.75, color:"rgba(255,255,255,0.8)", maxWidth:520, marginBottom:24, animation:"fadeUp 0.7s ease 0.2s both" }}>
            From boardroom meetings to grand incentive retreats — K2 Journeys delivers end-to-end MICE solutions for India's leading corporates. One team, zero hassle, unforgettable results.
          </p>
          <div style={{ display:"flex", gap:14, animation:"fadeUp 0.7s ease 0.3s both" }}>
            <button onClick={() => { setShowProposalModal(true); setProposalSent(false); }} style={{ background:"#0ABFBC", color:"#fff", fontWeight:700, fontSize:15, padding:"14px 30px", borderRadius:28, display:"flex", alignItems:"center", gap:10, boxShadow:"0 6px 24px rgba(10,191,188,0.4)", transition:"transform 0.2s" }} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform=""}>
              Request a Proposal <FaArrowRight size={16} />
            </button>
            <button style={{ background:"rgba(255,255,255,0.1)", color:"#fff", fontWeight:600, fontSize:15, padding:"14px 28px", borderRadius:28, border:"1px solid rgba(255,255,255,0.25)", display:"flex", alignItems:"center", gap:10, transition:"background 0.2s" }} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.18)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.1)"}>
              Explore Destinations <FaGlobeAsia size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ── SEARCH BAR ── */}
      <div className="k2-search-wrap" style={{ background:"#0D1321" }}>
        <div style={{ maxWidth:720, margin:"0 auto" }}>
          {/* Label */}
          <p style={{ color:"rgba(255,255,255,0.5)", fontSize:12, fontWeight:600, letterSpacing:2.5, marginBottom:14, textTransform:"uppercase" }}>
            Find destinations, event types &amp; services
          </p>
          {/* Search bar */}
          <div className="k2-search-bar" style={{ padding:"6px 6px 6px 22px" }}>
            <FaSearch size={16} color="#0ABFBC" style={{ flexShrink:0, marginRight:12 }} />
            <input
              className="k2-search-input"
              type="text"
              placeholder="Search — Goa, Conference, Team Building, Incentive trips…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button
              className="k2-search-btn"
              style={{ padding:"12px 26px" }}
              onClick={() => {}}
            >
              Search
            </button>
          </div>
          {/* Quick-pick chips */}
          
        </div>
      </div>

      {/* ── MICE PILLARS ── */}
      <section style={{ background:"#ffffff", padding:"60px 32px 40px", overflowX:"hidden" }}>
        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <p style={{ fontFamily:"'Inter', sans-serif", color:"#0ABFBC", fontSize:10, letterSpacing:"0.28em", textTransform:"uppercase", margin:"0 0 6px", opacity:0.85 }}>
            ──&nbsp; The Four Pillars of MICE &nbsp;──
          </p>
          <h2 style={{ fontFamily:"'Playfair Display', serif", color:"#0D1321", fontSize:"clamp(1.4rem, 3vw, 2rem)", fontWeight:400, margin:"0 0 5px", lineHeight:1.1, letterSpacing:"-0.015em" }}>
            Four Pillars.{" "}<em style={{ fontStyle:"italic", color:"#0ABFBC" }}>Endless Possibilities.</em>
          </h2>
          <p style={{ fontFamily:"'Inter', sans-serif", color:"#4B5563", fontSize:"0.82rem", fontWeight:300, maxWidth:420, margin:"0 auto", lineHeight:1.5 }}>
            From strategic meetings to global events, we design experiences that inspire, connect and deliver results.
          </p>
        </div>

        {/* Cards + animated SVG wave */}
        <div ref={pillarContainerRef} style={{ maxWidth:1200, margin:"0 auto", position:"relative" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:14 }}>
            {PILLARS.map((p, i) => {
              const active = hoveredPillar === i;
              return (
                <div
                  key={p.id}
                  onMouseEnter={() => setHoveredPillar(i)}
                  onMouseLeave={() => setHoveredPillar(null)}
                  style={{
                    borderRadius:22, overflow:"hidden",
                    background:p.cardBg,
                    border:`1px solid ${active ? p.borderColor : "rgba(255,255,255,0.07)"}`,
                    boxShadow: active ? `0 0 52px 0 ${p.glowColor}, 0 12px 44px rgba(0,0,0,0.6)` : "0 2px 24px rgba(0,0,0,0.45)",
                    transform: active ? "scale(1.05) translateY(-8px)" : "scale(1) translateY(0)",
                    transition:"transform 0.42s cubic-bezier(.22,1,.36,1), box-shadow 0.42s ease, border-color 0.35s ease",
                    cursor:"pointer", display:"flex", flexDirection:"column", minHeight:260, position:"relative", zIndex: active ? 10 : 1,
                  }}
                >
                  <div style={{ padding:"12px 16px 0" }}>
                    <span style={{ fontFamily:"'Inter', sans-serif", color:"#c9a84c", fontSize:10, letterSpacing:"0.12em", opacity:0.65, fontWeight:300 }}>{p.id}</span>
                    <div style={{
                      width:42, height:42, borderRadius:"50%",
                      border:`1.5px solid ${active ? p.borderColor : p.iconRingColor}`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      color:"#c9a84c", margin:"8px 0 10px", background:"rgba(0,0,0,0.2)",
                      transform: active ? "scale(1.1) rotate(6deg)" : "scale(1) rotate(0deg)",
                      transition:"transform 0.45s cubic-bezier(.22,1,.36,1), border-color 0.35s",
                    }}>
                      <p.Icon size={18} strokeWidth={1.25} />
                    </div>
                    <h3 style={{ fontFamily:"'Inter', sans-serif", color:"#f0ede6", letterSpacing:"0.18em", fontSize:"0.78rem", fontWeight:400, margin:"0 0 6px" }}>{p.title}</h3>
                    <div style={{ height:1, background:"linear-gradient(90deg, #c9a84c, transparent)", marginBottom:7, width: active ? 36 : 20, transition:"width 0.35s ease" }} />
                    <p style={{ fontFamily:"'Inter', sans-serif", color:"rgba(220,210,190,0.6)", fontSize:"0.72rem", lineHeight:1.55, fontWeight:300, margin:0 }}>{p.description}</p>
                  </div>
                  <div style={{ flex:1, marginTop:10, position:"relative", overflow:"hidden", minHeight:90 }}>
                    <img src={p.img} alt={p.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transform: active ? "scale(1.1)" : "scale(1)", transition:"transform 0.65s cubic-bezier(.22,1,.36,1), filter 0.4s ease", filter: active ? "brightness(0.85) saturate(1.1)" : "brightness(0.5) saturate(0.85)" }} />
                    <div style={{ position:"absolute", inset:0, background:`linear-gradient(to bottom, ${p.overlayColor} 0%, transparent 50%)`, pointerEvents:"none" }} />
                  </div>
                  <div style={{ padding:"7px 16px 10px", display:"flex", alignItems:"center", gap:6 }}>
                    <span style={{ fontFamily:"'Inter', sans-serif", color:"#c9a84c", fontSize:"0.75rem", letterSpacing:"0.24em", fontWeight:500, textTransform:"uppercase", opacity: active ? 1 : 0.55, transform: active ? "translateX(4px)" : "translateX(0)", transition:"all 0.35s ease" }}>Explore</span>
                    <ArrowRight size={16} color="#c9a84c" strokeWidth={1.8} style={{ opacity: active ? 1 : 0.4, transform: active ? "translateX(8px)" : "translateX(0)", transition:"transform 0.4s cubic-bezier(.22,1,.36,1), opacity 0.3s" }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Animated gold wave + plane */}
          <svg width={pillarW} height={PILLAR_SVG_H} viewBox={`0 0 ${pillarW} ${PILLAR_SVG_H}`} style={{ position:"absolute", top:"50%", left:0, transform:"translateY(-50%)", pointerEvents:"none", zIndex:30, overflow:"visible" }}>
            <defs>
              <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="planeGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <path d={pillarWavePath} fill="none" stroke="rgba(201,168,76,0.07)" strokeWidth="16" />
            <path ref={pillarPathRef} d={pillarWavePath} fill="none" stroke="rgba(201,168,76,0.55)" strokeWidth="1.5" strokeDasharray="7 5" filter="url(#goldGlow)" />
            <circle cx={8} cy={pillarMidY} r={5} fill="#c9a84c" opacity="0.9" />
            <circle cx={pillarW - 8} cy={pillarMidY} r={5} fill="#c9a84c" opacity="0.9" />
            {planePx.x > 0 && (
              <g transform={`translate(${planePx.x}, ${planePx.y}) rotate(${planePx.angle - 270})`} filter="url(#planeGlow)">
                <g transform="translate(-18, -18)">
                  <path d="M18 2 L26 20 L18 16 L10 20 Z" fill="#c9a84c" stroke="#f0d87a" strokeWidth="0.4" />
                  <path d="M18 14 L34 22 L34 26 L18 20 L2 26 L2 22 Z" fill="#c9a84c" opacity="0.9" />
                  <path d="M18 18 L23 30 L23 32 L18 28 L13 32 L13 30 Z" fill="#c9a84c" opacity="0.75" />
                </g>
              </g>
            )}
          </svg>
        </div>

        {/* Footer tagline */}
        <div style={{ maxWidth:1200, margin:"12px auto 0", textAlign:"center", display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
          <Globe size={18} color="#110d01" strokeWidth={1.25} style={{ opacity:0.65 }} />
          <p style={{ fontFamily:"'Inter', sans-serif", color:"rgba(17, 13, 2, 0.5)", fontSize:"0.7rem", letterSpacing:"0.3em", textTransform:"uppercase", margin:0 }}>
            Global Reach.&nbsp;&nbsp;Local Expertise.&nbsp;&nbsp;Unmatched Experiences.
          </p>
        </div>
      </section>

      {/* ── DESTINATIONS ── */}
      <section style={{ background:"#F9FAFB", padding:"80px 64px", position:"relative" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <p style={{ color:"#0ABFBC", fontSize:12.5, fontWeight:700, letterSpacing:3, marginBottom:14 }}>HANDPICKED FOR CORPORATES</p>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:40, fontWeight:700, color:"#0D1321", marginBottom:14 }}>Top MICE Destinations</h2>
          <p style={{ fontSize:15, color:"#6B7280", maxWidth:520, margin:"0 auto" }}>
            From beach resorts in Goa to heritage palaces in Jaipur — we've got the perfect backdrop for your event.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div style={{ maxWidth:1200, margin:"0 auto 40px", display:"flex", gap:16, alignItems:"center", flexWrap:"wrap", justifyContent:"center" }}>
          {/* Search Input */}
          <div style={{ flex:"1 1 300px", minWidth:250, position:"relative" }}>
            <input
              type="text"
              placeholder="Search destinations..."
              value={destSearchQuery}
              onChange={(e) => setDestSearchQuery(e.target.value)}
              style={{
                width:"100%",
                padding:"12px 16px 12px 40px",
                fontSize:14,
                border:"1.5px solid #E5E7EB",
                borderRadius:10,
                outline:"none",
                transition:"all 0.3s",
                boxShadow: destSearchQuery ? "0 0 0 3px rgba(10,191,188,0.1)" : "none",
                borderColor: destSearchQuery ? "#0ABFBC" : "#E5E7EB"
              }}
            />
            <FaSearch style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"#9CA3AF" }} size={14} />
          </div>

          {/* Filter Buttons */}
          <div style={{ display:"flex", gap:10 }}>
            {["all", "domestic", "international"].map(filter => (
              <button
                key={filter}
                onClick={() => setDestinationFilter(filter)}
                style={{
                  padding:"10px 20px",
                  fontSize:13,
                  fontWeight:700,
                  border:"1.5px solid " + (destinationFilter === filter ? "#0ABFBC" : "#E5E7EB"),
                  background: destinationFilter === filter ? "#0ABFBC" : "#fff",
                  color: destinationFilter === filter ? "#fff" : "#6B7280",
                  borderRadius:10,
                  cursor:"pointer",
                  transition:"all 0.3s",
                  textTransform:"capitalize"
                }}
              >
                {filter === "all" ? "All Destinations" : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Destinations Grid */}
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:22 }}>
            {DESTINATIONS.filter(d => {
              const matchesFilter = destinationFilter === "all" || d.type === destinationFilter;
              const matchesSearch = d.name.toLowerCase().includes(destSearchQuery.toLowerCase()) ||
                                   d.tag.toLowerCase().includes(destSearchQuery.toLowerCase()) ||
                                   d.highlight.toLowerCase().includes(destSearchQuery.toLowerCase());
              return matchesFilter && matchesSearch;
            })
            .slice(0, showAllDestinations ? undefined : 6)
            .map((d, i) => (
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
                      <FaUsers size={13} color="#0ABFBC" />
                      <span style={{ color:"rgba(255,255,255,0.85)", fontSize:13 }}>{d.capacity}</span>
                    </div>
                    <p style={{ color:"rgba(255,255,255,0.7)", fontSize:12.5, lineHeight:1.5 }}>{d.highlight}</p>
                  </div>
                  {hoveredDest===i && (
                    <button style={{ marginTop:12, background:"#0ABFBC", color:"#fff", fontWeight:700, fontSize:12.5, padding:"8px 16px", borderRadius:16, display:"flex", alignItems:"center", gap:6 }}>
                      Explore <FaArrowRight size={12} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          {!showAllDestinations && DESTINATIONS.filter(d => {
            const matchesFilter = destinationFilter === "all" || d.type === destinationFilter;
            const matchesSearch = d.name.toLowerCase().includes(destSearchQuery.toLowerCase()) ||
                                 d.tag.toLowerCase().includes(destSearchQuery.toLowerCase()) ||
                                 d.highlight.toLowerCase().includes(destSearchQuery.toLowerCase());
            return matchesFilter && matchesSearch;
          }).length > 6 && (
            <div style={{ display:"flex", justifyContent:"flex-end", marginTop:40 }}>
              <button
                onClick={() => setShowAllDestinations(true)}
                style={{
                  padding:"12px 28px",
                  fontSize:14,
                  fontWeight:700,
                  background:"#0ABFBC",
                  color:"#fff",
                  border:"none",
                  borderRadius:10,
                  cursor:"pointer",
                  display:"flex",
                  alignItems:"center",
                  gap:8,
                  transition:"all 0.3s"
                }}
              >
                View More <FaArrowRight size={13} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── WHY US ── */}
      <section ref={whyRef} style={{ position:"relative", background:"#0D1321", padding:"80px 64px", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, zIndex:0 }}>
          <Particles
            particleCount={250}
            particleSpread={15}
            speed={0.08}
            particleColors={["#0ABFBC", "#D79A3B"]}
            moveParticlesOnHover={false}
            alphaParticles={true}
            particleBaseSize={80}
            sizeRandomness={0.8}
            cameraDistance={25}
            disableRotation={false}
          />
        </div>

        <style>{`
          @keyframes wsaSparkle {
            0%, 100% { opacity: 0.5; transform: scale(0.9) rotate(0deg); }
            50% { opacity: 1; transform: scale(1.15) rotate(20deg); }
          }

          .wsa-card:hover {
            border-color: rgba(10, 191, 188, 0.4) !important;
          }
          .wsa-icon-wrap { transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1); }
          .wsa-card:hover .wsa-icon-wrap { transform: scale(1.1) rotate(5deg); box-shadow: 0 0 15px rgba(10, 191, 188, 0.3); }
          .wsa-card:hover .wsa-underline { width: 100%; }
          .wsa-arrow { transition: transform 0.3s ease, background 0.3s ease, color 0.3s ease; }
          .wsa-card:hover .wsa-arrow { transform: translateX(6px); background: #0ABFBC; color: #0D1321 !important; border-color: #0ABFBC !important; }
          .wsa-dots {
            background-image: radial-gradient(circle, #fff 1px, transparent 1px);
            background-size: 14px 14px;
            opacity: 0.08;
          }
        `}</style>

        <div className="wsa-dots" style={{ position:"absolute", top:24, left:24, width:70, height:70, pointerEvents:"none", zIndex:1 }} />
        <div className="wsa-dots" style={{ position:"absolute", bottom:24, left:24, width:70, height:70, pointerEvents:"none", zIndex:1 }} />
        <div className="wsa-dots" style={{ position:"absolute", top:60, right:40, width:60, height:90, pointerEvents:"none", zIndex:1 }} />

        <div style={{ textAlign:"center", marginBottom:64, position:"relative", zIndex:1 }}>
          <p style={{ color:"#0ABFBC", fontSize:13, fontWeight:700, letterSpacing:4, marginBottom:12 }}>WHY K2 JOURNEYS</p>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:48, fontWeight:700, color:"#fff", margin:0 }}>
            What sets us <em style={{ color:"#0ABFBC", fontStyle:"italic" }}>apart</em>
          </h2>
          <p style={{ color:"rgba(255,255,255,0.7)", fontSize:16, marginTop:14 }}>Thoughtful planning. Flawless execution. Unforgettable experiences.</p>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginTop:24 }}>
            <span style={{ width:40, height:1, background:"linear-gradient(90deg, transparent, #D79A3B)" }} />
            <div style={{ color:"#D79A3B", animation:"wsaSparkle 2.6s ease-in-out infinite", fontSize:18 }}>✨</div>
            <span style={{ width:40, height:1, background:"linear-gradient(270deg, transparent, #D79A3B)" }} />
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:24, maxWidth:1200, margin:"0 auto", position:"relative", zIndex:1, perspective:"2000px" }}>
          {WHY_US.map((w, i) => (
            <MagneticTiltCard
              key={w.title}
              w={w}
              index={i}
              isVisible={visibleWhy.includes(i)}
            />
          ))}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <HowItWorksStack />

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding:"40px 64px", background:"#F0FAFA" }}>
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <p style={{ color:"#0ABFBC", fontSize:12, fontWeight:700, letterSpacing:3, marginBottom:8 }}>CLIENT STORIES</p>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:30, fontWeight:700, color:"#0D1321" }}>What our clients say</h2>
        </div>
        <div style={{ maxWidth:560, margin:"0 auto", position:"relative" }}>
          <AnimatedFlightPath />
          <div key={activeTestimonial} style={{ background:"#fff", borderRadius:16, padding:"24px 28px", boxShadow:"0 4px 20px rgba(0,0,0,0.07)", animation:"popIn 0.4s ease both", border:"1px solid #E5E7EB" }}>
            <div style={{ display:"flex", gap:3, marginBottom:12 }}>
              {Array(5).fill(0).map((_,i) => <FaStar key={i} size={13} color="#FBBF24" />)}
            </div>
            <p style={{ fontFamily:"var(--font-inter), system-ui, sans-serif", fontSize:15, lineHeight:1.55, color:"#0D1321", fontStyle:"italic", marginBottom:18 }}>
              "{TESTIMONIALS[activeTestimonial].quote}"
            </p>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <img src={TESTIMONIALS[activeTestimonial].img} alt="" style={{ width:38, height:38, borderRadius:"50%", objectFit:"cover", border:"2px solid #0ABFBC" }} />
              <div>
                <p style={{ fontWeight:700, fontSize:13, color:"#0D1321" }}>{TESTIMONIALS[activeTestimonial].name}</p>
                <p style={{ fontSize:11.5, color:"#6B7280" }}>{TESTIMONIALS[activeTestimonial].role}</p>
              </div>
            </div>
          </div>
          <div style={{ display:"flex", justifyContent:"center", gap:6, marginTop:16 }}>
            {TESTIMONIALS.map((_,i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} style={{ width: i===activeTestimonial ? 22 : 8, height:8, borderRadius:4, background: i===activeTestimonial ? "#0ABFBC" : "#D1D5DB", border:"none", transition:"all 0.3s", cursor:"pointer" }} />
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
              Ask Us Directly <FaArrowRight size={14} />
            </button>
          </div>
          <div style={{ flex:1, display:"flex", flexDirection:"column", gap:12 }}>
            {FAQS.map((f, i) => (
              <div key={i} style={{ background:"#fff", border:`1.5px solid ${openFaq===i ? "#0ABFBC44" : "#E5E7EB"}`, borderRadius:14, overflow:"hidden", boxShadow: openFaq===i ? "0 4px 20px rgba(10,191,188,0.1)" : "0 1px 6px rgba(0,0,0,0.04)", transition:"all 0.3s" }}>
                <button onClick={() => setOpenFaq(openFaq===i ? null : i)} style={{ width:"100%", padding:"18px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", background:"transparent", fontWeight:600, fontSize:15, color: openFaq===i ? "#0ABFBC" : "#0D1321", textAlign:"left", transition:"color 0.3s" }}>
                  {f.q}
                  <span style={{ transition:"transform 0.3s", transform: openFaq===i ? "rotate(180deg)" : "rotate(0)", flexShrink:0, marginLeft:12 }}>
                    <FaChevronDown size={18} color={openFaq===i ? "#0ABFBC" : "#9CA3AF"} />
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
              {[{ icon:FaPhoneAlt, text:"+91 98765 43210" }, { icon:FaEnvelope, text:"mice@k2journeys.com" }, { icon:FaMapMarkerAlt, text:"Manali, Himachal Pradesh, India" }].map(({ icon:Icon, text }) => (
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
                <FaCheckCircle size={20} color="#0ABFBC" />
                <div>
                  <p style={{ color:"#fff", fontWeight:700, fontSize:15 }}>Enquiry received!</p>
                  <p style={{ color:"#9CA3AF", fontSize:13, marginTop:2 }}>We'll send your proposal within 48 hours.</p>
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
                {[{ f:"name", placeholder:"Your Name", icon:FaUsers }, { f:"company", placeholder:"Company Name", icon:FaBriefcase }].map(({ f, placeholder, icon:Icon }) => (
                  <div key={f} style={{ position:"relative" }}>
                    <Icon size={15} color="#6B7280" style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }} />
                    <input type="text" placeholder={placeholder} value={form[f]} onChange={e => setForm(p => ({...p, [f]:e.target.value}))} style={{ width:"100%", padding:"13px 14px 13px 40px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.12)", fontSize:14, color:"#fff", background:"rgba(255,255,255,0.06)", transition:"border-color 0.2s" }} onFocus={e=>e.target.style.borderColor="#0ABFBC"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.12)"} />
                  </div>
                ))}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
                {[{ f:"email", placeholder:"Email Address", icon:FaEnvelope, type:"email" }, { f:"phone", placeholder:"Phone Number", icon:FaPhoneAlt, type:"tel" }].map(({ f, placeholder, icon:Icon, type }) => (
                  <div key={f} style={{ position:"relative" }}>
                    <Icon size={15} color="#6B7280" style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }} />
                    <input type={type} placeholder={placeholder} value={form[f]} onChange={e => setForm(p => ({...p, [f]:e.target.value}))} style={{ width:"100%", padding:"13px 14px 13px 40px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.12)", fontSize:14, color:"#fff", background:"rgba(255,255,255,0.06)", transition:"border-color 0.2s" }} onFocus={e=>e.target.style.borderColor="#0ABFBC"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.12)"} />
                  </div>
                ))}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
                <div style={{ position:"relative" }}>
                  <FaBriefcase size={15} color="#6B7280" style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", zIndex:1 }} />
                  <select value={form.type} onChange={e=>setForm(p=>({...p,type:e.target.value}))} style={{ width:"100%", padding:"13px 14px 13px 40px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.12)", fontSize:14, color: form.type?"#fff":"#6B7280", background:"rgba(255,255,255,0.06)", appearance:"none", transition:"border-color 0.2s" }} onFocus={e=>e.target.style.borderColor="#0ABFBC"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.12)"}>
                    <option value="" style={{background:"#1a2744",color:"#fff"}}>Event Type</option>
                    {["Meeting","Incentive Trip","Conference","Exhibition","Team Building","Gala Dinner"].map(o=><option key={o} value={o} style={{background:"#1a2744",color:"#fff"}}>{o}</option>)}
                  </select>
                </div>
                <div style={{ position:"relative" }}>
                  <FaUsers size={15} color="#6B7280" style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", zIndex:1 }} />
                  <select value={form.size} onChange={e=>setForm(p=>({...p,size:e.target.value}))} style={{ width:"100%", padding:"13px 14px 13px 40px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.12)", fontSize:14, color: form.size?"#fff":"#6B7280", background:"rgba(255,255,255,0.06)", appearance:"none", transition:"border-color 0.2s" }} onFocus={e=>e.target.style.borderColor="#0ABFBC"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.12)"}>
                    <option value="" style={{background:"#1a2744"}}>Group Size</option>
                    {["20–50","50–100","100–300","300–500","500–1000","1000+"].map(o=><option key={o} value={o} style={{background:"#1a2744"}}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ position:"relative", marginBottom:14 }}>
                <FaMapMarkerAlt size={15} color="#6B7280" style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }} />
                <input type="text" placeholder="Preferred Destination (optional)" value={form.destination} onChange={e=>setForm(p=>({...p,destination:e.target.value}))} style={{ width:"100%", padding:"13px 14px 13px 40px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.12)", fontSize:14, color:"#fff", background:"rgba(255,255,255,0.06)", transition:"border-color 0.2s" }} onFocus={e=>e.target.style.borderColor="#0ABFBC"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.12)"} />
              </div>
              <div style={{ position:"relative", marginBottom:20 }}>
                <FaChevronDown size={15} color="#6B7280" style={{ position:"absolute", left:14, top:15, pointerEvents:"none" }} />
                <textarea rows={3} placeholder="Tell us more about your event goals, dates, special requirements..." value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))} style={{ width:"100%", padding:"13px 14px 13px 40px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.12)", fontSize:14, color:"#fff", background:"rgba(255,255,255,0.06)", resize:"none", transition:"border-color 0.2s" }} onFocus={e=>e.target.style.borderColor="#0ABFBC"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.12)"} />
              </div>
              <button type="submit" style={{ width:"100%", background:"#0ABFBC", color:"#fff", fontWeight:700, fontSize:15, padding:"16px", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", gap:10, boxShadow:"0 6px 24px rgba(10,191,188,0.4)", transition:"transform 0.2s" }} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform=""}>
                <FaPaperPlane size={16} /> Send Event Brief
              </button>
              <p style={{ textAlign:"center", color:"#6B7280", fontSize:12.5, marginTop:14 }}>We'll respond with a full proposal within 48 hours.</p>
            </form>
          </div>
        </div>
      </section>

      <Footer />

      {/* ── PROPOSAL MODAL ── */}
      {showProposalModal && (
        <div
          onClick={() => setShowProposalModal(false)}
          style={{ position:"fixed", inset:0, zIndex:9999, background:"rgba(13,19,33,0.75)", backdropFilter:"blur(4px)", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background:"#fff", borderRadius:20, width:"100%", maxWidth:540, maxHeight:"95vh", overflow:"hidden", boxShadow:"0 24px 80px rgba(0,0,0,0.3)", animation:"popIn 0.3s ease", display:"flex", flexDirection:"column" }}
          >
            {proposalSent ? (
              <div style={{ padding:"56px 40px", textAlign:"center" }}>
                <div style={{ width:72, height:72, borderRadius:"50%", background:"#E6F9F9", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}>
                  <FaCheckCircle size={34} color="#0ABFBC" />
                </div>
                <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:26, fontWeight:700, color:"#0D1321", marginBottom:10 }}>
                  Thank You, {proposalForm.name.split(" ")[0]}!
                </h2>
                <p style={{ fontSize:15.5, lineHeight:1.7, color:"#4B5563", maxWidth:400, margin:"0 auto 28px" }}>
                  Your proposal request has been received. Our team will review your requirements and get back to you within <strong>24 hours</strong>.
                </p>
                <div style={{ background:"#F8FAFC", border:"1px solid #E5E7EB", borderRadius:12, padding:"16px 20px", textAlign:"left", marginBottom:28 }}>
                  <p style={{ fontSize:13, color:"#6B7280", marginBottom:6, fontWeight:600, letterSpacing:0.5 }}>YOUR ENQUIRY SUMMARY</p>
                  {[["Name", proposalForm.name], ["Organisation", proposalForm.org], ["Event Type", proposalForm.eventType], ["Group Size", proposalForm.groupSize], ["Destination", proposalForm.destination || "Flexible"]].map(([k, v]) => v && (
                    <div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:13.5, padding:"4px 0", borderBottom:"1px solid #F3F4F6", color:"#374151" }}>
                      <span style={{ color:"#6B7280" }}>{k}</span><span style={{ fontWeight:600 }}>{v}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setShowProposalModal(false)} style={{ background:"#0ABFBC", color:"#fff", fontWeight:700, fontSize:15, padding:"12px 36px", borderRadius:28, border:"none" }}>
                  Close
                </button>
              </div>
            ) : (
              <>
                <div style={{ padding:"18px 24px 14px", borderBottom:"1px solid #F3F4F6", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
                  <div>
                    <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:20, fontWeight:700, color:"#0D1321", margin:"0 0 4px" }}>Request a Proposal</h2>
                    <p style={{ fontSize:12.5, color:"#6B7280", margin:0 }}>We'll respond within 24 hours.</p>
                  </div>
                  <button onClick={() => setShowProposalModal(false)} style={{ background:"#F3F4F6", border:"none", borderRadius:"50%", width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0 }}>
                    <FaTimes size={14} color="#6B7280" />
                  </button>
                </div>
                <form onSubmit={e => { e.preventDefault(); setProposalSent(true); }} style={{ padding:"16px 24px 18px", flex:1, overflow:"auto" }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px 14px" }}>
                    <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                      <label style={{ fontSize:12, fontWeight:600, color:"#374151" }}>Full Name <span style={{ color:"#F87171" }}>*</span></label>
                      <input required placeholder="Your name" value={proposalForm.name} onChange={e => setProposalForm(f => ({ ...f, name: e.target.value }))} style={{ border:"1px solid #E5E7EB", borderRadius:8, padding:"8px 12px", fontSize:13, color:"#0D1321" }} />
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                      <label style={{ fontSize:12, fontWeight:600, color:"#374151" }}>Organisation <span style={{ color:"#F87171" }}>*</span></label>
                      <input required placeholder="Company name" value={proposalForm.org} onChange={e => setProposalForm(f => ({ ...f, org: e.target.value }))} style={{ border:"1px solid #E5E7EB", borderRadius:8, padding:"8px 12px", fontSize:13, color:"#0D1321" }} />
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                      <label style={{ fontSize:12, fontWeight:600, color:"#374151" }}>Email <span style={{ color:"#F87171" }}>*</span></label>
                      <input required type="email" placeholder="your@email.com" value={proposalForm.email} onChange={e => setProposalForm(f => ({ ...f, email: e.target.value }))} style={{ border:"1px solid #E5E7EB", borderRadius:8, padding:"8px 12px", fontSize:13, color:"#0D1321" }} />
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                      <label style={{ fontSize:12, fontWeight:600, color:"#374151" }}>Phone</label>
                      <input type="tel" placeholder="+91..." value={proposalForm.phone} onChange={e => setProposalForm(f => ({ ...f, phone: e.target.value }))} style={{ border:"1px solid #E5E7EB", borderRadius:8, padding:"8px 12px", fontSize:13, color:"#0D1321" }} />
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                      <label style={{ fontSize:12, fontWeight:600, color:"#374151" }}>Event Type <span style={{ color:"#F87171" }}>*</span></label>
                      <select required value={proposalForm.eventType} onChange={e => setProposalForm(f => ({ ...f, eventType: e.target.value }))} style={{ border:"1px solid #E5E7EB", borderRadius:8, padding:"8px 12px", fontSize:13, color: proposalForm.eventType ? "#0D1321" : "#9CA3AF", background:"#fff" }}>
                        <option value="" disabled>Select type</option>
                        <option>Meeting</option>
                        <option>Incentive Trip</option>
                        <option>Conference</option>
                        <option>Exhibition</option>
                        <option>Gala Dinner</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                      <label style={{ fontSize:12, fontWeight:600, color:"#374151" }}>Group Size <span style={{ color:"#F87171" }}>*</span></label>
                      <select required value={proposalForm.groupSize} onChange={e => setProposalForm(f => ({ ...f, groupSize: e.target.value }))} style={{ border:"1px solid #E5E7EB", borderRadius:8, padding:"8px 12px", fontSize:13, color: proposalForm.groupSize ? "#0D1321" : "#9CA3AF", background:"#fff" }}>
                        <option value="" disabled>Select size</option>
                        <option>1 – 50</option>
                        <option>51 – 200</option>
                        <option>201 – 500</option>
                        <option>501 – 1,000</option>
                        <option>1,000+</option>
                      </select>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                      <label style={{ fontSize:12, fontWeight:600, color:"#374151" }}>Destination</label>
                      <input placeholder="e.g. Goa, Dubai..." value={proposalForm.destination} onChange={e => setProposalForm(f => ({ ...f, destination: e.target.value }))} style={{ border:"1px solid #E5E7EB", borderRadius:8, padding:"8px 12px", fontSize:13, color:"#0D1321" }} />
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                      <label style={{ fontSize:12, fontWeight:600, color:"#374151" }}>Event Date</label>
                      <input type="month" value={proposalForm.eventDate} onChange={e => setProposalForm(f => ({ ...f, eventDate: e.target.value }))} style={{ border:"1px solid #E5E7EB", borderRadius:8, padding:"8px 12px", fontSize:13, color:"#0D1321" }} />
                    </div>
                    <div style={{ gridColumn:"1 / -1", display:"flex", flexDirection:"column", gap:4 }}>
                      <label style={{ fontSize:12, fontWeight:600, color:"#374151" }}>Message</label>
                      <textarea rows={2} placeholder="Your requirements..." value={proposalForm.message} onChange={e => setProposalForm(f => ({ ...f, message: e.target.value }))} style={{ border:"1px solid #E5E7EB", borderRadius:8, padding:"8px 12px", fontSize:13, color:"#0D1321", resize:"none" }} />
                    </div>
                  </div>
                  <button type="submit" style={{ marginTop:14, width:"100%", background:"#0ABFBC", color:"#fff", fontWeight:700, fontSize:14, padding:"11px", borderRadius:24, display:"flex", alignItems:"center", justifyContent:"center", gap:8, boxShadow:"0 4px 16px rgba(10,191,188,0.3)", border:"none" }}>
                    Submit Request <FaPaperPlane size={15} />
                  </button>
                  <p style={{ textAlign:"center", fontSize:12.5, color:"#9CA3AF", marginTop:12 }}>
                    We respect your privacy. Your details will never be shared.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
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
            {[FaGlobeAsia, FaLinkIcon].map((Icon, i) => <div key={i} style={{ width:34, height:34, borderRadius:"50%", border:"1px solid #374151", display:"flex", alignItems:"center", justifyContent:"center", color:"#9CA3AF" }}><Icon size={14} /></div>)}
          </div>
        </div>
        <div style={{ width:180 }}>
          <h5 style={{ color:"#fff", fontSize:15, fontWeight:700, marginBottom:18 }}>Quick Links</h5>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {quickLinks.map(l => {
              const to = navRoutes[l];
              const inner = <><FaChevronRight size={13} color="#0ABFBC" />{l}</>;
              return to
                ? <Link key={l} to={to} style={{ display:"flex", alignItems:"center", gap:6, color:"#9CA3AF", fontSize:13.5 }}>{inner}</Link>
                : <span key={l} style={{ display:"flex", alignItems:"center", gap:6, color:"#9CA3AF", fontSize:13.5 }}>{inner}</span>;
            })}
          </div>
        </div>
        <div style={{ width:200 }}>
          <h5 style={{ color:"#fff", fontSize:15, fontWeight:700, marginBottom:18 }}>Popular Destinations</h5>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {destinations.map(d => <a key={d} href="#" style={{ display:"flex", alignItems:"center", gap:6, color:"#9CA3AF", fontSize:13.5 }}><FaChevronRight size={13} color="#0ABFBC" />{d}</a>)}
          </div>
        </div>
        <div style={{ flex:1 }}>
          <h5 style={{ color:"#fff", fontSize:15, fontWeight:700, marginBottom:14 }}>Newsletter</h5>
          <p style={{ color:"#9CA3AF", fontSize:13.5, lineHeight:1.7, marginBottom:16 }}>Subscribe to get travel tips, updates & exclusive offers.</p>
          <div style={{ display:"flex", gap:8 }}>
            <input type="email" placeholder="Your email address" style={{ flex:1, background:"#161B27", border:"1px solid #374151", borderRadius:8, padding:"11px 14px", color:"#fff", fontSize:13 }} />
            <button style={{ background:"#0ABFBC", color:"#fff", borderRadius:8, padding:"0 16px", fontWeight:600, fontSize:13, display:"flex", alignItems:"center", gap:6 }}>Send <FaArrowRight size={13} /></button>
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
