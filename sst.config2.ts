import  type { SSTConfig } from "sst"
import { Api } from "./stacks/Api.js"
import { Dynamo } from "./stacks/Dynamo.js"

export default {
  config(input) {
    return {
      name: "myapp",
      region: "us-east-1",
      profile: "my-company-dev"
    }
  },
  stacks(app) {
    app.setDefaultFunctionProps({
      runtime: "nodejs16.x",
      architecture: "arm_64",
    })

    app
      .stack(Api)
      .stack(Dynamo)
  },
} satisfies SSTConfig