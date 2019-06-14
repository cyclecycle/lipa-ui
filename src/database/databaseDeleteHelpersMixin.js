/*
These functions are loaded into the database class so that
they can be called like:
database.loadDocument(this, documentId)
*/

import util from '../util';


const databaseDeleteHelpersMixin = {
  deleteRow (table, id) {
    const queryString = `${table}/?id=${id}`
    const database = this
    return database.delete(queryString)
      .then(response => {
        if (!database.deleteResponseIsOk(response)) {
          return Error('Delete error')
        }
      })
      .catch(e => {
        return e
      })
  },
  deleteResponseIsOk (response) {
    if (response.status === 204) {
      return true
    } else {
      return false
    }
  },
}

export default databaseDeleteHelpersMixin;
