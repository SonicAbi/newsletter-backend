import { Hono } from "hono";
import { Newsletter } from "../models/newsletter";

export const newsletterRouter = new Hono()

newsletterRouter.get("/", async (c) => {
    const newsletter = await Newsletter.findAll()

    return c.json(
        {
            data: newsletter
        },
        200
    )
})