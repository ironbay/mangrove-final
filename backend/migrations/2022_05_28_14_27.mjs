import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("numberfilters")
    .addColumn("id", "text", col => col.primaryKey())
    .addColumn("enabled", "boolean")
    .addColumn("value", "numeric")
    .addColumn("connectionID", "text")
    .addColumn("accountID", "text")
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable("numberFilters").execute();
}
