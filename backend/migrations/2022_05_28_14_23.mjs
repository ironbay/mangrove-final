import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("pipes")
    .addColumn("id", "text", col => col.primaryKey())
    .addColumn("name", "text")
    .addColumn("enabled", "boolean")
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable("pipes").execute();
}
