import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .alterTable("plaid_connections")
    .addColumn("logo", "text")
    .execute();

  await db.schema
    .alterTable("plaid_connections")
    .addColumn("insitution_name", "text")
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.alterTable("plaid_connections").dropColumn("logo").execute();
  await db.schema
    .alterTable("plaid_connections")
    .dropColumn("institution_name")
    .execute();
}
