import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .alterTable("plaid_transactions")
    .addColumn("amount", "number")
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(_db) {}
