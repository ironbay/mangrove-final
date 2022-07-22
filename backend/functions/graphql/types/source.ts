import { builder } from "../builder";
import * as Source from "@mangrove/core/source";

export const PlaidSourceType =
  builder.objectRef<Source.Plaid.SourceEntityType>("PlaidSource");

PlaidSourceType.implement({
  fields: t => ({
    id: t.exposeString("sourceID"),
    pipeID: t.exposeString("pipeID"),
    itemID: t.exposeString("itemID"),
    account: t.field({
      type: PlaidAccountType,
      resolve: parent => parent,
    }),
  }),
});

const PlaidAccountType = builder
  .objectRef<{ accountID: string; accountName: string; accountKind: string }>(
    "PlaidAccount"
  )
  .implement({
    fields: t => ({
      id: t.exposeString("accountID"),
      name: t.exposeString("accountName"),
      kind: t.exposeString("accountKind"),
    }),
  });

export const SourceType = builder.unionType("Source", {
  types: [PlaidSourceType],
  resolveType: obj => {
    switch (obj.kind) {
      case "plaid":
        return PlaidSourceType;
    }
  },
});

// const BingoType = builder
//   .objectRef<{ accountKind: string }>("Bingo")
//   .implement({
//     fields: t => ({
//       accountKind: t.exposeString("accountKind"),
//     }),
//   });

// const SourceType = builder.unionType("Source", {
//   types: [PlaidSourceType, BingoType],
//   resolveType: obj => {
//     switch (obj.accountKind) {
//       case "bingo":
//         return BingoType;
//       case "dokie":
//         return PlaidSourceType;
//     }
//   },
// });
