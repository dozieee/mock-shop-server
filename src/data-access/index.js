import { config } from 'dotenv';
config();
import makeEventDb from './event-db';
import { MongoClient as _MongoClient } from 'mongodb';

const MongoClient = _MongoClient;
const url = process.env.DM_COMMENTS_DB_URL;
const dbName = process.env.DM_COMMENTS_DB_NAME;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

export async function makeDb () {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db(dbName);
}


 const eventDB = makeEventDb({ makeDb })

 export default eventDB