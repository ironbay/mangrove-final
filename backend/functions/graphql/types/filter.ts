import { builder } from "../builder";
import { Filter } from "@mangrove/core/filter";

export const FilterType = builder.objectRef<Filter.FilterType>("Filter");

FilterType.implement({
  fields: t => ({
    filterID: t.exposeString("filterID"),
    pipeID: t.exposeString("pipeID"),
    filterKind: t.exposeString("filterKind"),
    op: t.exposeString("op"),
    value: t.field({
      type: ValueType,
      resolve: parent => ({
        value: parent.value,
        filterKind: parent.filterKind,
      }),
    }),
  }),
});

const NumberType = builder
  .objectRef<{ value: number; filterKind: string }>("TextType")
  .implement({
    fields: t => ({
      value: t.exposeFloat("value"),
    }),
  });

const TextType = builder
  .objectRef<{ value: string; filterKind: string }>("TextType")
  .implement({
    fields: t => ({
      value: t.exposeString("value"),
    }),
  });

const TextContainsType = builder
  .objectRef<{ value: string[]; filterKind: string }>("TextType")
  .implement({
    fields: t => ({
      value: t.exposeStringList("value"),
    }),
  });

const ValueType = builder.unionType("Value", {
  types: [NumberType, TextType, TextContainsType],
  resolveType: filter => {
    switch (filter.filterKind) {
      case "number":
        return NumberType;
      case "text":
        return TextType;
      case "textContains":
        return TextContainsType;
    }
  },
});
