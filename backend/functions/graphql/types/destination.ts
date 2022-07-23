import { builder } from "../builder";
import { SlackDestinationEntityType } from "@mangrove/core/destination";
import { Connection } from "@mangrove/core/connection";
import { SlackChannelType } from "./slack";

export const SlackDestinationType =
  builder.objectRef<SlackDestinationEntityType>("SlackDestination");

SlackDestinationType.implement({
  fields: t => ({
    destinationID: t.exposeString("destinationID"),
    pipeID: t.exposeString("pipeID"),
    team: t.field({
      type: SlackTeamType,
      resolve: parent =>
        Connection.Slack.teamForDestination(parent.connectionID, parent.teamID),
    }),
    channel: t.field({
      type: SlackChannelType,
      resolve: parent =>
        Connection.Slack.teamForDestination(parent.connectionID, parent.teamID),
    }),
  }),
});

const SlackTeamType = builder
  .objectRef<{ id: string; name: string; icon?: string }>("SlackTeam")
  .implement({
    fields: t => ({
      teamID: t.exposeString("id"),
      teamName: t.exposeString("name"),
      teamIcon: t.exposeString("icon", { nullable: true }),
    }),
  });

const SlackChannelType = builder
  .objectRef<{ id: string; name: string }>("SlackChannel")
  .implement({
    fields: t => ({
      channelID: t.exposeString("id"),
      channelName: t.exposeString("name"),
    }),
  });
