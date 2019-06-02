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
  },
  loadSentences (target, documentId) {
    const query = `sentences/?document_id=${documentId}`
    const database = this
    database.get(query)
      .then(items => {
        target.sentences = items
      })
  },
  loadSentence (target, sentenceId) {
    const query = `sentences/?id=${sentenceId}`
    const database = this
    database.get(query)
      .then(items => {
        target.sentence = items[0]
      })
  },
  loadTokens (target, sentenceId) {
    const query = `tokens/?sentence_id=${sentenceId}`
    const database = this
    database.get(query)
      .then(items => {
        let tokens = items
        tokens = tokens.map(token => {
          const data = {
            ...token.data,
            id: token.id
          }
          return data
        })
        target.tokens = tokens
      })
  },
}

export default databaseHelperMixin;
