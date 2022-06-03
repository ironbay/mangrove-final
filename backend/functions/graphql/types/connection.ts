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
        resolve: t => PlaidConnection.get_accounts(t.id),
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
  .objectRef<SlackConnection.Connection>("SlackConnection")
  .implement({
    fields: t => ({
      id: t.exposeID("id"),
    }),
  });

export const SlackChannelType = builder
  .objectRef<SlackConnection.Channel>("SlackChannel")
  .implement({
    fields: t => ({
      id: t.exposeID("id"),
      name: t.exposeString("name"),
      is_private: t.exposeBoolean("is_private"),
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
