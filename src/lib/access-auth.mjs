export const ACCESS_COOKIE_NAME = 'nen_access';
const ACCESS_COOKIE_VERSION = 'v2';
const ACCESS_PAGE = '/access';
const PASSWORD = 'frequency';
const LOCAL_SECRET = 'new-earth-network:local-cookie-secret:v1:frequency';

function secretValue(secret) {
  return typeof secret === 'string' && secret.trim() ? secret.trim() : LOCAL_SECRET;
}

function toBase64Url(bytes) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/u, '');
}

async function tokenFor(secret) {
  const input = new TextEncoder().encode(`${secretValue(secret)}:new-earth-network:${ACCESS_COOKIE_VERSION}`);
  const digest = await crypto.subtle.digest('SHA-256', input);
  return toBase64Url(new Uint8Array(digest));
}

export async function passwordMatches(candidate) {
  return candidate === PASSWORD;
}

export function accessCookieValue(secret) {
  return tokenFor(secret);
}

export async function isAuthorized(cookieValue, secret) {
  if (typeof cookieValue !== 'string') return false;
  const expected = await tokenFor(secret);
  if (cookieValue.length !== expected.length) return false;
  let difference = 0;
  for (let index = 0; index < expected.length; index += 1) {
    difference |= cookieValue.charCodeAt(index) ^ expected.charCodeAt(index);
  }
  return difference === 0;
}

export function isAccessFontPath(pathname) {
  return (
    (pathname.startsWith('/_astro/manrope-latin-wght-normal.') ||
      pathname.startsWith('/_astro/space-grotesk-latin-wght-normal.')) &&
    pathname.endsWith('.woff2')
  );
}

export function safeNextPath(candidate) {
  if (typeof candidate !== 'string' || !candidate.startsWith('/') || candidate.startsWith('//')) return '/';
  if (candidate.includes('\\') || /[\u0000-\u001f\u007f]/u.test(candidate)) return '/';

  try {
    const parsed = new URL(candidate, 'http://local.invalid');
    const normalizedPathname = decodeURIComponent(parsed.pathname).replace(/\/+$/u, '') || '/';
    if (parsed.origin !== 'http://local.invalid' || normalizedPathname === ACCESS_PAGE) return '/';
    return `${parsed.pathname}${parsed.search}`;
  } catch {
    return '/';
  }
}
