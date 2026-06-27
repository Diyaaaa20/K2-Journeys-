import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Compass, HeartHandshake, Leaf, HeartPulse, Rocket, Wand2, Globe, Star, Award, ChevronRight, Link2, Share2, X, ExternalLink, Clock } from "lucide-react";

const NAV = ["Itinerary", "Visa", "Hotel & Air", "MICE", "Blogs", "About Us", "Contact"];
const navRoutes = { "Visa": "/visa", "MICE": "/mice", "Blogs": "/blog", "About Us": "/about", "Contact": "/contact" };

// ── Animated counter hook ──
function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ── Intersection observer hook ──
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

// ── Stat counter component ──
function StatCounter({ num, suffix, label, start }) {
  const parsed = parseInt(num.replace(/\D/g, ""));
  const count = useCountUp(parsed, 2200, start);
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 700, color: "#00bcd4", lineHeight: 1, transition: "all 0.3s" }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div style={{ fontSize: 14, color: "#6B7280", marginTop: 8, fontWeight: 500 }}>{label}</div>
    </div>
  );
}

const STATS = [
  { num: "12", suffix: "+", label: "Years of Experience" },
  { num: "8500", suffix: "+", label: "Happy Travellers" },
  { num: "120", suffix: "+", label: "Destinations Covered" },
  { num: "98", suffix: "%", label: "Satisfaction Rate" },
];

const STORY_SLIDES = [
  { img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80", title: "How it all began", text: "K2 Journeys began with a simple frustration: most travel companies sell a checklist, not an experience. We wanted to build trips around the places, not the other way around." },
  { img: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80", title: "Routes we believe in", text: "Every route is walked or scouted by someone on our team before it's offered to you. No outsourced itineraries, no recycled brochures — just routes we'd send our own friends on." },
  { img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80", title: "Who we travel with", text: "Small groups, local guides, and a refusal to overbook. We'd rather run a trip at half capacity than crowd the experience for everyone on it." },
];

const VALUES = [
  { icon: Compass, color: "#00bcd4", bg: "#E6F9F9", title: "Authentic Experiences", desc: "We never sell a checklist. Every route is walked, scouted, and felt by our team before it reaches you." },
  { icon: HeartHandshake, color: "#F87171", bg: "#FEF2F2", title: "Small Groups", desc: "Intimate groups mean deeper connections — with the place, the culture, and the people around you." },
  { icon: Leaf, color: "#34D399", bg: "#ECFDF5", title: "Responsible Travel", desc: "We leave footprints only in our memories. Local communities, ethical choices, real impact." },
  { icon: HeartPulse, color: "#A78BFA", bg: "#F5F3FF", title: "Always With You", desc: "24/7 support from real humans, not bots. Before, during, and after every journey." },
  { icon: Rocket, color: "#FBBF24", bg: "#FFFBEB", title: "Lightning Planning", desc: "From enquiry to confirmed itinerary in 48 hours. We move fast so you can move sooner." },
  { icon: Wand2, color: "#F97316", bg: "#FFF7ED", title: "Tailor-Made Trips", desc: "No two travellers are alike. Every itinerary is built from scratch, around you." },
];

const TEAM = [
  { name: "Kabir Thakur", role: "Founder & Lead Guide", roleColor: "#00bcd4", bio: "Over a decade in the mountains, curating journeys that stay with you forever.", img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop&crop=faces", linkedin: "#", instagram: "#", twitter: "#" },
  { name: "Saanvi Rao", role: "Route Planning", roleColor: "#F87171", bio: "Saanvi maps experiences that blend culture, adventure, and authentic local connections.", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=faces", linkedin: "#", instagram: "#", twitter: "#" },
  { name: "Imran Sheikh", role: "Operations", roleColor: "#FBBF24", bio: "Imran ensures every journey runs smoothly so you can focus on what matters — experiencing.", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop&crop=faces", linkedin: "#", instagram: "#", twitter: "#" },
  { name: "Priya Mehta", role: "Visa & Documentation", roleColor: "#A78BFA", bio: "Priya navigates every visa requirement so you're never held back by paperwork.", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces", linkedin: "#", instagram: "#", twitter: "#" },
];

const AWARDS = [
  { icon: Award, color: "#00bcd4", bg: "#E6F9F9", year: "2023", title: "Best Adventure Tour Operator", body: "Travel India Awards", detail: "Selected from 400+ nominees across India for exceptional route curation." },
  { icon: Star, color: "#FBBF24", bg: "#FFFBEB", year: "2022–23", title: "Travellers' Choice", body: "TripAdvisor", detail: "Consecutive recognition based on verified traveller reviews." },
  { icon: Globe, color: "#A78BFA", bg: "#F5F3FF", year: "2021", title: "Responsible Tourism Badge", body: "Ministry of Tourism, India", detail: "Awarded for ethical community engagement and low-impact travel practices." },
  { icon: Clock, color: "#F87171", bg: "#FEF2F2", year: "2020", title: "Excellence in Customer Experience", body: "Holiday IQ Awards", detail: "Recognised for post-trip support and personalised service standards." },
];

export default function AboutPageV2() {
  const [slide, setSlide] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [slideDir, setSlideDir] = useState(1);
  const [statsRef, statsInView] = useInView(0.3);
  const [valuesRef, valuesInView] = useInView(0.1);
  const [awardRef, awardInView] = useInView(0.1);
  const [hoveredTeam, setHoveredTeam] = useState(null);
  const [hoveredValue, setHoveredValue] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeAward, setActiveAward] = useState(0);
  const [heroMouse, setHeroMouse] = useState({ x: 0.5, y: 0.5 });
  const [teamTilt, setTeamTilt] = useState({ i: null, rx: 0, ry: 0 });

  // Auto-slide story carousel
  useEffect(() => {
    const timer = setInterval(() => goSlide(1), 5000);
    return () => clearInterval(timer);
  }, [slide]);


  // Auto-cycle awards
  useEffect(() => {
    if (!awardInView) return;
    const t = setInterval(() => setActiveAward(a => (a + 1) % AWARDS.length), 3000);
    return () => clearInterval(t);
  }, [awardInView]);

  function goSlide(dir) {
    if (sliding) return;
    setSlideDir(dir);
    setSliding(true);
    setTimeout(() => {
      setSlide(s => (s + dir + STORY_SLIDES.length) % STORY_SLIDES.length);
      setSliding(false);
    }, 350);
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", color: "#1A1A2E", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        button { font-family: inherit; cursor: pointer; border: none; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.88); } to { opacity: 1; transform: scale(1); } }
        @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(10,191,188,0.4); } 50% { box-shadow: 0 0 0 12px rgba(10,191,188,0); } }
        @keyframes shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .k2-marquee { overflow: hidden; }
        .k2-marquee-track { display: flex; width: max-content; animation: marquee 28s linear infinite; }
        .k2-marquee:hover .k2-marquee-track { animation-play-state: paused; }
        @keyframes glowPulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.12); opacity: 0.85; } }
        @keyframes orbFloat { 0%,100% { box-shadow: 0 0 12px 4px var(--orb-c), 0 0 28px 10px var(--orb-c2); } 50% { box-shadow: 0 0 20px 8px var(--orb-c), 0 0 44px 18px var(--orb-c2); } }
        @keyframes lineGlow { 0%,100% { filter: blur(0px) brightness(1); } 50% { filter: blur(1px) brightness(1.4); } }
        @keyframes heroRingSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes particleFade { 0%,100% { opacity: 0.15; transform: translateY(0); } 50% { opacity: 0.7; transform: translateY(-18px); } }
        @keyframes heroGradientShift { 0%,100% { opacity: 0.7; } 50% { opacity: 1; } }
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
            const isActive = l === "About Us";
            const style = { fontSize: 14, fontWeight: 500, color: isActive ? "#00bcd4" : "#374151", borderBottom: isActive ? "2px solid #00bcd4" : "2px solid transparent", paddingBottom: 4, transition: "color 0.2s" };
            return to ? <Link key={l} to={to} style={style}>{l}</Link> : <span key={l} style={style}>{l}</span>;
          })}
        </nav>
        <button className="k2-book-btn" style={{ background: "#00bcd4", color: "#fff", fontWeight: 700, fontSize: 14, padding: "10px 22px", borderRadius: 24, display: "flex", alignItems: "center", gap: 8 }}>
          Book Now <ArrowRight size={14} />
        </button>
        <button className="k2-hamburger" onClick={() => setMenuOpen(m => !m)} aria-label="Menu" style={{ display: "none", flexDirection: "column", gap: 5, background: "transparent", border: "none", padding: 8, cursor: "pointer" }}>
          <span style={{ display: "block", width: 22, height: 2, background: "#0D1321", borderRadius: 2, transition: "transform 0.3s", transform: menuOpen ? "rotate(45deg) translate(0, 7px)" : "none" }} />
          <span style={{ display: "block", width: 22, height: 2, background: "#0D1321", borderRadius: 2, transition: "opacity 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: 22, height: 2, background: "#0D1321", borderRadius: 2, transition: "transform 0.3s", transform: menuOpen ? "rotate(-45deg) translate(0, -7px)" : "none" }} />
        </button>
        <div className={`k2-mobile-menu${menuOpen ? " open" : ""}`}>
          {NAV.map(l => {
            const to = navRoutes[l];
            const isActive = l === "About Us";
            return to ?
              <Link key={l} to={to} onClick={() => setMenuOpen(false)} style={{ fontSize: 15, fontWeight: 600, color: isActive ? "#00bcd4" : "#374151", padding: "10px 0", borderBottom: "1px solid #F3F4F6" }}>{l}</Link> :
              <span key={l} style={{ fontSize: 15, fontWeight: 600, color: "#374151", padding: "10px 0", borderBottom: "1px solid #F3F4F6" }}>{l}</span>;
          })}
          <Link to="/contact" onClick={() => setMenuOpen(false)} style={{ background: "#00bcd4", color: "#fff", fontWeight: 700, fontSize: 14, padding: "12px 22px", borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 8 }}>
            Book Now <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      {/* ── HERO ── */}
      <section
        className="k2-about-hero"
        onMouseMove={e => {
          const r = e.currentTarget.getBoundingClientRect();
          setHeroMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
        }}
        onMouseLeave={() => setHeroMouse({ x: 0.5, y: 0.5 })}
        style={{ position: "relative", minHeight: 580, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", padding: "88px 64px 80px" }}
      >
        {/* Parallax background image */}
        <div style={{
          position: "absolute", inset: -36,
          backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80')",
          backgroundSize: "cover", backgroundPosition: "center",
          transform: `translate(${(heroMouse.x - 0.5) * -28}px, ${(heroMouse.y - 0.5) * -20}px)`,
          transition: "transform 0.6s cubic-bezier(0.2,0,0.2,1)",
          zIndex: 0,
        }} />

        {/* Dark gradient overlay — heavy left for text, reveals image on right */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(110deg, rgba(8,12,26,0.93) 0%, rgba(8,12,26,0.72) 48%, rgba(8,12,26,0.22) 100%)", zIndex: 1 }} />

        {/* Teal radial glow blob bottom-left */}
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 440, height: 440, borderRadius: "50%", background: "radial-gradient(circle, rgba(10,191,188,0.18) 0%, transparent 68%)", zIndex: 1, pointerEvents: "none", animation: "heroGradientShift 5s ease-in-out infinite" }} />

        {/* Spinning concentric rings — anchored to right-center */}
        <div style={{ position: "absolute", top: "50%", right: "13%", zIndex: 1, pointerEvents: "none" }}>
          <div style={{ position: "absolute", width: 380, height: 380, top: -190, left: -190, borderRadius: "50%", border: "1px solid rgba(10,191,188,0.14)", animation: "heroRingSpin 32s linear infinite" }} />
          <div style={{ position: "absolute", width: 270, height: 270, top: -135, left: -135, borderRadius: "50%", border: "1px solid rgba(10,191,188,0.20)", animation: "heroRingSpin 22s linear infinite reverse" }} />
          <div style={{ position: "absolute", width: 160, height: 160, top: -80, left: -80, borderRadius: "50%", border: "1.5px solid rgba(10,191,188,0.30)", animation: "heroRingSpin 14s linear infinite" }} />
          {/* Orbiting dot on outer ring */}
          <div style={{ position: "absolute", width: 8, height: 8, top: -194, left: -4, borderRadius: "50%", background: "#00bcd4", boxShadow: "0 0 14px 4px rgba(10,191,188,0.7)", animation: "heroRingSpin 32s linear infinite" }} />
          {/* Centre glow dot */}
          <div style={{ position: "absolute", width: 14, height: 14, top: -7, left: -7, borderRadius: "50%", background: "#00bcd4", boxShadow: "0 0 24px 8px rgba(10,191,188,0.6)" }} />
        </div>

        {/* Floating particles */}
        {[
          { top: "16%", left: "18%", size: 4, dur: "3.8s", delay: "0s" },
          { top: "74%", left: "7%",  size: 3, dur: "4.5s", delay: "1.4s" },
          { top: "38%", left: "55%", size: 5, dur: "3.2s", delay: "0.7s" },
          { top: "85%", left: "42%", size: 3, dur: "5s",   delay: "2.1s" },
          { top: "22%", left: "78%", size: 3, dur: "4s",   delay: "1.8s" },
          { top: "62%", left: "65%", size: 4, dur: "3.5s", delay: "0.3s" },
          { top: "50%", left: "30%", size: 2, dur: "4.8s", delay: "2.5s" },
        ].map((p, i) => (
          <div key={i} style={{ position: "absolute", top: p.top, left: p.left, width: p.size, height: p.size, borderRadius: "50%", background: "#00bcd4", zIndex: 1, pointerEvents: "none", animation: `particleFade ${p.dur} ease-in-out ${p.delay} infinite` }} />
        ))}

        {/* Hero content */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <p style={{ color: "#00bcd4", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 14, animation: "slideInLeft 0.7s ease both" }}>— ABOUT K2 JOURNEYS</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 54, fontWeight: 700, lineHeight: 1.15, color: "#fff", maxWidth: 620, marginBottom: 20, animation: "fadeUp 0.8s ease 0.1s both" }}>
            We plan journeys like<br /><span style={{ fontStyle: "italic", color: "#00bcd4" }}>we'd take them ourselves.</span>
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.70)", maxWidth: 520, marginBottom: 36, animation: "fadeUp 0.8s ease 0.2s both" }}>
            Founded by passionate travelers and route planners, K2 Journeys is built on the belief that travel should be real, raw, and deeply personal.
          </p>
          <div style={{ display: "flex", gap: 14, animation: "fadeUp 0.8s ease 0.3s both" }}>
            <button
              style={{ background: "#00bcd4", color: "#fff", fontWeight: 700, fontSize: 14, padding: "14px 30px", borderRadius: 28, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 6px 24px rgba(10,191,188,0.5)", transition: "transform 0.2s,box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(10,191,188,0.55)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(10,191,188,0.5)"; }}
            >
              Our Story <ArrowRight size={15} />
            </button>
            <button
              style={{ background: "rgba(255,255,255,0.08)", color: "#fff", fontWeight: 600, fontSize: 14, padding: "14px 30px", borderRadius: 28, border: "1.5px solid rgba(255,255,255,0.28)", display: "flex", alignItems: "center", gap: 8, backdropFilter: "blur(10px)", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.16)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)"; }}
            >
              Meet the Team <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.6, animation: "float 2.5s ease-in-out infinite" }}>
          <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: 2, color: "#fff" }}>SCROLL</span>
          <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, #00bcd4, transparent)" }} />
        </div>
      </section>

      {/* ── STATS (animated counters) ── */}
      <section ref={statsRef} style={{ background: "#F0FAFA", padding: "52px 64px" }}>
        <div className="k2-stats-row" style={{ display: "flex", justifyContent: "space-around" }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ textAlign: "center", animation: statsInView ? `fadeUp 0.6s ease ${i * 0.1}s both` : "none" }}>
              <StatCounter num={s.num} suffix={s.suffix} label={s.label} start={statsInView} />
            </div>
          ))}
        </div>
      </section>

      {/* ── OUR STORY (image carousel + dynamic text) ── */}
      <section className="k2-story-section" style={{ padding: "80px 64px", display: "flex", gap: 64, alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <p style={{ color: "#00bcd4", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 14 }}>OUR STORY</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, lineHeight: 1.25, color: "#0D1321", marginBottom: 20 }}>Our story, one<br />waypoint at a time.</h2>
          <div style={{ width: 48, height: 3, background: "#00bcd4", marginBottom: 24 }} />
          <div style={{ overflow: "hidden", minHeight: 100 }}>
            <div key={slide} style={{ animation: `fadeUp 0.5s ease both` }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0D1321", marginBottom: 12 }}>{STORY_SLIDES[slide].title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "#4B5563" }}>{STORY_SLIDES[slide].text}</p>
            </div>
          </div>
          {/* Slide dots */}
          <div style={{ display: "flex", gap: 8, marginTop: 28, alignItems: "center" }}>
            {STORY_SLIDES.map((_, i) => (
              <button key={i} onClick={() => { setSlideDir(i > slide ? 1 : -1); setSlide(i); }} style={{ width: i === slide ? 28 : 10, height: 10, borderRadius: 5, background: i === slide ? "#00bcd4" : "#D1D5DB", border: "none", cursor: "pointer", transition: "width 0.3s, background 0.3s" }} />
            ))}
            <button onClick={() => goSlide(-1)} style={{ marginLeft: 12, width: 34, height: 34, borderRadius: "50%", background: "#0D1321", color: "#fff", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <ArrowRight size={14} color="#fff" style={{ transform: "rotate(180deg)" }} />
            </button>
            <button onClick={() => goSlide(1)} style={{ width: 34, height: 34, borderRadius: "50%", background: "#0D1321", color: "#fff", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <ArrowRight size={14} color="#fff" />
            </button>
          </div>
        </div>

        {/* Image carousel */}
        <div className="k2-story-img" style={{ flex: 1, position: "relative", borderRadius: 24, overflow: "hidden", height: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
          <img
            key={slide}
            src={STORY_SLIDES[slide].img}
            alt="Story"
            style={{ width: "100%", height: "100%", objectFit: "cover", animation: "popIn 0.5s ease both" }}
          />
          <div style={{ position: "absolute", bottom: 24, left: 24, background: "rgba(255,255,255,0.95)", borderRadius: 14, padding: "14px 18px", backdropFilter: "blur(8px)", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: "#00bcd4" }}>12+</div>
            <div style={{ fontSize: 13, color: "#6B7280", fontWeight: 500 }}>Years curating journeys</div>
          </div>
          <div style={{ position: "absolute", top: 16, right: 16, display: "flex", gap: 6 }}>
            {STORY_SLIDES.map((_, i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i === slide ? "#fff" : "rgba(255,255,255,0.5)", transition: "background 0.3s", cursor: "pointer" }} onClick={() => setSlide(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES (horizontal marquee with zig-zag layout) ── */}
      <section ref={valuesRef} className="k2-values-section" style={{
        padding: "72px 0",
        backgroundImage: "linear-gradient(135deg, rgba(13,19,33,0.72) 0%, rgba(10,40,50,0.68) 50%, rgba(13,19,33,0.72) 100%), url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}>
        <div style={{ textAlign: "center", marginBottom: 52, padding: "0 64px" }}>
          <p style={{ color: "#00bcd4", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 12 }}>WHAT WE STAND FOR</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: "#fff" }}>Our values in action</h2>
        </div>
        <div className="k2-marquee" style={{ padding: "52px 0 88px" }}>
          <div className="k2-marquee-track">
            {[...VALUES, ...VALUES].map((v, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredValue(i)}
                onMouseLeave={() => setHoveredValue(null)}
                style={{
                  width: 268,
                  flexShrink: 0,
                  marginRight: 28,
                  background: hoveredValue === i ? v.bg : "rgba(255,255,255,0.10)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  borderRadius: 22,
                  padding: "30px 26px",
                  border: `1.5px solid ${hoveredValue === i ? v.color + "88" : "rgba(255,255,255,0.18)"}`,
                  boxShadow: hoveredValue === i ? `0 20px 52px ${v.color}40` : "0 8px 32px rgba(0,0,0,0.25)",
                  transform: `translateY(${i % 2 === 0 ? "-40px" : "40px"}) scale(${hoveredValue === i ? 1.04 : 1})`,
                  transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s, transform 0.35s cubic-bezier(0.34,1.4,0.64,1)",
                  cursor: "default",
                }}
              >
                <div style={{
                  background: `linear-gradient(135deg, ${v.bg}, ${v.color}20)`,
                  borderRadius: 16,
                  width: 60, height: 60,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 20,
                  border: `1.5px solid ${v.color}30`,
                  boxShadow: `0 6px 18px ${v.color}25`,
                  transition: "transform 0.35s",
                  transform: hoveredValue === i ? "rotate(-10deg) scale(1.12)" : "rotate(0) scale(1)",
                }}>
                  <v.icon size={28} color={v.color} strokeWidth={1.7} />
                </div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: hoveredValue === i ? "#0D1321" : "#fff", marginBottom: 10, transition: "color 0.3s" }}>{v.title}</h4>
                <p style={{ fontSize: 13.5, lineHeight: 1.75, color: hoveredValue === i ? "#374151" : "rgba(255,255,255,0.72)", transition: "color 0.3s" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="k2-team-section" style={{ padding: "80px 64px", background: "#0D1321" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ color: "#00bcd4", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 12 }}>MEET OUR TEAM</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: "#fff" }}>The people behind the routes.</h2>
          <p style={{ fontSize: 15, color: "#9CA3AF", marginTop: 12 }}>Small team, big heart — every journey carries a piece of each of us.</p>
        </div>

        <div className="k2-team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {TEAM.map((m, i) => (
            <div
              key={m.name}
              onMouseEnter={() => setHoveredTeam(i)}
              onMouseLeave={() => setHoveredTeam(null)}
              style={{
                position: "relative",
                height: 460,
                borderRadius: 22,
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: hoveredTeam === i
                  ? `0 28px 64px ${m.roleColor}40, 0 8px 24px rgba(0,0,0,0.3)`
                  : "0 6px 28px rgba(0,0,0,0.35)",
                transform: hoveredTeam === i ? "translateY(-10px)" : "translateY(0)",
                transition: "transform 0.45s cubic-bezier(0.34,1.1,0.64,1), box-shadow 0.45s",
              }}
            >
              {/* Full-bleed photo */}
              <img
                src={m.img}
                alt={m.name}
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover", objectPosition: "top center",
                  transform: hoveredTeam === i ? "scale(1.08)" : "scale(1)",
                  transition: "transform 0.65s ease",
                }}
              />

              {/* Thin coloured top accent bar */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: m.roleColor, zIndex: 3 }} />

              {/* Default: bottom name strip */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "80px 22px 24px",
                background: "linear-gradient(transparent, rgba(8,12,26,0.94))",
                zIndex: 2,
                opacity: hoveredTeam === i ? 0 : 1,
                transition: "opacity 0.3s ease",
              }}>
                <h4 style={{ color: "#fff", fontSize: 19, fontWeight: 700, marginBottom: 5 }}>{m.name}</h4>
                <span style={{ display: "inline-block", background: `${m.roleColor}35`, color: m.roleColor, fontSize: 11.5, fontWeight: 700, padding: "4px 12px", borderRadius: 12, letterSpacing: 0.5 }}>{m.role}</span>
              </div>

              {/* Hover: full slide-up info panel */}
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(to top, rgba(8,12,26,0.98) 0%, rgba(8,12,26,0.90) 55%, rgba(8,12,26,0.15) 100%)`,
                display: "flex", flexDirection: "column", justifyContent: "flex-end",
                padding: "30px 24px",
                zIndex: 4,
                transform: hoveredTeam === i ? "translateY(0)" : "translateY(100%)",
                transition: "transform 0.48s cubic-bezier(0.34,1.1,0.64,1)",
              }}>
                {/* Coloured accent line */}
                <div style={{ width: 38, height: 3, background: m.roleColor, borderRadius: 2, marginBottom: 16 }} />
                <h4 style={{ color: "#fff", fontSize: 21, fontWeight: 700, marginBottom: 5 }}>{m.name}</h4>
                <span style={{ display: "inline-block", background: `${m.roleColor}30`, color: m.roleColor, fontSize: 11.5, fontWeight: 700, padding: "4px 12px", borderRadius: 12, letterSpacing: 0.5, marginBottom: 16 }}>{m.role}</span>
                <p style={{ color: "rgba(255,255,255,0.74)", fontSize: 13.5, lineHeight: 1.75, marginBottom: 22 }}>{m.bio}</p>
                {/* Social icons */}
                <div style={{ display: "flex", gap: 10 }}>
                  {[Link2, Share2, X, ExternalLink].map((Icon, j) => (
                    <a
                      key={j}
                      href={[m.linkedin, m.instagram, m.twitter, "#"][j]}
                      style={{
                        width: 38, height: 38, borderRadius: "50%",
                        background: "rgba(255,255,255,0.10)",
                        border: "1px solid rgba(255,255,255,0.22)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "rgba(255,255,255,0.75)",
                        transition: "all 0.22s",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = m.roleColor; e.currentTarget.style.borderColor = m.roleColor; e.currentTarget.style.color = "#fff"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.10)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; e.currentTarget.style.transform = "translateY(0)"; }}
                    >
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── AWARDS (timeline + animated carousel) ── */}
      <section ref={awardRef} className="k2-awards-section" style={{ background: "#0D1321", padding: "80px 64px" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <p style={{ color: "#00bcd4", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 12 }}>RECOGNITION</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: "#fff" }}>Awards & Milestones</h2>
        </div>

        {/* Timeline */}
        <div style={{ position: "relative", display: "flex", gap: 0 }}>
          {/* Dark base track */}
          <div style={{ position: "absolute", top: 27, left: "12.5%", right: "12.5%", height: 3, background: "#1F2937", borderRadius: 2 }} />

          {/* Glowing progress fill */}
          <div style={{
            position: "absolute", top: 27, left: "12.5%",
            width: `${(activeAward / (AWARDS.length - 1)) * 75}%`,
            height: 3, borderRadius: 2,
            background: `linear-gradient(90deg, ${AWARDS[0].color}, ${AWARDS[activeAward].color})`,
            boxShadow: `0 0 8px ${AWARDS[activeAward].color}99, 0 0 20px ${AWARDS[activeAward].color}55`,
            transition: "width 0.7s cubic-bezier(0.4,0,0.2,1), box-shadow 0.5s",
            animation: "lineGlow 2.5s ease-in-out infinite",
          }} />

          {/* Traveling orb along the track */}
          <div style={{
            position: "absolute", top: 20,
            left: `${12.5 + (activeAward / (AWARDS.length - 1)) * 75}%`,
            width: 16, height: 16, borderRadius: "50%",
            background: AWARDS[activeAward].color,
            boxShadow: `0 0 14px 4px ${AWARDS[activeAward].color}99, 0 0 32px 10px ${AWARDS[activeAward].color}44`,
            transform: "translateX(-50%)",
            transition: "left 0.7s cubic-bezier(0.4,0,0.2,1), background 0.4s, box-shadow 0.4s",
            zIndex: 4,
          }} />

          {AWARDS.map((a, i) => (
            <div
              key={a.title}
              onClick={() => setActiveAward(i)}
              style={{ flex: 1, textAlign: "center", cursor: "pointer", position: "relative", zIndex: 2 }}
            >
              {/* Outer glow ring for active */}
              {i === activeAward && (
                <div style={{
                  position: "absolute", top: "50%", left: "50%",
                  width: 72, height: 72, borderRadius: "50%",
                  background: `radial-gradient(circle, ${a.color}22 0%, transparent 70%)`,
                  transform: "translate(-50%, -68%)",
                  animation: "glowPulse 2s ease-in-out infinite",
                  pointerEvents: "none",
                }} />
              )}
              <div style={{
                width: 54, height: 54, borderRadius: "50%",
                background: i <= activeAward ? a.bg : "#1A2035",
                border: `2.5px solid ${i <= activeAward ? a.color : "#2D3748"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 18px",
                boxShadow: i === activeAward
                  ? `0 0 0 4px ${a.color}22, 0 0 18px ${a.color}99, 0 0 40px ${a.color}44`
                  : i < activeAward
                    ? `0 0 10px ${a.color}66, 0 0 22px ${a.color}33`
                    : "none",
                transition: "all 0.5s ease",
                animation: i === activeAward && awardInView ? "glowPulse 2s ease-in-out infinite" : "none",
              }}>
                <a.icon size={22} color={i <= activeAward ? a.color : "#4A5568"} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: i <= activeAward ? a.color : "#4A5568", letterSpacing: 1, transition: "color 0.4s" }}>{a.year}</div>
            </div>
          ))}
        </div>

        {/* Active award detail */}
        <div key={activeAward} className="k2-awards-detail" style={{ background: "#161B27", border: "1px solid #262B38", borderRadius: 20, padding: "36px 40px", marginTop: 36, display: "flex", gap: 28, alignItems: "center", animation: "fadeUp 0.4s ease both" }}>
          <div style={{ background: AWARDS[activeAward].bg, borderRadius: "50%", width: 72, height: 72, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", animation: "float 3s ease-in-out infinite" }}>
            {(() => { const Icon = AWARDS[activeAward].icon; return <Icon size={32} color={AWARDS[activeAward].color} />; })()}
          </div>
          <div>
            <p style={{ color: AWARDS[activeAward].color, fontSize: 12.5, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>{AWARDS[activeAward].year}</p>
            <h3 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginBottom: 6 }}>{AWARDS[activeAward].title}</h3>
            <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 10 }}>{AWARDS[activeAward].body}</p>
            <p style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 1.65 }}>{AWARDS[activeAward].detail}</p>
          </div>
        </div>

        {/* Dot indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
          {AWARDS.map((_, i) => <button key={i} onClick={() => setActiveAward(i)} style={{ width: i === activeAward ? 24 : 8, height: 8, borderRadius: 4, background: i === activeAward ? "#00bcd4" : "#374151", border: "none", cursor: "pointer", transition: "all 0.3s" }} />)}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="k2-about-cta" style={{ padding: "80px 64px", textAlign: "center", background: "#F0FAFA" }}>
        <p style={{ color: "#00bcd4", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 16 }}>READY TO EXPLORE?</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: "#0D1321", marginBottom: 16 }}>Adventure is better together.</h2>
        <p style={{ fontSize: 16, color: "#6B7280", marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>Let us plan your next chapter. Real routes, real people, real memories.</p>
        <button style={{ background: "#00bcd4", color: "#fff", fontWeight: 700, fontSize: 15, padding: "15px 36px", borderRadius: 28, display: "inline-flex", alignItems: "center", gap: 10, boxShadow: "0 6px 24px rgba(10,191,188,0.4)", transition: "transform 0.2s,box-shadow 0.2s", animation: "pulse 2.5s infinite" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
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
    <footer className="k2-footer" style={{ background: "#0D1321", padding: "56px 64px 24px" }}>
      <div className="k2-footer-inner" style={{ display: "flex", gap: 48, marginBottom: 40 }}>
        <div style={{ width: 260, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
            <div style={{ background: "#00bcd4", color: "#fff", fontWeight: 800, fontSize: 18, padding: "4px 9px", borderRadius: 5 }}>K2</div>
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
                ? <Link key={l} to={to} style={{ display: "flex", alignItems: "center", gap: 6, color: "#9CA3AF", fontSize: 13.5 }}><ChevronRight size={13} color="#00bcd4" />{l}</Link>
                : <span key={l} style={{ display: "flex", alignItems: "center", gap: 6, color: "#9CA3AF", fontSize: 13.5 }}><ChevronRight size={13} color="#00bcd4" />{l}</span>
            )}
          </div>
        </div>
        <div style={{ width: 200 }}>
          <h5 style={{ color: "#fff", fontSize: 15, fontWeight: 700, marginBottom: 18 }}>Popular Destinations</h5>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {destinations.map(d => <a key={d} href="#" style={{ display: "flex", alignItems: "center", gap: 6, color: "#9CA3AF", fontSize: 13.5 }}><ChevronRight size={13} color="#00bcd4" />{d}</a>)}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h5 style={{ color: "#fff", fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Newsletter</h5>
          <p style={{ color: "#9CA3AF", fontSize: 13.5, lineHeight: 1.7, marginBottom: 16 }}>Subscribe to get travel tips, updates & exclusive offers.</p>
          <div style={{ display: "flex", gap: 8 }}>
            <input type="email" placeholder="Your email address" style={{ flex: 1, background: "#161B27", border: "1px solid #374151", borderRadius: 8, padding: "11px 14px", color: "#fff", fontSize: 13 }} />
            <button style={{ background: "#00bcd4", color: "#fff", borderRadius: 8, padding: "0 16px", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>Send <ArrowRight size={13} /></button>
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