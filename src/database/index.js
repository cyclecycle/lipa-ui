import config from '../config';
// import Database from './database';
import Database from './database.sqlite';

import databaseLoadingHelpersMixin from './databaseLoadingHelpersMixin';
// import databasePostingHelpersMixin from './databasePostingHelpersMixin';
// import db from './database.sqlite.js';
// import sqlite from 'sqlite';


// Assign databaseHelper methods
Object.assign(Database.prototype, databaseLoadingHelpersMixin)
// Object.assign(Database.prototype, databasePostingHelpersMixin)

// Instantiate Database
const { databasePath, env, databaseJsonFields, fieldsToUnpack } = config
const database = new Database(env)
database.jsonFields = databaseJsonFields
database.fieldsToUnpack = database.fieldsToUnpack
database.path = database.databasePath
database.connect()

export default database;
