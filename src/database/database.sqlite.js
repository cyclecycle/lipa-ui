import config from '../config';
import util from '../util';
// import sqlite from 'sqlite';


const { dbPath } = config
const { fieldsToUnpack } = config


class Database {
  constructor(env) {
    this.db = null
    this.path = null
    this.jsonFields = []
    this.fieldsToUnpack = []
  }

  connect() {
    const sqlite3 = require('sqlite3').verbose();
    console.log(sqlite3)
    // sqlite.open(this.path, { Promise })
    //   .then(db => {
    //     this.db = db
    //   })
    // const db = new sqlite3.Database
    // console.log(db)
  }

  get(query) {
    return this.db.get(query)
      .then(result => {
        return result
      })
  }


  parseJsonFields(item) {
    const parsedItem = {}
    Object.keys(item).forEach(key => {
      const keyIsJsonField = this.jsonFields.includes(key)
      const value = item[key]
      let newValue = value
      if (keyIsJsonField) {
        const parsedValue = JSON.parse(value)
        newValue = parsedValue
      }
      parsedItem[key] = newValue
    })
    return parsedItem
  }
}

export default Database;