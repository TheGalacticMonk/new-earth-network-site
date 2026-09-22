import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

export const ACCESS_COOKIE_NAME = 'nen_access';
const ACCESS_COOKIE_VERSION = 'v1';
const ACCESS_PAGE = '/access';
const PASSWORD = 'frequency';
const LOCAL_SECRET = createHash('sha256')
  .update('new-earth-network:local-cookie-secret:v1:', 'utf8')
  .update(PASSWORD, 'utf8')
  .digest();
const ACCESS_SECRET = process.env.SITE_ACCESS_SECRET?.trim() || LOCAL_SECRET;
const ACCESS_TOKEN = createHmac('sha256', ACCESS_SECRET)
  .update(`new-earth-network:${ACCESS_COOKIE_VERSION}`)
  .digest('base64url');

function constantTimeEqual(left, right) {
  const leftDigest = createHash('sha256').update(left, 'utf8').digest();
  const rightDigest = createHash('sha256').update(right, 'utf8').digest();
  return timingSafeEqual(leftDigest, rightDigest);
}

export function passwordMatches(candidate) {
  return constantTimeEqual(candidate, PASSWORD);
}

export function accessCookieValue() {
  return ACCESS_TOKEN;
}

export function isAuthorized(cookieValue) {
  return typeof cookieValue === 'string' && constantTimeEqual(cookieValue, ACCESS_TOKEN);
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
