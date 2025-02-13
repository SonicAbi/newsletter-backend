import { getPool } from "../db/db";
import { NewsletterType } from "../types";

export class Newsletter {
  static async findAll() {
    const result = await getPool().query("SELECT * FROM newsletter");
    return result.rows;
  }

  static async findByID(id: string) {
    const query = {
      name: "fetch-newsletter-id",
      text: `SELET * FROM newsletter WHERE id = $1`,
      values: [id],
    };
    const result = await getPool().query(query);
    return result.rows;
  }

  static async addNewsletter({
    created_at,
    updated_at,
    author,
    category,
    content,
  }: NewsletterType) {
    const query = {
      name: "fetch-newsletter-add",
        text: `INSERT INTO newsletter(created_at, updated_at, author, category, content) 
      VALUES ($1, $2, $3, $4, $5)`,
      values: [created_at, updated_at, author, category, content],
    };
      try {
          const result = await getPool().query(query);
          return {message: "Newsletter added succesfully"}
      } catch (error) {
          console.error(`SQL Error: ${error}`)
      }
  }

  static async updateNewsletter({
    id,
    author,
    category,
    content,
    created_at,
    updated_at,
  }: NewsletterType) {
    const query = {
      name: "fetch-newsletter-update",
      text: "UPDATE newsletter SET updated_at = $1, author = $2, category = $3, content = $4 WHERE id = $5",
      values: [updated_at, author, category, content, id],
    };
      const result = await getPool().query(query)
      return result.rows
  }
}
