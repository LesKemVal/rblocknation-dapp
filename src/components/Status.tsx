import React from "react"

const readEnv = (key: string, fallback = "—") => import.meta.env[key as any] ?? fallback

export default function Status() {
  const rpc = readEnv("VITE_RPC_URL")
  const graph = readEnv("VITE_GRAPHQL_HTTP")
  const chainId = readEnv("VITE_CHAIN_ID")

  const [graphStatus, setGraphStatus] = React.useState<"unknown"|"ok"|"error">("unknown")
  const [checking, setChecking] = React.useState(false)

  const checkGraph = async () => {
    setChecking(true)
    try {
      // Try a tiny GraphQL introspection query; non-fatal if blocked by CORS or service is down
      const res = await fetch(graph, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ query: "{ __typename }" })
      })
      setGraphStatus(res.ok ? "ok" : "error")
    } catch {
      setGraphStatus("error")
    } finally {
      setChecking(false)
    }
  }

  return (
    <div style={{border:"1px solid #e5e7eb", borderRadius:12, padding:16, marginTop:16, lineHeight:1.5}}>
      <h2 style={{margin:"0 0 8px 0"}}>Environment Status</h2>
      <div><strong>RPC URL:</strong> {rpc}</div>
      <div><strong>GraphQL:</strong> {graph}</div>
      <div><strong>Chain ID:</strong> {chainId}</div>
      <div style={{marginTop:12, display:"flex", gap:8, alignItems:"center"}}>
        <button onClick={checkGraph} disabled={checking} style={{padding:"6px 10px", border:"1px solid #d1d5db", borderRadius:8, background:"#f9fafb", cursor:"pointer"}}>
          {checking ? "Checking…" : "Check Graph Endpoint"}
        </button>
        <span>
          {graphStatus === "unknown" ? "—"
            : graphStatus === "ok" ? "✅ Reachable"
            : "❌ Not reachable (CORS or offline)"}
        </span>
      </div>
    </div>
  )
}
