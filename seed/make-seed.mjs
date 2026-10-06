// Converts web/src/content/seed-content.json into an NDJSON file that
// `sanity dataset import` understands. Run:  node seed/make-seed.mjs
import fs from "node:fs";
import crypto from "node:crypto";

const here = new URL(".", import.meta.url);
const src = JSON.parse(fs.readFileSync(new URL("../web/src/content/seed-content.json", here)));
const key = () => crypto.randomBytes(6).toString("hex");
const withKeys = (arr = []) => arr.map((o) => (typeof o === "object" ? { _key: key(), ...o } : o));
const slug = (s) => ({ _type: "slug", current: s });
const block = (text) => ({
  _type: "block", _key: key(), style: "normal", markDefs: [],
  children: [{ _type: "span", _key: key(), text, marks: [] }],
});

const docs = [];
const s = src.siteSettings;
docs.push({
  _id: "siteSettings", _type: "siteSettings", ...s,
  primaryCta: { _type: "link", ...s.primaryCta },
  secondaryCta: s.secondaryCta && { _type: "link", ...s.secondaryCta },
  valuePillars: withKeys(s.valuePillars).map((o) => ({ _type: "titleText", ...o })),
  stats: withKeys(s.stats).map((o) => ({ _type: "stat", ...o })),
});
const a = src.aboutPage;
const tt = (arr) => withKeys(arr).map((o) => ({ _type: "titleText", ...o }));
docs.push({
  _id: "aboutPage", _type: "aboutPage", ...a,
  approach: tt(a.approach), method: tt(a.method), values: tt(a.values), outlook: tt(a.outlook),
});
for (const svc of src.services) {
  // No _id: Sanity generates one on import.
  docs.push({ _type: "service", ...svc, slug: slug(svc.slug), sources: withKeys(svc.sources).map((o) => ({ _type: "source", ...o })) });
}
for (const p of src.posts) {
  docs.push({ _type: "post", ...p, slug: slug(p.slug), body: p.body.map(block) });
}

const out = new URL("content.ndjson", here);
fs.writeFileSync(out, docs.map((d) => JSON.stringify(d)).join("\n") + "\n");
console.log(`Wrote ${docs.length} documents to seed/content.ndjson`);
