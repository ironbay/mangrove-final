// backend/functions/graphql/builder.ts
import SchemaBuilder from "@pothos/core";
var builder = new SchemaBuilder({});
builder.queryType({});
builder.mutationType({});

// backend/functions/graphql/types/article.ts

var ArticleType = builder.objectRef("Article").implement({
  fields: t => ({
    id: t.exposeID("id"),
    title: t.exposeID("title"),
    url: t.exposeID("url"),
    comments: t.field({
      type: [CommentType],
      resolve: article => Article.comments(article.id)
    })
  })
});
var CommentType = builder.objectRef("Comment").implement({
  fields: t => ({
    id: t.exposeString("id"),
    text: t.exposeString("text")
  })
});
builder.queryFields(t => ({
  articles: t.field({
    type: [ArticleType]
  })
}));
builder.mutationFields(t => ({
  addComment: t.field({
    type: CommentType,
    args: {
      articleID: t.arg.string({
        required: true
      }),
      text: t.arg.string({
        required: true
      })
    }
  }),
  removeComment: t.field({
    type: CommentType,
    args: {
      id: t.arg.string({
        required: true
      })
    }
  }),
  createArticle: t.field({
    type: ArticleType,
    args: {
      title: t.arg.string({
        required: true
      }),
      url: t.arg.string({
        required: true
      })
    }
  })
}));

// backend/functions/graphql/types/slack.ts

var SlackConnectionType = builder.objectRef("SlackConnection").implement({
  fields: t => ({
    id: t.exposeID("connectionID"),
    team: t.field({
      type: SlackTeamType,
      resolve: p => p
    }),
    channels: t.field({
      type: [SlackChannelType],
      resolve: p => Slack.Connection.channels(p.connectionID)
    })
  })
});
var SlackTeamType = builder.objectRef("SlackTeam").implement({
  fields: t => ({
    id: t.exposeID("teamID"),
    name: t.exposeString("teamName")
  })
});
var SlackChannelType = builder.objectRef("SlackChannel").implement({
  fields: t => ({
    id: t.exposeID("id"),
    name: t.exposeID("name")
  })
});
builder.queryFields(t => ({
  slackConnections: t.field({
    type: [SlackConnectionType],
    args: {
      userID: t.arg.string({
        required: true
      })
    },
    nullable: true
  })
}));
builder.mutationFields(t => ({
  createSlackConnection: t.field({
    type: SlackConnectionType,
    args: {
      userID: t.arg.string({
        required: true
      }),
      code: t.arg.string({
        required: true
      })
    },
    nullable: true
  })
}));

// backend/functions/graphql/types/pipe.ts

// backend/functions/graphql/types/filter.ts
var FilterType = builder.objectRef("Filter");
var NumberType = builder.objectRef("NumberType").implement({
  fields: t => ({
    value: t.exposeFloat("value")
  })
});
var TextType = builder.objectRef("TextType").implement({
  fields: t => ({
    value: t.exposeString("value")
  })
});
var TextContainsType = builder.objectRef("TextContainsType").implement({
  fields: t => ({
    value: t.exposeStringList("value")
  })
});
var FilterValueType = builder.unionType("Value", {
  types: [NumberType, TextType, TextContainsType],
  resolveType: filter => {
    switch (filter.kind) {
      case "number":
        return NumberType;
      case "text":
        return TextType;
      case "textContains":
        return TextContainsType;
    }
  }
});

// backend/functions/graphql/types/source.ts
FilterType.implement({
  fields: t => ({
    id: t.exposeString("filterID"),
    kind: t.exposeString("kind"),
    op: t.exposeString("op"),
    value: t.field({
      type: FilterValueType
    })
  })
});
var PlaidSourceType = builder.objectRef("PlaidSource").implement({
  fields: t => ({
    id: t.exposeID("sourceID"),
    institution: t.field({
      type: "String",
      resolve: () => "Gina"
    }),
    account: t.field({
      type: PlaidSourceAccountType,
      resolve: t2 => t2
    }),
    filters: t.field({
      type: [FilterType],
      resolve: parent => Filter.forSource(parent.sourceID)
    })
  })
});
var PlaidSourceInstitutionType = builder.objectRef("PlaidSourceInstitutionType").implement({
  fields: t => ({
    name: t.exposeString("instName"),
    logo: t.exposeString("instLogo")
  })
});
var PlaidSourceAccountType = builder.objectRef("PlaidSourceAccountType").implement({
  fields: t => ({
    name: t.exposeString("accountName"),
    kind: t.exposeString("accountKind")
  })
});

// backend/functions/graphql/types/destination.ts

var SlackDestinationType = builder.objectRef("SlackDestination");
SlackDestinationType.implement({
  fields: t => ({
    id: t.exposeID("destinationID"),
    connection: t.field({
      type: SlackConnectionType
    }),
    channel: t.field({
      type: SlackChannelType
    })
  })
});

// backend/functions/graphql/types/pipe.ts
var PipeType = builder.objectRef("Pipe");
PipeType.implement({
  fields: t => ({
    id: t.exposeID("pipeID"),
    name: t.exposeString("name"),
    enabled: t.exposeBoolean("enabled"),
    plaidSources: t.field({
      type: [PlaidSourceType]
    }),
    slackDestinations: t.field({
      type: [SlackDestinationType]
    })
  })
});
builder.queryFields(t => ({
  pipes: t.field({
    type: [PipeType],
    args: {
      userID: t.arg.string({
        required: true
      })
    },
    nullable: true
  }),
  pipe: t.field({
    type: PipeType,
    args: {
      pipeID: t.arg.string({
        required: true
      })
    }
  })
}));

// backend/functions/graphql/schema.ts
var schema = builder.toSchema({});
export { schema };