import { getPool } from "../db/db";

export class Subscriber {
  static async findAll() {
    const result = await getPool().query("SELECT * FROM subscriber LIMIT 100");
    return result.rows;
  }
}
