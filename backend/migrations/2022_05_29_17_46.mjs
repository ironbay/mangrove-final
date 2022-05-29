import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("slackconnections")
    .addColumn("id", "text", col => col.primaryKey())
    .addColumn("team_name", "text")
    .addColumn("access_token", "text")
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable("slackconnections").execute();
}
