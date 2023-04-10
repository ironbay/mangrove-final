import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("pipes")
    .addColumn("id", "text", col => col.primaryKey())
    .addColumn("user_id", "text")
    .addColumn("enabled", "boolean")
    .execute();

  await db.schema
    .createIndex("idx_pipes_user_id")
    .on("pipes")
    .column("user_id")
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropIndex("idx_pipes_user_id").execute();
  await db.schema.dropTable("pipes").execute();
}
