import React from "react"

export default function NavBrand() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {/* Silhouette logo background */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 8,
          backgroundImage: "url('/assets/protest-silhouette.svg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          filter: "brightness(1.2)",
          mixBlendMode: "multiply",
        }}
      />
      {/* Site name */}
      <strong
        style={{
          fontFamily: "'Bebas Neue', 'Anton', 'Impact', sans-serif",
          letterSpacing: "1px",
          fontSize: 24,
          color: "var(--text)",
        }}
      >
        R. Block Nation
      </strong>
    </div>
  )
}
