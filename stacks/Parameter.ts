import { Construct } from "constructs";
import { App, Function as Fn } from "@serverless-stack/resources";
import { StringParameter } from "aws-cdk-lib/aws-ssm";
import { PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";

export class Parameter extends Construct {
  public readonly name: string;
  private static readonly all = new Set<string>();

  constructor(scope: Construct, name: string, value?: string) {
    super(scope, name);
    const app = App.of(scope) as App;
    Parameter.all.add(name);
    this.name = name;

    if (value) {
      new StringParameter(this, name, {
        parameterName: `/${app.name}/${app.stage}/${name}`,
        stringValue: value,
      });
    }
  }

  public static use(func: Fn, ...params: Parameter[]) {
    const values = params.map(p => p.name).join(",");
    const app = App.of(params[0]) as App;
    const policy = new PolicyStatement({
      resources: params.flatMap(p => [
        `arn:aws:ssm:${app.region}:${app.account}:parameter/${app.name}/${app.stage}/${p.name}`,
        `arn:aws:ssm:${app.region}:${app.account}:parameter/${app.name}/fallback/${p.name}`,
      ]),
      actions: ["*"],
      effect: Effect.ALLOW,
    });
    func.addToRolePolicy(policy);
    func.addEnvironment("SSM_VALUES", values);
    func.addEnvironment("SSM_PREFIX", `/${app.name}/${app.stage}/`);
  }
}
