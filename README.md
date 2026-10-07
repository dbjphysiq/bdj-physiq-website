# BDJ PhysIQ Technologies website

A fast bilingual-ready marketing site built with **Next.js (App Router) + React + Tailwind CSS**, content managed in **Sanity**, code on **GitHub**, hosted on **Vercel**.

```
                 git push main                         Publish in Studio
  Developer ───────────────────► GitHub ──► Vercel     Editor ─────────────► Sanity Content Lake
                                              │  build + deploy                    │
                                              ▼                                    │ webhook (signed POST)
                                    https://bdjphysiq.com  ◄── /api/revalidate ◄───┘
                                    (static pages, cached)     expires cache tags > fresh page on next visit
```

- **Code updates:** every `git push` to `main` triggers a build and deployment on Vercel.
- **Content updates:** an editor clicks **Publish** in Sanity Studio, Sanity calls `/api/revalidate`, and the affected pages refresh within seconds. **No code deployment.**

## What is in this repository

| Folder | What it is | Where it runs |
|---|---|---|
| `web/` | The website (Next.js 16, React 19, Tailwind CSS 4) | Vercel |
| `studio/` | Sanity Studio, the editing interface for non-developers | `https://bdjphysiq.sanity.studio` (free Sanity hosting) |
| `seed/` | All website copy as an import file, so the Studio starts full | Imported once |
| `.github/workflows/` | Optional: redeploys the Studio when `studio/` changes | GitHub Actions |

The website **works before Sanity is connected**: it falls back to the copy in `web/src/content/seed-content.json`. Once Sanity is connected, every page reads from Sanity.

> Why a separate Studio instead of one embedded at `/studio`? Sanity now recommends a standalone Studio: builds are faster, the Studio updates itself automatically, and the website bundle stays small.

---

## Step 0: What you need

1. **Node.js 22** (`node -v`) and **Git** (`git --version`) on your computer.
2. Free accounts on **GitHub**, **Vercel** (sign up *with* GitHub) and **Sanity** (sanity.io, sign up with the same Google or GitHub account).
3. About 45 minutes.

## Step 1: Run the website locally (no accounts needed)

```bash
cd web
npm install
npm run dev
```

Open http://localhost:3000. You should see the full site with the seed content.

## Step 2: Create the Sanity project and Studio

1. Go to **https://www.sanity.io/manage** > **Create new project**. Name: `BDJ PhysIQ Website`. Choose the **Free** plan. Create a dataset called **`production`** with **Public** visibility (the website only reads published content).
2. Copy the **Project ID** shown at the top of the project page (8 characters, e.g. `a1b2c3d4`).
3. In the terminal:

```bash
cd studio
cp .env.example .env          # then put your Project ID in .env
npm install
npx sanity login              # opens the browser; use the same account
npm run dev                   # Studio at http://localhost:3333
```

4. **Import all the website copy** into Sanity (run this **once only**, re-running duplicates the services):

```bash
node ../seed/make-seed.mjs    # (re)generates seed/content.ndjson from the copy file
npm run import-seed
```

5. **Publish the Studio online** for your editors:

```bash
npm run deploy                # hosts it at https://bdjphysiq.sanity.studio
```

If `bdjphysiq` is taken, change `studioHost` in `studio/sanity.cli.ts` and run it again.

6. **Invite editors:** sanity.io/manage > your project > **Members** > **Invite** (role *Editor*). They only need a browser.

## Step 3: Connect the website to Sanity (locally)

```bash
cd ../web
cp .env.example .env.local
```

Fill in `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=a1b2c3d4          # your Project ID
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-09-01
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SANITY_REVALIDATE_SECRET=<run: openssl rand -base64 32>
```

Restart `npm run dev`. The pages now come from Sanity (the terminal shows the fetches).

## Step 4: Put the code on GitHub

1. On github.com > **New repository** > name `bdj-physiq-website` > **Private** > do **not** add a README > **Create**.
2. From the repository root on your computer:

```bash
git init
git add .
git commit -m "Initial website: Next.js + Sanity"
git branch -M main
git remote add origin https://github.com/<your-username>/bdj-physiq-website.git
git push -u origin main
```

`.env`, `.env.local` and `node_modules` are ignored, so no secrets are uploaded.

## Step 5: Deploy on Vercel (code updates on every push)

1. vercel.com > **Add New... > Project** > **Import** `bdj-physiq-website` from GitHub.
2. **Root Directory:** click **Edit** and choose **`web`**. (Framework preset is detected as **Next.js**. Leave build settings as they are.)
3. **Environment Variables**, add all five, for *Production, Preview and Development*:

| Name | Value |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | your Project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2026-09-01` |
| `NEXT_PUBLIC_SITE_URL` | `https://bdjphysiq.com` (or the `*.vercel.app` URL until the domain is ready) |
| `SANITY_REVALIDATE_SECRET` | the same long random string as in `.env.local` |

4. Click **Deploy**. After about a minute you get a live URL such as `https://bdj-physiq-website.vercel.app`.
5. **Custom domain:** Project > **Settings > Domains** > add `bdjphysiq.com` and follow the DNS instructions from Vercel at your domain registrar.

**The code workflow is now automatic:**

- `git push` to **`main`** > production build and deployment.
- `git push` to any other branch or a pull request > a separate **Preview** URL to review changes before merging.
- `web/vercel.json` skips a website build when a commit only changes `studio/` or `seed/`.

Environment variables are read at build time. **If you add or change one, redeploy** (Deployments > ⋯ > Redeploy).

## Step 6: Content updates without deployment (on-demand revalidation)

### How it works

1. Every Sanity query is cached by Next.js and **labelled with tags**: the homepage uses `siteSettings`, `service` and `aboutPage`; a service page uses `service` and `service:<slug>`.
2. When an editor publishes, Sanity sends a **signed POST** to `/api/revalidate` with the tags of the changed document, for example `["service", "service:ai-act-evidence-lab"]`.
3. The endpoint checks the signature, then calls `revalidateTag(tag, { expire: 0 })` for each tag. Every cached response and page using those tags expires.
4. The **next visitor** gets a freshly rendered page, which is cached again until the next edit.

### The code (already in the project)

**`web/src/sanity/fetch.ts`**, the cached, tagged fetch:

```ts
import type { QueryParams } from "next-sanity";
import { client } from "./client";
import { isSanityConfigured } from "./env";

export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: QueryParams;
  tags: string[];
}): Promise<T | null> {
  if (!isSanityConfigured) return null;
  try {
    return await client.fetch<T>(query, params, {
      cache: "force-cache",                    // store in the Next.js Data Cache
      next: { revalidate: false, tags },       // keep until a tag is revalidated
    });
  } catch (error) {
    console.error("[sanity] fetch failed, using fallback content", error);
    return null;
  }
}
```

**Using it with tags** (`web/src/lib/content.ts`):

```ts
export async function getService(slug: string) {
  return sanityFetch<Service>({
    query: SERVICE_QUERY,
    params: { slug },
    tags: ["service", `service:${slug}`],
  });
}
```

**`web/src/app/api/revalidate/route.ts`**, the webhook endpoint:

```ts
import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = { tags?: (string | null)[]; _type?: string };

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    if (!secret) {
      return new NextResponse("SANITY_REVALIDATE_SECRET is not set", { status: 500 });
    }

    // `true` waits briefly so Sanity's API serves the new version before we re-fetch.
    const { isValidSignature, body } = await parseBody<WebhookPayload>(req, secret, true);
    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    const tagList = (body?.tags ?? [body?._type]).filter(
      (t): t is string => typeof t === "string" && t.length > 0 && !t.endsWith(":"),
    );
    if (tagList.length === 0) {
      return new NextResponse("No tags in payload", { status: 400 });
    }

    // Next.js 16: expire immediately, so the next request renders fresh content.
    for (const tag of tagList) revalidateTag(tag, { expire: 0 });

    return NextResponse.json({ revalidated: true, tags: tagList, now: Date.now() });
  } catch (err) {
    return new NextResponse((err as Error).message, { status: 500 });
  }
}
```

> Next.js 16 note: the one-argument `revalidateTag(tag)` is deprecated. For webhooks, Next.js recommends `revalidateTag(tag, { expire: 0 })`. Use `"max"` instead if you prefer visitors to see the old page once while the new one renders in the background.

### Configure the webhook

The webhook is created in the **Sanity** dashboard. The matching secret lives in **Vercel** (the `SANITY_REVALIDATE_SECRET` environment variable from Step 5). Both must hold the same string.

1. sanity.io/manage > your project > **API** > **Webhooks** > **Create webhook**.
2. Fill in exactly:

| Field | Value |
|---|---|
| Name | `Vercel revalidate` |
| URL | `https://bdjphysiq.com/api/revalidate` (or your `*.vercel.app` URL) |
| Dataset | `production` |
| Trigger on | ☑ Create ☑ Update ☑ Delete |
| Filter | `_type in ["siteSettings", "aboutPage", "service", "post"]` |
| Projection | `{"tags": [_type, _type + ":" + slug.current]}` |
| Status | Enabled |
| HTTP method | `POST` |
| API version | the latest offered |
| Drafts | **Off** (only published changes should update the site) |
| Secret | the same value as `SANITY_REVALIDATE_SECRET` in Vercel |

3. **Save**.

### Test the complete loop

1. Open the Studio > **Homepage and site settings** > change the **Hero headline** > **Publish**.
2. In sanity.io/manage > API > Webhooks > your webhook > **⋯ > Show attempts log**: the latest attempt should show **200** and a response like `{"revalidated":true,"tags":["siteSettings"]}`.
3. Reload the website: the new headline is live, with no deployment in Vercel's list.

### Tested before delivery

- `next build` succeeds: 22 routes, all static except `/api/revalidate`.
- `/api/revalidate` answers **200** for a correctly signed request and **401** for a forged signature.
- A full loop was simulated against a mock Sanity API: page shows version A > content changed to B > page still A (cached) > signed webhook > **next visit shows B**, with no rebuild.

## Day-to-day use

| I want to... | Do this |
|---|---|
| Edit text, services or articles | Studio > edit > **Publish**. Live within seconds. |
| Add a new service | Studio > **Services** > **+** > fill in > **Publish**. It appears on `/services` and gets its own page. |
| Write an article | Studio > **Insight articles** > **+** > **Publish**. |
| Change layout, design or code | Edit in `web/`, test with `npm run dev`, then `git push` to `main`. |
| Preview a code change safely | Push to a branch and open the Preview URL Vercel posts on the pull request. |
| Change the Studio (fields, schemas) | Edit `studio/`, run `npm run deploy` in `studio/` (or let the GitHub Action do it). |

## Adding a new content type (for developers)

1. Add a schema in `studio/schemaTypes/` and register it in `schemaTypes/index.ts`; deploy the Studio.
2. Add a GROQ query in `web/src/sanity/queries.ts` and a getter in `web/src/lib/content.ts` with tags `["<type>", "<type>:" + slug]`.
3. Add `"<type>"` to the webhook **Filter** in Sanity.

## Optional: automatic Studio deployment

`.github/workflows/deploy-studio.yml` redeploys the Studio whenever `studio/` changes on `main`:

1. sanity.io/manage > API > **Tokens** > **Add API token** > name `GitHub deploy`, permission **Deploy Studio**.
2. GitHub repo > Settings > Secrets and variables > Actions:
   - **Secret** `SANITY_DEPLOY_TOKEN` = the token
   - **Variable** `SANITY_STUDIO_PROJECT_ID` = your Project ID

## Troubleshooting

| Symptom | Likely cause and fix |
|---|---|
| Webhook log shows **401** | The secret in Sanity and `SANITY_REVALIDATE_SECRET` in Vercel differ. Fix one, then **redeploy** Vercel. |
| Webhook log shows **500 "SANITY_REVALIDATE_SECRET is not set"** | Add the variable in Vercel and redeploy. |
| Webhook shows **404** | Wrong URL: it must end in `/api/revalidate`, on the production domain. |
| 200 but the page is unchanged | Check the webhook **Filter** includes the document type, and that **Drafts** is off (publish, don't just save). Reload the page once more. |
| Site shows the seed copy, not Sanity | `NEXT_PUBLIC_SANITY_PROJECT_ID` is missing in Vercel > add it and redeploy. |
| New service returns 404 | Its slug is empty: open it in the Studio, click **Generate** next to Slug, publish. |
| Vercel build fails with "Root Directory" errors | Project > Settings > General > Root Directory must be `web`. |

## Before launch

- Register **bdjphysiq.com** and switch the contact email to an address on that domain (update it in the Studio).
- Add the RCCM number and tax ID to the footer legal line once registration is complete.
- Upload a founder photo in the Studio (About page > Founder photo, with alt text).
- Have a lawyer confirm the service commitments, and check the statistics and dates flagged in the website copy.

## Optional: live database, lead form and AI assistant

These features switch on only when their environment variables exist. Without them the site behaves exactly as before.

1. **Database.** Create a free Postgres database at neon.tech (or supabase.com), open its SQL editor and run `web/db/schema.sql` once. Add `DATABASE_URL` in Vercel. The contact page then shows a form that saves every enquiry to the `leads` table.
2. **Lead alerts (optional).** Create a free account at resend.com and add `RESEND_API_KEY` and `LEAD_NOTIFY_EMAIL` to get an email for each new lead.
3. **AI assistant.** Create an API key in the Anthropic console, set a monthly spending limit there, and add `ANTHROPIC_API_KEY` in Vercel. An "Ask us" button appears on every page. It answers only from the site content, tells visitors it is an AI, and passes quote requests to the contact form. Limits: 20 messages per visitor per hour and `ASSISTANT_DAILY_LIMIT` (default 400) per day for the whole site.
4. Redeploy after adding variables. Read the conversations and leads in the database dashboard.
