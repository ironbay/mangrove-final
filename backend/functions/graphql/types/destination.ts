import { builder } from "../builder";
import { SlackDestinationEntityType } from "@mangrove/core/destination";
import { Connection } from "@mangrove/core/connection";
import { SlackChannelType, SlackConnectionType } from "./slack";

export const SlackDestinationType =
  builder.objectRef<SlackDestinationEntityType>("SlackDestination");

SlackDestinationType.implement({
  fields: t => ({
    id: t.exposeID("destinationID"),
    connection: t.field({
      type: SlackConnectionType,
      resolve: destination => Connection.Slack.fromID(destination.connectionID),
    }),
    channel: t.field({
      type: SlackChannelType,
      resolve: destination => destination,
    }),
  }),
});
