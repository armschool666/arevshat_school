import { SignJWT, jwtVerify } from "jose";

const SESSION_TTL_SEC = 60 * 60 * 24 * 7; // 7 days

function getSecret(): Uint8Array {
  return new TextEncoder().encode(process.env.ADMIN_TOKEN ?? "dev-secret");
}

export async function createSession(): Promise<{ token: string; maxAgeSec: number }> {
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SEC}s`)
    .sign(getSecret());
  return { token, maxAgeSec: SESSION_TTL_SEC };
}

export async function isSessionValid(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

export async function revokeSession(_token: string | undefined): Promise<void> {
  // JWT is stateless — logout is handled by deleting the cookie client-side
}
