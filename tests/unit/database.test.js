import { shallowMount } from '@vue/test-utils';
import database from '@/database'
import 'jest-extended'


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
