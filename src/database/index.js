import config from '../config/config';
import Database from './database';


// Instantiate Database
const { env } = config
const database = new Database(env)
if (env !== 'mock') {
  const { databaseRestUrl } = config;
  database.addUrl(databaseRestUrl);
}

export default database;
