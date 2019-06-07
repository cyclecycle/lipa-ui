/*
These functions are loaded into the database class so that
they can be called like:
database.loadDocument(this, documentId)
*/

import util from './util';


const databaseLoadingHelpersMixin = {
  loadDocument (target, documentId) {
    const query = `documents/?id=${documentId}`
    const database = this
    console.log(query)
    database.get(query)
      .then(items => {
        console.log(items)
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
  loadPatterns(target) {
    const query = `patterns`
    const database = this
    database.get(query)
      .then(items => {
        let patterns = items
        target.patterns = patterns
      })
  },
  loadRowsByQuery(query, target, targetAttribute) {
    const database = this
    database.get(query)
      .then(items => {
        let unpackedItems = util.unpackValues(items, 'data')
        target[targetAttribute] = unpackedItems
      })
  },
  loadRowsByIds(table, ids, target, targetAttribute) {
    const database = this
    ids.forEach(id => {
      const query = `${table}/?id=${id}`
      database.get(query)
        .then(items => {
          const item = items[0]
          let unpackedItem = util.unpackValues(item, 'data')
          target[targetAttribute].push(unpackedItem)
        })
    })
  },
}

export default databaseLoadingHelpersMixin;
