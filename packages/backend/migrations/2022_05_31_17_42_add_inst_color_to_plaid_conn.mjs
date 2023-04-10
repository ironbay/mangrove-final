import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .alterTable("plaid_connections")
    .addColumn("institution_color", "text")
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema
    .alterTable("plaid_connections")
    .dropColumn("institution_color")
    .execute();
}
