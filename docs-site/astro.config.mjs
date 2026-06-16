// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// Deployed to a custom domain at the root, so `base` stays "/".
export default defineConfig({
  site: "https://rbx-tsx.alrovi.com",
  integrations: [
    starlight({
      title: "rbx-tsx",
      description:
        "TSX/TypeScript → Luau compiler targeting react-lua for Roblox. Dependency-free, fully typed output.",
      logo: {
        src: "./src/assets/logo.svg",
        replacesTitle: false,
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/AlroviOfficial/rbx-tsx",
        },
      ],
      // The playground is a standalone full-screen app shipped under /playground.
      // It lives outside Starlight's routing, so it's linked, not collected.
      head: [],
      customCss: ["./src/styles/custom.css"],
      sidebar: [
        {
          label: "Start Here",
          items: [
            { label: "Introduction", slug: "index" },
            { label: "Getting Started", slug: "getting-started" },
            {
              label: "Playground ↗",
              link: "/playground/",
              attrs: { target: "_blank" },
            },
          ],
        },
        {
          label: "Guides",
          items: [
            { label: "CLI Reference", slug: "guides/cli" },
            { label: "JSX & React", slug: "guides/jsx-react" },
            { label: "Language Transforms", slug: "guides/language-transforms" },
            { label: "API Transforms", slug: "guides/api-transforms" },
            { label: "Module System", slug: "guides/modules" },
            { label: "Type System", slug: "guides/types" },
            { label: "Roblox Integration", slug: "guides/roblox" },
            { label: "Package Type Extraction", slug: "guides/type-extraction" },
          ],
        },
        {
          label: "Reference",
          items: [
            { label: "Element Mapping", slug: "reference/element-mapping" },
            { label: "Examples", slug: "reference/examples" },
          ],
        },
      ],
    }),
  ],
});
