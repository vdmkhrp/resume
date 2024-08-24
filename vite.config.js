import { defineConfig } from "vite";
import { resolve } from "path";
import fs from "fs";
import { dirname } from "path";
import handlebars from "vite-plugin-handlebars";
import { createHtmlPlugin } from "vite-plugin-html";

const __dirname = dirname(new URL(import.meta.url).pathname);

const getHtmlInputs = () => {
  const files = fs
    .readdirSync(__dirname)
    .filter((file) => file.endsWith(".html"));
  return files.reduce((inputs, file) => {
    const key = file.replace(/\.html$/, "");
    inputs[key] = resolve(__dirname, file);
    return inputs;
  }, {});
};

const pageData = {
  "/index.html": {
    title: "Homepage",
  },
  "/portfolio.html": {
    title: "Portfolio",
  }
};


export default defineConfig({
  root: __dirname,
  base: "/",
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "src/partials"),
      context(pagePath) {
        return pageData[pagePath] || {};
      },
    }),
    createHtmlPlugin({
      minify: true,
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        ...getHtmlInputs(),
        main: resolve(__dirname, "src/js/script.js"),
      },
    },
    outDir: "dist",
    assetsDir: "assets",
  },
});
