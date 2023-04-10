import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("slack_connections")
    .addColumn("id", "text", col => col.primaryKey())
    .addColumn("user_id", "text")
    .addColumn("access_token", "text")
    .addColumn("team_name", "text")
    .execute();

  await db.schema
    .createIndex("idx_slack_connections_user_id")
    .on("slack_connections")
    .column("user_id")
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropIndex("idx_slack_connections_user_id").execute();
  await db.schema.dropTable("slack_connections").execute();
}
