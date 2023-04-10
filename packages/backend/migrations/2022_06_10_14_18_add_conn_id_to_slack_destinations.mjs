import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .alterTable("slack_destinations")
    .addColumn("connection_id", "text")
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(_db) {}
