import { getPool } from "../db/db";

export class Newsletter {
    static async findAll() {
        const result = await getPool().query("SELECT * FROM newsletter")
        return result.rows
    }
}