import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .alterTable("pipes")
    .addColumn("times_created", "text")
    .execute();

  await db.schema
    .alterTable("pipes")
    .addColumn("times_updated", "text")
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(_db) {}
