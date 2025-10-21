import React from "react"
import { createRootRoute, createRoute, Router, Outlet, Link } from "@tanstack/react-router"
import Status from "./components/Status"
import Wallet from "./components/Wallet"
import ThemeToggle from "./components/theme-toggle"
import InvestmentDetail from "./routes/investment"

//
// ---- Layout Styles ----
//
const Shell: React.CSSProperties = {
  fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
  color: "var(--text)",
  background: "var(--background)",
  minHeight: "100vh",
  margin: 0,
  padding: 0,
  transition: "background 0.4s ease, color 0.4s ease"
}

const Card: React.CSSProperties = {
  border: "1px solid var(--border)",
  borderRadius: 12,
  padding: 16,
  boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  background: "var(--card)"
}

const Btn = (solid = true): React.CSSProperties => ({
  display: "inline-block",
  padding: "10px 16px",
  borderRadius: 10,
  fontWeight: 600,
  cursor: "pointer",
  textDecoration: "none",
  background: solid ? "var(--btn-bg)" : "transparent",
  border: "1px solid var(--btn-border)",
  color: "var(--btn-text)",
  transition: "all 0.3s ease"
})

//
// ---- Navbar ----
//
const Nav = () => (
  <header
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 20px",
      position: "sticky",
      top: 0,
      background: "var(--nav-bg)",
      borderBottom: "1px solid var(--border)",
      zIndex: 20
    }}
  >
    <strong style={{ fontSize: 20 }}>R. Block Nation</strong>
    <nav style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <Link to="/" style={{ textDecoration: "none", color: "var(--text)" }}>Home</Link>
      <Link to="/invest" style={{ textDecoration: "none", color: "var(--text)" }}>Invest</Link>
      <Link to="/dashboard" style={{ textDecoration: "none", color: "var(--text)" }}>Dashboard</Link>
    </nav>
    <ThemeToggle />
  </header>
)

//
// ---- Root Layout ----
//
const Root = () => (
  <div style={Shell}>
    <Nav />
    <main style={{ padding: "24px 20px", maxWidth: 1200, margin: "0 auto" }}>
      <Outlet />
    </main>
    <footer
      style={{
        padding: "30px 20px",
        borderTop: "1px solid var(--border)",
        marginTop: 40,
        textAlign: "center",
        color: "var(--text-muted)"
      }}
    >
      © {new Date().getFullYear()} R. Block Nation — All rights reserved
    </footer>
  </div>
)

//
// ---- Pages ----
//
const Home = () => (
  <div>
    <h1 style={{
      fontSize: 42,
      background: "linear-gradient(90deg,#bbb,#999,#bbb)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundSize: "200% auto",
      animation: "gleam 8s linear infinite"
    }}>
      Tokenized Raises for Real-World Assets
    </h1>
    <p style={{ fontSize: 18, color: "var(--text-muted)" }}>
      Launch compliant offerings, onboard investors, track progress, and settle on-chain — all in one place.
    </p>
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <a href="/invest" style={Btn(true)}>Start Investing</a>
      <a href="/dashboard" style={Btn(false)}>Issuer Dashboard</a>
    </div>

    <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 26 }}>
      <div style={Card}>
        <h3>Environment</h3>
        <Status />
      </div>
      <div style={Card}>
        <h3>Wallet</h3>
        <Wallet />
      </div>
    </section>
  </div>
)

const Invest = () => (
  <div style={{ display: "grid", gap: 16 }}>
    <h2>Investor Marketplace</h2>
    <p style={{ color: "var(--text-muted)" }}>
      Explore tokenized offerings. Click any to view details and begin KYC/AML.
    </p>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={Card}>
          <h4>Series {i} — Yield Token</h4>
          <p style={{ color: "var(--text-muted)" }}>Target: $1.5M</p>
          <div style={{ display: "flex", gap: 8 }}>
            <a href={`/investment/${i}`} style={{ ...Btn(true), flex: 1, textAlign: "center" }}>View Details</a>
            <a href={`/investment/${i}`} style={{ ...Btn(false), flex: 1, textAlign: "center" }}>Start Investment</a>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const Dashboard = () => (
  <div style={{ display: "grid", gap: 16 }}>
    <h2>Issuer Dashboard</h2>
    <p style={{ color: "var(--text-muted)" }}>Track raise progress, investors, and payouts.</p>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
      <div style={Card}><strong>Total Raised</strong><div style={{ fontSize: 28 }}>$1.2M</div></div>
      <div style={Card}><strong>Active Investors</strong><div style={{ fontSize: 28 }}>184</div></div>
      <div style={Card}><strong>Next Payout</strong><div style={{ fontSize: 28 }}>Nov 15</div></div>
    </div>
  </div>
)

//
// ---- Router Tree ----
//
const rootRoute = createRootRoute({ component: Root })
const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: "/", component: Home })
const investRoute = createRoute({ getParentRoute: () => rootRoute, path: "/invest", component: Invest })
const dashboardRoute = createRoute({ getParentRoute: () => rootRoute, path: "/dashboard", component: Dashboard })
const investmentRoute = createRoute({ getParentRoute: () => rootRoute, path: "/investment/$id", component: InvestmentDetail })
const routeTree = rootRoute.addChildren([indexRoute, investRoute, dashboardRoute, investmentRoute])

export function getRouter() { return new Router({ routeTree }) }
declare module "@tanstack/react-router" { interface Register { router: ReturnType<typeof getRouter> } }

//
// ---- Theme Variables ----
//
const styleSheet = document.createElement("style")
styleSheet.innerHTML = `
:root {
  --background:#fff;
  --card:#fff;
  --border:#ccc;
  --text:#0f172a;
  --text-muted:#475569;
  --btn-bg:#fff;
  --btn-border:#000;
  --btn-text:#000;
  --nav-bg:#ffffffcc;
}
[data-theme='dark'] {
  --background:#000;
  --card:#111;
  --border:#555;
  --text:#A7B4C9;
  --text-muted:#9aa8be;
  --btn-bg:#000;
  --btn-border:#999;
  --btn-text:#f5f5f5;
  --nav-bg:#0a0a0acc;
}
@keyframes gleam {
  0% {background-position:200% center;}
  100% {background-position:-200% center;}
}
a:hover,button:hover{opacity:.9;transform:translateY(-1px);}
`
document.head.appendChild(styleSheet)
