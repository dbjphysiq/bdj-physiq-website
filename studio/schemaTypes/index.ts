import { link, source, stat, titleText } from "./objects";
import { siteSettings } from "./siteSettings";
import { aboutPage } from "./aboutPage";
import { service } from "./service";
import { post } from "./post";

export const schemaTypes = [siteSettings, aboutPage, service, post, link, titleText, stat, source];
