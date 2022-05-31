import { Pipe } from "@mangrove/core/pipe";
import { PlaidConnection } from "@mangrove/core/plaid_connection";
import { builder } from "../builder";
import { SQL } from "@mangrove/core/sql";
import { ConnectionBuilder } from "kysely";

const PipeType = builder.objectRef<SQL.Row["pipes"]>("Pipe").implement({
  fields: t => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    enabled: t.exposeBoolean("enabled"),
    number_filters: t.field({
      type: [NumberFilterType],
      resolve: pipe => Pipe.number_filters(pipe.id),
    }),
    string_filters: t.field({
      type: [StringFilterType],
      resolve: pipe => Pipe.string_filters(pipe.id),
    }),
    slack_destinations: t.field({
      type: [SlackDestinationType],
      resolve: pipe => Pipe.slack_destinations(pipe.id),
    }),
  }),
});

const NumberFilterType = builder
  .objectRef<SQL.Row["number_filters"]>("NumberFilter")
  .implement({
    fields: t => ({
      id: t.exposeID("id"),
      value: t.exposeFloat("value"),
      operand: t.exposeString("operand"),
      account: t.field({
        type: PlaidAccountType,
        resolve: t =>
          PlaidConnection.get_account(t.connection_id, t.account_id),
      }),
      connection: t.field({
        type: PlaidConnectionType,
        resolve: t => PlaidConnection.from_id(t.connection_id),
      }),
    }),
  });

const StringFilterType = builder
  .objectRef<SQL.Row["string_filters"]>("StringFilter")
  .implement({
    fields: t => ({
      id: t.exposeID("id"),
      value: t.exposeString("value"),
      operand: t.exposeString("operand"),
    }),
  });

const SlackDestinationType = builder
  .objectRef<SQL.Row["slack_destinations"]>("SlackDestination")
  .implement({
    fields: t => ({
      id: t.exposeID("id"),
    }),
  });

const PlaidAccountType = builder
  .objectRef<PlaidConnection.Account>("PlaidAccount")
  .implement({
    fields: t => ({
      id: t.exposeID("id"),
      name: t.exposeString("name"),
      kind: t.exposeString("kind"),
    }),
  });

const PlaidConnectionType = builder
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
