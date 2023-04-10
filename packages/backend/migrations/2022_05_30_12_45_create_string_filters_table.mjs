import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("string_filters")
    .addColumn("id", "text", col => col.primaryKey())
    .addColumn("pipe_id", "text")
    .addColumn("account_id", "text")
    .addColumn("connection_id", "text")
    .addColumn("value", "text")
    .addColumn("operand", "text")
    .execute();

  await db.schema
    .createIndex("idx_string_filters_pipe_id")
    .on("string_filters")
    .column("pipe_id")
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropIndex("idx_string_filters_pipe_id").execute();
  await db.schema.dropTable("string_filters").execute();
}
