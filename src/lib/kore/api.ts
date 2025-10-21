/**
 * KoreConX API Helper
 * Handles issuer onboarding, KYC/AML, and compliance status checks.
 */

export interface KoreRequestOptions {
  path: string
  method?: string
  body?: any
}

export async function fetchKore({ path, method = "GET", body }: KoreRequestOptions) {
  const url = `${import.meta.env.KORE_BASE_URL}${path}`
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.KORE_API_KEY || "",
    "x-api-secret": import.meta.env.KORE_API_SECRET || "",
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    console.error(`[KoreConX] ${res.status} ${res.statusText}`)
    throw new Error(`KoreConX request failed: ${res.status}`)
  }

  return res.json()
}

/**
 * Example usage:
 * const status = await fetchKore({ path: "/v1/compliance/status" })
 */
