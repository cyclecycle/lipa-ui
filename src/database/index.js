import config from '../config';
import Database from './database';
import databaseRequestHelpersMixin from './databaseRequestHelpersMixin';
import databaseLoadingHelpersMixin from './databaseLoadingHelpersMixin';
import databasePostingHelpersMixin from './databasePostingHelpersMixin';


// Assign databaseHelper methods
Object.assign(Database.prototype, databaseRequestHelpersMixin)
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
