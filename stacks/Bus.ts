import {
  EventBus,
  FunctionDefinition,
  StackContext,
  Function,
  Queue,
  use,
  Config,
} from "sst/constructs"

export function Bus(ctx: StackContext) {
  const bus = new EventBus(ctx.stack, "Bus")
  const BUS_NAME = new Config.Parameter(ctx.stack, "BUS_NAME", {
    value: bus.eventBusName,
  })

  bus.addRules(ctx.stack, {
    "plaid.connection.created": {
      pattern: {
        detailType: ["plaid.connection.created"],
      },
      targets: {
        queue: new Queue(ctx.stack, "plaid-connection-created-queue", {
          consumer: "backend/functions/events/connectionCreated",
        }),
      },
    },
    "plaid.tx.available": {
      pattern: {
        detailType: ["plaid.tx.available"],
      },
      targets: {
        queue: new Queue(ctx.stack, "plaid-tx-available-queue", {
          consumer: "backend/functions/plaid/events.txAvailable",
        }),
      },
    },
    "plaid.tx.new": {
      pattern: {
        detailType: ["plaid.tx.new"],
      },
      targets: {
        queue: new Queue(ctx.stack, "plaid-tx-new-queue", {
          consumer: "backend/functions/plaid/events.txNew",
        }),
      },
    },
    "plaid.source.match": {
      pattern: {
        detailType: ["plaid.source.match"],
      },
      targets: {
        queue: new Queue(ctx.stack, "plaid-source-match-queue", {
          consumer: "backend/functions/plaid/events.sourceMatch",
        }),
      },
    },
    "slack.target.publish.plaid": {
      pattern: {
        detailType: ["slack.target.publish.plaid"],
      },
      targets: {
        queue: new Queue(ctx.stack, "slack-target-publish-plaid", {
          consumer: "backend/functions/slack/events.publishPlaid",
        }),
      },
    },
  })

  // tx available => there are new tx to fetch
  // tx new => here's a new tx
  // pipe match => heres a tx that matched a pipe

  // new Function(ctx.stack, "tesfunction", {
  //   handler: "backend/functions/plaid/events.test",
  //   permissions: [eventBus],
  //   environment: {
  //     BUS_NAME: eventBus.eventBusName,
  //   },
  // })

  // type SubscribeOpts = {
  //   id: string
  //   function: FunctionDefinition
  //   types?: string[]
  // }

  // function subscribe(opts: SubscribeOpts) {
  //   const func = Function.fromDefinition(
  //     ctx.stack,
  //     opts.id + "Function",
  //     opts.function
  //   )

  //   eventBus.addRules(ctx.stack, {
  //     [`${opts.id}Rule`]: {
  //       pattern: {
  //         detailType: opts.types,
  //         source: ["mangrove"],
  //       },
  //       targets: {
  //         queue: new Queue(ctx.stack, `${opts.id}Queue`, {
  //           consumer: {
  //             function: func,
  //             cdk: {
  //               eventSource: {
  //                 batchSize: 1,
  //               },
  //             },
  //           },
  //         }),
  //       },
  //     },
  //   })
  // }
  return {
    bus,
  }
}
