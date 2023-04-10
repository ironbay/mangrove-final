import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .alterTable("slack_connections")
    .addColumn("logo", "text")
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(_db) {}
