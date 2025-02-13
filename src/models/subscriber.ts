import { QueryConfig } from "pg";
import { getPool } from "../db/db";
import { SubscriberType } from "../types";

export class Subscriber {
  static async findAll() {
    const query: QueryConfig = {
      text: `SELECT * FROM subscriber LIMIT 100`,
    };
    const result = await getPool().query(query);
    return result.rows;
  }

  static async findById(id: string) {
    const query: QueryConfig = {
      text: `SELECT * FROM subscriber WHERE id = $1 LIMIT 100`,
      values: [id],
    };
    const result = await getPool().query(query);
    return result.rows;
  }

  static async addSubscriber(newSubscriber: SubscriberType) {
    const query: QueryConfig = {
      text: `INSERT INTO subscriber VALUES ($1 = name, $2 = last_name, $3 = email, $4 = phone)`,
      values: [newSubscriber.name, newSubscriber.last_name, newSubscriber.email, newSubscriber.phone],
    };
    const result = await getPool().query(query);
    return result.rows;
  }
}
