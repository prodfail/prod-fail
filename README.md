# prod.fail

Personal site for [Joshua Roark](https://prod.fail). Static HTML, CSS, and a small `js/site.js`. No build step.

Repo: [github.com/prodfail/prod-fail](https://github.com/prodfail/prod-fail)

## Deploy: GitHub → Cloudflare Pages

You do not download the site and re-upload it. Cloudflare clones this repo and publishes `public/` every time `main` moves.

### 1. Open Workers & Pages

In the [Cloudflare dashboard](https://dash.cloudflare.com/) go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.

If GitHub is not already linked, install the Cloudflare GitHub App. Grant it access to **`prodfail/prod-fail`** (selected repositories is fine).

### 2. Import this repo

Pick **`prodfail/prod-fail`**. Use these build settings — they are the whole configuration:

| Field | Value |
|---|---|
| Framework preset | **None** |
| Build command | *(leave empty)* |
| Build output directory | `public` |
| Root directory | *(leave empty)* |
| Production branch | `main` |

Save and deploy. The first URL will be something like `prod-fail.pages.dev`. Check that before touching the custom domain.

### 3. Point `prod.fail` at the new project

The current site was a direct upload of a Next.js `out/` folder. A direct-upload project usually **cannot** be switched to Git. Leave it, and attach the domain to the new Git project instead:

1. Open the **old** Pages project → **Custom domains** → remove `prod.fail` and `www.prod.fail` if present.
2. Open the **new** Git project → **Custom domains** → **Set up a custom domain** → `prod.fail`.
3. If the zone `prod.fail` already lives in this Cloudflare account, DNS is created for you (`CNAME` to the Pages hostname). Do not also keep an old CNAME pointed at the previous project.
4. Wait for the certificate (a few minutes). Visit `https://prod.fail`.

If the old Next.js assets are still cached (`/_next/static/...`), purge the zone cache once: **Caching** → **Configuration** → **Purge Everything**.

After this, every push to `main` on GitHub is a production deploy. Pull requests get `*.pages.dev` preview URLs.

## Local

```sh
python3 -m http.server 8080 --directory public
```

## Notes

Copy and structure live in `public/index.html`. Design tokens and layout live in `public/css/site.css`. Cloudflare reads `public/_headers` automatically.
