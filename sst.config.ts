import { SSTConfig } from "sst"

import { Dynamo } from "./stacks/Dynamo"
import { Bus } from "./stacks/Bus"
import { Api } from "./stacks/Api"
import { Web } from "./stacks/Web"

export default {
  config(input) {
    const profile = {
      dev: "ironbay-dev",
      production: "ironbay-production",
    }

    return {
      name: "mangrove",
      region: "us-east-1",
      profile: profile[input.stage || ""] || profile.dev,
    }
  },
  stacks(app) {
    app.setDefaultFunctionProps({
      runtime: "nodejs16.x",
      architecture: "arm_64",
      nodejs: {
        format: "esm",
        esbuild: {
          keepNames: true,
        },
      },
    })

    app.stack(Dynamo).stack(Bus).stack(Api).stack(Web)
  },
} satisfies SSTConfig
