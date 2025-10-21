import React from "react"
import { createRootRoute, createRoute, Router, Outlet, Link } from "@tanstack/react-router"
import Status from "./components/Status"
import Wallet from "./components/Wallet"

const Shell: React.CSSProperties = { 
  fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif", 
  color: "#0f172a" 
}
const Card: React.CSSProperties = { 
  border: "1px solid #e5e7eb", 
  borderRadius: 16, 
  padding: 16, 
  boxShadow: "0 1px 2px rgba(0,0,0,0.04)", 
  background: "#fff" 
}
const Button: React.CSSProperties = { 
  padding: "10px 14px", 
  borderRadius: 10, 
  border: "1px solid #0f172a", 
  background: "#0f172a", 
  color: "#fff", 
  fontWeight: 600, 
  cursor: "pointer" 
}
const Outline: React.CSSProperties = { 
  ...Button, 
  background: "#fff", 
  color: "#0f172a" 
}

const Nav = () => (
  <header style={{
    display: "flex", 
    alignItems: "center", 
    justifyContent: "space-between", 
    padding: "16px 20px", 
    position: "sticky", 
    top: 0, 
    background: "#ffffffcc", 
    backdropFilter: "saturate(180%) blur(8px)", 
    borderBottom: "1px solid #e5e7eb"
  }}>
    <div style={{display: "flex", gap: 10, alignItems: "center"}}>
      <div style={{width: 34, height: 34, borderRadius: 8, background: "#0f172a"}} />
      <strong>R. Block</strong>
    </div>
    <nav style={{display: "flex", gap: 16}}>
      <Link to="/" style={{textDecoration: "none", color: "#0f172a"}}>Home</Link>
      <Link to="/invest" style={{textDecoration: "none", color: "#0f172a"}}>Invest</Link>
      <Link to="/dashboard" style={{textDecoration: "none", color: "#0f172a"}}>Dashboard</Link>
    </nav>
  </header>
)

const Root = () => (
  <div style={Shell}>
    <Nav />
    <main style={{padding: "24px 20px", maxWidth: 1200, margin: "0 auto"}}>
      <Outlet />
    </main>
    <footer style={{
      padding: "30px 20px", 
      borderTop: "1px solid #e5e7eb", 
      marginTop: 40, 
      textAlign: "center", 
      color: "#475569"
    }}>
      © {new Date().getFullYear()} R. Block Nation — All rights reserved
    </footer>
  </div>
)

const Home = () => {
  const [showEnv, setShowEnv] = React.useState(false);
  const [showWallet, setShowWallet] = React.useState(false);

  return (
    <div>
      <section style={{display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 24, alignItems: "center"}}>
        <div>
          <h1 style={{fontSize: 44, lineHeight: 1.05, margin: "0 0 12px 0"}}>
            Tokenized Raises for Real-World Assets
          </h1>
          <p style={{fontSize: 18, color: "#475569", margin: "0 0 20px 0"}}>
            Launch compliant offerings, onboard investors, track progress, and settle on-chain — all in one place.
          </p>
          <div style={{display: "flex", gap: 12}}>
            <a href="/invest" style={Button as any}>Start Investing</a>
            <a href="/dashboard" style={Outline as any}>Issuer Dashboard</a>
          </div>
        </div>
        <div style={{display: "grid", gap: 12}}>
          <div style={{...Card, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12}}>
            <div>
              <div style={{fontSize: 12, color: "#64748b"}}>Current Raise</div>
              <div style={{fontSize: 28, fontWeight: 700}}>$1.2M / $5.0M</div>
              <div style={{height: 10, background: "#e2e8f0", borderRadius: 999, marginTop: 8}}>
                <div style={{width: "24%", height: "100%", background: "#0f172a", borderRadius: 999}}/>
              </div>
            </div>
            <div>
              <div style={{fontSize: 12, color: "#64748b"}}>Investors Onboarded</div>
              <div style={{fontSize: 28, fontWeight: 700}}>184</div>
            </div>
          </div>
          <div style={Card}>
            <div style={{fontSize: 12, color: "#64748b"}}>Compliance Status</div>
            <div style={{display: "flex", gap: 8, alignItems: "center", marginTop: 6}}>
              <span style={{fontSize: 20}}>✅</span>
              <span>KYC vendor connected</span>
            </div>
            <div style={{display: "flex", gap: 8, alignItems: "center", marginTop: 6}}>
              <span style={{fontSize: 20}}>✅</span>
              <span>Escrow pending activation</span>
            </div>
            <div style={{display: "flex", gap: 8, alignItems: "center", marginTop: 6}}>
              <span style={{fontSize: 20}}>⚠️</span>
              <span>Subgraph not reachable (local)</span>
            </div>
          </div>
        </div>
      </section>

      <section style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 26}}>
        <div style={Card}>
          <h3 style={{marginTop: 0}}>Environment</h3>
          {!showEnv ? (
            <button onClick={() => setShowEnv(true)} style={Button as any}>
              Check Environment
            </button>
          ) : (
            <Status />
          )}
        </div>

        <div style={Card}>
          <h3 style={{marginTop: 0}}>Wallet</h3>
          {!showWallet ? (
            <button onClick={() => setShowWallet(true)} style={Button as any}>
              Connect Wallet
            </button>
          ) : (
            <Wallet />
          )}
        </div>
      </section>
    </div>
  );
};

const Invest = () => (
  <div style={{display: "grid", gap: 16}}>
    <h2>Invest</h2>
    <p>Choose an offering, connect your wallet, and proceed with KYC & escrow.</p>
    <div style={{display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12}}>
      {[1,2,3].map(i => (
        <div key={i} style={Card}>
          <div style={{fontSize: 12, color: "#64748b"}}>Offering #{i}</div>
          <div style={{fontSize: 20, fontWeight: 700, marginTop: 6}}>Series {i} — Yield Notes</div>
          <div style={{fontSize: 14, color: "#475569", marginTop: 6}}>Target: $1,500,000</div>
          <div style={{marginTop: 12, display: "flex", gap: 8}}>
            <a href="/dashboard" style={Button as any}>View Details</a>
            <a href="/invest" style={Outline as any}>Invest</a>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const Dashboard = () => (
  <div style={{display: "grid", gap: 16}}>
    <h2>Issuer Dashboard</h2>
    <p>Track raise progress, investors, and payouts. (Live data enables after Graph & RPC connect.)</p>
    <div style={{display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12}}>
      <div style={Card}><strong>Total Raised</strong><div style={{fontSize: 28}}>$1.2M</div></div>
      <div style={Card}><strong>Active Investors</strong><div style={{fontSize: 28}}>184</div></div>
      <div style={Card}><strong>Next Payout</strong><div style={{fontSize: 28}}>Nov 15</div></div>
    </div>
  </div>
)

const rootRoute = createRootRoute({ component: Root })
const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: "/", component: Home })
const investRoute = createRoute({ getParentRoute: () => rootRoute, path: "/invest", component: Invest })
const dashboardRoute = createRoute({ getParentRoute: () => rootRoute, path: "/dashboard", component: Dashboard })
const routeTree = rootRoute.addChildren([indexRoute, investRoute, dashboardRoute])

export function getRouter() { 
  return new Router({ routeTree }) 
}

declare module "@tanstack/react-router" { 
  interface Register { 
    router: ReturnType<typeof getRouter> 
  } 
}

