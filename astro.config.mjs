// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  build: {
    // Astro's default ('auto') only inlines stylesheets under ~4KB; every
    // page's CSS here is bigger than that, so it was shipping as a separate
    // <link rel="stylesheet"> — a request that blocks first paint until it
    // resolves, confirmed by Lighthouse's render-blocking-resources audit
    // flagging exactly these two files. Inlining is nearly free here (each
    // page's CSS is small in absolute terms, ~10-30KB raw) and removes the
    // extra network round-trip entirely, since the CSS ships as part of the
    // HTML response that's already loading. Trade-off: inlined CSS can no
    // longer be cached separately from the HTML, so a visitor who moves
    // between pages re-downloads it each time instead of reusing one cached
    // file — worth revisiting if the site grows enough pages/traffic that
    // this starts costing more than the render-blocking fix is worth.
    inlineStylesheets: 'always',
  },
});
