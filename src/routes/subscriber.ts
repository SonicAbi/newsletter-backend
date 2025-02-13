import { Hono } from "hono";
import { Subscriber } from "../models/subscriber";
import { SubscriberType } from "../types";

export const subscriber = new Hono();

subscriber.get("/", async (c) => {
  const subscribers = await Subscriber.findAll();

  return c.json(
    {
      data: subscribers,
    },
    200
  );
});

subscriber.get("/:id", async (c) => {
  const { id } = c.req.param();
  const subscribers = await Subscriber.findById(id);

  return c.json(
    {
      data: subscribers,
    },
    200
  );
});

subscriber.post("/add", async (c) => {
  try {
    const { name, last_name, email, phone } = await c.req.json();
    const newSubscriber: SubscriberType = {
      name: name,
      last_name: last_name,
      email: email,
      phone: phone,
    };
    console.log("neuer Subscriber added");
    const subscribers = await Subscriber.addSubscriber(newSubscriber);
    return c.json(
      {
        data: subscribers,
      },
      200
    );
  } catch (error) {
    console.error();
  }
});
