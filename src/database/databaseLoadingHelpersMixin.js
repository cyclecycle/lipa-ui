/*
These functions are loaded into the database class so that
they can be called like:
database.loadDocument(this, documentId)
*/

import util from '../util';


const databaseLoadingHelpersMixin = {
  loadOneByQuery(query, target, targetAttribute) {
    const database = this
    database.get(query)
      .then((items) => {
        let item = items[0]
        console.log(item)
        target[targetAttribute] = item
      })
  },
  loadByQuery(query, target, targetAttribute) {
    const database = this
    database.get(query)
      .then((items) => {
        target[targetAttribute] = items
      })
  },
  loadByQueryIteratively(queryString, loadOntoTarget, targetAttribute, chunkSize) {
    const queryUrl = this.queryUrl(queryString)
    const startRow = 0
    let itemsHandler = (items) => {
      this.itemsHandler(items, loadOntoTarget, targetAttribute)
    }
    const requestPromise = new Promise((resolve, reject) => {
      const recursiveRequestArgs = {
        queryUrl,
        startRow,
        itemsHandler,
        resolve,
        chunkSize
      }
      const recursiveRequest = this.buildRecursiveRequest(recursiveRequestArgs)
        .catch(e => {
          this.recursiveRequestErrorHandler(e, resolve)
        })
      return recursiveRequest
    })
    return requestPromise
  },
  loadById(table, id, target, targetAttribute) {
    const query = `${table}/?id=${id}`
    const database = this
    database.get(query)
      .then(items => {
        let item = items[0]
        target[targetAttribute] = item
      })
  },
  loadByIds(table, ids, target, targetAttribute) {
    const database = this
    ids.forEach(id => {
      const query = `${table}/?id=${id}`
      database.get(query)
        .then(items => {
          let item = items[0]
          target[targetAttribute].push(item)
        })
    })
  },
  loadDocument(target, documentId) {
    const query = `documents/?id=${documentId}`
    const database = this
    database.get(query)
      .then(items => {
        let document_ = items[0]
        document_ = util.unpackValues(document_, 'data')
        target.document = document_
      })
  },
  loadSentences(target, documentId) {
    const query = `sentences/?document_id=${documentId}`
    const database = this
    database.get(query)
      .then(items => {
        let sentences = items
        sentences = util.unpackValues(sentences, 'data')
        target.sentences = sentences
      })
  },
  loadSentence(target, sentenceId) {
    const query = `sentences/?id=${sentenceId}`
    const database = this
    database.get(query)
      .then(items => {
        let sentence = items[0]
        sentence = util.unpackValues(sentence, 'data')
        target.sentence = sentence
      })
  },
  loadTokens(target, sentenceId) {
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
}

export default databaseLoadingHelpersMixin;
