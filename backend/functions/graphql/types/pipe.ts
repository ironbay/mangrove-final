import { builder } from "../builder";
import { Pipe, PipeEntity } from "@mangrove/core/pipe";
import { Source } from "@mangrove/core/source";
import { Destination } from "@mangrove/core/destination";
import { PlaidSourceType, PlaidSourceInput } from "./source";
import { SlackDestinationType } from "./destination";

export const PipeType = builder.objectRef<Pipe.PipeEntityType>("Pipe");

PipeType.implement({
  fields: t => ({
    id: t.exposeID("pipeID"),
    name: t.exposeString("name"),
    enabled: t.exposeBoolean("enabled"),
    plaidSources: t.field({
      type: [PlaidSourceType],
      resolve: async pipe => Source.Plaid.forPipe(pipe.pipeID),
    }),
    slackDestinations: t.field({
      type: [SlackDestinationType],
      resolve: async pipe => Destination.Slack.forPipe(pipe.pipeID),
    }),
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

builder.mutationFields(t => ({
  createPipe: t.field({
    type: PipeType,
    args: {
      user: t.arg.string({ required: true }),
      name: t.arg.string({ required: true }),
      enabled: t.arg.boolean({ required: true }),
      plaidSources: t.arg({
        type: [PlaidSourceInput],
        required: true,
      }),
    },
    resolve: async (_parent, args) => {
      const pipe = await Pipe.create(args.user, args.name, args.enabled);
      const sources = await Source.Plaid.create(args.plaidSources);

      return pipe;
    },
  }),
}));
