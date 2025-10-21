import React, { useEffect, useState } from "react"
import { fetchKore } from "@/lib/kore/api"

export default function ComplianceStatus() {
  const [status, setStatus] = useState("Loading...")

  useEffect(() => {
    fetchKore({ path: "/v1/compliance/status" })
      .then((data) => setStatus(data.status || "OK"))
      .catch(() => setStatus("Unavailable"))
  }, [])

  return (
    <div className="card p-4 rounded-2xl bg-neutral-900/60 text-white">
      <h3 className="text-lg font-semibold mb-2">Compliance Status</h3>
      <p>{status}</p>
    </div>
  )
}
