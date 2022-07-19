import { builder } from "../builder";
import { Slack } from "@mangrove/core/slack";

export const SlackConnectionType = builder
  .objectRef<Slack.Connection.SlackConnectionEntityType>("SlackConnection")
  .implement({
    fields: t => ({
      id: t.exposeID("connectionID"),
      team: t.field({
        type: SlackTeamType,
        resolve: p => p,
      }),
      channels: t.field({
        type: [SlackChannelType],
        resolve: p => Slack.Connection.channels(p.connectionID),
      }),
    }),
  });

export const SlackTeamType = builder
  .objectRef<{
    teamID: string;
    teamName: string;
  }>("SlackTeam")
  .implement({
    fields: t => ({
      id: t.exposeID("teamID"),
      name: t.exposeString("teamName"),
    }),
  });

export const SlackChannelType = builder
  .objectRef<{
    id: string;
    name: string;
  }>("SlackChannel")
  .implement({
    fields: t => ({
      id: t.exposeID("id"),
      name: t.exposeID("name"),
    }),
  });
