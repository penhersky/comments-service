import { MongoClient, Db } from 'mongodb';

const { url, DB_NAME } = process.env;

const connect = async (): Promise<Db> =>
  (await MongoClient.connect(url)).db(DB_NAME);

const get = async (database: Db, tableName: string, id: string): Promise<any> =>
  database.collection(tableName).findOne({ id });

export default {
  connect,
  get,
};
