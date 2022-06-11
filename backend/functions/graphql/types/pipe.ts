import { Pipe } from "@mangrove/core/pipe";
import { PlaidConnection } from "@mangrove/core/connection/plaid";
import { builder } from "../builder";
import { SQL } from "@mangrove/core/sql";
import {
  PlaidConnectionType,
  PlaidAccountType,
  SlackDestinationType,
} from "./connection";

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

builder.queryFields(t => ({
  pipes: t.field({
    type: [PipeType],
    resolve: _ => Pipe.list(),
  }),
  pipesFromSlackConnection: t.field({
    args: {
      id: t.arg.string({ required: true }),
    },
    type: [PipeType],
    resolve: async (_, args) => Pipe.from_slack_connection(args.id),
  }),
  pipesFromPlaidConnection: t.field({
    args: {
      id: t.arg.string({ required: true }),
    },
    type: [PipeType],
    resolve: async (_, args) => Pipe.from_slack_connection(args.id),
  }),
}));

const NumberFilterInputType = builder.inputType("NumberFilterInputType", {
  fields: t => ({
    value: t.float({ required: true }),
    operand: t.string({ required: true }),
  }),
});

builder.mutationFields(t => ({
  addPipe: t.field({
    type: PipeType,
    args: {
      name: t.arg.string({ required: true }),
      enabled: t.arg.boolean({ required: true }),
      number_filters: t.arg({
        type: [NumberFilterInputType],
        required: true,
      }),
    },
    resolve: (_, args) =>
      Pipe.addPipe(args.name, args.enabled, args.number_filters),
  }),
}));
