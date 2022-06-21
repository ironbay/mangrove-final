import { SQSEvent, SQSRecord } from "aws-lambda";

export interface Events {}
export type EventTypes = keyof Events;
export type FromType<T extends EventTypes> = payload<T, Events[T]>;
export type payload<T extends string, P extends Record<string, any>> = {
  id: string;
  source: "mangrove";
  type: T;
  properties: P;
};

export function createHandler<T extends EventTypes>(
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
