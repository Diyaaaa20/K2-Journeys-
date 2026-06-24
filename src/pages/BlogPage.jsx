import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Calendar, Clock, User, Tag, ChevronRight } from "lucide-react";

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

const categories = ["All", "Adventure", "Culture", "Budget Tips", "Hidden Gems", "Travel Guides"];

const featured = {
  id: 1,
  tag: "Adventure",
  tagColor: "#0ABFBC",
  title: "The Ultimate Guide to Trekking Spiti Valley in Winter",
  excerpt: "Spiti in winter is not for the faint-hearted — but for those who brave it, it reveals a side of the Himalayas that most travellers never see. Here's everything you need to know.",
  author: "Kabir Thakur",
  date: "June 12, 2025",
  readTime: "8 min read",
  img: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&q=80",
};

const posts = [
  { id: 2, tag: "Culture", tagColor: "#A78BFA", title: "Why Ladakh's Monasteries Are More Than Just Monuments", excerpt: "The sound of prayer wheels, the scent of juniper incense, and the silence between mountains — Ladakh's monasteries offer something no itinerary can fully prepare you for.", author: "Saanvi Rao", date: "May 28, 2025", readTime: "6 min read", img: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=600&q=80" },
  { id: 3, tag: "Budget Tips", tagColor: "#FBBF24", title: "How to Do Manali in ₹15,000 — Including Flights", excerpt: "Yes, it's possible. We break down exactly how to stretch your budget without missing out on the best that Manali has to offer.", author: "Imran Sheikh", date: "May 10, 2025", readTime: "5 min read", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" },
  { id: 4, tag: "Hidden Gems", tagColor: "#F87171", title: "Chopta: The Uttarakhand Village Nobody Talks About", excerpt: "Forget Rishikesh and Mussoorie — Chopta is Uttarakhand's best-kept secret, with views that rival anything in the Swiss Alps.", author: "Kabir Thakur", date: "April 22, 2025", readTime: "7 min read", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80" },
  { id: 5, tag: "Travel Guides", tagColor: "#0ABFBC", title: "Kashmir in Spring: The Complete 7-Day Itinerary", excerpt: "Tulip gardens, shikaras, and a food scene that will haunt you for years. Here's how to spend a perfect week in Kashmir.", author: "Saanvi Rao", date: "April 5, 2025", readTime: "9 min read", img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80" },
  { id: 6, tag: "Adventure", tagColor: "#0ABFBC", title: "Paragliding in Bir Billing: Everything You Need to Know", excerpt: "It's called the paragliding capital of Asia — and for good reason. Here's our complete guide to taking the leap at Bir Billing.", author: "Imran Sheikh", date: "March 18, 2025", readTime: "6 min read", img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80" },
  { id: 7, tag: "Culture", tagColor: "#A78BFA", title: "Eating Your Way Through Kerala: A Food Lover's Journey", excerpt: "From toddy shops in Alleppey to seafood stalls in Kochi, Kerala's food culture is as rich and layered as its backwaters.", author: "Saanvi Rao", date: "March 2, 2025", readTime: "7 min read", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80" },
];

const popularTags = ["Himalayas", "Budget Travel", "Solo Travel", "Monsoon", "Winter Trek", "Food", "Culture", "Hidden Gems"];

export default function BlogPage() {
  const [, setDark] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = posts.filter(p =>
    (activeCategory === "All" || p.tag === activeCategory) &&
    (search === "" || p.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", color: "#1A1A2E" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        button { font-family: inherit; cursor: pointer; border: none; }
        input { font-family: inherit; }
        input::placeholder { color: #9CA3AF; }
        input:focus { outline: 2px solid #0ABFBC; }
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
            const isActive = l === "Blogs";
            const style = { fontSize: 14, fontWeight: 500, color: isActive ? "#0ABFBC" : "#374151", borderBottom: isActive ? "2px solid #0ABFBC" : "2px solid transparent", paddingBottom: 4 };
            return to ? <Link key={l} to={to} style={style}>{l}</Link> : <span key={l} style={style}>{l}</span>;
          })}
        </nav>
        <button onClick={() => setDark(d => !d)} style={{ background: "#0ABFBC", color: "#fff", fontWeight: 700, fontSize: 14, padding: "10px 22px", borderRadius: 24, display: "flex", alignItems: "center", gap: 8 }}>
          Book Now <ArrowRight size={14} />
        </button>
      </header>

      {/* PAGE HEADER */}
      <section style={{ background: "#F0FAFA", padding: "64px 64px 48px", textAlign: "center" }}>
        <p style={{ color: "#0ABFBC", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 14 }}>TRAVEL STORIES & TIPS</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 700, color: "#0D1321", marginBottom: 16 }}>The K2 Journal</h1>
        <p style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 32px" }}>
          Real stories from the road. Honest guides from people who've actually been there. No sponsored fluff.
        </p>
        <div style={{ position: "relative", display: "inline-flex", width: 440 }}>
          <Search size={17} color="#9CA3AF" style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)" }} />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: "100%", padding: "14px 18px 14px 48px", borderRadius: 28, border: "1.5px solid #E5E7EB", fontSize: 14, color: "#0D1321", background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
          />
        </div>
      </section>

      {/* FEATURED */}
      <section style={{ padding: "56px 64px 0" }}>
        <p style={{ color: "#0ABFBC", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, marginBottom: 20 }}>FEATURED STORY</p>
        <div style={{ display: "flex", gap: 48, alignItems: "center", background: "#F9FAFB", borderRadius: 24, overflow: "hidden", border: "1px solid #E5E7EB" }}>
          <img src={featured.img} alt={featured.title} style={{ width: 480, height: 340, objectFit: "cover", flexShrink: 0 }} />
          <div style={{ padding: "36px 40px 36px 0" }}>
            <span style={{ background: `${featured.tagColor}18`, color: featured.tagColor, fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 12, display: "inline-block", marginBottom: 18 }}>{featured.tag}</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, color: "#0D1321", lineHeight: 1.3, marginBottom: 16 }}>{featured.title}</h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: "#6B7280", marginBottom: 24 }}>{featured.excerpt}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24, color: "#9CA3AF", fontSize: 13 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><User size={13} />{featured.author}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Calendar size={13} />{featured.date}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Clock size={13} />{featured.readTime}</span>
            </div>
            <button style={{ background: "#0ABFBC", color: "#fff", fontWeight: 700, fontSize: 14, padding: "12px 24px", borderRadius: 20, display: "inline-flex", alignItems: "center", gap: 8 }}>
              Read Story <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section style={{ padding: "48px 64px 0" }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: "9px 20px", borderRadius: 20, fontSize: 13.5, fontWeight: 600, border: cat === activeCategory ? "none" : "1.5px solid #E5E7EB", background: cat === activeCategory ? "#0ABFBC" : "#fff", color: cat === activeCategory ? "#fff" : "#374151", cursor: "pointer" }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* POSTS GRID */}
      <section style={{ padding: "36px 64px 72px", display: "flex", gap: 40, alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#9CA3AF" }}>
              <p style={{ fontSize: 18, fontWeight: 600 }}>No articles found</p>
              <p style={{ fontSize: 14, marginTop: 8 }}>Try a different search or category</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
              {filtered.map(post => (
                <article key={post.id} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 18, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", cursor: "pointer" }}>
                  <img src={post.img} alt={post.title} style={{ width: "100%", height: 200, objectFit: "cover" }} />
                  <div style={{ padding: "22px 22px 24px" }}>
                    <span style={{ background: `${post.tagColor}18`, color: post.tagColor, fontSize: 11.5, fontWeight: 700, padding: "3px 11px", borderRadius: 10, display: "inline-block", marginBottom: 12 }}>{post.tag}</span>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 700, color: "#0D1321", lineHeight: 1.35, marginBottom: 10 }}>{post.title}</h3>
                    <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "#6B7280", marginBottom: 16 }}>{post.excerpt}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#9CA3AF", fontSize: 12 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><User size={12} />{post.author}</span>
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={12} />{post.readTime}</span>
                      </div>
                      <button style={{ background: "transparent", color: "#0ABFBC", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", gap: 4, padding: 0 }}>
                        Read <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ width: 280, flexShrink: 0 }}>
          <div style={{ background: "#F9FAFB", borderRadius: 16, padding: "24px 22px", border: "1px solid #E5E7EB", marginBottom: 24 }}>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: "#0D1321", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}><Tag size={15} color="#0ABFBC" /> Popular Tags</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {popularTags.map(tag => (
                <span key={tag} style={{ background: "#fff", border: "1.5px solid #E5E7EB", color: "#374151", fontSize: 12.5, fontWeight: 500, padding: "5px 13px", borderRadius: 14, cursor: "pointer" }}>{tag}</span>
              ))}
            </div>
          </div>

          <div style={{ background: "#0ABFBC", borderRadius: 16, padding: "28px 24px", color: "#fff" }}>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Plan your next journey</h4>
            <p style={{ fontSize: 13.5, lineHeight: 1.65, marginBottom: 20, opacity: 0.9 }}>Inspired by what you read? Let us turn it into a real trip.</p>
            <button style={{ background: "#fff", color: "#0ABFBC", fontWeight: 700, fontSize: 13.5, padding: "11px 20px", borderRadius: 20, display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
              Talk to Our Team <ArrowRight size={13} />
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
