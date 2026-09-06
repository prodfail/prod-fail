# prod.fail

Personal site for [Joshua Roark](https://prod.fail), security engineer at Nymbl Systems.

Static HTML, CSS, and a small `js/site.js`. No build step.

## Deploy on Cloudflare Pages

1. In Cloudflare Pages, create a project from this repo.
2. Framework preset: **None**.
3. Build command: leave empty.
4. Output directory: `public`.
5. Production branch: `main`.

Custom domain: `prod.fail`. `_headers` is read automatically.

After the first deploy, purge the cache if an old Next.js export is still being served (`/_next/static/...`).

## Local

```sh
python3 -m http.server 8080 --directory public
```

## Notes

Copy and structure live in `public/index.html`. Design tokens and layout live in `public/css/site.css`.
