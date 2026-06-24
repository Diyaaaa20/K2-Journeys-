import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();
  const links = [
    { to: "/about",   label: "About Us" },
    { to: "/visa",    label: "Visa Assistance" },
    { to: "/blog",    label: "Blog" },
    { to: "/contact", label: "Contact Us" },
  ];
  return (
    <nav style={{
      display: "flex", gap: "8px", padding: "14px 32px",
      background: "#0D1321", borderBottom: "1px solid rgba(31,138,140,0.2)",
      position: "sticky", top: 0, zIndex: 900,
    }}>
      <span style={{
        fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700,
        color: "#1F8A8C", marginRight: "auto", letterSpacing: 1,
      }}>K2 Journeys</span>
      {links.map(l => (
        <Link key={l.to} to={l.to} style={{
          fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500,
          color: pathname === l.to ? "#1F8A8C" : "rgba(244,240,232,0.6)",
          textDecoration: "none", padding: "8px 18px", borderRadius: 50,
          background: pathname === l.to ? "rgba(31,138,140,0.12)" : "transparent",
          border: pathname === l.to ? "1px solid rgba(31,138,140,0.35)" : "1px solid transparent",
          transition: "all 0.3s ease",
        }}>{l.label}</Link>
      ))}
    </nav>
  );
}


export default Navbar;