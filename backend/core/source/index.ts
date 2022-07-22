import * as Plaid from "./plaid";
export * as Source from ".";

export async function forPipe(pipeID: string) {
  return Plaid.SourceEntity.query.pipe({ pipeID }).go();
}
