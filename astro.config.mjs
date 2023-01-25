import { defineConfig } from 'astro/config';
import astroI18next from "astro-i18next";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: "https://resume.daliborhon.com",
  integrations: [astroI18next(), sitemap(), robotsTxt(), compress()]
});