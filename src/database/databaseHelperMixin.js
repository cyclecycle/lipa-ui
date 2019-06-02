/*
These functions are loaded into the database class so that
they can be called like:
database.loadDocument(this, documentId)
*/

import util from './util';


const databaseHelperMixin = {
  loadDocument (target, documentId) {
    const query = `documents/?id=${documentId}`
    const database = this
    database.get(query)
      .then(items => {
        let document_ = items[0]
        document_ = util.unpackValues(document_, 'data')
        target.document = document_
      })
  },
  loadSentences (target, documentId) {
    const query = `sentences/?document_id=${documentId}`
    const database = this
    database.get(query)
      .then(items => {
        let sentences = items
        sentences = util.unpackValues(sentences, 'data')
        target.sentences = sentences
      })
  },
  loadSentence (target, sentenceId) {
    const query = `sentences/?id=${sentenceId}`
    const database = this
    database.get(query)
      .then(items => {
        let sentence = items[0]
        sentence = util.unpackValues(sentence, 'data')
        target.sentence = sentence
      })
  },
  loadTokens (target, sentenceId) {
    const query = `tokens/?sentence_id=${sentenceId}`
    const database = this
    database.get(query)
      .then(items => {
        let tokens = items
        tokens = util.unpackValues(tokens, 'data')
        target.tokens = tokens
      })
  },
}

export default databaseHelperMixin;
