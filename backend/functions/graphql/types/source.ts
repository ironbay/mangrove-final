import { builder } from "../builder";
import { Source } from "@mangrove/core/source";
import { FilterType } from "./filter";
import { Filter } from "@mangrove/core/filter";

export const PlaidSourceType = builder
  .objectRef<Source.Plaid.PlaidSourceEntityType>("PlaidSource")
  .implement({
    fields: t => ({
      id: t.exposeID("sourceID"),
      institution: t.field({
        type: "String",
        resolve: () => "Gina",
      }),
      account: t.field({
        type: PlaidSourceAccountType,
        resolve: t => t,
      }),
      filters: t.field({
        type: [FilterType],
        resolve: parent => Filter.forSource(parent.sourceID),
      }),
    }),
  });

export const PlaidSourceInstitutionType = builder
  .objectRef<{ instLogo: string; instName: string }>(
    "PlaidSourceInstitutionType"
  )
  .implement({
    fields: t => ({
      name: t.exposeString("instName"),
      logo: t.exposeString("instLogo"),
    }),
  });

export const PlaidSourceAccountType = builder
  .objectRef<{
    accountName: string;
    accountKind: string;
  }>("PlaidSourceAccountType")
  .implement({
    fields: t => ({
      name: t.exposeString("accountName"),
      kind: t.exposeString("accountKind"),
    }),
  });

export const PlaidSourceInput = builder.inputType("PlaidSourceInput", {
  fields: t => ({
    connectionID: t.string(),
    pipeID: t.string(),
    accountID: t.string(),
    numberFilters: t.field({
      type: [NumberFilterInput],
    }),
  }),
});

export const NumberFilterInput = builder.inputType("NumberFilterInput", {
  fields: t => ({
    value: t.int(),
    op: t.string(),
    kind: t.string(),
  }),
});
