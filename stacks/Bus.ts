import {
  EventBus,
  FunctionDefinition,
  StackContext,
  Function,
  Queue,
  use,
  Config,
} from "@serverless-stack/resources";

export function Bus(ctx: StackContext) {
  const eventBus = new EventBus(ctx.stack, "Bus");
  const BUS_NAME = new Config.Parameter(ctx.stack, "BUS_NAME", {
    value: eventBus.eventBusName,
  });

  new Function(ctx.stack, "tesfunction", {
    handler: "functions/plaid/events.test",
    permissions: [eventBus],
    environment: {
      BUS_NAME: eventBus.eventBusName,
    },
  });

  type SubscribeOpts = {
    id: string;
    function: FunctionDefinition;
    types?: string[];
  };

  function subscribe(opts: SubscribeOpts) {
    const func = Function.fromDefinition(
      ctx.stack,
      opts.id + "Function",
      opts.function
    );

    eventBus.addRules(ctx.stack, {
      [`${opts.id}Rule`]: {
        pattern: {
          detailType: opts.types,
          source: ["mangrove"],
        },
        targets: {
          queue: new Queue(ctx.stack, `${opts.id}Queue`, {
            consumer: {
              function: func,
              cdk: {
                eventSource: {
                  batchSize: 1,
                },
              },
            },
          }),
        },
      },
    });
  }

  //   subscribe({
  //     id: "PlaidTxAvailable",
  //     types: ["plaid.tx.available"],
  //     function: {
  //       handler: "functions/plaid/events.tx_available",
  //       permissions: [eventBus, database],
  //       environment: {
  //         BUS_NAME: eventBus.eventBusName,
  //       },
  //     },
  //   });

  //   subscribe({
  //     id: "PlaidTxNew",
  //     types: ["plaid.tx.new"],
  //     function: {
  //       handler: "functions/plaid/events.tx_new",
  //       permissions: [eventBus, database],
  //     },
  //   });
}
