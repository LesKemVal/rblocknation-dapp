import React from "react"

const rpcUrl = import.meta.env.VITE_RPC_URL as string

async function rpc<T>(method: string, params: any[] = []): Promise<T> {
  const res = await fetch(rpcUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params })
  })
  if (!res.ok) throw new Error(`RPC ${method} failed: ${res.status}`)
  const j = await res.json()
  if (j.error) throw new Error(j.error.message || "RPC error")
  return j.result as T
}

export default function Wallet() {
  const [acct, setAcct] = React.useState<string | null>(null)
  const [chain, setChain] = React.useState<string | null>(null)
  const [rpcHealthy, setRpcHealthy] = React.useState<"unknown"|"ok"|"error">("unknown")
  const [busy, setBusy] = React.useState(false)

  const connect = async () => {
    if (!("ethereum" in window)) {
      alert("No injected wallet found (MetaMask, etc.)")
      return
    }
    try {
      // @ts-expect-error
      const accounts: string[] = await window.ethereum.request({ method: "eth_requestAccounts" })
      setAcct(accounts?.[0] ?? null)
      // @ts-expect-error
      const cid: string = await window.ethereum.request({ method: "eth_chainId" })
      setChain(cid)
    } catch (e) {
      console.error(e)
      alert("Wallet connection was rejected or failed.")
    }
  }

  const checkRpc = async () => {
    setBusy(true)
    try {
      const cid = await rpc<string>("eth_chainId")
      setRpcHealthy("ok")
      setChain(cid)
    } catch {
      setRpcHealthy("error")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={{border:"1px solid #e5e7eb", borderRadius:12, padding:16, marginTop:16}}>
      <h2 style={{margin:"0 0 8px 0"}}>Wallet & RPC</h2>
      <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
        <button onClick={connect} style={{padding:"6px 10px", border:"1px solid #d1d5db", borderRadius:8, background:"#f9fafb", cursor:"pointer"}}>Connect Wallet</button>
        <button onClick={checkRpc} disabled={busy} style={{padding:"6px 10px", border:"1px solid #d1d5db", borderRadius:8, background:"#f9fafb", cursor:"pointer"}}>{busy ? "Checking…" : "Check RPC (eth_chainId)"}</button>
      </div>
      <div style={{marginTop:12, lineHeight:1.6}}>
        <div><strong>Account:</strong> {acct ?? "—"}</div>
        <div><strong>Wallet Chain ID:</strong> {chain ?? "—"}</div>
        <div><strong>RPC Health:</strong> {rpcHealthy === "unknown" ? "—" : rpcHealthy === "ok" ? "✅ Reachable" : "❌ Not reachable"}</div>
      </div>
    </div>
  )
}
