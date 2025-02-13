import { Hono } from "hono";
import { getClient } from "./db/db";
import { serve } from "@hono/node-server";
import { subscriberRouter } from "./routes/subscriber";
import { newsletterRouter } from "./routes/newsletter";

const PORT = 8080;
const app = new Hono();
const client = getClient();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/newsletter", newsletterRouter);

app.route("/subscriber", subscriberRouter);

console.log(`Server is running on ${PORT}`);
if (!process.versions.bun) {
  serve({
    fetch: app.fetch,
    port: PORT,
  });
}

export default {
  fetch: app.fetch,
  port: PORT,
};
