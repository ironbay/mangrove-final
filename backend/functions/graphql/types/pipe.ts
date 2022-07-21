import { builder } from "../builder";
import { Pipe, PipeEntity } from "@mangrove/core/pipe";

export const PipeType = builder.objectRef<Pipe.PipeEntityType>("Pipe");

PipeType.implement({
  fields: t => ({
    id: t.exposeID("pipeID"),
    name: t.exposeString("name"),
    enabled: t.exposeBoolean("enabled"),
    sources: t.field({
      type: [SourceType],
      resolve: async pipe => Pipe.sources(pipe.pipeID),
    }),
    destinations: t.field({
      type: [SlackDestinationType],
      resolve: async pipe => Pipe.destinations(pipe.pipeID),
    }),
  }),
});

export const SourceType = builder.objectRef<Pipe.SourceEntityType>("Source");

SourceType.implement({
  fields: t => ({
    id: t.exposeID("sourceID"),
    kind: t.exposeString("kind"),
    accountID: t.exposeString("accountID"),
    filters: t.field({
      type: [FilterType],
      resolve: source => Pipe.filtersForSource(source.sourceID),
    }),
  }),
});

const NumberFilterType = builder.objectType("NumberFilter", {
  fields: t => ({
    id: t.exposeID("filterID"),
    value: t.exposeInt("value"),
    op: t.exposeString("op"),
  }),
});

const TextFilterType = builder.objectType("TextFilter", {
  fields: t => ({
    id: t.exposeID("filterID"),
    value: t.exposeString("value"),
    op: t.exposeString("op"),
  }),
});

const TextFilterContainsType = builder.objectType("TextContainsFilter", {
  fields: t => ({
    id: t.exposeID("filterID"),
    value: t.exposeStringList("value"),
    op: t.exposeString("op"),
  }),
});

const FilterType = builder.unionType("FilterType", {
  types: [NumberFilterType, TextFilterType, TextFilterContainsType],
  resolveType: filter => {
    switch (filter.kind) {
      case "numberFilter":
        return NumberFilterType;
      case "textFilter":
        return TextFilterType;
      case "textFilterContains":
        return TextFilterContainsType;
    }
  },
});

export const SlackDestinationType =
  builder.objectRef<Pipe.SlackDestinationType>("SlackDestination");

SlackDestinationType.implement({
  fields: t => ({
    id: t.exposeID("destinationID"),
    teamID: t.exposeString("teamID"),
    channelID: t.exposeString("channelID"),
  }),
});

builder.queryFields(t => ({
  pipes: t.field({
    type: [PipeType],
    args: {
      userID: t.arg.string({ required: true }),
    },
    resolve: (_, args) => {
      return Pipe.list(args.userID);
    },
  }),
  pipe: t.field({
    type: PipeType,
    args: {
      pipeID: t.arg.string({ required: true }),
    },
    resolve: (_, args) => {
      return Pipe.fromID(args.pipeID);
    },
  }),
  createPipe: t.field({
    userID: t.arg.string({ required: true }),
    name: t.arg.string({ required: true }),
  }),
}));
