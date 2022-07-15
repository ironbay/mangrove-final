import SchemaBuilder from "@pothos/core";

import {
  NumberFilterEntityType,
  TextFilterEntityType,
  TextContainsFilterEntityType,
} from "@mangrove/core/pipe";

export const builder = new SchemaBuilder<{
  Objects: {
    NumberFilter: NumberFilterEntityType;
    TextFilter: TextFilterEntityType;
    TextContainsFilter: TextContainsFilterEntityType;
  };
}>({});

builder.queryType({});
builder.mutationType({});
