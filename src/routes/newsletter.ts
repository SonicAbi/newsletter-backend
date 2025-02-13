import { Hono } from "hono";
import { Newsletter } from "../models/newsletter";
import { NewsletterType } from "../types";

export const newsletterRouter = new Hono();

newsletterRouter.get("/", async (c) => {
  const newsletter = await Newsletter.findAll();

  return c.json(
    {
      data: newsletter,
    },
    200
  );
});

newsletterRouter.get("/:id", async (c) => {
  const { id } = c.req.param();
  const newsletter = await Newsletter.findByID(id);

  return c.json(
    {
      data: newsletter,
    },
    200
  );
});

newsletterRouter.post("/add", async (c) => {
  try {
    const { author, category, content } = await c.req.json();
    const created_at = new Date().toISOString();
    const updated_at = created_at;

    const newNewsletter: NewsletterType = {
      created_at: created_at,
      updated_at: updated_at,
      author: author,
      category: category,
      content: content,
    };
    console.log("📩 Neuer Newsletter:", newNewsletter);
    const newsletter = await Newsletter.addNewsletter(newNewsletter);
    return c.json({ ...newsletter, data: newNewsletter });
  } catch (error) {
    console.error(`❌ Request error: ${error}`);
    return c.json({ error: "Invalid Request" }, 400);
  }
});
