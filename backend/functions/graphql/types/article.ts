import { Article } from "@mangrove/core/article";
import { SQL } from "@mangrove/core/sql";
import { builder } from "../builder";

const ArticleType = builder
  .objectRef<SQL.Row["articles"]>("Article")
  .implement({
    fields: t => ({
      id: t.exposeID("id"),
      title: t.exposeID("title"),
      url: t.exposeID("url"),
      comments: t.field({
        type: [CommentType],
        resolve: article => Article.comments(article.id),
      }),
    }),
  });

const CommentType = builder
  .objectRef<SQL.Row["comments"]>("Comment")
  .implement({
    fields: t => ({
      id: t.exposeString("id"),
      text: t.exposeString("text"),
    }),
  });

builder.queryFields(t => ({
  articles: t.field({
    type: [ArticleType],
    resolve: () => Article.list(),
  }),
}));

builder.mutationFields(t => ({
  addComment: t.field({
    type: CommentType,
    args: {
      articleID: t.arg.string({ required: true }),
      text: t.arg.string({ required: true }),
    },
    resolve: (_, args) => Article.addComment(args.articleID, args.text),
  }),
  removeComment: t.field({
    type: CommentType,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (_, args) => Article.removeComment(args.id),
  }),
  createArticle: t.field({
    type: ArticleType,
    args: {
      title: t.arg.string({ required: true }),
      url: t.arg.string({ required: true }),
    },
    resolve: (_, args) => Article.create(args.title, args.url),
  }),
}));
