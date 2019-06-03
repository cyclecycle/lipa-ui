import config from '../config/config';
import Database from './database';
import databaseLoadingHelpersMixin from './databaseLoadingHelpersMixin';
import databasePostingHelpersMixin from './databasePostingHelpersMixin';

// Assign databaseHelper methods
Object.assign(Database.prototype, databaseLoadingHelpersMixin)
Object.assign(Database.prototype, databasePostingHelpersMixin)

// Instantiate Database
const { env, databaseJsonFields } = config
const database = new Database(env)
database.addJsonFields(databaseJsonFields)
if (env !== 'mock') {
  const { databaseRestUrl } = config;
  database.addUrl(databaseRestUrl);
}

export default database;
