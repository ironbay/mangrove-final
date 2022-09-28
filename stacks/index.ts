import { App } from "@serverless-stack/resources";
import { Api } from "./Api";
import { Web } from "./Web";
import { Bus } from "./Bus";
import { Dynamo } from "./Dynamo";

export default function main(app: App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "backend",
    bundle: {
      format: "esm",
    },
  });
  app.stack(Dynamo).stack(Bus).stack(Api).stack(Web);
}
