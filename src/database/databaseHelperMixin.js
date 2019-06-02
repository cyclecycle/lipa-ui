/*
These functions are loaded into the database class so that
they can be called like:
database.loadDocument(this, documentId)
*/

const databaseHelperMixin = {
  loadDocument (target, documentId) {
    const query = `documents/?id=${documentId}`
    const database = this
    database.get(query)
      .then(items => {
        target.document = items[0]
      })
      .catch(e => {
      })
  },
  loadSentences (target, documentId) {
    const query = `sentences/?document_id=${documentId}`
    const database = this
    database.get(query)
      .then(items => {
        target.sentences = items
      })
      .catch(e => {
      })
  }
}

export default databaseHelperMixin;
