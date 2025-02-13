import { Hono } from "hono";
import { getClient } from "./db/db";
import { serve } from "bun";

const PORT = 8080
const app = new Hono();
const client = getClient();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/subscriber", async (c) => {
  client.connect();
  const allSubscriber = await client.query(`SELECT * FROM subscriber`);
  client.end();
  return c.json(allSubscriber.rows);
});

app.get("/newsletter", async (c) => {
  client.connect();
  const allNewsletter = await client.query(`SELECT * FROM newsletter`);
  client.end();
  return c.json(allNewsletter.rows);
});

console.log(`Server is running on ${PORT}`)
serve({
  fetch: app.fetch,
  port: PORT,
})

export default {
  fetch: app.fetch,
  port: PORT
};
