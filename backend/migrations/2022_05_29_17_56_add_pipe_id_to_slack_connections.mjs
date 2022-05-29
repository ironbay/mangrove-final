import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .alterTable("number_filters")
    .addColumn("pipe_id", "text")
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(_db) {}
