import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Map, Users, Heart, Globe, Star, Award, ChevronRight, Link2, Share2, X, ExternalLink, Zap, Clock, Target } from "lucide-react";

const NAV = ["Itinerary", "Visa", "Hotel & Air", "MICE", "Blogs", "About Us", "Contact"];
const navRoutes = { "Visa": "/visa", "Blogs": "/blog", "About Us": "/about", "Contact": "/contact" };

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
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 700, color: "#0ABFBC", lineHeight: 1, transition: "all 0.3s" }}>
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
  { icon: Shield, color: "#0ABFBC", bg: "#E6F9F9", title: "Authentic Experiences", desc: "We never sell a checklist. Every route is walked, scouted, and felt by our team before it reaches you." },
  { icon: Users, color: "#F87171", bg: "#FEF2F2", title: "Small Groups", desc: "Intimate groups mean deeper connections — with the place, the culture, and the people around you." },
  { icon: Globe, color: "#FBBF24", bg: "#FFFBEB", title: "Responsible Travel", desc: "We leave footprints only in our memories. Local communities, ethical choices, real impact." },
  { icon: Heart, color: "#A78BFA", bg: "#F5F3FF", title: "Always With You", desc: "24/7 support from real humans, not bots. Before, during, and after every journey." },
  { icon: Zap, color: "#34D399", bg: "#ECFDF5", title: "Lightning Planning", desc: "From enquiry to confirmed itinerary in 48 hours. We move fast so you can move sooner." },
  { icon: Target, color: "#F97316", bg: "#FFF7ED", title: "Tailor-Made Trips", desc: "No two travellers are alike. Every itinerary is built from scratch, around you." },
];

const TEAM = [
  { name: "Kabir Thakur", role: "Founder & Lead Guide", roleColor: "#0ABFBC", bio: "Over a decade in the mountains, curating journeys that stay with you forever.", img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop&crop=faces", linkedin: "#", instagram: "#", twitter: "#" },
  { name: "Saanvi Rao", role: "Route Planning", roleColor: "#F87171", bio: "Saanvi maps experiences that blend culture, adventure, and authentic local connections.", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=faces", linkedin: "#", instagram: "#", twitter: "#" },
  { name: "Imran Sheikh", role: "Operations", roleColor: "#FBBF24", bio: "Imran ensures every journey runs smoothly so you can focus on what matters — experiencing.", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop&crop=faces", linkedin: "#", instagram: "#", twitter: "#" },
  { name: "Priya Mehta", role: "Visa & Documentation", roleColor: "#A78BFA", bio: "Priya navigates every visa requirement so you're never held back by paperwork.", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces", linkedin: "#", instagram: "#", twitter: "#" },
];

const AWARDS = [
  { icon: Award, color: "#0ABFBC", bg: "#E6F9F9", year: "2023", title: "Best Adventure Tour Operator", body: "Travel India Awards", detail: "Selected from 400+ nominees across India for exceptional route curation." },
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
  const [visibleValues, setVisibleValues] = useState([]);
  const [hoveredTeam, setHoveredTeam] = useState(null);
  const [hoveredValue, setHoveredValue] = useState(null);
  const [activeAward, setActiveAward] = useState(0);

  // Auto-slide story carousel
  useEffect(() => {
    const timer = setInterval(() => goSlide(1), 5000);
    return () => clearInterval(timer);
  }, [slide]);

  // Stagger value card reveal
  useEffect(() => {
    if (!valuesInView) return;
    VALUES.forEach((_, i) => {
      setTimeout(() => setVisibleValues(v => [...v, i]), i * 120);
    });
  }, [valuesInView]);

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
            const isActive = l === "About Us";
            const style = { fontSize: 14, fontWeight: 500, color: isActive ? "#0ABFBC" : "#374151", borderBottom: isActive ? "2px solid #0ABFBC" : "2px solid transparent", paddingBottom: 4, transition: "color 0.2s" };
            return to ? <Link key={l} to={to} style={style}>{l}</Link> : <span key={l} style={style}>{l}</span>;
          })}
        </nav>
        <button style={{ background: "#0ABFBC", color: "#fff", fontWeight: 700, fontSize: 14, padding: "10px 22px", borderRadius: 24, display: "flex", alignItems: "center", gap: 8 }}>
          Book Now <ArrowRight size={14} />
        </button>
      </header>

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: 480, padding: "72px 64px 60px", backgroundImage: "linear-gradient(105deg,rgba(255,255,255,0.97) 40%,rgba(255,255,255,0.5) 70%,rgba(255,255,255,0.05) 100%),url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')", backgroundSize: "cover", backgroundPosition: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <p style={{ color: "#0ABFBC", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 14, animation: "slideInLeft 0.7s ease both" }}>— ABOUT K2 JOURNEYS</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, fontWeight: 700, lineHeight: 1.15, color: "#0D1321", maxWidth: 600, marginBottom: 20, animation: "fadeUp 0.8s ease 0.1s both" }}>
          We plan journeys like<br /><span style={{ fontStyle: "italic", color: "#0ABFBC" }}>we'd take them ourselves.</span>
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: "#4B5563", maxWidth: 520, marginBottom: 32, animation: "fadeUp 0.8s ease 0.2s both" }}>
          Founded by passionate travelers and route planners, K2 Journeys is built on the belief that travel should be real, raw, and deeply personal.
        </p>
        <div style={{ display: "flex", gap: 14, animation: "fadeUp 0.8s ease 0.3s both" }}>
          <button style={{ background: "#0ABFBC", color: "#fff", fontWeight: 700, fontSize: 14, padding: "13px 28px", borderRadius: 24, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 16px rgba(10,191,188,0.35)", transition: "transform 0.2s,box-shadow 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
            Our Story <ArrowRight size={15} />
          </button>
          <button style={{ background: "transparent", color: "#0D1321", fontWeight: 600, fontSize: 14, padding: "13px 28px", borderRadius: 24, border: "1.5px solid #D1D5DB", display: "flex", alignItems: "center", gap: 8, transition: "border-color 0.2s,color 0.2s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "#0ABFBC"; e.currentTarget.style.color = "#0ABFBC"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "#D1D5DB"; e.currentTarget.style.color = "#0D1321"; }}>
            Meet the Team <ChevronRight size={15} />
          </button>
        </div>
      </section>

      {/* ── STATS (animated counters) ── */}
      <section ref={statsRef} style={{ background: "#F0FAFA", padding: "52px 64px" }}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ textAlign: "center", animation: statsInView ? `fadeUp 0.6s ease ${i * 0.1}s both` : "none" }}>
              <StatCounter num={s.num} suffix={s.suffix} label={s.label} start={statsInView} />
            </div>
          ))}
        </div>
      </section>

      {/* ── OUR STORY (image carousel + dynamic text) ── */}
      <section style={{ padding: "80px 64px", display: "flex", gap: 64, alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <p style={{ color: "#0ABFBC", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 14 }}>OUR STORY</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, lineHeight: 1.25, color: "#0D1321", marginBottom: 20 }}>Our story, one<br />waypoint at a time.</h2>
          <div style={{ width: 48, height: 3, background: "#0ABFBC", marginBottom: 24 }} />
          <div style={{ overflow: "hidden", minHeight: 100 }}>
            <div key={slide} style={{ animation: `fadeUp 0.5s ease both` }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0D1321", marginBottom: 12 }}>{STORY_SLIDES[slide].title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "#4B5563" }}>{STORY_SLIDES[slide].text}</p>
            </div>
          </div>
          {/* Slide dots */}
          <div style={{ display: "flex", gap: 8, marginTop: 28, alignItems: "center" }}>
            {STORY_SLIDES.map((_, i) => (
              <button key={i} onClick={() => { setSlideDir(i > slide ? 1 : -1); setSlide(i); }} style={{ width: i === slide ? 28 : 10, height: 10, borderRadius: 5, background: i === slide ? "#0ABFBC" : "#D1D5DB", border: "none", cursor: "pointer", transition: "width 0.3s, background 0.3s" }} />
            ))}
            <button onClick={() => goSlide(-1)} style={{ marginLeft: 12, width: 34, height: 34, borderRadius: "50%", border: "1.5px solid #E5E7EB", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "border-color 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = "#0ABFBC"} onMouseLeave={e => e.currentTarget.style.borderColor = "#E5E7EB"}>
              <ArrowRight size={14} style={{ transform: "rotate(180deg)" }} />
            </button>
            <button onClick={() => goSlide(1)} style={{ width: 34, height: 34, borderRadius: "50%", border: "1.5px solid #E5E7EB", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "border-color 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = "#0ABFBC"} onMouseLeave={e => e.currentTarget.style.borderColor = "#E5E7EB"}>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Image carousel */}
        <div style={{ flex: 1, position: "relative", borderRadius: 24, overflow: "hidden", height: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
          <img
            key={slide}
            src={STORY_SLIDES[slide].img}
            alt="Story"
            style={{ width: "100%", height: "100%", objectFit: "cover", animation: "popIn 0.5s ease both" }}
          />
          <div style={{ position: "absolute", bottom: 24, left: 24, background: "rgba(255,255,255,0.95)", borderRadius: 14, padding: "14px 18px", backdropFilter: "blur(8px)", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: "#0ABFBC" }}>12+</div>
            <div style={{ fontSize: 13, color: "#6B7280", fontWeight: 500 }}>Years curating journeys</div>
          </div>
          <div style={{ position: "absolute", top: 16, right: 16, display: "flex", gap: 6 }}>
            {STORY_SLIDES.map((_, i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i === slide ? "#fff" : "rgba(255,255,255,0.5)", transition: "background 0.3s", cursor: "pointer" }} onClick={() => setSlide(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES (scroll-triggered popup, hover effects) ── */}
      <section ref={valuesRef} style={{ background: "#F9FAFB", padding: "72px 64px" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <p style={{ color: "#0ABFBC", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 12 }}>WHAT WE STAND FOR</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: "#0D1321" }}>Our values in action</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              onMouseEnter={() => setHoveredValue(i)}
              onMouseLeave={() => setHoveredValue(null)}
              style={{
                background: hoveredValue === i ? v.bg : "#fff",
                borderRadius: 18,
                padding: "28px 24px",
                border: `1.5px solid ${hoveredValue === i ? v.color + "44" : "#F3F4F6"}`,
                boxShadow: hoveredValue === i ? `0 12px 40px ${v.color}22` : "0 2px 12px rgba(0,0,0,0.04)",
                transform: hoveredValue === i ? "translateY(-6px) scale(1.02)" : visibleValues.includes(i) ? "translateY(0) scale(1)" : "translateY(32px) scale(0.95)",
                opacity: visibleValues.includes(i) ? 1 : 0,
                transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                cursor: "default",
              }}
            >
              <div style={{ background: v.bg, borderRadius: "50%", width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, transform: hoveredValue === i ? "rotate(-8deg) scale(1.1)" : "rotate(0) scale(1)", transition: "transform 0.3s" }}>
                <v.icon size={24} color={v.color} />
              </div>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: "#0D1321", marginBottom: 10 }}>{v.title}</h4>
              <p style={{ fontSize: 13.5, lineHeight: 1.7, color: hoveredValue === i ? "#374151" : "#6B7280", transition: "color 0.3s" }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEAM (interactive hover cards) ── */}
      <section style={{ padding: "80px 64px" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <p style={{ color: "#0ABFBC", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 12 }}>MEET OUR TEAM</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: "#0D1321" }}>The people behind the routes.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }}>
          {TEAM.map((m, i) => (
            <div
              key={m.name}
              onMouseEnter={() => setHoveredTeam(i)}
              onMouseLeave={() => setHoveredTeam(null)}
              style={{ position: "relative", borderRadius: 20, overflow: "hidden", height: 340, cursor: "pointer", boxShadow: hoveredTeam === i ? "0 20px 50px rgba(0,0,0,0.18)" : "0 4px 20px rgba(0,0,0,0.08)", transform: hoveredTeam === i ? "translateY(-8px)" : "translateY(0)", transition: "all 0.35s cubic-bezier(0.34,1.2,0.64,1)" }}
            >
              <img src={m.img} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hoveredTeam === i ? "scale(1.08)" : "scale(1)", transition: "transform 0.5s ease" }} />
              {/* Default overlay */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "60px 20px 20px", background: "linear-gradient(transparent, rgba(13,19,33,0.85))", transition: "opacity 0.3s", opacity: hoveredTeam === i ? 0 : 1 }}>
                <h4 style={{ color: "#fff", fontSize: 17, fontWeight: 700, marginBottom: 2 }}>{m.name}</h4>
                <p style={{ color: m.roleColor, fontSize: 13, fontWeight: 600 }}>{m.role}</p>
              </div>
              {/* Hover overlay */}
              <div style={{ position: "absolute", inset: 0, background: "rgba(13,19,33,0.88)", backdropFilter: "blur(2px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center", opacity: hoveredTeam === i ? 1 : 0, transform: hoveredTeam === i ? "translateY(0)" : "translateY(12px)", transition: "all 0.3s ease" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", overflow: "hidden", border: `2.5px solid ${m.roleColor}`, marginBottom: 14 }}>
                  <img src={m.img} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <h4 style={{ color: "#fff", fontSize: 17, fontWeight: 700, marginBottom: 4 }}>{m.name}</h4>
                <p style={{ color: m.roleColor, fontSize: 13, fontWeight: 600, marginBottom: 12 }}>{m.role}</p>
                <p style={{ color: "#CBD5E1", fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>{m.bio}</p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                  {[Link2, Share2, X].map((Icon, j) => (
                    <a key={j} href={[m.linkedin, m.instagram, m.twitter][j]} style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", transition: "background 0.2s,border-color 0.2s" }} onMouseEnter={e => { e.currentTarget.style.background = m.roleColor; e.currentTarget.style.borderColor = m.roleColor; }} onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}>
                      <Icon size={14} />
                    </a>
                  ))}
                  <a href="#" style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", transition: "background 0.2s,border-color 0.2s" }} onMouseEnter={e => { e.currentTarget.style.background = m.roleColor; e.currentTarget.style.borderColor = m.roleColor; }} onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── AWARDS (timeline + animated carousel) ── */}
      <section ref={awardRef} style={{ background: "#0D1321", padding: "80px 64px" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <p style={{ color: "#0ABFBC", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 12 }}>RECOGNITION</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: "#fff" }}>Awards & Milestones</h2>
        </div>

        {/* Timeline */}
        <div style={{ position: "relative", display: "flex", gap: 0 }}>
          <div style={{ position: "absolute", top: 26, left: "12.5%", right: "12.5%", height: 2, background: "#1F2937" }} />
          {AWARDS.map((a, i) => (
            <div
              key={a.title}
              onClick={() => setActiveAward(i)}
              style={{ flex: 1, textAlign: "center", cursor: "pointer", position: "relative" }}
            >
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: i === activeAward ? a.bg : "#1F2937", border: `2.5px solid ${i === activeAward ? a.color : "#374151"}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", animation: i === activeAward && awardInView ? "pulse 2s infinite" : "none", transition: "all 0.4s ease" }}>
                <a.icon size={22} color={i === activeAward ? a.color : "#6B7280"} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: i === activeAward ? a.color : "#6B7280", letterSpacing: 1, transition: "color 0.3s" }}>{a.year}</div>
            </div>
          ))}
        </div>

        {/* Active award detail */}
        <div key={activeAward} style={{ background: "#161B27", border: "1px solid #262B38", borderRadius: 20, padding: "36px 40px", marginTop: 36, display: "flex", gap: 28, alignItems: "center", animation: "fadeUp 0.4s ease both" }}>
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
          {AWARDS.map((_, i) => <button key={i} onClick={() => setActiveAward(i)} style={{ width: i === activeAward ? 24 : 8, height: 8, borderRadius: 4, background: i === activeAward ? "#0ABFBC" : "#374151", border: "none", cursor: "pointer", transition: "all 0.3s" }} />)}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "80px 64px", textAlign: "center", background: "#F0FAFA" }}>
        <p style={{ color: "#0ABFBC", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 16 }}>READY TO EXPLORE?</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: "#0D1321", marginBottom: 16 }}>Adventure is better together.</h2>
        <p style={{ fontSize: 16, color: "#6B7280", marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>Let us plan your next chapter. Real routes, real people, real memories.</p>
        <button style={{ background: "#0ABFBC", color: "#fff", fontWeight: 700, fontSize: 15, padding: "15px 36px", borderRadius: 28, display: "inline-flex", alignItems: "center", gap: 10, boxShadow: "0 6px 24px rgba(10,191,188,0.4)", transition: "transform 0.2s,box-shadow 0.2s", animation: "pulse 2.5s infinite" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
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