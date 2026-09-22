import { defineMiddleware } from 'astro:middleware';
import { env } from 'cloudflare:workers';
import {
  ACCESS_COOKIE_NAME,
  isAccessFontPath,
  isAuthorized,
  safeNextPath,
} from './lib/access-auth.mjs';

const ACCESS_PAGE = '/access';
export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname, search } = context.url;
  const secret = env?.SITE_ACCESS_SECRET;

  // The standalone access page imports the shared stylesheet, whose generated
  // font files are its only external assets.
  if (isAccessFontPath(pathname)) return next();

  const authenticated = await isAuthorized(context.cookies.get(ACCESS_COOKIE_NAME)?.value, secret);

  if (pathname === ACCESS_PAGE || pathname === `${ACCESS_PAGE}/`) {
    if (authenticated && context.request.method === 'GET') {
      return context.redirect(safeNextPath(context.url.searchParams.get('next')), 303);
    }

    return next();
  }

  if (!authenticated) {
    const accessUrl = new URL(ACCESS_PAGE, context.url);
    accessUrl.searchParams.set('next', `${pathname}${search}`);
    return context.redirect(`${accessUrl.pathname}${accessUrl.search}`, 303);
  }

  return next();
});
