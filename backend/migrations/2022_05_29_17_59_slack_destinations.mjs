import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("slack_destinations")
    .addColumn("id", "text", col => col.primaryKey())
    .addColumn("team_id", "text")
    .addColumn("team_name", "text")
    .addColumn("channel_id", "text")
    .addColumn("channel_name", "text")
    .addColumn("connection_id", "text")
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable("slack_destinations").execute();
}
