import React from "react"

export default function ForPartners() {
  return (
    <section className="min-h-screen bg-neutral-900 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">For Partners & Compliance</h1>
        <p className="mb-4">
          <strong>R. Block Nation</strong> operates under the oversight of a licensed
          <strong> Broker-Dealer partner</strong>, with all regulated activities performed
          through approved compliance providers.
        </p>
        <div className="space-y-6 mt-8">
          <div className="bg-neutral-800 rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-2 text-amber-400">KoreConX Integration</h2>
            <p>
              KoreConX manages KYC/AML, investor onboarding, and corporate records
              through secure API connectivity.
            </p>
          </div>
          <div className="bg-neutral-800 rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-2 text-amber-400">North Capital Escrow</h2>
            <p>
              Escrow, payment processing, and investor funds flow are managed by
              <strong> North Capital Private Securities</strong>, ensuring full regulatory
              segregation of funds.
            </p>
          </div>
          <div className="bg-neutral-800 rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-2 text-amber-400">Broker-Dealer Oversight</h2>
            <p>
              All Reg CF, Reg A+, and Reg D raises are conducted with FINRA-registered
              Broker-Dealer supervision. This partnership ensures adherence to SEC rules,
              investor protection standards, and transparency across all offerings.
            </p>
          </div>
        </div>
        <p className="mt-8 text-sm text-neutral-400">
          © {new Date().getFullYear()} R. Block Nation | All rights reserved.
        </p>
      </div>
    </section>
  )
}
