import { builder } from "../builder";
import { Pipe, PipeEntity } from "@mangrove/core/pipe";
import { SourceType } from "./source";
import { Source } from "@mangrove/core/source";
import { Filter } from "@mangrove/core/filter";
import { FilterType } from "./filter";

export const PipeType = builder.objectRef<Pipe.PipeEntityType>("Pipe");

PipeType.implement({
  fields: t => ({
    id: t.exposeID("pipeID"),
    name: t.exposeString("name"),
    enabled: t.exposeBoolean("enabled"),
    sources: t.field({
      type: [SourceType],
      resolve: async parent => Source.forPipe(parent.pipeID),
    }),
    filters: t.field({
      type: [FilterType],
      resolve: parent => Filter.forPipe(parent.pipeID),
    }),
    // sources: t.field({
    //   type: [SourceType],
    //   resolve: async pipe => Pipe.sources(pipe.pipeID),
    // }),
    // destinations: t.field({
    //   type: [SlackDestinationType],
    //   resolve: async pipe => Pipe.destinations(pipe.pipeID),
    // }),
  }),
});

// export const SourceType = builder.objectRef<Pipe.SourceEntityType>("Source");

// SourceType.implement({
//   fields: t => ({
//     id: t.exposeID("sourceID"),
//     kind: t.exposeString("kind"),
//     accountID: t.exposeString("accountID"),
//     filters: t.field({
//       type: [FilterType],
//       resolve: source => Pipe.filtersForSource(source.sourceID),
//     }),
//   }),
// });

// export const SourceType = builder.objectRef<Pipe.SourceEntityType>("Source");

// SourceType.implement({
//   fields: t => ({
//     id: t.exposeID("sourceID"),
//     kind: t.exposeString("kind"),
//     accountID: t.exposeString("accountID"),
//     filters: t.field({
//       type: [FilterType],
//       resolve: source => Pipe.filtersForSource(source.sourceID),
//     }),
//   }),
// });

// const NumberFilterType = builder.objectType("NumberFilter", {
//   fields: t => ({
//     id: t.exposeID("filterID"),
//     value: t.exposeInt("value"),
//     op: t.exposeString("op"),
//   }),
// });

// const TextFilterType = builder.objectType("TextFilter", {
//   fields: t => ({
//     id: t.exposeID("filterID"),
//     value: t.exposeString("value"),
//     op: t.exposeString("op"),
//   }),
// });

// const TextFilterContainsType = builder.objectType("TextContainsFilter", {
//   fields: t => ({
//     id: t.exposeID("filterID"),
//     value: t.exposeStringList("value"),
//     op: t.exposeString("op"),
//   }),
// });

// const FilterType = builder.unionType("FilterType", {
//   types: [NumberFilterType, TextFilterType, TextFilterContainsType],
//   resolveType: filter => {
//     switch (filter.kind) {
//       case "numberFilter":
//         return NumberFilterType;
//       case "textFilter":
//         return TextFilterType;
//       case "textFilterContains":
//         return TextFilterContainsType;
//     }
//   },
// });

// export const SlackDestinationType =
//   builder.objectRef<Pipe.SlackDestinationType>("SlackDestination");

// SlackDestinationType.implement({
//   fields: t => ({
//     id: t.exposeID("destinationID"),
//     teamID: t.exposeString("teamID"),
//     channelID: t.exposeString("channelID"),
//   }),
// });

// NumberFilterType.implement({
//   fields: t => ({
//     id: t.exposeID("filterID"),
//     value: t.exposeInt("value"),
//     op: t.exposeString("op"),
//   }),
// });

// const PipeType = builder.objectRef<SQL.Row["pipes"]>("Pipe").implement({
//   fields: t => ({
//     id: t.exposeID("id"),
//     name: t.exposeString("name"),
//     enabled: t.exposeBoolean("enabled"),
//     times: t.field({
//       type: CommonDataTimesType,
//       resolve: p => p,
//     }),
//     number_filters: t.field({
//       type: [NumberFilterType],
//       resolve: pipe => Pipe.number_filters(pipe.id),
//     }),
//     string_filters: t.field({
//       type: [StringFilterType],
//       resolve: pipe => Pipe.string_filters(pipe.id),
//     }),
//     slack_destinations: t.field({
//       type: [SlackDestinationType],
//       resolve: pipe => Pipe.slack_destinations(pipe.id),
//     }),
//   }),
// });

// const NumberFilterType = builder
//   .objectRef<SQL.Row["number_filters"]>("NumberFilter")
//   .implement({
//     fields: t => ({
//       id: t.exposeID("id"),
//       value: t.exposeFloat("value"),
//       operand: t.exposeString("operand"),
//       account: t.field({
//         type: PlaidAccountType,
//         resolve: t =>
//           PlaidConnection.get_account(t.connection_id, t.account_id),
//       }),
//       connection: t.field({
//         type: PlaidConnectionType,
//         resolve: t => PlaidConnection.from_id(t.connection_id),
//       }),
//     }),
//   });

// const StringFilterType = builder
//   .objectRef<SQL.Row["string_filters"]>("StringFilter")
//   .implement({
//     fields: t => ({
//       id: t.exposeID("id"),
//       value: t.exposeString("value"),
//       operand: t.exposeString("operand"),
//     }),
//   });

// builder.queryFields(t => ({
//   pipes: t.field({
//     type: [PipeType],
//     resolve: _ => Pipe.list(),
//   }),
//   pipesFromSlackConnection: t.field({
//     args: {
//       id: t.arg.string({ required: true }),
//     },
//     type: [PipeType],
//     resolve: async (_, args) => Pipe.from_slack_connection(args.id),
//   }),
//   pipesFromPlaidConnection: t.field({
//     args: {
//       id: t.arg.string({ required: true }),
//     },
//     type: [PipeType],
//     resolve: async (_, args) => Pipe.from_slack_connection(args.id),
//   }),
// }));

// const NumberFilterInputType = builder.inputType("NumberFilterInputType", {
//   fields: t => ({
//     value: t.float({ required: true }),
//     operand: t.string({ required: true }),
//   }),
// });

// builder.mutationFields(t => ({
//   addPipe: t.field({
//     type: PipeType,
//     args: {
//       name: t.arg.string({ required: true }),
//       enabled: t.arg.boolean({ required: true }),
//       number_filters: t.arg({
//         type: [NumberFilterInputType],
//         required: true,
//       }),
//     },
//     resolve: (_, args) =>
//       Pipe.addPipe(args.name, args.enabled, args.number_filters),
//   }),
// }));
