import { promisify } from 'node:util';
import { brotliCompress, gzip } from 'node:zlib';
import { defineMiddleware } from 'astro:middleware';
import {
  ACCESS_COOKIE_NAME,
  isAccessFontPath,
  isAuthorized,
  safeNextPath,
} from './lib/access-auth.mjs';

const ACCESS_PAGE = '/access';
const compressBrotli = promisify(brotliCompress);
const compressGzip = promisify(gzip);

function appendVary(headers: Headers, value: string) {
  const current = headers.get('vary');
  if (!current?.toLowerCase().split(',').map((item) => item.trim()).includes(value.toLowerCase())) {
    headers.set('vary', current ? `${current}, ${value}` : value);
  }
}

async function compressResponse(request: Request, response: Response): Promise<Response> {
  const contentType = response.headers.get('content-type') ?? '';
  const accepts = request.headers.get('accept-encoding') ?? '';
  const canCompress =
    request.method !== 'HEAD' &&
    response.status >= 200 &&
    response.status < 300 &&
    response.status !== 204 &&
    !response.headers.has('content-encoding') &&
    /^(text\/|application\/(?:javascript|json|xml)|image\/svg\+xml)/iu.test(contentType);

  if (!canCompress || (!accepts.includes('br') && !accepts.includes('gzip'))) return response;

  const source = Buffer.from(await response.arrayBuffer());
  if (source.length === 0) return response;

  const encoding = accepts.includes('br') ? 'br' : 'gzip';
  const body = encoding === 'br' ? await compressBrotli(source) : await compressGzip(source);
  const headers = new Headers(response.headers);
  headers.set('content-encoding', encoding);
  headers.set('content-length', String(body.length));
  appendVary(headers, 'Accept-Encoding');

  return new Response(body, { status: response.status, statusText: response.statusText, headers });
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname, search } = context.url;

  // The standalone access page imports the shared stylesheet, whose generated
  // font files are its only external assets.
  if (isAccessFontPath(pathname)) return next();

  const authenticated = isAuthorized(context.cookies.get(ACCESS_COOKIE_NAME)?.value);

  if (pathname === ACCESS_PAGE || pathname === `${ACCESS_PAGE}/`) {
    if (authenticated && context.request.method === 'GET') {
      return context.redirect(safeNextPath(context.url.searchParams.get('next')), 303);
    }

    return compressResponse(context.request, await next());
  }

  if (!authenticated) {
    const accessUrl = new URL(ACCESS_PAGE, context.url);
    accessUrl.searchParams.set('next', `${pathname}${search}`);
    return context.redirect(`${accessUrl.pathname}${accessUrl.search}`, 303);
  }

  return compressResponse(context.request, await next());
});
