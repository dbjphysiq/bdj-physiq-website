import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "your-project-id",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  // Your editors will open the Studio at https://<studioHost>.sanity.studio
  // Change this if the name is already taken when you run `npm run deploy`.
  studioHost: "bdjphysiq",
  deployment: {
    appId: "e9iy99g0btnbcteg5azjbu6c",
  },
});
