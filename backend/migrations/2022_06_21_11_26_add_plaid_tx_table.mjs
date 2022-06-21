import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("plaid_transactions")
    .addColumn("id", "text", col => col.primaryKey())
    .addColumn("connection_id", "text")
    .addColumn("user_id", "text")
    .addColumn("account_id", "text")
    .addColumn("date", "text")
    .addColumn("name", "text")
    .addColumn("pending", "boolean")
    .addColumn("category", "text")
    .addColumn("merchant", "text")
    .addColumn("kind", "text")
    .addColumn("location_address", "text")
    .addColumn("location_city", "text")
    .addColumn("location_region", "text")
    .addColumn("location_postal", "text")
    .addColumn("location_country", "text")
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable("comments").execute();
}
