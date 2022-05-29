import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .alterTable("slack_destinations")
    .addColumn("pipe_id", "text")
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(_db) {
  //   await db.schema.dropTable("slack_destinations").execute();
}
