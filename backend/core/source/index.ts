import * as Plaid from "./plaid";
export * as Plaid from "./plaid";
export * as Source from ".";

export async function fromPipe(pipeID: string) {
  return Plaid.SourceEntity.query.pipe({ pipeID }).go();
}
