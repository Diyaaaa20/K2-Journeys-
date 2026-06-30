import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaSearch, FaCalendarAlt, FaClock, FaUserCircle, FaTag, FaChevronRight, FaShareAlt, FaLink, FaBookmark, FaChartLine, FaEye } from "react-icons/fa";

const navLinks = ["Itinerary", "Visa", "Hotel & Air", "MICE", "Blogs", "About Us", "Contact"];
const navRoutes = { "Visa": "/visa", "MICE": "/mice", "Blogs": "/blog", "About Us": "/about", "Contact": "/contact" };
const categories = ["All", "Adventure", "Culture", "Budget Tips", "Hidden Gems", "Travel Guides"];

const featured = {
  id: 1, tag: "Adventure", tagColor: "#00bcd4",
  title: "The Ultimate Guide to Trekking Spiti Valley in Winter",
  excerpt: "Spiti in winter is not for the faint-hearted — but for those who brave it, it reveals a side of the Himalayas that most travellers never see. Here's everything you need to know.",
  author: "Kabir Thakur", date: "June 12, 2025", readTime: "8 min read", views: "12.4k",
  img: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&q=80",
};

const posts = [
  { id: 2, tag: "Culture", tagColor: "#A78BFA", title: "Why Ladakh's Monasteries Are More Than Just Monuments", excerpt: "The sound of prayer wheels, the scent of juniper incense, and the silence between mountains — Ladakh's monasteries offer something no itinerary can fully prepare you for.", author: "Saanvi Rao", date: "May 28, 2025", readTime: "6 min read", views: "8.1k", img: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=600&q=80" },
  { id: 3, tag: "Budget Tips", tagColor: "#FBBF24", title: "How to Do Manali in ₹15,000 — Including Flights", excerpt: "Yes, it's possible. We break down exactly how to stretch your budget without missing out on the best that Manali has to offer.", author: "Imran Sheikh", date: "May 10, 2025", readTime: "5 min read", views: "19.2k", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" },
  { id: 4, tag: "Hidden Gems", tagColor: "#F87171", title: "Chopta: The Uttarakhand Village Nobody Talks About", excerpt: "Forget Rishikesh and Mussoorie — Chopta is Uttarakhand's best-kept secret, with views that rival anything in the Swiss Alps.", author: "Kabir Thakur", date: "April 22, 2025", readTime: "7 min read", views: "6.7k", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80" },
  { id: 5, tag: "Travel Guides", tagColor: "#00bcd4", title: "Kashmir in Spring: The Complete 7-Day Itinerary", excerpt: "Tulip gardens, shikaras, and a food scene that will haunt you for years. Here's how to spend a perfect week in Kashmir.", author: "Saanvi Rao", date: "April 5, 2025", readTime: "9 min read", views: "22.5k", img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80" },
  { id: 6, tag: "Adventure", tagColor: "#00bcd4", title: "Paragliding in Bir Billing: Everything You Need to Know", excerpt: "It's called the paragliding capital of Asia — and for good reason. Here's our complete guide to taking the leap at Bir Billing.", author: "Imran Sheikh", date: "March 18, 2025", readTime: "6 min read", views: "9.3k", img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80" },
  { id: 7, tag: "Culture", tagColor: "#A78BFA", title: "Eating Your Way Through Kerala: A Food Lover's Journey", excerpt: "From toddy shops in Alleppey to seafood stalls in Kochi, Kerala's food culture is as rich and layered as its backwaters.", author: "Saanvi Rao", date: "March 2, 2025", readTime: "7 min read", views: "11.0k", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80" },
];

const popularTags = ["Himalayas", "Budget Travel", "Solo Travel", "Monsoon", "Winter Trek", "Food", "Culture", "Hidden Gems"];

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1600&q=80",
  "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1600&q=80",
  "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1600&q=80",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80",
];

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

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [hoveredPost, setHoveredPost] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredFeatured, setHoveredFeatured] = useState(false);
  const [savedPosts, setSavedPosts] = useState(new Set());
  const [filterChanging, setFilterChanging] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [heroRef, heroInView] = useInView(0.1);

  useEffect(() => {
    const t = setInterval(() => setHeroSlide(s => (s + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);
  const [featuredRef, featuredInView] = useInView(0.1);
  const [gridRef, gridInView] = useInView(0.05);
  const [sidebarRef, sidebarInView] = useInView(0.1);

  const filtered = posts.filter(p =>
    (activeCategory === "All" || p.tag === activeCategory) &&
    (search === "" || p.title.toLowerCase().includes(search.toLowerCase()))
  );

  const handleFilter = (cat) => {
    if (cat === activeCategory) return;
    setFilterChanging(true);
    setTimeout(() => { setActiveCategory(cat); setFilterChanging(false); }, 220);
  };

  const toggleSave = (id, e) => {
    e.stopPropagation();
    setSavedPosts(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", color: "#1A1A2E", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        button { font-family: inherit; cursor: pointer; border: none; }
        input { font-family: inherit; }
        input::placeholder { color: #9CA3AF; }
        input:focus { outline: none; }

        @keyframes fadeUp    { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeLeft  { from { opacity:0; transform:translateX(-28px); } to { opacity:1; transform:translateX(0); } }
        @keyframes fadeRight { from { opacity:0; transform:translateX(28px); } to { opacity:1; transform:translateX(0); } }
        @keyframes popIn     { from { opacity:0; transform:scale(0.92); } to { opacity:1; transform:scale(1); } }
        @keyframes shimmer   { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
        @keyframes pulse     { 0%,100%{box-shadow:0 0 0 0 rgba(10,191,188,0.4)} 50%{box-shadow:0 0 0 10px rgba(10,191,188,0)} }
        @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes spin      { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        @keyframes kenBurns  { from { transform: scale(1); } to { transform: scale(1.08); } }
        @keyframes textReveal { from { opacity:0; transform:translateY(40px) skewY(3deg); } to { opacity:1; transform:translateY(0) skewY(0); } }

        .post-card { transition: transform 0.38s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.3s ease; }
        .post-card:hover { transform: translateY(-8px) scale(1.01); box-shadow: 0 20px 50px rgba(0,0,0,0.12) !important; }
        .post-card .post-img { transition: transform 0.5s ease; }
        .post-card:hover .post-img { transform: scale(1.07); }
        .post-card .read-btn { transition: gap 0.2s, color 0.2s; }
        .post-card:hover .read-btn { color: #00bcd4; gap: 8px; }

        .tag-pill { transition: all 0.2s; }
        .tag-pill:hover { background: #00bcd4 !important; color: #fff !important; border-color: #00bcd4 !important; transform: translateY(-2px); }

        .save-btn { transition: transform 0.2s, color 0.2s; }
        .save-btn:hover { transform: scale(1.2); }

        .featured-card { transition: box-shadow 0.3s ease; }
        .featured-card:hover { box-shadow: 0 24px 64px rgba(0,0,0,0.13) !important; }
        .featured-img { transition: transform 0.6s ease; }
        .featured-card:hover .featured-img { transform: scale(1.04); }

        @media (min-width: 1025px) {
          .k2-blog-sidebar { position: sticky; top: 88px; align-self: flex-start; }
        }
        @media (max-width: 1024px) {
          .k2-blog-main { flex-direction: column !important; padding: 28px 24px 60px !important; }
          .k2-blog-sidebar { width: 100% !important; position: static !important; }
          .k2-posts-grid { grid-template-columns: 1fr !important; }
          .k2-filter-section { padding-left: 24px !important; padding-right: 24px !important; }
          .k2-featured-img-wrap { width: 100% !important; }
          .k2-featured-inner { flex-direction: column !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <header className="k2-header" style={{ position: "sticky", top: 0, zIndex: 100, background: "#fff", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", padding: "0 48px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ background: "#0D1321", color: "#fff", fontWeight: 800, fontSize: 20, padding: "5px 10px", borderRadius: 6 }}>K2</div>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "#0D1321" }}>JOURNEYS</span>
        </div>
        <nav className="k2-nav-links" style={{ display: "flex", gap: 32 }}>
          {navLinks.map(l => {
            const to = navRoutes[l];
            const isActive = l === "Blogs";
            const style = { fontSize: 14, fontWeight: 500, color: isActive ? "#00bcd4" : "#374151", borderBottom: isActive ? "2px solid #00bcd4" : "2px solid transparent", paddingBottom: 4, transition: "color 0.2s" };
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
          {navLinks.map(l => {
            const to = navRoutes[l];
            const isActive = l === "Blogs";
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
      <section ref={heroRef} style={{ position: "relative", minHeight: 580, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>

        {/* Sliding background images with Ken Burns */}
        {HERO_IMAGES.map((img, i) => (
          <div key={i} style={{
            position: "absolute", inset: 0,
            backgroundImage: `url('${img}')`,
            backgroundSize: "cover", backgroundPosition: "center",
            opacity: heroSlide === i ? 1 : 0,
            animation: heroSlide === i ? "kenBurns 6s ease forwards" : "none",
            transition: "opacity 1.4s ease-in-out",
            willChange: "opacity, transform",
          }} />
        ))}

        {/* Dark gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(13,19,33,0.6) 0%, rgba(13,19,33,0.75) 100%)" }} />

        {/* Bottom fade to white so it blends into next section */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, background: "linear-gradient(to bottom, transparent, #fff)" }} />

        {/* Slide dot indicators */}
        <div style={{ position: "absolute", bottom: 116, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 3 }}>
          {HERO_IMAGES.map((_, i) => (
            <button key={i} onClick={() => setHeroSlide(i)} style={{ width: i === heroSlide ? 28 : 8, height: 8, borderRadius: 4, background: i === heroSlide ? "#00bcd4" : "rgba(255,255,255,0.45)", border: "none", cursor: "pointer", transition: "all 0.35s ease", padding: 0 }} />
          ))}
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "80px 64px 120px", width: "100%" }}>
          <p style={{ color: "#00bcd4", fontSize: 12.5, fontWeight: 700, letterSpacing: 4, marginBottom: 16, animation: heroInView ? "textReveal 0.6s ease both" : "none" }}>
            TRAVEL STORIES & TIPS
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 64, fontWeight: 700, color: "#fff", marginBottom: 20, lineHeight: 1.08, textShadow: "0 4px 24px rgba(0,0,0,0.4)", animation: heroInView ? "textReveal 0.7s ease 0.12s both" : "none" }}>
            The K2 Journal
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.82)", lineHeight: 1.75, maxWidth: 520, margin: "0 auto 40px", animation: heroInView ? "textReveal 0.7s ease 0.22s both" : "none" }}>
            Real stories from the road. Honest guides from people who've actually been there. No sponsored fluff.
          </p>

          {/* Search bar */}
          <div style={{ position: "relative", display: "inline-flex", width: 500, animation: heroInView ? "popIn 0.6s ease 0.34s both" : "none" }}>
            <FaSearch size={17} color="#9CA3AF" style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: "100%", padding: "16px 20px 16px 50px", borderRadius: 32, border: "2px solid transparent", fontSize: 14, color: "#0D1321", background: "rgba(255,255,255,0.96)", boxShadow: "0 8px 32px rgba(0,0,0,0.25)", transition: "border-color 0.25s, box-shadow 0.25s" }}
              onFocus={e => { e.target.style.borderColor = "#00bcd4"; e.target.style.boxShadow = "0 0 0 4px rgba(10,191,188,0.25), 0 8px 32px rgba(0,0,0,0.25)"; }}
              onBlur={e => { e.target.style.borderColor = "transparent"; e.target.style.boxShadow = "0 8px 32px rgba(0,0,0,0.25)"; }}
            />
            {search && (
              <button onClick={() => setSearch("")} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: "#0D1321", border: "none", borderRadius: "50%", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", cursor: "pointer" }}>✕</button>
            )}
          </div>

          {/* Stats as frosted pills */}
          <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 32, animation: heroInView ? "fadeUp 0.7s ease 0.44s both" : "none" }}>
            {[{ icon: FaChartLine, label: "7 Articles", color: "#00bcd4" }, { icon: FaUserCircle, label: "3 Writers", color: "#A78BFA" }, { icon: FaEye, label: "89k+ Reads", color: "#F87171" }].map(({ icon: Icon, label, color }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,0.13)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.22)", borderRadius: 24, padding: "9px 18px", color: "#fff", fontSize: 13.5, fontWeight: 500 }}>
                <Icon size={14} color={color} /> {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section ref={featuredRef} className="k2-filter-section" style={{ padding: "56px 64px 0" }}>
        <p style={{ color: "#00bcd4", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 20, animation: featuredInView ? "fadeLeft 0.6s ease both" : "none" }}>FEATURED STORY</p>
        <div
          className="featured-card k2-featured-inner"
          onMouseEnter={() => setHoveredFeatured(true)}
          onMouseLeave={() => setHoveredFeatured(false)}
          style={{ display: "flex", gap: 0, alignItems: "stretch", background: "#F9FAFB", borderRadius: 24, overflow: "hidden", border: "1px solid #E5E7EB", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", animation: featuredInView ? "fadeUp 0.7s ease 0.1s both" : "none" }}
        >
          <div className="k2-featured-img-wrap" style={{ width: 480, flexShrink: 0, overflow: "hidden", position: "relative" }}>
            <img src={featured.img} alt={featured.title} className="featured-img" style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: 340, display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, transparent 60%, rgba(249,250,251,${hoveredFeatured ? 0.3 : 0.1}))`, transition: "all 0.4s" }} />
            <span style={{ position: "absolute", top: 18, left: 18, background: featured.tagColor, color: "#fff", fontSize: 12, fontWeight: 700, padding: "5px 13px", borderRadius: 12 }}>{featured.tag}</span>
          </div>
          <div style={{ padding: "40px 44px 40px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#9CA3AF", fontSize: 13, marginBottom: 16 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><FaUserCircle size={13} />{featured.author}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><FaCalendarAlt size={13} />{featured.date}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><FaClock size={13} />{featured.readTime}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><FaEye size={13} />{featured.views}</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, color: "#0D1321", lineHeight: 1.3, marginBottom: 16, transition: "color 0.2s" }}>{featured.title}</h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#6B7280", marginBottom: 28 }}>{featured.excerpt}</p>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <Link to={`/blog/${featured.id}`} style={{ background: "#00bcd4", color: "#fff", fontWeight: 700, fontSize: 14, padding: "12px 26px", borderRadius: 22, display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 4px 16px rgba(10,191,188,0.3)", transition: "transform 0.2s, box-shadow 0.2s", textDecoration: "none" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(10,191,188,0.4)"; }} onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 16px rgba(10,191,188,0.3)"; }}>
                Read Story <FaArrowRight size={14} />
              </Link>
              <button onClick={(e) => toggleSave(featured.id, e)} className="save-btn" style={{ width: 40, height: 40, borderRadius: "50%", border: "1.5px solid #E5E7EB", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: savedPosts.has(featured.id) ? "#00bcd4" : "#9CA3AF" }}>
                <FaBookmark size={16} color={savedPosts.has(featured.id) ? "#00bcd4" : "#9CA3AF"} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section className="k2-filter-section" style={{ padding: "48px 64px 0" }}>
        <div className="k2-category-filter" style={{ display: "flex", gap: 8, flexWrap: "wrap", background: "#F9FAFB", borderRadius: 18, padding: "10px 12px", display: "inline-flex", border: "1px solid #F3F4F6" }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              style={{
                padding: "9px 20px", borderRadius: 16, fontSize: 13.5, fontWeight: 600,
                background: cat === activeCategory ? "#00bcd4" : "transparent",
                color: cat === activeCategory ? "#fff" : "#6B7280",
                border: "none",
                boxShadow: cat === activeCategory ? "0 4px 14px rgba(10,191,188,0.3)" : "none",
                transition: "all 0.25s cubic-bezier(0.34,1.2,0.64,1)",
                transform: cat === activeCategory ? "scale(1.04)" : "scale(1)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        {search && <p style={{ marginTop: 14, fontSize: 13.5, color: "#9CA3AF" }}>Showing results for <strong style={{ color: "#0D1321" }}>"{search}"</strong> — {filtered.length} article{filtered.length !== 1 ? "s" : ""}</p>}
      </section>

      {/* POSTS GRID + SIDEBAR */}
      <section className="k2-blog-main" style={{ padding: "36px 64px 80px", display: "flex", gap: 40, alignItems: "flex-start" }}>
        <div ref={gridRef} style={{ flex: 1 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#9CA3AF", animation: "fadeUp 0.4s ease both" }}>
              <FaSearch size={40} color="#D1D5DB" style={{ marginBottom: 16 }} />
              <p style={{ fontSize: 18, fontWeight: 600, color: "#6B7280" }}>No articles found</p>
              <p style={{ fontSize: 14, marginTop: 8 }}>Try a different search or category</p>
            </div>
          ) : (
            <div className="k2-posts-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
              {filtered.map((post, i) => (
                <article
                  key={post.id}
                  className="post-card"
                  onMouseEnter={() => setHoveredPost(post.id)}
                  onMouseLeave={() => setHoveredPost(null)}
                  style={{
                    background: "#fff", border: "1px solid #E5E7EB", borderRadius: 20,
                    overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                    cursor: "pointer",
                    opacity: filterChanging ? 0 : 1,
                    transform: filterChanging ? "translateY(12px)" : undefined,
                    animation: gridInView && !filterChanging ? `fadeUp 0.55s ease ${i * 0.08}s both` : "none",
                    transition: filterChanging ? "opacity 0.2s, transform 0.2s" : undefined,
                  }}
                >
                  {/* Image with overlay */}
                  <div style={{ overflow: "hidden", position: "relative", height: 210 }}>
                    <img src={post.img} alt={post.title} className="post-img" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    <div style={{ position: "absolute", inset: 0, background: `rgba(10,191,188,${hoveredPost === post.id ? 0.12 : 0})`, transition: "background 0.4s" }} />
                    <span style={{ position: "absolute", top: 14, left: 14, background: `${post.tagColor}ee`, color: "#fff", fontSize: 11.5, fontWeight: 700, padding: "4px 12px", borderRadius: 10 }}>{post.tag}</span>
                    <button onClick={(e) => toggleSave(post.id, e)} className="save-btn" style={{ position: "absolute", top: 12, right: 12, width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.92)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", color: savedPosts.has(post.id) ? "#00bcd4" : "#9CA3AF", opacity: hoveredPost === post.id ? 1 : 0, transition: "opacity 0.25s" }}>
                      <FaBookmark size={14} color={savedPosts.has(post.id) ? "#00bcd4" : "#9CA3AF"} />
                    </button>
                  </div>

                  <div style={{ padding: "22px 22px 24px" }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18.5, fontWeight: 700, color: "#0D1321", lineHeight: 1.35, marginBottom: 10, transition: "color 0.2s" }}>{post.title}</h3>
                    <p style={{ fontSize: 13.5, lineHeight: 1.72, color: "#6B7280", marginBottom: 18 }}>{post.excerpt}</p>
                    <div style={{ borderTop: "1px solid #F3F4F6", paddingTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#9CA3AF", fontSize: 12 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><FaUserCircle size={12} />{post.author}</span>
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><FaClock size={12} />{post.readTime}</span>
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><FaEye size={12} />{post.views}</span>
                      </div>
                      <Link to={`/blog/${post.id}`} className="read-btn" style={{ background: "transparent", color: "#00bcd4", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", gap: 4, textDecoration: "none" }}>
                        Read <FaArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div ref={sidebarRef} className="k2-blog-sidebar" style={{ width: 280, flexShrink: 0, display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Popular Tags */}
          <div style={{ background: "#F9FAFB", borderRadius: 18, padding: "24px 22px", border: "1px solid #E5E7EB", animation: sidebarInView ? "fadeRight 0.6s ease 0.1s both" : "none" }}>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: "#0D1321", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}><FaTag size={15} color="#00bcd4" /> Popular Tags</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {popularTags.map(tag => (
                <span key={tag} className="tag-pill" onClick={() => setSearch(tag)} style={{ background: "#fff", border: "1.5px solid #E5E7EB", color: "#374151", fontSize: 12.5, fontWeight: 500, padding: "5px 13px", borderRadius: 14, cursor: "pointer" }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Trending */}
          <div style={{ background: "#fff", borderRadius: 18, padding: "22px", border: "1px solid #E5E7EB", animation: sidebarInView ? "fadeRight 0.6s ease 0.2s both" : "none" }}>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: "#0D1321", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}><FaChartLine size={15} color="#F87171" /> Most Read</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {posts.slice(0, 3).map((p, i) => (
                <div key={p.id} style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer", transition: "opacity 0.2s" }} onMouseEnter={e => e.currentTarget.style.opacity = "0.75"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#E5E7EB", lineHeight: 1, minWidth: 28 }}>0{i + 1}</span>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#0D1321", lineHeight: 1.4, marginBottom: 4 }}>{p.title}</p>
                    <p style={{ fontSize: 11.5, color: "#9CA3AF" }}>{p.readTime} · {p.views} views</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ background: "linear-gradient(135deg, #00bcd4, #0891b2)", borderRadius: 18, padding: "28px 24px", color: "#fff", animation: sidebarInView ? "fadeRight 0.6s ease 0.3s both" : "none", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -30, right: -30, width: 110, height: 110, borderRadius: "50%", background: "rgba(255,255,255,0.1)", animation: "float 4s ease-in-out infinite" }} />
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, marginBottom: 10, position: "relative" }}>Plan your next journey</h4>
            <p style={{ fontSize: 13.5, lineHeight: 1.65, marginBottom: 20, opacity: 0.9, position: "relative" }}>Inspired by what you read? Let us turn it into a real trip.</p>
            <button style={{ background: "#fff", color: "#00bcd4", fontWeight: 700, fontSize: 13.5, padding: "11px 20px", borderRadius: 20, display: "flex", alignItems: "center", gap: 8, width: "100%", justifyContent: "center", position: "relative", transition: "transform 0.2s, box-shadow 0.2s", animation: "pulse 3s infinite" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform = ""}>
              Talk to Our Team <FaArrowRight size={13} />
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
        <div style={{ display: "flex", gap: 20 }}>
          <span style={{ color: "#6B7280" }}>Privacy Policy</span>
          <span style={{ color: "#6B7280" }}>Terms & Conditions</span>
        </div>
      </div>
    </footer>
  );
}
