import { Pipe } from "@mangrove/core/pipe";
import { builder } from "../builder";
import { SQL } from "@mangrove/core/sql";
import { SqlList } from "aws-sdk/clients/redshiftdata";

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
