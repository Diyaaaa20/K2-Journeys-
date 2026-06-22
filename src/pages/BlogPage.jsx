import { useState, useEffect, useRef } from "react";

/* ─── colour tokens ─────────────────────────────────────────── */
const C = {
  navy:      "#0D1321",
  navyLight: "#151E2E",
  navyCard:  "#1A2438",
  teal:      "#1F8A8C",
  rose:      "#D45B72",
  cream:     "#F4F0E8",
  gold:      "#D79A3B",
};

const fontStyle = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');`;

/* ─── scroll reveal hook ────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── data ──────────────────────────────────────────────────── */
const CATEGORIES = [
  "All", "Visa Tips", "Travel Guides", "Adventure",
  "Luxury Travel", "Budget Travel", "Digital Nomad",
  "Study Abroad", "Family Travel", "Food & Culture",
];

const ARTICLES = [
  {
    id: 1, seed: "blog-japan-village",
    title: "Hidden Villages of Japan",
    category: "Travel Guide",
    author: "Kabir Thakur", date: "June 12, 2026",
    readTime: "6 min read",
    excerpt: "Beyond Tokyo's neon glow lie ancient villages where time stands still — we found them.",
    tag: "🇯🇵 Japan",
  },
  {
    id: 2, seed: "blog-swiss-alps",
    title: "Swiss Alps: A Winter Adventure Guide",
    category: "Luxury Travel",
    author: "Saanvi Rao", date: "June 5, 2026",
    readTime: "8 min read",
    excerpt: "From Zermatt to Interlaken — the ultimate guide to skiing the Alps in style.",
    tag: "🇨🇭 Switzerland",
  },
  {
    id: 3, seed: "blog-dubai-visa",
    title: "Dubai Visa Guide for Indian Travellers",
    category: "Visa Tips",
    author: "Rahul Nair", date: "May 28, 2026",
    readTime: "5 min read",
    excerpt: "Everything you need to know to get your Dubai visa approved in under 72 hours.",
    tag: "🇦🇪 Dubai",
  },
  {
    id: 4, seed: "blog-paris-food",
    title: "Eating Your Way Through Paris",
    category: "Food & Culture",
    author: "Meera Patel", date: "May 20, 2026",
    readTime: "7 min read",
    excerpt: "Croissants, wine and hidden bistros — a culinary journey through the city of love.",
    tag: "🇫🇷 France",
  },
  {
    id: 5, seed: "blog-australia-nomad",
    title: "Digital Nomad in Australia: Full Guide",
    category: "Digital Nomad",
    author: "Arjun Shah", date: "May 14, 2026",
    readTime: "10 min read",
    excerpt: "Co-working spaces, visa options and the best cities for remote workers Down Under.",
    tag: "🇦🇺 Australia",
  },
  {
    id: 6, seed: "blog-italy-amalfi",
    title: "The Amalfi Coast: Off the Beaten Path",
    category: "Adventure",
    author: "Kabir Thakur", date: "May 2, 2026",
    readTime: "6 min read",
    excerpt: "Skip the tourist crowds and discover the real Amalfi through hidden trails and sea caves.",
    tag: "🇮🇹 Italy",
  },
];

const DEST_EXPLORE = [
  { name: "Japan",       seed: "explore-japan",       count: 24, flag: "🇯🇵" },
  { name: "Dubai",       seed: "explore-dubai",       count: 18, flag: "🇦🇪" },
  { name: "Switzerland", seed: "explore-swiss",       count: 15, flag: "🇨🇭" },
  { name: "Australia",   seed: "explore-australia",   count: 21, flag: "🇦🇺" },
  { name: "Italy",       seed: "explore-italy",       count: 19, flag: "🇮🇹" },
  { name: "Iceland",     seed: "explore-iceland",     count: 12, flag: "🇮🇸" },
  { name: "Bali",        seed: "explore-bali",        count: 16, flag: "🇮🇩" },
  { name: "Canada",      seed: "explore-canada",      count: 14, flag: "🇨🇦" },
];

const MASONRY = [
  { seed:"masonry-temple",  title:"Temples of Kyoto", cat:"Travel Guide",  size:"tall"  },
  { seed:"masonry-food",    title:"Street Food in Bangkok", cat:"Food & Culture", size:"short" },
  { seed:"masonry-visa",    title:"Schengen Visa Tips", cat:"Visa Tips", size:"short" },
  { seed:"masonry-alps",    title:"Alps Sunrise Trek", cat:"Adventure", size:"tall"  },
  { seed:"masonry-family",  title:"Family Trip to Bali", cat:"Family Travel", size:"short" },
  { seed:"masonry-nomad",   title:"Nomad Life in Lisbon", cat:"Digital Nomad", size:"tall"  },
  { seed:"masonry-student", title:"Study Abroad in UK",   cat:"Study Abroad",  size:"short" },
  { seed:"masonry-luxury",  title:"Luxury Maldives Stay", cat:"Luxury Travel", size:"short" },
  { seed:"masonry-budget",  title:"Europe on $50/Day",    cat:"Budget Travel", size:"tall"  },
];

/* ─── helpers ───────────────────────────────────────────────── */
const CATEGORY_COLORS = {
  "Travel Guide": C.teal,
  "Luxury Travel": C.gold,
  "Visa Tips": C.rose,
  "Food & Culture": "#A78BFA",
  "Digital Nomad": "#34D399",
  "Adventure": "#F97316",
  "Family Travel": "#60A5FA",
  "Study Abroad": "#E879F9",
  "Budget Travel": "#FBBF24",
};
function catColor(cat) { return CATEGORY_COLORS[cat] ?? C.teal; }
function hexRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}

/* ══════════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════════ */
function BlogHero() {
  return (
    <section style={{
      position:"relative", height:"85vh", minHeight:580,
      display:"flex", alignItems:"center", justifyContent:"center",
      textAlign:"center", overflow:"hidden",
      backgroundImage:"url(https://picsum.photos/seed/blog-hero-travel/1920/1080)",
      backgroundSize:"cover", backgroundPosition:"center",
      backgroundAttachment:"fixed",
    }}>
      <div style={{
        position:"absolute", inset:0,
        background:"linear-gradient(to bottom,rgba(13,19,33,0.5) 0%,rgba(13,19,33,0.8) 60%,rgba(13,19,33,1) 100%)",
      }} />
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:`radial-gradient(ellipse 70% 60% at 50% 40%, rgba(31,138,140,0.15) 0%, transparent 70%)`,
      }} />

      <div style={{
        position:"relative", zIndex:1, maxWidth:820, padding:"0 24px",
        animation:"heroIn 1s ease both",
      }}>
        <span style={{
          display:"inline-block",
          background:`linear-gradient(135deg,${C.rose},#A855F7)`,
          color:"#fff", borderRadius:50, padding:"6px 20px",
          fontFamily:"Inter", fontSize:11, fontWeight:700,
          letterSpacing:3, textTransform:"uppercase", marginBottom:24,
        }}>✦ Featured Story</span>

        <h1 style={{
          fontFamily:"'Playfair Display',serif",
          fontSize:"clamp(2.6rem,6vw,5rem)",
          fontWeight:700, color:C.cream, lineHeight:1.1,
          margin:"0 0 20px",
          textShadow:"0 4px 30px rgba(0,0,0,0.4)",
        }}>
          Discover Extraordinary<br />
          <em style={{ color:C.teal }}>Journeys</em> Around the World
        </h1>

        <p style={{
          fontFamily:"Inter", fontSize:"clamp(1rem,1.4vw,1.15rem)",
          color:"rgba(244,240,232,0.75)", lineHeight:1.8,
          margin:"0 0 40px", fontWeight:300,
        }}>
          Travel guides, visa insights, hidden gems and unforgettable adventures — curated by experts who've been there.
        </p>

        <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
          <button style={heroBtnPrimary}>Explore Articles →</button>
          <button style={heroBtnOutline}>Visa Guides</button>
        </div>
      </div>

      {/* scroll indicator */}
      <div style={{
        position:"absolute", bottom:32, left:"50%", transform:"translateX(-50%)",
        display:"flex", flexDirection:"column", alignItems:"center", gap:8,
        color:"rgba(244,240,232,0.35)", fontFamily:"Inter", fontSize:11,
        letterSpacing:2, textTransform:"uppercase",
        animation:"scrollPulse 2s ease infinite",
      }}>
        <span>Scroll</span>
        <div style={{ width:1, height:32, background:"rgba(244,240,232,0.25)" }} />
      </div>
    </section>
  );
}
const heroBtnPrimary = {
  background:`linear-gradient(135deg,${C.teal},#0E5C5E)`,
  color:"#fff", border:"none", borderRadius:50,
  padding:"14px 36px", fontFamily:"Inter",
  fontSize:15, fontWeight:600, cursor:"pointer",
  boxShadow:`0 8px 30px rgba(31,138,140,0.4)`,
};
const heroBtnOutline = {
  background:"rgba(255,255,255,0.07)", backdropFilter:"blur(10px)",
  color:C.cream, border:"1px solid rgba(255,255,255,0.2)",
  borderRadius:50, padding:"14px 36px", fontFamily:"Inter",
  fontSize:15, fontWeight:500, cursor:"pointer",
};

/* ══════════════════════════════════════════════════════════════
   CATEGORY FILTER
══════════════════════════════════════════════════════════════ */
function CategoryFilter({ active, onChange }) {
  return (
    <section style={{
      background: C.navyLight,
      borderBottom:"1px solid rgba(255,255,255,0.06)",
      padding:"20px 0",
      position:"sticky", top:53, zIndex:50,
    }}>
      <div style={{
        maxWidth:1280, margin:"0 auto", padding:"0 8vw",
        display:"flex", gap:10, overflowX:"auto",
        scrollbarWidth:"none",
      }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => onChange(cat)} style={{
            flexShrink:0, borderRadius:50,
            padding:"9px 20px", fontFamily:"Inter", fontSize:13, fontWeight:600,
            cursor:"pointer", border:"1px solid transparent",
            whiteSpace:"nowrap", transition:"all 0.3s ease",
            background: active === cat
              ? `linear-gradient(135deg,${C.teal},#0E5C5E)`
              : "rgba(255,255,255,0.05)",
            color: active === cat ? "#fff" : "rgba(244,240,232,0.55)",
            borderColor: active === cat ? "transparent" : "rgba(255,255,255,0.08)",
            boxShadow: active === cat ? `0 4px 20px rgba(31,138,140,0.4)` : "none",
          }}>
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   TRENDING ARTICLES GRID
══════════════════════════════════════════════════════════════ */
function TrendingArticles({ activeCategory }) {
  const [ref, visible] = useReveal();

  const filtered = activeCategory === "All"
    ? ARTICLES
    : ARTICLES.filter(a => a.category === activeCategory);

  return (
    <section ref={ref} style={{
      background: C.navy, padding:"100px 8vw",
    }}>
      <div style={{ marginBottom:56 }}>
        <span style={sectionLabel}>Trending Now</span>
        <h2 style={sectionTitle}>Most Loved Stories This Month</h2>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign:"center", padding:"60px 0", color:"rgba(244,240,232,0.35)",
          fontFamily:"Inter", fontSize:16 }}>
          No articles in this category yet. Check back soon!
        </div>
      ) : (
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",
          gap:28,
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(40px)",
          transition:"all 0.8s ease",
        }}>
          {filtered.map((article, i) => (
            <ArticleCard key={article.id} article={article} delay={i * 80} visible={visible} />
          ))}
        </div>
      )}
    </section>
  );
}

function ArticleCard({ article, delay, visible }) {
  const [hovered, setHovered] = useState(false);
  const color = catColor(article.category);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius:20, overflow:"hidden",
        background: C.navyCard, cursor:"pointer",
        border:`1px solid ${hovered ? `rgba(${hexRgb(color)},0.3)` : "rgba(255,255,255,0.07)"}`,
        boxShadow: hovered ? `0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(${hexRgb(color)},0.12)` : "none",
        transform: hovered ? "translateY(-8px)" : "none",
        transition:"all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        opacity: visible ? 1 : 0,
        transitionDelay:`${delay}ms`,
      }}
    >
      {/* image */}
      <div style={{ height:220, overflow:"hidden", position:"relative" }}>
        <div style={{
          position:"absolute", inset:0,
          backgroundImage:`url(https://picsum.photos/seed/${article.seed}/600/400)`,
          backgroundSize:"cover", backgroundPosition:"center",
          transform: hovered ? "scale(1.07)" : "scale(1)",
          transition:"transform 0.6s ease",
        }} />
        <div style={{
          position:"absolute", inset:0,
          background:"linear-gradient(to top,rgba(26,36,56,0.8) 0%,transparent 60%)",
        }} />
        <span style={{
          position:"absolute", top:14, left:14,
          background:"rgba(13,19,33,0.7)", backdropFilter:"blur(8px)",
          borderRadius:50, padding:"5px 14px",
          fontFamily:"Inter", fontSize:12, color:C.cream,
        }}>{article.tag}</span>
      </div>

      {/* body */}
      <div style={{ padding:"22px 24px" }}>
        <span style={{
          fontFamily:"Inter", fontSize:11, fontWeight:700,
          letterSpacing:1, textTransform:"uppercase",
          color, background:`rgba(${hexRgb(color)},0.12)`,
          border:`1px solid rgba(${hexRgb(color)},0.25)`,
          borderRadius:50, padding:"4px 12px",
        }}>{article.category}</span>

        <h3 style={{
          fontFamily:"'Playfair Display',serif", fontSize:22,
          fontWeight:700, color:C.cream, margin:"14px 0 10px", lineHeight:1.3,
        }}>{article.title}</h3>

        <p style={{
          fontFamily:"Inter", fontSize:14,
          color:"rgba(244,240,232,0.55)", lineHeight:1.8, margin:"0 0 18px",
        }}>{article.excerpt}</p>

        <div style={{
          display:"flex", justifyContent:"space-between", alignItems:"center",
          paddingTop:16, borderTop:"1px solid rgba(255,255,255,0.06)",
        }}>
          <div style={{ fontFamily:"Inter", fontSize:12, color:"rgba(244,240,232,0.4)" }}>
            {article.author} · {article.date}
          </div>
          <span style={{ fontFamily:"Inter", fontSize:12, color, fontWeight:600 }}>
            {article.readTime} →
          </span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   EXPLORE BY DESTINATION
══════════════════════════════════════════════════════════════ */
function ExploreDestinations() {
  const [ref, visible] = useReveal();
  const scrollRef = useRef(null);
  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir * 340, behavior:"smooth" });

  return (
    <section ref={ref} style={{
      background: C.navyLight, padding:"100px 0",
    }}>
      <div style={{ padding:"0 8vw", marginBottom:56 }}>
        <span style={sectionLabel}>Explore by Destination</span>
        <h2 style={sectionTitle}>Where Do You Want to Read About?</h2>
      </div>

      <div style={{ position:"relative", padding:"0 8vw" }}>
        <button onClick={() => scroll(-1)} style={carBtn("left")}>&#8592;</button>
        <button onClick={() => scroll(1)}  style={carBtn("right")}>&#8594;</button>

        <div ref={scrollRef} style={{
          display:"flex", gap:20, overflowX:"auto",
          scrollbarWidth:"none", paddingBottom:4,
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(24px)",
          transition:"all 0.8s ease",
        }}>
          {DEST_EXPLORE.map((d) => (
            <DestCard key={d.name} dest={d} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DestCard({ dest }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink:0, width:260, height:380,
        borderRadius:20, overflow:"hidden",
        position:"relative", cursor:"pointer",
        transform: hovered ? "scale(1.04)" : "scale(1)",
        transition:"transform 0.4s ease",
      }}
    >
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:`url(https://picsum.photos/seed/${dest.seed}/600/900)`,
        backgroundSize:"cover", backgroundPosition:"center",
        transform: hovered ? "scale(1.08)" : "scale(1)",
        transition:"transform 0.6s ease",
      }} />
      <div style={{
        position:"absolute", inset:0,
        background:`linear-gradient(to top, rgba(13,19,33,0.92) 0%, rgba(13,19,33,0.2) 55%, transparent 100%)`,
      }} />
      {hovered && <div style={{
        position:"absolute", inset:0, borderRadius:20,
        boxShadow:`inset 0 0 60px rgba(31,138,140,0.3)`,
      }} />}

      <div style={{ position:"absolute", bottom:24, left:20 }}>
        <div style={{ fontSize:32, marginBottom:8 }}>{dest.flag}</div>
        <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:24,
          fontWeight:700, color:C.cream, margin:"0 0 6px" }}>{dest.name}</h3>
        <p style={{ fontFamily:"Inter", fontSize:12,
          color:"rgba(244,240,232,0.55)", margin:0 }}>{dest.count} Articles</p>
      </div>
    </div>
  );
}

function carBtn(side) {
  return {
    position:"absolute", top:"45%", transform:"translateY(-50%)",
    [side]: "calc(8vw - 22px)", zIndex:2,
    width:44, height:44, borderRadius:"50%",
    background:"rgba(255,255,255,0.1)", backdropFilter:"blur(10px)",
    border:"1px solid rgba(255,255,255,0.18)",
    color:C.cream, fontSize:18, cursor:"pointer",
    display:"flex", alignItems:"center", justifyContent:"center",
  };
}

/* ══════════════════════════════════════════════════════════════
   EDITOR'S PICK
══════════════════════════════════════════════════════════════ */
function EditorsPick() {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} style={{
      background: C.navy, padding:"100px 8vw",
    }}>
      <div style={{
        display:"grid", gridTemplateColumns:"1fr 1fr", gap:72,
        alignItems:"center",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(40px)",
        transition:"all 0.9s ease",
      }}>
        <div style={{ borderRadius:24, overflow:"hidden", position:"relative", height:500 }}>
          <div style={{
            position:"absolute", inset:0,
            backgroundImage:"url(https://picsum.photos/seed/editors-pick-visa/1200/900)",
            backgroundSize:"cover", backgroundPosition:"center",
          }} />
          <div style={{
            position:"absolute", inset:0,
            background:"linear-gradient(135deg,rgba(13,19,33,0.3) 0%,transparent 60%)",
          }} />
          <div style={{
            position:"absolute", top:20, left:20,
            background:"rgba(13,19,33,0.75)", backdropFilter:"blur(8px)",
            borderRadius:50, padding:"6px 16px",
            fontFamily:"Inter", fontSize:11, color:C.gold,
            letterSpacing:2, textTransform:"uppercase", fontWeight:600,
          }}>★ Editor's Pick</div>
        </div>

        <div>
          <span style={{
            ...sectionLabel, fontSize:10,
            background:`rgba(${hexRgb(C.rose)},0.12)`,
            border:`1px solid rgba(${hexRgb(C.rose)},0.3)`,
            color:C.rose,
          }}>Editor's Pick</span>

          <h2 style={{
            fontFamily:"'Playfair Display',serif",
            fontSize:"clamp(1.8rem,2.8vw,2.6rem)",
            fontWeight:700, color:C.cream,
            margin:"20px 0 20px", lineHeight:1.2,
          }}>
            Visa-Free Countries Every Indian Traveller Should Visit in 2026
          </h2>

          <p style={{
            fontFamily:"Inter", fontSize:15,
            color:"rgba(244,240,232,0.6)", lineHeight:1.9, margin:"0 0 12px",
          }}>
            From Maldives to Indonesia, these stunning destinations welcome you with open arms — no visa, no stress, just unforgettable memories.
          </p>

          <div style={{ display:"flex", gap:16, margin:"20px 0 32px", flexWrap:"wrap" }}>
            {["Kabir Thakur", "June 1, 2026", "12 min read"].map((s, i) => (
              <span key={i} style={{
                fontFamily:"Inter", fontSize:12, fontWeight:500,
                color:"rgba(244,240,232,0.4)", display:"flex", alignItems:"center", gap:5,
              }}>
                {i > 0 && <span style={{ color:"rgba(244,240,232,0.15)" }}>·</span>}
                {s}
              </span>
            ))}
          </div>

          <button style={{
            background:`linear-gradient(135deg,${C.teal},#0E5C5E)`,
            color:"#fff", border:"none", borderRadius:50,
            padding:"14px 36px", fontFamily:"Inter",
            fontSize:15, fontWeight:600, cursor:"pointer",
            boxShadow:`0 8px 30px rgba(31,138,140,0.4)`,
          }}>Read Full Story →</button>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   MASONRY LATEST STORIES
══════════════════════════════════════════════════════════════ */
function LatestStories() {
  const [ref, visible] = useReveal(0.05);
  const cols = [
    MASONRY.filter((_,i) => i % 3 === 0),
    MASONRY.filter((_,i) => i % 3 === 1),
    MASONRY.filter((_,i) => i % 3 === 2),
  ];

  return (
    <section ref={ref} style={{
      background: C.navyLight, padding:"100px 8vw",
    }}>
      <div style={{ marginBottom:56 }}>
        <span style={sectionLabel}>Latest Stories</span>
        <h2 style={sectionTitle}>Fresh Off the Press</h2>
      </div>

      <div style={{
        display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:20,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(30px)",
        transition:"all 0.9s ease",
      }}>
        {cols.map((col, ci) => (
          <div key={ci} style={{ display:"flex", flexDirection:"column", gap:20 }}>
            {col.map((item) => (
              <MasonryCard key={item.seed} item={item} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function MasonryCard({ item }) {
  const [hovered, setHovered] = useState(false);
  const h = item.size === "tall" ? 340 : 220;
  const color = catColor(item.cat);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius:16, overflow:"hidden",
        background: C.navyCard, cursor:"pointer",
        border:`1px solid ${hovered ? `rgba(${hexRgb(color)},0.25)` : "rgba(255,255,255,0.06)"}`,
        transform: hovered ? "translateY(-6px)" : "none",
        transition:"all 0.4s ease",
        boxShadow: hovered ? `0 16px 50px rgba(0,0,0,0.35)` : "none",
      }}
    >
      <div style={{ height:h, overflow:"hidden", position:"relative" }}>
        <div style={{
          position:"absolute", inset:0,
          backgroundImage:`url(https://picsum.photos/seed/${item.seed}/700/500)`,
          backgroundSize:"cover", backgroundPosition:"center",
          transform: hovered ? "scale(1.07)" : "scale(1)",
          transition:"transform 0.6s ease",
        }} />
        <div style={{
          position:"absolute", inset:0,
          background:"linear-gradient(to top,rgba(26,36,56,0.6) 0%,transparent 50%)",
        }} />
      </div>
      <div style={{ padding:"16px 18px" }}>
        <span style={{
          fontFamily:"Inter", fontSize:10, fontWeight:700,
          letterSpacing:1, textTransform:"uppercase",
          color, background:`rgba(${hexRgb(color)},0.12)`,
          borderRadius:50, padding:"3px 10px",
        }}>{item.cat}</span>
        <h4 style={{
          fontFamily:"'Playfair Display',serif", fontSize:17,
          fontWeight:700, color:C.cream, margin:"10px 0 0", lineHeight:1.4,
        }}>{item.title}</h4>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   TRAVEL TIP OF THE WEEK
══════════════════════════════════════════════════════════════ */
function TravelTip() {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} style={{
      background: C.navy, padding:"80px 8vw",
    }}>
      <div style={{
        maxWidth:900, margin:"0 auto",
        background:`linear-gradient(135deg,rgba(${hexRgb(C.gold)},0.08),rgba(${hexRgb(C.teal)},0.08))`,
        border:`1px solid rgba(${hexRgb(C.gold)},0.25)`,
        borderRadius:24, padding:"52px 60px",
        display:"flex", gap:40, alignItems:"center",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(30px)",
        transition:"all 0.8s ease",
      }}>
        <div style={{
          fontSize:72, flexShrink:0,
          animation: visible ? "tipFloat 3s ease infinite" : "none",
        }}>✈️</div>
        <div>
          <span style={{
            fontFamily:"Inter", fontSize:11, fontWeight:700,
            letterSpacing:3, textTransform:"uppercase", color:C.gold,
            display:"block", marginBottom:12,
          }}>Tip of the Week</span>
          <h3 style={{
            fontFamily:"'Playfair Display',serif", fontSize:26,
            fontWeight:700, color:C.cream, margin:"0 0 14px",
          }}>Boost Your Visa Approval Chances</h3>
          <p style={{
            fontFamily:"Inter", fontSize:15, lineHeight:1.8,
            color:"rgba(244,240,232,0.65)", margin:"0 0 24px",
          }}>
            Always submit bank statements showing at least 6 months of consistent transaction history. Embassies look for financial stability, not just a large balance.
          </p>
          <button style={{
            background:`rgba(${hexRgb(C.gold)},0.12)`,
            border:`1px solid rgba(${hexRgb(C.gold)},0.35)`,
            color:C.gold, borderRadius:50, padding:"10px 24px",
            fontFamily:"Inter", fontSize:13, fontWeight:600, cursor:"pointer",
          }}>More Travel Tips →</button>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   NEWSLETTER
══════════════════════════════════════════════════════════════ */
function Newsletter() {
  const [ref, visible] = useReveal();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const submit = (e) => { e.preventDefault(); if (email) setDone(true); };

  return (
    <section ref={ref} style={{
      background: C.navyLight, padding:"100px 8vw", textAlign:"center",
      backgroundImage:`radial-gradient(ellipse 60% 60% at 50% 50%, rgba(31,138,140,0.08) 0%, transparent 70%)`,
    }}>
      <div style={{
        maxWidth:600, margin:"0 auto",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(30px)",
        transition:"all 0.8s ease",
      }}>
        <span style={sectionLabel}>Newsletter</span>
        <h2 style={{ ...sectionTitle, marginBottom:12 }}>Stay Inspired</h2>
        <p style={{
          fontFamily:"Inter", fontSize:15,
          color:"rgba(244,240,232,0.55)", lineHeight:1.8, marginBottom:36,
        }}>
          Receive travel inspiration, visa updates and destination guides every week — no spam, ever.
        </p>

        {done ? (
          <div style={{
            padding:"28px 32px", borderRadius:16,
            background:`rgba(${hexRgb(C.teal)},0.1)`,
            border:`1px solid rgba(${hexRgb(C.teal)},0.3)`,
          }}>
            <div style={{ fontSize:40, marginBottom:12 }}>🎉</div>
            <p style={{ fontFamily:"'Playfair Display',serif", fontSize:20,
              color:C.cream, margin:0, fontWeight:600 }}>
              You're in! Welcome to the K2 Journeys community.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} style={{
            display:"flex", gap:12, flexWrap:"wrap", justifyContent:"center",
          }}>
            <input
              type="email" value={email} required
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address"
              style={{
                flex:"1 1 260px", padding:"15px 22px",
                background:"rgba(255,255,255,0.05)",
                border:"1px solid rgba(255,255,255,0.12)",
                borderRadius:50, fontFamily:"Inter", fontSize:15,
                color:C.cream, outline:"none",
              }}
              onFocus={e => e.target.style.borderColor = C.teal}
              onBlur={e  => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
            />
            <button type="submit" style={{
              background:`linear-gradient(135deg,${C.rose},#A855F7)`,
              color:"#fff", border:"none", borderRadius:50,
              padding:"15px 32px", fontFamily:"Inter",
              fontSize:15, fontWeight:600, cursor:"pointer", flexShrink:0,
              boxShadow:`0 8px 30px rgba(212,91,114,0.4)`,
            }}>Subscribe →</button>
          </form>
        )}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   FINAL CTA
══════════════════════════════════════════════════════════════ */
function BlogCTA() {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} style={{
      position:"relative", overflow:"hidden",
      padding:"130px 8vw", textAlign:"center",
      backgroundImage:"url(https://picsum.photos/seed/blog-cta-adventure/1920/1080)",
      backgroundSize:"cover", backgroundPosition:"center",
      backgroundAttachment:"fixed",
    }}>
      <div style={{
        position:"absolute", inset:0,
        background:"linear-gradient(135deg,rgba(13,19,33,0.88) 0%,rgba(13,19,33,0.75) 100%)",
      }} />
      <div style={{
        position:"relative", zIndex:1,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(40px)",
        transition:"all 1s ease",
      }}>
        <h2 style={{
          fontFamily:"'Playfair Display',serif",
          fontSize:"clamp(2.2rem,4.5vw,4rem)",
          fontWeight:700, color:C.cream, margin:"0 0 20px", lineHeight:1.15,
        }}>
          Ready for Your<br /><em style={{ color:C.teal }}>Next Journey?</em>
        </h2>
        <p style={{
          fontFamily:"Inter", fontSize:"clamp(0.95rem,1.3vw,1.1rem)",
          color:"rgba(244,240,232,0.65)", maxWidth:520,
          margin:"0 auto 44px", lineHeight:1.8, fontWeight:300,
        }}>
          From visa assistance to unforgettable travel experiences, K2 Journeys helps you explore the world with confidence.
        </p>
        <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
          <button style={{
            background:`linear-gradient(135deg,${C.teal},#0E5C5E)`,
            color:"#fff", border:"none", borderRadius:50,
            padding:"16px 42px", fontFamily:"Inter",
            fontSize:16, fontWeight:600, cursor:"pointer",
            boxShadow:`0 8px 40px rgba(31,138,140,0.5)`,
          }}>Start Planning Today →</button>
          <button style={{
            background:"rgba(255,255,255,0.07)", backdropFilter:"blur(10px)",
            color:C.cream, border:"1px solid rgba(255,255,255,0.2)",
            borderRadius:50, padding:"16px 42px", fontFamily:"Inter",
            fontSize:16, fontWeight:500, cursor:"pointer",
          }}>Apply For Visa</button>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   SHARED STYLES
══════════════════════════════════════════════════════════════ */
const sectionLabel = {
  display:"inline-block",
  fontFamily:"Inter", fontSize:11, fontWeight:600,
  letterSpacing:4, textTransform:"uppercase", color:C.teal,
  background:`rgba(${hexRgb(C.teal)},0.12)`,
  border:`1px solid rgba(${hexRgb(C.teal)},0.3)`,
  borderRadius:50, padding:"6px 18px", marginBottom:16,
};
const sectionTitle = {
  fontFamily:"'Playfair Display',serif",
  fontSize:"clamp(2rem,3.5vw,3rem)",
  fontWeight:700, color:C.cream, margin:"0 0 16px", lineHeight:1.15,
};

/* ══════════════════════════════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════════════════════════════ */
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <>
      <style>{fontStyle}</style>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0D1321; }
        ::-webkit-scrollbar-thumb { background: #1F8A8C; border-radius: 3px; }
        @keyframes heroIn {
          from { opacity: 0; transform: translateY(50px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollPulse {
          0%,100% { opacity:0.35; transform: translateX(-50%) translateY(0); }
          50%      { opacity:0.7;  transform: translateX(-50%) translateY(8px); }
        }
        @keyframes tipFloat {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-8px) rotate(5deg); }
        }
        input::placeholder { color: rgba(244,240,232,0.25); }
        div[style*="overflow-x: auto"]::-webkit-scrollbar,
        div[style*="overflowX"]::-webkit-scrollbar { display: none; }
      `}</style>

      <div style={{ background:C.navy, minHeight:"100vh" }}>
        <BlogHero />
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
        <TrendingArticles activeCategory={activeCategory} />
        <ExploreDestinations />
        <EditorsPick />
        <LatestStories />
        <TravelTip />
        <Newsletter />
        <BlogCTA />
      </div>
    </>
  );
}
