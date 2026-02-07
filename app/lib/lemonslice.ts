/**
 * LemonSlice API client — server-side only.
 *
 * All calls go through Next.js API routes so the API key
 * is never exposed to the browser.
 */

const API_KEY = process.env.LEMONSLICE_API_KEY ?? "";
const BASE_URL = (
  process.env.LEMONSLICE_BASE_URL ?? "https://api.lemonslice.com"
).replace(/\/$/, "");

function headers(extra: Record<string, string> = {}) {
  return {
    Authorization: `Bearer ${API_KEY}`,
    ...extra,
  };
}

/* ── Voices ────────────────────────────────────────────── */

export async function listVoices() {
  const res = await fetch(`${BASE_URL}/v1/voices`, {
    method: "GET",
    headers: headers({ "Content-Type": "application/json" }),
  });
  return res.json();
}

/* ── Image upload ──────────────────────────────────────── */

export async function uploadImage(formData: FormData) {
  const res = await fetch(`${BASE_URL}/v1/images/upload`, {
    method: "POST",
    headers: headers(),
    body: formData,
  });
  return res.json();
}

/* ── Session management ────────────────────────────────── */

export interface CreateSessionParams {
  image_id: string;
  voice_id: string;
  knowledge_id?: string;
  language?: string;
  quality?: string;
}

export async function createSession(params: CreateSessionParams) {
  const res = await fetch(`${BASE_URL}/v1/sessions`, {
    method: "POST",
    headers: headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(params),
  });
  return res.json();
}

export async function getSession(sessionId: string) {
  const res = await fetch(`${BASE_URL}/v1/sessions/${sessionId}`, {
    method: "GET",
    headers: headers({ "Content-Type": "application/json" }),
  });
  return res.json();
}

export async function endSession(sessionId: string) {
  const res = await fetch(`${BASE_URL}/v1/sessions/${sessionId}`, {
    method: "DELETE",
    headers: headers({ "Content-Type": "application/json" }),
  });
  return res.json();
}

/* ── Speak (text-to-avatar) ────────────────────────────── */

export async function speak(sessionId: string, text: string) {
  const res = await fetch(`${BASE_URL}/v1/sessions/${sessionId}/speak`, {
    method: "POST",
    headers: headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ text }),
  });
  return res.json();
}

/* ── Knowledge base ────────────────────────────────────── */

export async function createKnowledge(name: string, content: string) {
  const res = await fetch(`${BASE_URL}/v1/knowledge`, {
    method: "POST",
    headers: headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ name, content }),
  });
  return res.json();
}
