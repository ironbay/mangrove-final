import { SQSEvent, SQSRecord } from "aws-lambda";
import {
  EventBridgeClient,
  PutEventsCommand,
} from "@aws-sdk/client-eventbridge";
import { Config } from "@serverless-stack/node/config";
import { ConfigurationServicePlaceholders } from "aws-sdk/lib/config_service_placeholders";
import { ulid } from "ulid";

const client = new EventBridgeClient({});

export interface Events {}

export type EventType = keyof Events;

export type Payload<T extends keyof Events, P extends Record<string, any>> = {
  id: string;
  source: "mangrove";
  type: T;
  properties: P;
};

export type FromType<T extends EventType> = Payload<T, Events[T]>;

export interface Event {
  id: string;
  source: string;
  type: string;
  properties: Record<string, any>;
}

async function doPublish(event: Event) {
  const resp = await client.send(
    new PutEventsCommand({
      Entries: [
        {
          DetailType: event.type,
          Detail: JSON.stringify(event.properties),
          Source: "mangrove",
          EventBusName: process.env.BUS_NAME,
        },
      ],
    })
  );

  return resp;
}

export async function publish<Type extends EventType>(
  type: Type,
  properties: Events[Type]
) {
  const event = {
    id: ulid(),
    source: "mangrove",
    type,
    properties,
  };

  return await doPublish(event);
}

export function createHandler<T extends EventType>(
  cb: (event: FromType<T>, record: SQSRecord) => Promise<void>
) {
  const result = async (event: SQSEvent) => {
    const promises = [];
    for (const record of event.Records) {
      const msg = JSON.parse(record.body);
      async function run() {
        try {
          await cb(msg.detail as FromType<T>, record);
          return { type: "success" };
        } catch (e) {
          console.error(e);
          return { type: "error", messageId: record.messageId };
        }
      }
      promises.push(run());
      const results = await Promise.all(promises);
      return {
        batchItemFailures: results
          .filter(i => i.type === "error")
          .map(i => ({ itemIdentifier: i })),
      };
    }
  };

  return result;
}

export * as Bus from ".";
