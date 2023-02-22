import { StackContext, use, StaticSite } from "sst/constructs"
import { Api } from "./Api"

export function Web({ stack }: StackContext) {
  const api = use(Api)

  const _site = new StaticSite(stack, "web", {
    path: "web",
    buildCommand: "pnpm run build",
    buildOutput: "dist",
    environment: {
      VITE_GRAPHQL_URL: api.url + "/graphql",
    },
    vite: {
      types: "types/web.d.ts",
    },
  })
}
