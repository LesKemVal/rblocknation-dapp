import React, { useEffect, useState } from "react"
import { fetchNC } from "@/lib/northcapital/api"

export default function EscrowStatus() {
  const [escrow, setEscrow] = useState("Loading...")

  useEffect(() => {
    fetchNC({ path: "/v1/escrow/balance" })
      .then((data) => setEscrow(`$${data.balance || 0}`))
      .catch(() => setEscrow("Unavailable"))
  }, [])

  return (
    <div className="card p-4 rounded-2xl bg-neutral-900/60 text-white">
      <h3 className="text-lg font-semibold mb-2">Escrow Balance</h3>
      <p>{escrow}</p>
    </div>
  )
}
