import { useState, useEffect, useRef, useCallback } from "react";
import { destinations, galleryImages, faqs } from "../visadata.js";

/* ─── colour tokens ─────────────────────────────────────────── */
const C = {
  navy:  "#0D1321",
  teal:  "#1F8A8C",
  rose:  "#D45B72",
  cream: "#F4F0E8",
  gold:  "#D79A3B",
  navyLight: "#151E2E",
};

/* ─── Google Fonts injection ────────────────────────────────── */
const fontStyle = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');`;

/* ─── Scroll reveal hook ────────────────────────────────────── */
function useReveal(threshold = 0.15) {
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

/* ══════════════════════════════════════════════════════════════
   HERO SLIDER
══════════════════════════════════════════════════════════════ */
function HeroSlider({ onApply }) {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev]       = useState(null);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback((idx) => {
    if (animating) return;
    setAnimating(true);
    setPrev(current);
    setCurrent(idx);
    setTimeout(() => { setPrev(null); setAnimating(false); }, 900);
  }, [animating, current]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(c => {
        const next = (c + 1) % destinations.length;
        setPrev(c);
        setAnimating(true);
        setTimeout(() => { setPrev(null); setAnimating(false); }, 900);
        return next;
      });
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  const d = destinations[current];

  const overlayGradients = [
    "linear-gradient(135deg,rgba(13,19,33,0.85) 0%,rgba(31,138,140,0.3) 100%)",
    "linear-gradient(135deg,rgba(13,19,33,0.85) 0%,rgba(215,154,59,0.3) 100%)",
    "linear-gradient(135deg,rgba(13,19,33,0.85) 0%,rgba(212,91,114,0.3) 100%)",
    "linear-gradient(135deg,rgba(13,19,33,0.85) 0%,rgba(31,138,140,0.3) 100%)",
    "linear-gradient(135deg,rgba(13,19,33,0.85) 0%,rgba(215,154,59,0.4) 100%)",
    "linear-gradient(135deg,rgba(13,19,33,0.85) 0%,rgba(31,138,140,0.3) 100%)",
  ];

  return (
    <section style={{ position:"relative", height:"100vh", overflow:"hidden", background:C.navy }}>
      {/* slides */}
      {destinations.map((dest, i) => (
        <div key={dest.id} style={{
          position:"absolute", inset:0,
          backgroundImage:`url(https://picsum.photos/seed/${dest.id}-hero/1920/1080)`,
          backgroundSize:"cover", backgroundPosition:"center",
          opacity: i === current ? 1 : 0,
          transition:"opacity 0.9s ease",
          zIndex: i === current ? 1 : 0,
        }} />
      ))}

      {/* overlay */}
      <div style={{
        position:"absolute", inset:0, zIndex:2,
        background: overlayGradients[current],
        transition:"background 0.9s ease",
      }} />
      <div style={{
        position:"absolute", inset:0, zIndex:2,
        background:"linear-gradient(to top,rgba(13,19,33,0.95) 0%,transparent 60%)",
      }} />

      {/* content */}
      <div key={d.id} style={{
        position:"absolute", bottom:"12vh", left:"8vw", zIndex:3,
        maxWidth:680, animation:"heroFadeUp 0.8s ease both",
      }}>
        <div style={{
          display:"inline-flex", alignItems:"center", gap:10,
          background:"rgba(255,255,255,0.08)", backdropFilter:"blur(12px)",
          border:`1px solid rgba(${hexToRgb(C.teal)},0.4)`,
          borderRadius:100, padding:"6px 18px", marginBottom:20,
        }}>
          <span style={{ fontSize:20 }}>{d.flag}</span>
          <span style={{ fontFamily:"Inter", fontSize:12, fontWeight:600,
            letterSpacing:3, color:C.teal, textTransform:"uppercase" }}>
            Featured Destination
          </span>
        </div>

        <h1 style={{
          fontFamily:"'Playfair Display',serif", fontSize:"clamp(3rem,7vw,6rem)",
          fontWeight:700, color:C.cream, lineHeight:1.05, margin:"0 0 16px",
          textShadow:"0 4px 30px rgba(0,0,0,0.5)",
        }}>{d.name}</h1>

        <p style={{
          fontFamily:"Inter", fontSize:"clamp(1rem,1.5vw,1.2rem)",
          color:"rgba(244,240,232,0.8)", lineHeight:1.6,
          margin:"0 0 32px", fontWeight:300,
        }}>{d.tagline}</p>

        <div style={{ display:"flex", alignItems:"center", gap:20, flexWrap:"wrap", marginBottom:36 }}>
          <div style={{
            background:"rgba(255,255,255,0.07)", backdropFilter:"blur(10px)",
            border:"1px solid rgba(255,255,255,0.12)",
            borderRadius:12, padding:"12px 22px",
          }}>
            <div style={{ fontFamily:"Inter", fontSize:11, color:"rgba(244,240,232,0.5)",
              letterSpacing:2, textTransform:"uppercase", marginBottom:4 }}>Visa Processing</div>
            <div style={{ fontFamily:"Inter", fontSize:18, fontWeight:600, color:C.gold }}>{d.processingTime}</div>
          </div>
          <div style={{
            background:"rgba(255,255,255,0.07)", backdropFilter:"blur(10px)",
            border:"1px solid rgba(255,255,255,0.12)",
            borderRadius:12, padding:"12px 22px",
          }}>
            <div style={{ fontFamily:"Inter", fontSize:11, color:"rgba(244,240,232,0.5)",
              letterSpacing:2, textTransform:"uppercase", marginBottom:4 }}>Starting From</div>
            <div style={{ fontFamily:"Inter", fontSize:18, fontWeight:600, color:C.teal }}>{d.startingFee}</div>
          </div>
          <div style={{
            background:"rgba(255,255,255,0.07)", backdropFilter:"blur(10px)",
            border:"1px solid rgba(255,255,255,0.12)",
            borderRadius:12, padding:"12px 22px",
          }}>
            <div style={{ fontFamily:"Inter", fontSize:11, color:"rgba(244,240,232,0.5)",
              letterSpacing:2, textTransform:"uppercase", marginBottom:4 }}>Approval Rate</div>
            <div style={{ fontFamily:"Inter", fontSize:18, fontWeight:600, color:"#8BDB81" }}>{d.successRate}</div>
          </div>
        </div>

        <button onClick={() => onApply(d)} style={{
          background:`linear-gradient(135deg,${C.teal},#0E5C5E)`,
          color:"#fff", border:"none", borderRadius:50,
          padding:"16px 40px", fontFamily:"Inter", fontSize:16,
          fontWeight:600, cursor:"pointer", letterSpacing:0.5,
          boxShadow:`0 0 40px rgba(31,138,140,0.5)`,
          transition:"all 0.3s ease",
        }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-3px) scale(1.04)";
            e.currentTarget.style.boxShadow = `0 12px 50px rgba(31,138,140,0.7)`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = `0 0 40px rgba(31,138,140,0.5)`;
          }}
        >
          Apply For Visa →
        </button>
      </div>

      {/* navigation arrows */}
      <button onClick={() => goTo((current - 1 + destinations.length) % destinations.length)}
        style={arrowBtn("left")}>&#8592;</button>
      <button onClick={() => goTo((current + 1) % destinations.length)}
        style={arrowBtn("right")}>&#8594;</button>

      {/* dot indicators */}
      <div style={{
        position:"absolute", bottom:40, left:"50%", transform:"translateX(-50%)",
        zIndex:3, display:"flex", gap:10,
      }}>
        {destinations.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            width: i === current ? 32 : 10,
            height:10, borderRadius:5, border:"none", cursor:"pointer",
            background: i === current ? C.teal : "rgba(255,255,255,0.3)",
            transition:"all 0.4s ease", padding:0,
          }} />
        ))}
      </div>

      {/* progress bar */}
      <div style={{
        position:"absolute", bottom:0, left:0, height:3,
        background:`linear-gradient(90deg,${C.teal},${C.gold})`,
        animation:"progressBar 5s linear infinite", zIndex:3,
      }} />

      {/* scroll hint */}
      <div style={{
        position:"absolute", right:40, bottom:80, zIndex:3,
        display:"flex", flexDirection:"column", alignItems:"center", gap:8,
        color:"rgba(244,240,232,0.4)", fontFamily:"Inter", fontSize:11,
        letterSpacing:2, textTransform:"uppercase",
        animation:"scrollHint 2s ease infinite",
      }}>
        <span>Scroll</span>
        <div style={{ width:1, height:40, background:"rgba(244,240,232,0.3)" }} />
      </div>
    </section>
  );
}

function arrowBtn(side) {
  return {
    position:"absolute", top:"50%", transform:"translateY(-50%)",
    [side]: 32, zIndex:3,
    width:52, height:52, borderRadius:"50%",
    background:"rgba(255,255,255,0.08)", backdropFilter:"blur(10px)",
    border:"1px solid rgba(255,255,255,0.2)",
    color:C.cream, fontSize:22, cursor:"pointer",
    display:"flex", alignItems:"center", justifyContent:"center",
    transition:"all 0.3s ease",
  };
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}

/* ══════════════════════════════════════════════════════════════
   COUNTRY GRID
══════════════════════════════════════════════════════════════ */
function CountryGrid({ selected, onSelect }) {
  const [ref, visible] = useReveal();

  return (
    <section ref={ref} style={{
      background: C.navyLight, padding:"100px 8vw",
    }}>
      <div style={{ textAlign:"center", marginBottom:64 }}>
        <span style={sectionLabel}>Explore Destinations</span>
        <h2 style={sectionTitle}>Where Do You Dream of Going?</h2>
        <p style={sectionSubtitle}>
          Click a destination to explore visa requirements, documents, and travel tips.
        </p>
      </div>

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",
        gap:28,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(40px)",
        transition:"all 0.8s ease",
      }}>
        {destinations.map((d, i) => (
          <CountryCard key={d.id} dest={d} isSelected={selected?.id === d.id}
            onSelect={onSelect} delay={i * 80} visible={visible} />
        ))}
      </div>
    </section>
  );
}

function CountryCard({ dest, isSelected, onSelect, delay, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onSelect(dest)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:"relative", borderRadius:20, overflow:"hidden",
        cursor:"pointer", height:380,
        border: isSelected ? `2px solid ${C.teal}` : "2px solid transparent",
        boxShadow: isSelected
          ? `0 0 40px rgba(31,138,140,0.5), 0 20px 60px rgba(0,0,0,0.4)`
          : hovered
          ? `0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(31,138,140,0.2)`
          : "0 8px 30px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-8px) scale(1.02)" : "none",
        transition:"all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* background image */}
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:`url(https://picsum.photos/seed/${dest.id}-card/600/800)`,
        backgroundSize:"cover", backgroundPosition:"center",
        transform: hovered ? "scale(1.08)" : "scale(1)",
        transition:"transform 0.6s ease",
      }} />

      {/* gradient overlay */}
      <div style={{
        position:"absolute", inset:0,
        background:"linear-gradient(to top,rgba(13,19,33,0.95) 0%,rgba(13,19,33,0.2) 50%,transparent 100%)",
      }} />

      {/* glow ring on hover */}
      {hovered && <div style={{
        position:"absolute", inset:0, borderRadius:20,
        boxShadow:`inset 0 0 60px rgba(31,138,140,0.3)`,
      }} />}

      {/* flag badge */}
      <div style={{
        position:"absolute", top:16, right:16,
        background:"rgba(255,255,255,0.1)", backdropFilter:"blur(8px)",
        borderRadius:50, width:44, height:44,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:22, border:"1px solid rgba(255,255,255,0.2)",
        transform: hovered ? "scale(1.1) rotate(5deg)" : "none",
        transition:"transform 0.4s ease",
      }}>{dest.flag}</div>

      {/* selected badge */}
      {isSelected && (
        <div style={{
          position:"absolute", top:16, left:16,
          background:C.teal, borderRadius:50,
          padding:"4px 14px", fontFamily:"Inter",
          fontSize:11, fontWeight:600, color:"#fff",
          letterSpacing:1, textTransform:"uppercase",
        }}>Selected ✓</div>
      )}

      {/* bottom info */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"24px 20px" }}>
        <h3 style={{
          fontFamily:"'Playfair Display',serif", fontSize:28,
          fontWeight:700, color:C.cream, margin:"0 0 8px",
        }}>{dest.name}</h3>
        <p style={{
          fontFamily:"Inter", fontSize:13, color:"rgba(244,240,232,0.7)",
          margin:"0 0 14px", fontWeight:300,
        }}>{dest.shortTagline}</p>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
          <Chip label={dest.processingTime} color={C.gold} />
          <Chip label={dest.startingFee} color={C.teal} />
        </div>
      </div>
    </div>
  );
}

function Chip({ label, color }) {
  return (
    <span style={{
      fontFamily:"Inter", fontSize:11, fontWeight:600,
      color, background:`rgba(${hexToRgb(color)},0.15)`,
      border:`1px solid rgba(${hexToRgb(color)},0.35)`,
      borderRadius:50, padding:"4px 12px", letterSpacing:0.5,
    }}>{label}</span>
  );
}

/* ══════════════════════════════════════════════════════════════
   VISA DETAIL
══════════════════════════════════════════════════════════════ */
function VisaDetail({ dest, detailRef }) {
  const [tab, setTab] = useState("requirements");

  const tabs = [
    { id:"requirements", label:"Requirements" },
    { id:"documents",    label:"Documents" },
    { id:"tips",         label:"Travel Tips" },
    { id:"embassy",      label:"Embassy Info" },
  ];

  if (!dest) return null;

  return (
    <section ref={detailRef} style={{
      background: C.navy, position:"relative", overflow:"hidden",
    }}>
      {/* hero banner */}
      <div style={{
        position:"relative", height:340,
        backgroundImage:`url(https://picsum.photos/seed/${dest.id}-hero/1920/1080)`,
        backgroundSize:"cover", backgroundPosition:"center",
      }}>
        <div style={{
          position:"absolute", inset:0,
          background:"linear-gradient(to right,rgba(13,19,33,0.9) 0%,rgba(13,19,33,0.5) 100%)",
        }} />
        <div style={{
          position:"absolute", bottom:40, left:"8vw", display:"flex", alignItems:"flex-end", gap:24,
        }}>
          <div style={{ fontSize:72 }}>{dest.flag}</div>
          <div>
            <h2 style={{
              fontFamily:"'Playfair Display',serif", fontSize:52,
              fontWeight:700, color:C.cream, margin:0,
            }}>{dest.name}</h2>
            <p style={{
              fontFamily:"Inter", fontSize:15, color:"rgba(244,240,232,0.7)",
              margin:"6px 0 0", fontWeight:300,
            }}>{dest.tagline}</p>
          </div>
        </div>

        {/* stats row */}
        <div style={{
          position:"absolute", bottom:0, right:"8vw",
          display:"flex", gap:1,
        }}>
          {[
            { label:"Processing", value:dest.processingTime, color:C.gold },
            { label:"Success Rate", value:dest.successRate, color:"#8BDB81" },
            { label:"Best Time", value:dest.bestTime, color:C.teal },
            { label:"Visa Duration", value:dest.visaDuration, color:C.rose },
          ].map(s => (
            <div key={s.label} style={{
              background:"rgba(13,19,33,0.85)", backdropFilter:"blur(12px)",
              padding:"14px 20px", textAlign:"center", minWidth:140,
            }}>
              <div style={{ fontFamily:"Inter", fontSize:10, color:"rgba(244,240,232,0.5)",
                letterSpacing:2, textTransform:"uppercase", marginBottom:6 }}>{s.label}</div>
              <div style={{ fontFamily:"Inter", fontSize:15, fontWeight:700, color:s.color }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* tab bar */}
      <div style={{
        display:"flex", borderBottom:`1px solid rgba(255,255,255,0.08)`,
        padding:"0 8vw", background:C.navyLight,
      }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            fontFamily:"Inter", fontSize:14, fontWeight:600,
            color: tab === t.id ? C.teal : "rgba(244,240,232,0.45)",
            background:"none", border:"none",
            borderBottom: tab === t.id ? `3px solid ${C.teal}` : "3px solid transparent",
            padding:"18px 24px", cursor:"pointer",
            transition:"all 0.3s ease", letterSpacing:0.5,
          }}>{t.label}</button>
        ))}
      </div>

      {/* tab content */}
      <div key={tab} style={{
        padding:"60px 8vw 80px",
        animation:"fadeIn 0.4s ease both",
      }}>
        {tab === "requirements" && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:48 }}>
            <div>
              <h3 style={detailHeading}>Visa Requirements</h3>
              <ul style={{ listStyle:"none", padding:0, margin:0 }}>
                {dest.requirements.map((r, i) => (
                  <li key={i} style={{
                    display:"flex", gap:14, alignItems:"flex-start",
                    padding:"14px 0", borderBottom:"1px solid rgba(255,255,255,0.06)",
                  }}>
                    <span style={{
                      width:24, height:24, borderRadius:"50%", flexShrink:0,
                      background:`linear-gradient(135deg,${C.teal},#0E5C5E)`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:11, fontWeight:700, color:"#fff", marginTop:2,
                    }}>{i+1}</span>
                    <span style={{ fontFamily:"Inter", fontSize:15,
                      color:"rgba(244,240,232,0.8)", lineHeight:1.6 }}>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={detailHeading}>Quick Facts</h3>
              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                {[
                  { label:"Processing Time", value:dest.processingTime },
                  { label:"Visa Fee",         value:dest.startingFee },
                  { label:"Approval Rate",    value:dest.successRate },
                  { label:"Visa Duration",    value:dest.visaDuration },
                  { label:"Best Travel Time", value:dest.bestTime },
                  { label:"Approx. Approval", value:dest.approvalTime },
                ].map(f => (
                  <div key={f.label} style={{
                    display:"flex", justifyContent:"space-between", alignItems:"center",
                    padding:"16px 20px", borderRadius:12,
                    background:"rgba(255,255,255,0.04)",
                    border:"1px solid rgba(255,255,255,0.07)",
                  }}>
                    <span style={{ fontFamily:"Inter", fontSize:13,
                      color:"rgba(244,240,232,0.55)", letterSpacing:0.5 }}>{f.label}</span>
                    <span style={{ fontFamily:"Inter", fontSize:14,
                      fontWeight:700, color:C.teal }}>{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "documents" && (
          <div>
            <h3 style={detailHeading}>Documents Required</h3>
            <div style={{
              display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:16,
            }}>
              {dest.documents.map((doc, i) => (
                <div key={i} style={{
                  display:"flex", alignItems:"center", gap:16, padding:"18px 22px",
                  borderRadius:14, background:"rgba(255,255,255,0.04)",
                  border:`1px solid ${doc.required
                    ? "rgba(31,138,140,0.25)" : "rgba(255,255,255,0.07)"}`,
                }}>
                  <span style={{
                    width:32, height:32, borderRadius:8, flexShrink:0,
                    background: doc.required
                      ? `rgba(${hexToRgb(C.teal)},0.15)`
                      : "rgba(255,255,255,0.06)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:16,
                  }}>{doc.required ? "✅" : "📎"}</span>
                  <div>
                    <div style={{ fontFamily:"Inter", fontSize:14,
                      fontWeight:600, color:C.cream, marginBottom:3 }}>{doc.name}</div>
                    <div style={{ fontFamily:"Inter", fontSize:12,
                      color: doc.required ? C.teal : "rgba(244,240,232,0.4)" }}>
                      {doc.required ? "Required" : "Optional"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "tips" && (
          <div>
            <h3 style={detailHeading}>Travel Tips for {dest.name}</h3>
            <div style={{ display:"flex", flexDirection:"column", gap:20, maxWidth:720 }}>
              {dest.travelTips.map((tip, i) => (
                <div key={i} style={{
                  display:"flex", gap:20, padding:"22px 26px",
                  borderRadius:16, background:"rgba(255,255,255,0.04)",
                  border:"1px solid rgba(255,255,255,0.07)",
                  transition:"transform 0.3s ease",
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateX(8px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "none"}
                >
                  <span style={{
                    fontSize:28, width:40, flexShrink:0, textAlign:"center",
                  }}>
                    {["💡","🗺️","📱","💰","🎋","🚶","🌅"][i % 7]}
                  </span>
                  <p style={{ fontFamily:"Inter", fontSize:15,
                    color:"rgba(244,240,232,0.8)", lineHeight:1.7, margin:0 }}>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "embassy" && (
          <div style={{ maxWidth:600 }}>
            <h3 style={detailHeading}>Embassy Information</h3>
            <div style={{
              borderRadius:20, overflow:"hidden",
              border:"1px solid rgba(31,138,140,0.2)",
            }}>
              {[
                { icon:"🏛️", label:"Embassy", value:dest.embassy.name },
                { icon:"📍", label:"Address", value:dest.embassy.address },
                { icon:"📞", label:"Phone", value:dest.embassy.phone },
                { icon:"🕐", label:"Hours", value:dest.embassy.hours },
              ].map((row, i) => (
                <div key={i} style={{
                  display:"flex", gap:20, padding:"22px 28px",
                  borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  background: i % 2 === 0 ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.015)",
                }}>
                  <span style={{ fontSize:22, flexShrink:0 }}>{row.icon}</span>
                  <div>
                    <div style={{ fontFamily:"Inter", fontSize:11, color:C.teal,
                      letterSpacing:2, textTransform:"uppercase", marginBottom:5 }}>{row.label}</div>
                    <div style={{ fontFamily:"Inter", fontSize:15,
                      color:"rgba(244,240,232,0.85)", fontWeight:400 }}>{row.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

const detailHeading = {
  fontFamily:"'Playfair Display',serif", fontSize:28,
  fontWeight:700, color:C.cream, margin:"0 0 28px",
};

/* ══════════════════════════════════════════════════════════════
   PROCESS TIMELINE
══════════════════════════════════════════════════════════════ */
const steps = [
  { icon:"🌍", num:"01", title:"Choose Destination", desc:"Browse and select your dream destination from our curated list." },
  { icon:"📋", num:"02", title:"Submit Documents", desc:"Upload required documents through our secure portal in minutes." },
  { icon:"🔍", num:"03", title:"Verification",     desc:"Our experts review and verify your application for completeness." },
  { icon:"🏛️", num:"04", title:"Embassy Review",   desc:"Your application is submitted to the embassy for processing." },
  { icon:"✅", num:"05", title:"Visa Approved",    desc:"Receive your visa and start packing for your adventure!" },
];

function ProcessTimeline() {
  const [ref, visible] = useReveal(0.1);
  const [active, setActive] = useState(null);

  return (
    <section ref={ref} style={{
      background: C.navy, padding:"100px 8vw",
      backgroundImage:"radial-gradient(ellipse 80% 60% at 50% 50%, rgba(31,138,140,0.07) 0%, transparent 70%)",
    }}>
      <div style={{ textAlign:"center", marginBottom:80 }}>
        <span style={sectionLabel}>How It Works</span>
        <h2 style={sectionTitle}>Your Visa Journey in 5 Steps</h2>
        <p style={sectionSubtitle}>From dream to departure — we guide you every step of the way.</p>
      </div>

      {/* connecting line */}
      <div style={{ position:"relative" }}>
        <div style={{
          position:"absolute", top:48, left:"10%", right:"10%", height:2,
          background:`linear-gradient(90deg,${C.teal},${C.gold},${C.teal})`,
          opacity:0.4,
          transform: visible ? "scaleX(1)" : "scaleX(0)",
          transformOrigin:"left",
          transition:"transform 1.2s ease 0.3s",
        }} />
        {/* dashed overlay */}
        <div style={{
          position:"absolute", top:47, left:"10%", right:"10%", height:4,
          backgroundImage:`repeating-linear-gradient(90deg,${C.teal} 0,${C.teal} 12px,transparent 12px,transparent 24px)`,
          opacity:0.25,
        }} />

        <div style={{
          display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:24,
          position:"relative", zIndex:1,
        }}>
          {steps.map((step, i) => (
            <div key={i}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              style={{
                textAlign:"center", cursor:"default",
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(40px)",
                transition:`all 0.7s ease ${i * 120}ms`,
              }}
            >
              {/* circle */}
              <div style={{
                width:96, height:96, borderRadius:"50%", margin:"0 auto 24px",
                background: active === i
                  ? `linear-gradient(135deg,${C.teal},#0E5C5E)`
                  : "rgba(255,255,255,0.05)",
                border:`2px solid ${active === i ? C.teal : "rgba(255,255,255,0.12)"}`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:36,
                boxShadow: active === i
                  ? `0 0 40px rgba(31,138,140,0.5)`
                  : "none",
                transition:"all 0.4s ease",
                transform: active === i ? "scale(1.12)" : "scale(1)",
              }}>{step.icon}</div>

              <div style={{ fontFamily:"Inter", fontSize:11, color:C.teal,
                letterSpacing:3, textTransform:"uppercase", marginBottom:8 }}>
                Step {step.num}
              </div>
              <h4 style={{ fontFamily:"'Playfair Display',serif", fontSize:18,
                fontWeight:700, color:C.cream, margin:"0 0 10px" }}>{step.title}</h4>
              <p style={{ fontFamily:"Inter", fontSize:13,
                color:"rgba(244,240,232,0.55)", lineHeight:1.7, margin:0 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   WHY CHOOSE US
══════════════════════════════════════════════════════════════ */
const features = [
  { icon:"⚡", title:"Fast Processing",       desc:"We pre-check every application so nothing gets rejected for paperwork errors.",  color:C.gold },
  { icon:"🎯", title:"Expert Visa Guidance",  desc:"Dedicated visa specialists with 10+ years of experience across 50+ countries.", color:C.teal },
  { icon:"📈", title:"94.7% Approval Rate",   desc:"Industry-leading success rate backed by meticulous document preparation.",       color:"#8BDB81" },
  { icon:"🤝", title:"End-to-End Support",    desc:"From document checklist to visa collection — we're with you at every step.",     color:C.rose },
];

function WhyChooseUs() {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} style={{
      background: C.navyLight, padding:"100px 8vw",
    }}>
      <div style={{ textAlign:"center", marginBottom:64 }}>
        <span style={sectionLabel}>Why K2 Journeys</span>
        <h2 style={sectionTitle}>Visa Experts You Can Trust</h2>
        <p style={sectionSubtitle}>Built on a decade of expertise, thousands of happy travellers.</p>
      </div>

      <div style={{
        display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:24,
      }}>
        {features.map((f, i) => (
          <FeatureCard key={i} feature={f} delay={i * 100} visible={visible} />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ feature, delay, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding:"36px 28px", borderRadius:20, cursor:"default",
        background: hovered
          ? `rgba(${hexToRgb(feature.color)},0.08)`
          : "rgba(255,255,255,0.04)",
        border:`1px solid ${hovered
          ? `rgba(${hexToRgb(feature.color)},0.35)`
          : "rgba(255,255,255,0.08)"}`,
        boxShadow: hovered ? `0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(${hexToRgb(feature.color)},0.15)` : "none",
        transform: hovered ? "translateY(-10px)" : "none",
        transition:"all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${delay}ms`,
      }}
    >
      <div style={{
        fontSize:44, marginBottom:20,
        transform: hovered ? "scale(1.2) rotate(8deg)" : "scale(1)",
        transition:"transform 0.4s ease",
        display:"inline-block",
      }}>{feature.icon}</div>
      <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:22,
        fontWeight:700, color:C.cream, margin:"0 0 12px" }}>{feature.title}</h3>
      <p style={{ fontFamily:"Inter", fontSize:14,
        color:"rgba(244,240,232,0.6)", lineHeight:1.8, margin:0 }}>{feature.desc}</p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   DESTINATION CAROUSEL
══════════════════════════════════════════════════════════════ */
function DestinationCarousel({ onApply }) {
  const [ref, visible] = useReveal();
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 340, behavior:"smooth" });
  };

  return (
    <section ref={ref} style={{
      background: C.navy, padding:"100px 0",
      backgroundImage:"radial-gradient(ellipse 60% 50% at 80% 50%, rgba(215,154,59,0.05) 0%, transparent 70%)",
    }}>
      <div style={{ padding:"0 8vw", textAlign:"center", marginBottom:64 }}>
        <span style={sectionLabel}>Popular Destinations</span>
        <h2 style={sectionTitle}>Most Loved by Our Travellers</h2>
      </div>

      <div style={{ position:"relative", padding:"0 8vw" }}>
        <button onClick={() => scroll(-1)} style={carouselBtn("left")}>&#8592;</button>
        <button onClick={() => scroll(1)}  style={carouselBtn("right")}>&#8594;</button>

        <div ref={scrollRef} style={{
          display:"flex", gap:24, overflowX:"auto",
          scrollbarWidth:"none", msOverflowStyle:"none",
          paddingBottom:8,
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(30px)",
          transition:"all 0.8s ease",
        }}>
          {destinations.map((d, i) => (
            <div key={d.id} style={{
              flexShrink:0, width:300, borderRadius:20, overflow:"hidden",
              background: C.navyLight, cursor:"pointer",
              border:"1px solid rgba(255,255,255,0.07)",
              transition:"all 0.4s ease",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = `0 20px 50px rgba(31,138,140,0.25)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "none";
              }}
              onClick={() => onApply(d)}
            >
              <div style={{
                height:200, position:"relative",
                backgroundImage:`url(https://picsum.photos/seed/${d.id}-carousel/600/400)`,
                backgroundSize:"cover", backgroundPosition:"center",
                overflow:"hidden",
              }}>
                <div style={{
                  position:"absolute", inset:0,
                  background:"linear-gradient(to top,rgba(13,19,33,0.7) 0%,transparent 60%)",
                }} />
                <div style={{
                  position:"absolute", top:14, right:14,
                  background:"rgba(255,255,255,0.1)", backdropFilter:"blur(8px)",
                  borderRadius:50, padding:"4px 12px",
                  fontFamily:"Inter", fontSize:12, color:C.cream,
                }}>{d.flag} {d.name}</div>
              </div>
              <div style={{ padding:"20px 22px" }}>
                <h4 style={{ fontFamily:"'Playfair Display',serif", fontSize:20,
                  fontWeight:700, color:C.cream, margin:"0 0 8px" }}>{d.name}</h4>
                <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:16 }}>
                  <div style={{ fontFamily:"Inter", fontSize:12, color:"rgba(244,240,232,0.5)" }}>
                    📅 Best: <span style={{ color:C.gold }}>{d.bestTime}</span>
                  </div>
                  <div style={{ fontFamily:"Inter", fontSize:12, color:"rgba(244,240,232,0.5)" }}>
                    🕐 Duration: <span style={{ color:C.teal }}>{d.visaDuration}</span>
                  </div>
                  <div style={{ fontFamily:"Inter", fontSize:12, color:"rgba(244,240,232,0.5)" }}>
                    ⚡ Processing: <span style={{ color:"#8BDB81" }}>{d.processingTime}</span>
                  </div>
                </div>
                <button style={{
                  width:"100%", padding:"10px", borderRadius:10,
                  background:`linear-gradient(135deg,${C.teal},#0E5C5E)`,
                  color:"#fff", border:"none", fontFamily:"Inter",
                  fontSize:13, fontWeight:600, cursor:"pointer",
                }}>Apply Now →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function carouselBtn(side) {
  return {
    position:"absolute", top:"40%", transform:"translateY(-50%)",
    [side]: side === "left" ? "calc(8vw - 20px)" : "calc(8vw - 20px)",
    zIndex:2, width:44, height:44, borderRadius:"50%",
    background:"rgba(255,255,255,0.1)", backdropFilter:"blur(10px)",
    border:"1px solid rgba(255,255,255,0.2)",
    color:C.cream, fontSize:18, cursor:"pointer",
    display:"flex", alignItems:"center", justifyContent:"center",
  };
}

/* ══════════════════════════════════════════════════════════════
   INSPIRATION GALLERY
══════════════════════════════════════════════════════════════ */
function InspirationGallery() {
  const [ref, visible] = useReveal(0.05);
  const cols = [
    galleryImages.filter((_,i) => i % 3 === 0),
    galleryImages.filter((_,i) => i % 3 === 1),
    galleryImages.filter((_,i) => i % 3 === 2),
  ];

  return (
    <section ref={ref} style={{
      background: C.navyLight, padding:"100px 8vw",
    }}>
      <div style={{ textAlign:"center", marginBottom:64 }}>
        <span style={sectionLabel}>Travel Inspiration</span>
        <h2 style={sectionTitle}>The World is Waiting for You</h2>
        <p style={sectionSubtitle}>Every picture tells a story. Yours starts here.</p>
      </div>

      <div style={{
        display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16,
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)",
        transition:"all 0.9s ease",
      }}>
        {cols.map((col, ci) => (
          <div key={ci} style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {col.map((img) => {
              const heights = [260, 340, 300, 380, 260, 320];
              const h = heights[img.id % heights.length];
              return <GalleryItem key={img.id} img={img} height={h} />;
            })}
          </div>
        ))}
      </div>
    </section>
  );
}

function GalleryItem({ img, height }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:"relative", borderRadius:16, overflow:"hidden",
        height, cursor:"pointer",
      }}
    >
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:`url(https://picsum.photos/seed/${img.seed}/800/600)`,
        backgroundSize:"cover", backgroundPosition:"center",
        transform: hovered ? "scale(1.08)" : "scale(1)",
        transition:"transform 0.6s ease",
      }} />
      <div style={{
        position:"absolute", inset:0,
        background:`rgba(13,19,33,${hovered ? 0.55 : 0.15})`,
        transition:"background 0.4s ease",
      }} />
      {hovered && (
        <div style={{
          position:"absolute", inset:0,
          display:"flex", alignItems:"center", justifyContent:"center",
          flexDirection:"column", gap:8,
          animation:"fadeIn 0.3s ease both",
        }}>
          <span style={{ fontSize:24 }}>📍</span>
          <span style={{ fontFamily:"Inter", fontSize:14, fontWeight:600,
            color:C.cream, letterSpacing:1 }}>{img.label}</span>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   FAQ
══════════════════════════════════════════════════════════════ */
function FAQSection() {
  const [ref, visible] = useReveal();
  const [open, setOpen] = useState(null);

  return (
    <section ref={ref} style={{
      background: C.navy, padding:"100px 8vw",
    }}>
      <div style={{ textAlign:"center", marginBottom:64 }}>
        <span style={sectionLabel}>FAQ</span>
        <h2 style={sectionTitle}>Frequently Asked Questions</h2>
        <p style={sectionSubtitle}>Everything you need to know before you apply.</p>
      </div>

      <div style={{
        maxWidth:820, margin:"0 auto",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(30px)",
        transition:"all 0.8s ease",
      }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{
            borderBottom:`1px solid rgba(255,255,255,0.07)`,
            marginBottom:4,
          }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{
              width:"100%", background:"none", border:"none",
              display:"flex", justifyContent:"space-between", alignItems:"center",
              padding:"22px 4px", cursor:"pointer", textAlign:"left", gap:20,
            }}>
              <span style={{ fontFamily:"Inter", fontSize:16, fontWeight:600,
                color: open === i ? C.teal : C.cream, transition:"color 0.3s" }}>
                {faq.q}
              </span>
              <span style={{
                width:32, height:32, borderRadius:"50%", flexShrink:0,
                background: open === i ? C.teal : "rgba(255,255,255,0.07)",
                display:"flex", alignItems:"center", justifyContent:"center",
                color: open === i ? "#fff" : "rgba(244,240,232,0.5)",
                fontSize:18, fontWeight:300,
                transition:"all 0.3s ease",
                transform: open === i ? "rotate(45deg)" : "none",
              }}>+</span>
            </button>
            <div style={{
              maxHeight: open === i ? 300 : 0,
              overflow:"hidden",
              transition:"max-height 0.45s cubic-bezier(0.4,0,0.2,1)",
            }}>
              <p style={{
                fontFamily:"Inter", fontSize:15, lineHeight:1.8,
                color:"rgba(244,240,232,0.65)", padding:"0 4px 24px",
                margin:0,
              }}>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   CTA SECTION
══════════════════════════════════════════════════════════════ */
function CTASection({ onApply }) {
  const [ref, visible] = useReveal();
  const [hovered, setHovered] = useState(false);

  return (
    <section ref={ref} style={{
      position:"relative", overflow:"hidden",
      padding:"140px 8vw", textAlign:"center",
      backgroundImage:"url(https://picsum.photos/seed/cta-mountains/1920/1080)",
      backgroundSize:"cover", backgroundPosition:"center",
      backgroundAttachment:"fixed",
    }}>
      <div style={{
        position:"absolute", inset:0,
        background:"linear-gradient(135deg,rgba(13,19,33,0.88) 0%,rgba(13,19,33,0.75) 100%)",
      }} />
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:`radial-gradient(ellipse 70% 60% at 50% 50%, rgba(31,138,140,0.12) 0%, transparent 70%)`,
      }} />

      <div style={{
        position:"relative", zIndex:1,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(40px)",
        transition:"all 1s ease",
      }}>
        <span style={sectionLabel}>Start Your Journey</span>
        <h2 style={{
          fontFamily:"'Playfair Display',serif",
          fontSize:"clamp(2.5rem,5vw,4.5rem)",
          fontWeight:700, color:C.cream, margin:"16px 0 20px",
          lineHeight:1.1,
        }}>
          Your Next Adventure<br />
          <em style={{ color:C.teal }}>Starts Here</em>
        </h2>
        <p style={{
          fontFamily:"Inter", fontSize:"clamp(1rem,1.4vw,1.2rem)",
          color:"rgba(244,240,232,0.7)", maxWidth:560,
          margin:"0 auto 48px", lineHeight:1.8, fontWeight:300,
        }}>
          Let K2 Journeys handle the paperwork while you plan the memories.
          Apply today and get your visa in as little as 3 business days.
        </p>

        <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
          <button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => onApply(null)}
            style={{
              background:`linear-gradient(135deg,${C.teal},#0E5C5E)`,
              color:"#fff", border:"none", borderRadius:50,
              padding:"18px 48px", fontFamily:"Inter",
              fontSize:17, fontWeight:600, cursor:"pointer",
              boxShadow: hovered
                ? `0 16px 60px rgba(31,138,140,0.7)`
                : `0 8px 40px rgba(31,138,140,0.4)`,
              transform: hovered ? "translateY(-4px) scale(1.05)" : "none",
              transition:"all 0.3s ease", letterSpacing:0.5,
            }}>
            Apply For Visa →
          </button>
          <button style={{
            background:"rgba(255,255,255,0.08)", backdropFilter:"blur(10px)",
            color:C.cream, border:"1px solid rgba(255,255,255,0.2)",
            borderRadius:50, padding:"18px 48px", fontFamily:"Inter",
            fontSize:17, fontWeight:500, cursor:"pointer", letterSpacing:0.5,
          }}>Talk to an Expert</button>
        </div>

        {/* trust badges */}
        <div style={{
          display:"flex", gap:32, justifyContent:"center",
          marginTop:64, flexWrap:"wrap",
        }}>
          {[
            { num:"10K+", label:"Visas Processed" },
            { num:"94.7%", label:"Approval Rate" },
            { num:"50+", label:"Countries" },
            { num:"24/7", label:"Support" },
          ].map(s => (
            <div key={s.label} style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:34,
                fontWeight:700, color:C.gold, lineHeight:1 }}>{s.num}</div>
              <div style={{ fontFamily:"Inter", fontSize:12, color:"rgba(244,240,232,0.5)",
                marginTop:6, letterSpacing:1, textTransform:"uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   SHARED STYLE HELPERS
══════════════════════════════════════════════════════════════ */
const sectionLabel = {
  display:"inline-block",
  fontFamily:"Inter", fontSize:11, fontWeight:600,
  letterSpacing:4, textTransform:"uppercase", color:C.teal,
  background:`rgba(${hexToRgb(C.teal)},0.12)`,
  border:`1px solid rgba(${hexToRgb(C.teal)},0.3)`,
  borderRadius:50, padding:"6px 18px", marginBottom:16,
};
const sectionTitle = {
  fontFamily:"'Playfair Display',serif",
  fontSize:"clamp(2rem,3.5vw,3rem)",
  fontWeight:700, color:C.cream, margin:"0 0 16px", lineHeight:1.15,
};
const sectionSubtitle = {
  fontFamily:"Inter", fontSize:"clamp(0.95rem,1.2vw,1.1rem)",
  color:"rgba(244,240,232,0.55)", margin:0, lineHeight:1.8,
  fontWeight:300, maxWidth:560, marginLeft:"auto", marginRight:"auto",
};

/* ══════════════════════════════════════════════════════════════
   VISA APPLY MODAL
══════════════════════════════════════════════════════════════ */
function VisaModal({ dest, onClose }) {
  const [form, setForm] = useState({ name:"", email:"", phone:"", country: dest?.id || "", message:"" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:1000,
      background:"rgba(13,19,33,0.92)", backdropFilter:"blur(12px)",
      display:"flex", alignItems:"center", justifyContent:"center",
      padding:20, animation:"fadeIn 0.3s ease",
    }} onClick={onClose}>
      <div style={{
        background: C.navyLight, borderRadius:24, maxWidth:540, width:"100%",
        border:"1px solid rgba(31,138,140,0.25)",
        boxShadow:`0 40px 120px rgba(0,0,0,0.6), 0 0 60px rgba(31,138,140,0.1)`,
        maxHeight:"90vh", overflowY:"auto",
        animation:"slideUp 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
      }} onClick={e => e.stopPropagation()}>
        <div style={{
          padding:"32px 36px",
          borderBottom:"1px solid rgba(255,255,255,0.07)",
          display:"flex", justifyContent:"space-between", alignItems:"center",
        }}>
          <div>
            <div style={{ fontFamily:"Inter", fontSize:11, color:C.teal,
              letterSpacing:3, textTransform:"uppercase", marginBottom:6 }}>
              {dest ? dest.flag + " " + dest.name : "All Destinations"}
            </div>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:26,
              fontWeight:700, color:C.cream, margin:0 }}>
              {submitted ? "Application Received!" : "Apply For Visa"}
            </h3>
          </div>
          <button onClick={onClose} style={{
            width:36, height:36, borderRadius:"50%",
            background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)",
            color:C.cream, fontSize:18, cursor:"pointer",
          }}>×</button>
        </div>

        <div style={{ padding:"32px 36px" }}>
          {submitted ? (
            <div style={{ textAlign:"center", padding:"20px 0" }}>
              <div style={{ fontSize:64, marginBottom:20 }}>✅</div>
              <p style={{ fontFamily:"'Playfair Display',serif", fontSize:22,
                color:C.cream, fontWeight:600, marginBottom:12 }}>
                We've received your application!
              </p>
              <p style={{ fontFamily:"Inter", fontSize:15,
                color:"rgba(244,240,232,0.6)", lineHeight:1.8, margin:"0 0 28px" }}>
                Our visa experts will contact you within 24 hours at {form.email}.
              </p>
              <button onClick={onClose} style={{
                background:`linear-gradient(135deg,${C.teal},#0E5C5E)`,
                color:"#fff", border:"none", borderRadius:50,
                padding:"14px 36px", fontFamily:"Inter",
                fontSize:15, fontWeight:600, cursor:"pointer",
              }}>Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {[
                { id:"name",  label:"Full Name",      type:"text",  placeholder:"Arjun Mehta" },
                { id:"email", label:"Email Address",  type:"email", placeholder:"arjun@gmail.com" },
                { id:"phone", label:"Phone Number",   type:"tel",   placeholder:"+91 98765 43210" },
              ].map(f => (
                <div key={f.id}>
                  <label style={{ fontFamily:"Inter", fontSize:12, fontWeight:600,
                    color:"rgba(244,240,232,0.6)", letterSpacing:1,
                    textTransform:"uppercase", display:"block", marginBottom:8 }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} required
                    value={form[f.id]}
                    onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                    style={{
                      width:"100%", boxSizing:"border-box",
                      background:"rgba(255,255,255,0.04)",
                      border:"1px solid rgba(255,255,255,0.1)",
                      borderRadius:12, padding:"14px 16px",
                      fontFamily:"Inter", fontSize:15, color:C.cream,
                      outline:"none", transition:"border 0.3s",
                    }}
                    onFocus={e => e.target.style.borderColor = C.teal}
                    onBlur={e  => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontFamily:"Inter", fontSize:12, fontWeight:600,
                  color:"rgba(244,240,232,0.6)", letterSpacing:1,
                  textTransform:"uppercase", display:"block", marginBottom:8 }}>Destination</label>
                <select required
                  value={form.country}
                  onChange={e => setForm(p => ({ ...p, country: e.target.value }))}
                  style={{
                    width:"100%", background:"rgba(255,255,255,0.04)",
                    border:"1px solid rgba(255,255,255,0.1)",
                    borderRadius:12, padding:"14px 16px",
                    fontFamily:"Inter", fontSize:15, color:C.cream,
                    outline:"none",
                  }}
                >
                  <option value="" style={{ background:C.navy }}>Select a destination</option>
                  {destinations.map(d => (
                    <option key={d.id} value={d.id} style={{ background:C.navy }}>
                      {d.flag} {d.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontFamily:"Inter", fontSize:12, fontWeight:600,
                  color:"rgba(244,240,232,0.6)", letterSpacing:1,
                  textTransform:"uppercase", display:"block", marginBottom:8 }}>Message (Optional)</label>
                <textarea rows={3} placeholder="Tell us about your travel plans..."
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  style={{
                    width:"100%", boxSizing:"border-box",
                    background:"rgba(255,255,255,0.04)",
                    border:"1px solid rgba(255,255,255,0.1)",
                    borderRadius:12, padding:"14px 16px",
                    fontFamily:"Inter", fontSize:15, color:C.cream,
                    outline:"none", resize:"vertical",
                  }}
                  onFocus={e => e.target.style.borderColor = C.teal}
                  onBlur={e  => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                />
              </div>
              <button type="submit" style={{
                background:`linear-gradient(135deg,${C.teal},#0E5C5E)`,
                color:"#fff", border:"none", borderRadius:50,
                padding:"16px", fontFamily:"Inter",
                fontSize:16, fontWeight:600, cursor:"pointer", marginTop:8,
                boxShadow:`0 8px 30px rgba(31,138,140,0.4)`,
              }}>Submit Application →</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════════════════════════════ */
export default function VisaPage() {
  const [selectedDest, setSelectedDest]   = useState(null);
  const [modalDest,    setModalDest]      = useState(null);
  const [showModal,    setShowModal]      = useState(false);
  const detailRef = useRef(null);

  const handleSelectCountry = (dest) => {
    setSelectedDest(dest);
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior:"smooth", block:"start" });
    }, 100);
  };

  const handleApply = (dest) => {
    setModalDest(dest);
    setShowModal(true);
  };

  return (
    <>
      <style>{fontStyle}</style>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0D1321; }
        ::-webkit-scrollbar-thumb { background: #1F8A8C; border-radius: 3px; }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(60px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes progressBar {
          from { width: 0%; } to { width: 100%; }
        }
        @keyframes scrollHint {
          0%, 100% { opacity: 0.4; transform: translateY(0); }
          50%       { opacity: 0.8; transform: translateY(8px); }
        }
        input::placeholder, textarea::placeholder { color: rgba(244,240,232,0.25); }
        select option { color: #F4F0E8; }
      `}</style>

      <div style={{ background: C.navy, minHeight:"100vh" }}>
        <HeroSlider onApply={handleApply} />
        <CountryGrid selected={selectedDest} onSelect={handleSelectCountry} />
        {selectedDest && <VisaDetail dest={selectedDest} detailRef={detailRef} />}
        <ProcessTimeline />
        <WhyChooseUs />
        <DestinationCarousel onApply={handleApply} />
        <InspirationGallery />
        <FAQSection />
        <CTASection onApply={handleApply} />
      </div>

      {showModal && (
        <VisaModal dest={modalDest} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
