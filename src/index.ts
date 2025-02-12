import { Hono } from 'hono'
import { getClient } from './db/db'


const app = new Hono()
const client = getClient()


app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/subscriber', async (c) => {
  client.connect()
  const allSubscriber = await client.query(`SELECT * FROM subscriber`)
  client.end()
  return c.json(allSubscriber.rows)
})

export default app
