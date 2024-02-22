import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";
import { ExpressiveCodeTheme } from "@astrojs/starlight/expressive-code";
import fs from "node:fs";

const jsoncString = fs.readFileSync(
  new URL(
    `./src/themes/expressive-code/aura-soft-dark-soft-text-color-theme.json`,
    import.meta.url
  ),
  "utf-8"
);

const myTheme = ExpressiveCodeTheme.fromJSONString(jsoncString);

// https://astro.build/config
export default defineConfig({
  site: "https://userdocs.github.io",
  base: "/astro-starlight",
  integrations: [
    react({
      include: ["**/react/*"],
      experimentalReactChildren: true,
    }),

    starlight({
      title: "qbittorrent-nox-static",
      components: {
        // Override the default `SocialIcons` component.
        Header: "./src/components/Header.astro",
      },
      expressiveCode: {
        // Pass the theme to the `themes` option
        // (consider adding a dark and light theme for accessibility)
        themes: [myTheme],
        tabWidth: 0,
      },

      social: {
        github: "https://github.com/userdocs/qbittorrent-nox-static",
      },
      customCss: [
        // Relative path to your custom CSS file
        "./src/styles/custom.css",
      ],
      sidebar: [
        {
          label: "Read the docs",
          items: [
            // Each item here is one entry in the navigation menu.
            {
              label: "Introduction",
              link: "/introduction",
            },
            {
              label: "Script Installation",
              link: "/script-installation",
            },
            {
              label: "Build Help",
              link: "/build-help",
            },
            {
              label: "Patching",
              link: "/patching",
            },
            {
              label: "Github actions",
              link: "/github-actions",
            },
            {
              label: "Install qbittorrent",
              link: "/install-qbittorrent",
            },
            {
              label: "Nginx proxypass",
              link: "/nginx-proxypass",
            },
            {
              label: "Systemd",
              link: "/systemd",
            },
            {
              label: "Credits",
              link: "/credits",
            },
          ],
        },
      ],
    }),
  ],
});
