import { builder } from "../builder";

type RawTimesType = {
  times_created: string;
  times_updated: string;
};

export const CommonDataTimesType = builder
  .objectRef<RawTimesType>("CommonDataTimes")
  .implement({
    fields: t => ({
      created: t.exposeString("times_created"),
      updated: t.exposeString("times_updated"),
    }),
  });
