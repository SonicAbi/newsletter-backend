import { getClient } from "./db/db";

async function runner() {
  const db = getClient();
  db.connect();
  const res = await db.query("SELECT * FROM newsletter");
  console.log("+res :>> ", res.rows);
  db.end();
}

runner();
