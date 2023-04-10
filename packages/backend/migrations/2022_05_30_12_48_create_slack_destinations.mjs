import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("slack_destinations")
    .addColumn("id", "text", col => col.primaryKey())
    .addColumn("pipe_id", "text")
    .addColumn("channel_id", "text")
    .addColumn("team_id", "text")
    .execute();

  await db.schema
    .createIndex("idx_slack_destinations_pipe_id")
    .on("slack_destinations")
    .column("pipe_id")
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropIndex("idx_slack_destinations_pipe_id").execute();
  await db.schema.dropTable("slack_destinations").execute();
}
