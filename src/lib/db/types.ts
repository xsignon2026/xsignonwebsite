// The small slice of a database the form handler needs. Production uses node-postgres (index.ts);
// tests use an in-process Postgres (src/tests/helpers/pglite-db.ts). Both run the same SQL.
export type Queryable = {
  query<T = Record<string, unknown>>(text: string, params?: unknown[]): Promise<{ rows: T[] }>;
};

export type Db = Queryable & {
  /** Runs fn in one transaction: everything inside commits together, or none of it does. */
  transaction<T>(fn: (tx: Queryable) => Promise<T>): Promise<T>;
};
