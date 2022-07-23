import * as Slack from "./slack";
export * from "./slack";

export * as Destination from ".";

export async function forPipe(pipeID: string) {
  return Slack.forPipe(pipeID);
}
