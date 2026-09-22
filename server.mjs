import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { brotliCompressSync, gzipSync } from 'node:zlib';
import { handler } from './dist/server/entry.mjs';
import {
  ACCESS_COOKIE_NAME,
  isAccessFontPath,
  isAuthorized,
  safeNextPath,
} from './src/lib/access-auth.mjs';

const CLIENT_ROOT = resolve('dist/client');
const PORT = Number(process.env.PORT || 4321);
const HOST = process.env.HOST || '127.0.0.1';
const MIME_TYPES = new Map([
  ['.avif', 'image/avif'],
  ['.css', 'text/css; charset=utf-8'],
  ['.gif', 'image/gif'],
  ['.ico', 'image/x-icon'],
  ['.jpeg', 'image/jpeg'],
  ['.jpg', 'image/jpeg'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.mjs', 'text/javascript; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml; charset=utf-8'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webmanifest', 'application/manifest+json; charset=utf-8'],
  ['.webp', 'image/webp'],
  ['.woff2', 'font/woff2'],
  ['.xml', 'application/xml; charset=utf-8'],
]);
const COMPRESSIBLE = /^(text\/|application\/(?:javascript|json|manifest\+json|xml)|image\/svg\+xml)/iu;

function cookieValue(header, name) {
  for (const part of (header || '').split(';')) {
    const separator = part.indexOf('=');
    if (separator === -1 || part.slice(0, separator).trim() !== name) continue;
    try {
      return decodeURIComponent(part.slice(separator + 1).trim());
    } catch {
      return undefined;
    }
  }
  return undefined;
}

function acceptedEncoding(header = '') {
  const accepted = new Map(
    header.split(',').map((part) => {
      const [name, ...parameters] = part.trim().toLowerCase().split(';');
      const quality = parameters.find((parameter) => parameter.trim().startsWith('q='));
      return [name, quality ? Number(quality.split('=')[1]) : 1];
    }),
  );
  if ((accepted.get('br') ?? 0) > 0) return 'br';
  if ((accepted.get('gzip') ?? 0) > 0) return 'gzip';
  return undefined;
}

function redirectToAccess(response, pathnameAndSearch) {
  const nextPath = safeNextPath(pathnameAndSearch);
  response.writeHead(303, {
    Location: `/access?next=${encodeURIComponent(nextPath)}`,
    'Content-Length': '0',
  });
  response.end();
}

async function physicalAsset(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return { invalid: true };
  }
  if (decoded.includes('\0') || decoded.includes('\\')) return { invalid: true };

  const filePath = resolve(CLIENT_ROOT, `.${decoded}`);
  if (filePath !== CLIENT_ROOT && !filePath.startsWith(`${CLIENT_ROOT}${sep}`)) return { invalid: true };

  try {
    const details = await stat(filePath);
    return details.isFile() ? { filePath, details } : undefined;
  } catch {
    return undefined;
  }
}

async function serveAsset(request, response, url, asset) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD', 'Content-Length': '0' });
    response.end();
    return;
  }

  const contentType = MIME_TYPES.get(extname(asset.filePath).toLowerCase()) || 'application/octet-stream';
  const cacheControl = url.pathname.startsWith('/_astro/')
    ? 'public, max-age=31536000, immutable'
    : 'public, max-age=0, must-revalidate';
  const headers = { 'Content-Type': contentType, 'Cache-Control': cacheControl };

  if (request.method === 'HEAD') {
    response.writeHead(200, { ...headers, 'Content-Length': String(asset.details.size) });
    response.end();
    return;
  }

  const encoding = COMPRESSIBLE.test(contentType) ? acceptedEncoding(request.headers['accept-encoding']) : undefined;
  if (encoding) {
    const source = await readFile(asset.filePath);
    const body = encoding === 'br' ? brotliCompressSync(source) : gzipSync(source);
    response.writeHead(200, {
      ...headers,
      'Content-Encoding': encoding,
      'Content-Length': String(body.length),
      Vary: 'Accept-Encoding',
    });
    response.end(body);
    return;
  }

  response.writeHead(200, { ...headers, 'Content-Length': String(asset.details.size) });
  createReadStream(asset.filePath).pipe(response);
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);
    const asset = await physicalAsset(url.pathname);
    if (asset?.invalid) {
      response.writeHead(400, { 'Content-Length': '0' });
      response.end();
      return;
    }

    if (asset) {
      const authorized = isAuthorized(cookieValue(request.headers.cookie, ACCESS_COOKIE_NAME));
      if (!authorized && !isAccessFontPath(url.pathname)) {
        redirectToAccess(response, `${url.pathname}${url.search}`);
        return;
      }
      await serveAsset(request, response, url, asset);
      return;
    }

    handler(request, response);
  } catch (error) {
    console.error(error);
    if (!response.headersSent) response.writeHead(500, { 'Content-Length': '0' });
    response.end();
  }
});

server.listen(PORT, HOST, () => {
  console.log(`New Earth Network listening on http://${HOST}:${PORT}`);
});
