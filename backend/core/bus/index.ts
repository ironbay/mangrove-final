import { SQSEvent, SQSRecord } from "aws-lambda";
import {
  EventBridgeClient,
  PutEventsCommand,
} from "@aws-sdk/client-eventbridge";
import { Config } from "@serverless-stack/node/config";
import { ConfigurationServicePlaceholders } from "aws-sdk/lib/config_service_placeholders";

const client = new EventBridgeClient({});

export interface Events {}
export type EventType = keyof Events;
export type FromType<T extends EventType> = payload<T, Events[T]>;
export type payload<T extends string, P extends Record<string, any>> = {
  id: string;
  source: "mangrove";
  type: T;
  properties: P;
};

export async function publish<Type extends EventType>(
  type: Type,
  properties: Events[Type]
) {
  console.log(type);
  const resp = await client.send(
    new PutEventsCommand({
      Entries: [
        {
          DetailType: type,
          Detail: JSON.stringify(properties),
          Source: "mangrove",
          EventBusName: process.env.BUS_NAME,
        },
      ],
    })
  );
}

export function createHandler<T extends EventType>(
  cb: (event: FromType<T>, record: SQSRecord) => Promise<void>
) {
  const result = async (event: SQSEvent) => {
    const promises = [];
    console.log(event);
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
