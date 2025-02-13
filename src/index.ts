import { Hono } from "hono";
import { getClient } from "./db/db";
import { serve } from "bun";
import { subscriber } from "./routes/subscriber";

const PORT = 8080;
const app = new Hono();
const client = getClient();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/subscriber", subscriber);
app.route("/subscriber:id", subscriber);
app.route("/subscriber/add", subscriber);

app.get("/newsletter", async (c) => {
  client.connect();
  const allNewsletter = await client.query(`SELECT * FROM newsletter`);
  client.end();
  return c.json(allNewsletter.rows);
});

console.log(`Server is running on ${PORT}`);
// serve({
//   fetch: app.fetch,
//   port: PORT,
// });

export default {
  fetch: app.fetch,
  port: PORT,
};
