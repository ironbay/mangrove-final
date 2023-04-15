import { defineConfig } from "vite"
import solidPlugin from "vite-plugin-solid"
import { macaronVitePlugin } from "@macaron-css/vite"

export default defineConfig({
  plugins: [macaronVitePlugin(), solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
})
// import { macaronVitePlugin } from "@macaron-css/vite"
// import { defineConfig } from "vite"
// import solidPlugin from "vite-plugin-solid"
// import { macaronVitePlugin } from "@macaron-css/vite"
// import path from "path"

// export default defineConfig({
//   plugins: [macaronVitePlugin() as any, solidPlugin()],
//   server: {
//     port: 3000,
//   },
//   build: {
//     target: "esnext",
//   },
//   resolve: {
//     alias: {
//       "@goodvisit/ui": path.resolve(__dirname, "./src/ui"),
//     },
//   },
// })
