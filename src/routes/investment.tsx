import React from "react"
import { useParams, Link } from "@tanstack/react-router"

export default function InvestmentDetail() {
  const { id } = useParams({ from: "/investment/$id" })
  return (
    <div style={{ padding: "20px" }}>
      <h2>Investment Opportunity — Series {id}</h2>
      <p style={{ color: "var(--text-muted)" }}>
        This page demonstrates how investors will see offering details before completing KYC/AML verification.
      </p>

      <section style={{
        marginTop: 24,
        padding: 20,
        border: "1px solid var(--border)",
        borderRadius: 10,
        background: "var(--card)",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
      }}>
        <h3>Offering Summary</h3>
        <p style={{ color: "var(--text-muted)" }}>Issuer: Example Capital LLC</p>
        <p style={{ color: "var(--text-muted)" }}>Offering Type: Reg CF (Demo)</p>
        <p style={{ color: "var(--text-muted)" }}>Target Raise: $1,500,000</p>
        <p style={{ color: "var(--text-muted)" }}>Minimum Investment: $500</p>
        <p style={{ color: "var(--text-muted)" }}>Status: Preparing KYC and Escrow Integration</p>
      </section>

      <section style={{
        marginTop: 24,
        padding: 20,
        border: "1px solid var(--border)",
        borderRadius: 10,
        background: "var(--card)"
      }}>
        <h3>KYC / AML Verification</h3>
        <p style={{ color: "var(--text-muted)" }}>
          Once KoreConX integration is live, investors will be redirected here to complete identity verification
          and connect to the escrow provider (North Capital).
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <button style={{
            background: "var(--btn-bg)",
            border: "1px solid var(--btn-border)",
            color: "var(--btn-text)",
            padding: "10px 14px",
            borderRadius: 10,
            cursor: "pointer"
          }}>Begin KYC</button>
          <button style={{
            background: "transparent",
            border: "1px solid var(--btn-border)",
            color: "var(--btn-text)",
            padding: "10px 14px",
            borderRadius: 10,
            cursor: "pointer"
          }}>Connect Escrow</button>
        </div>
      </section>

      <p style={{ fontSize: 13, marginTop: 30, color: "var(--text-muted)" }}>
        ⚠️ Disclaimer: This page is a demo for compliance partners (KoreConX & North Capital) and does not represent an active investment.
      </p>

      <div style={{ marginTop: 20 }}>
        <Link to="/invest" style={{
          display: "inline-block",
          padding: "10px 16px",
          borderRadius: 10,
          border: "1px solid var(--btn-border)",
          color: "var(--btn-text)",
          textDecoration: "none"
        }}>
          ← Back to Marketplace
        </Link>
      </div>
    </div>
  )
}
