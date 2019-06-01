import config from '../config/config';
import Database from './database';


// Instantiate Database
const { env, databaseJsonFields } = config
const database = new Database(env)
database.addJsonFields(databaseJsonFields)
if (env !== 'mock') {
  const { databaseRestUrl } = config;
  database.addUrl(databaseRestUrl);
}


export default database;
