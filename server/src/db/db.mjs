import Database from "better-sqlite3";

const db = new Database("./src/db/betgame.db", { verbose: console.log });
db.pragma("foreign_keys = ON");
db.pragma("journal_mode = WAL");

export default db;
