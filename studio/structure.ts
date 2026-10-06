import { CogIcon } from "@sanity/icons/Cog";
import { UsersIcon } from "@sanity/icons/Users";
import type { StructureResolver } from "sanity/structure";

export const SINGLETONS = ["siteSettings", "aboutPage"];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Website content")
    .items([
      S.listItem().title("Homepage and site settings").icon(CogIcon)
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem().title("About page").icon(UsersIcon)
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.divider(),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("post").title("Insight articles"),
    ]);
