import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .alterTable("slackconnections")
    .renameTo("slack_connections")
    .execute();

  await db.schema
    .alterTable("numberfilters")
    .renameTo("number_filters")
    .execute();

  // .createTable("slackconnections")
  // .addColumn("id", "text", col => col.primaryKey())
  // .addColumn("team_name", "text")
  // .addColumn("access_token", "text")
  // .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(_db) {
  //   await db.schema.dropTable("slackconnections").execute();
}
