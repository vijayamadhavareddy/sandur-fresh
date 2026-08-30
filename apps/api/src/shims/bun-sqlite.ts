export class Database {
  run(_query?: string) {}
  query(_query?: string) {
    return {
      all: () => [],
      get: () => null,
      run: () => ({ changes: 0, lastInsertRowid: 0 }),
      values: () => [],
    };
  }
}

export default { Database };
