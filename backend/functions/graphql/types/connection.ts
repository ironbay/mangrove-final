import { SlackConnection } from "@mangrove/core/connection/slack";
import { PlaidConnection } from "@mangrove/core/connection/plaid";
import { builder } from "../builder";
import { SQL } from "@mangrove/core/sql";

export const PlaidConnectionType = builder
  .objectRef<PlaidConnection.Connection>("PlaidConnection")
  .implement({
    fields: t => ({
      id: t.exposeID("id"),
      institution_name: t.exposeString("institution_name"),
      institution_color: t.exposeString("institution_color"),
      institution_logo: t.exposeString("logo"),
      accounts: t.field({
        type: [PlaidAccountType],
        resolve: async connection => PlaidConnection.accounts(connection.id),
      }),
    }),
  });

export const PlaidAccountType = builder
  .objectRef<PlaidConnection.Account>("PlaidAccount")
  .implement({
    fields: t => ({
      id: t.exposeID("id"),
      name: t.exposeString("name"),
      kind: t.exposeString("kind"),
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
    resolve: async (_, args) => SlackConnection.list("usr123"),
  }),
}));
