import { shallowMount } from '@vue/test-utils';
import database from '@/database'
import 'jest-extended'
import config from '@/config';
import sqlite from 'sqlite';

const dbPath = config.databasePath

describe('Database class', () => {
  expect.assertions(1)
  it('Consumes the REST DB', () => {
    // See lipa-db repo for extensive REST testing
    return database.get('documents')
      .then(data => {
        expect(data).toEqual(expect.toBeArray())
      })
  })
  it('Serves mock data in mock mode', () => {
    
  })
})

describe('Loads sqlite database', () => {
  // expect.assertions(1)
  it ('Connects and queries', () => {
    return sqlite.open(dbPath, { Promise })
      .then(db => {
        console.log(db)
        return db
      })
      .then(db => {
        return db.get('select * from documents where id = ?', 1)
      })
      .then(result => {
        console.log(result)
      })
  })
})
