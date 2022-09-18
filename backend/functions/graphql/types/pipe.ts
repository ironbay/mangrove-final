import { builder } from "../builder";
import { Pipe, PipeEntity } from "@mangrove/core/pipe";
import { Source } from "@mangrove/core/source";

export const PipeType = builder.objectRef<Pipe.PipeEntityType>("Pipe");

// homepage list implementation
// want to get the source logo but not query all the accounts for a plaid connection!!!
PipeType.implement({
  fields: t => ({
    id: t.exposeID("pipeID"),
    name: t.exposeString("name"),
    enabled: t.exposeBoolean("enabled"),
    plaidSources: t.field({
      type: [PlaidSourceType],
      resolve: async pipe => Source.Plaid.forPipe(pipe.pipeID),
    }),
    // sources: t.field({
    //   type: [SourceType],
    //   resolve: async parent => Source.forPipe(parent.pipeID),
    // }),
    // filters: t.field({
    //   type: [FilterType],
    //   resolve: parent => Filter.forPipe(parent.pipeID),
    // }),
    // destinations: t.field({
    //   type: [SlackDestinationType],
    //   resolve: parent => Destination.forPipe(parent.pipeID),
    // }),
  }),
});

export const PlaidSourceType = builder
  .objectRef<Source.Plaid.PlaidSourceEntityType>("PlaidSource")
  .implement({
    fields: t => ({
      id: t.exposeID("sourceID"),
      instLogo: t.exposeString("instLogo"),
      instName: t.exposeString("instName"),
      accountName: t.exposeString("accountName"),
      accountKind: t.exposeString("accountKind"),
    }),
  });

builder.queryFields(t => ({
  pipes: t.field({
    type: [PipeType],
    args: {
      userID: t.arg.string({ required: true }),
    },
    nullable: true,
    resolve: async (_parent, args) => {
      return Pipe.forUser(args.userID);
    },
  }),
  pipe: t.field({
    type: PipeType,
    args: {
      pipeID: t.arg.string({ required: true }),
    },
    resolve: async (_parent, args) => {
      return Pipe.fromID(args.pipeID);
    },
  }),
}));
