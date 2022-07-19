import { SlackConnection } from "@mangrove/core/connection/slack";
import { PlaidConnection } from "@mangrove/core/connection/plaid";
import { builder } from "../builder";
import { SQL } from "@mangrove/core/sql";
import { Plaid } from "@mangrove/core/plaid";

export const PlaidConnectionType = builder
  .objectRef<PlaidConnection.Connection>("PlaidConnection")
  .implement({
    fields: t => ({
      id: t.exposeID("id"),
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

export const SlackConnectionType = builder
  .objectRef<SQL.Row["slack_connections"]>("SlackConnection")
  .implement({
    fields: t => ({
      id: t.exposeID("id"),
      name: t.exposeString("team_name"),
      logo: t.exposeString("logo"),
      channels: t.field({
        type: [SlackChannelType],
        resolve: async parent => SlackConnection.channels(parent.access_token),
      }),
    }),
  });

export const SlackChannelType = builder
  .objectRef<SlackConnection.Channel>("SlackChannel")
  .implement({
    fields: t => ({
      id: t.exposeID("id"),
      name: t.exposeString("name"),
    }),
  });

export const SlackDestinationType = builder
  .objectRef<SQL.Row["slack_destinations"]>("SlackDestination")
  .implement({
    fields: t => ({
      id: t.exposeID("id"),
      connection: t.field({
        type: SlackConnectionType,
        resolve: t => SlackConnection.from_id(t.id),
      }),
      channel: t.field({
        type: [SlackChannelType],
        resolve: t => SlackConnection.channels(t.id),
      }),
    }),
  });

builder.queryFields(t => ({
  plaidConnections: t.field({
    type: [PlaidConnectionType],
    resolve: async (_, _args) => PlaidConnection.list("usr123"),
  }),
  plaidConnection: t.field({
    type: PlaidConnectionType,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_, args) => PlaidConnection.from_id(args.id),
  }),
  slackConnections: t.field({
    type: [SlackConnectionType],
    resolve: async () => SlackConnection.list(),
  }),
  slackConnecion: t.field({
    type: SlackConnectionType,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async () => SlackConnection.from_id(args.id),
  }),
}));
