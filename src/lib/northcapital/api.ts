/**
 * North Capital Escrow API Helper
 * Fetches escrow account balances, investor verification, and payment status.
 */

export interface NCRequestOptions {
  path: string
  method?: string
  body?: any
}

export async function fetchNC({ path, method = "GET", body }: NCRequestOptions) {
  const url = `${import.meta.env.NC_ESCROW_URL}${path}`
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.NC_ESCROW_KEY || "",
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    console.error(`[NorthCapital] ${res.status} ${res.statusText}`)
    throw new Error(`North Capital request failed: ${res.status}`)
  }

  return res.json()
}

/**
 * Example usage:
 * const escrow = await fetchNC({ path: "/v1/escrow/status" })
 */
