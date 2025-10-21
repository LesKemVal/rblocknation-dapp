import React, { useEffect, useState } from "react";

interface WelcomeProps {
  steps?: React.ReactNode;
}

type Health = "checking" | "ok" | "fail";

export function Welcome({ steps }: WelcomeProps) {
  const [rpc, setRpc] = useState<{ status: Health; chainId?: string }>({ status: "checking" });
  const [graph, setGraph] = useState<{ status: Health; height?: number }>({ status: "checking" });

  const RPC_URL = import.meta.env.VITE_RPC_URL as string;
  const GRAPH_URL = import.meta.env.VITE_GRAPHQL_URL as string;

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(RPC_URL, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "eth_chainId", params: [] }),
        });
        const j = await r.json();
        const id = (j?.result || "").toString();
        setRpc({ status: id ? "ok" : "fail", chainId: id });
      } catch {
        setRpc({ status: "fail" });
      }
    })();
  }, [RPC_URL]);

  useEffect(() => {
    (async () => {
      try {
        const query = { query: "{ _meta { block { number } } }" };
        const r = await fetch(GRAPH_URL, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(query),
        });
        const j = await r.json();
        const height = j?.data?._meta?.block?.number;
        setGraph({ status: typeof height === "number" ? "ok" : "fail", height });
      } catch {
        setGraph({ status: "fail" });
      }
    })();
  }, [GRAPH_URL]);

  const dot = (status: Health) =>
    status === "ok" ? "bg-emerald-400" : status === "fail" ? "bg-rose-400" : "bg-amber-400";

  return (
    <div className="min-h-[70vh] w-full bg-[#0f1115] text-white relative overflow-hidden rounded-2xl shadow-xl">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-20"
             style={{ background: "radial-gradient(60% 60% at 50% 50%, #d4af37 0%, rgba(212,175,55,0) 70%)" }} />
        <div className="absolute -bottom-32 -right-32 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-10"
             style={{ background: "radial-gradient(60% 60% at 50% 50%, #b78e20 0%, rgba(183,142,32,0) 70%)" }} />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-16 grid gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs tracking-wide">
            <span className="h-2 w-2 rounded-full bg-[#d4af37]" />
            Live Demo • Anvil / Subgraph connected
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">R. Block Nation</h1>

          <p className="text-base sm:text-lg text-white/80 max-w-prose">
            A compliant, white-label tokenization and crowdfunding stack for Reg CF and Reg A+.
            Built on Settlemint’s Asset Tokenization Kit. Broker-dealer supervised. KoreConX and
            North Capital integrated.
          </p>

          <div className="flex flex-wrap gap-3">
            <a href="/app" className="rounded-xl px-5 py-3 font-semibold shadow-lg hover:shadow-xl transition
                         bg-gradient-to-br from-[#d4af37] to-[#b78e20] text-[#0f1115]">Launch Dapp</a>
            <a href="/docs" className="rounded-xl px-5 py-3 font-semibold border border-white/15 bg-white/5 hover:bg-white/10 transition">Read Docs</a>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <span className={`inline-block h-2 w-2 rounded-full ${dot(rpc.status)}`} />
              RPC <span className="text-white/60">({new URL(RPC_URL).hostname})</span>:
              <span className="font-mono">{rpc.chainId ?? "—"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`inline-block h-2 w-2 rounded-full ${dot(graph.status)}`} />
              Subgraph <span className="text-white/60">({new URL(GRAPH_URL).hostname})</span>:
              <span className="font-mono">{typeof graph.height === "number" ? `#${graph.height}` : "—"}</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl bg-black/30 p-4">
                <div className="text-white/60">Network</div>
                <div className="mt-1 font-semibold">Anvil</div>
              </div>
              <div className="rounded-xl bg-black/30 p-4">
                <div className="text-white/60">RPC</div>
                <div className="mt-1 font-semibold truncate">{new URL(RPC_URL).hostname}</div>
              </div>
              <div className="rounded-xl bg-black/30 p-4">
                <div className="text-white/60">Subgraph</div>
                <div className="mt-1 font-semibold truncate">{new URL(GRAPH_URL).pathname}</div>
              </div>
              <div className="rounded-xl bg-black/30 p-4">
                <div className="text-white/60">Status</div>
                <div className={`mt-1 font-semibold ${rpc.status === "ok" && graph.status === "ok" ? "text-emerald-400" : "text-amber-300"}`}>
                  {rpc.status === "ok" && graph.status === "ok" ? "Operational" : "Degraded / Checking"}
                </div>
              </div>
            </div>
          </div>

          {steps && (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              {steps}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
