import { builder } from "../builder";
import { Plaid } from "@mangrove/core/plaid";

export const PlaidConnectionType = builder
  .objectRef<Plaid.Connection.PlaidConnectionEntityType>("PlaidConnection")
  .implement({
    fields: t => ({
      id: t.exposeID("connectionID"),
      institution: t.field({
        type: PlaidInstitutionType,
        resolve: t => ({
          instName: t.instName,
          instColor: t.instColor,
          instLogo: t.instLogo,
        }),
      }),
      accounts: t.field({
        type: [PlaidAccountType],
        resolve: t => Plaid.Connection.accounts(t.connectionID),
      }),
    }),
  });

export const PlaidInstitutionType = builder
  .objectRef<{
    instName: string;
    instColor: string;
    instLogo: string;
  }>("PlaidInstitution")
  .implement({
    fields: t => ({
      name: t.exposeString("instName", { nullable: true }),
      color: t.exposeString("instName", { nullable: true }),
      logo: t.exposeString("instName", { nullable: true }),
    }),
  });

export const PlaidAccountType = builder
  .objectRef<{
    account_id: string;
    name: string;
    type: string;
  }>("PlaidAccount")
  .implement({
    fields: t => ({
      id: t.exposeID("account_id"),
      name: t.exposeString("name"),
      kind: t.exposeString("type"),
    }),
  });
