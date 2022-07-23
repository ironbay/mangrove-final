import { builder } from "../builder";
import { Pipe, PipeEntity } from "@mangrove/core/pipe";
import { SourceType } from "./source";
import { Source } from "@mangrove/core/source";
import { Filter } from "@mangrove/core/filter";
import { FilterType } from "./filter";
import { SlackDestinationType } from "./destination";
import { Destination } from "@mangrove/core/destination";

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
    destinations: t.field({
      type: [SlackDestinationType],
      resolve: parent => Destination.forPipe(parent.pipeID),
    }),
  }),
});
