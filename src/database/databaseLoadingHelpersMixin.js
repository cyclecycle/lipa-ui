/*
These functions are loaded into the database class so that
they can be called like:
database.loadDocument(this, documentId)
*/

import util from '../util';

const databaseLoadingHelpersMixin = {
  loadOneByQuery({ query, targetObj, targetAttribute }) {
    const database = this;
    database.get(query).then(items => {
      let item = items[0];
      targetObj[targetAttribute] = item;
    });
  },
  loadByQuery({ query, targetObj, targetAttribute, headers }) {
    const database = this;
    headers = headers !== undefined ? headers : {};
    const params = { headers };
    return database.get(query, params).then(items => {
      targetObj[targetAttribute] = items;
      return items;
    });
  },
  loadByQueryIteratively({
    query,
    targetObj,
    targetAttribute,
    chunkSize,
    startRow,
    rowLimit,
    headers,
  }) {
    const queryUrl = this.queryUrl(query);
    startRow = startRow !== undefined ? startRow : 0;
    let itemsHandler = items => {
      this.itemsHandler(items, targetObj, targetAttribute);
    };
    const requestPromise = new Promise((resolve, reject) => {
      const recursiveRequestArgs = {
        queryUrl,
        startRow,
        rowLimit,
        itemsHandler,
        resolve,
        chunkSize,
        headers,
      };
      const recursiveRequest = this.buildRecursiveRequest(
        recursiveRequestArgs
      ).catch(e => {
        this.recursiveRequestErrorHandler(e, resolve);
      });
      return recursiveRequest;
    });
    return requestPromise;
  },
  loadById(table, id, target, targetAttribute) {
    const query = `${table}/?id=${id}`;
    const database = this;
    return database.get(query).then(items => {
      let item = items[0];
      target[targetAttribute] = item;
      return item;
    });
  },
  loadByIds(table, ids, target, targetAttribute) {
    const database = this;
    const requests = ids.map(id => {
      const query = `${table}/?id=${id}`;
      return database.get(query).then(items => {
        let item = items[0];
        target[targetAttribute].push(item);
      });
    });
    return Promise.all(requests)
  },
  loadDocument(target, documentId) {
    const query = `documents/?id=${documentId}`;
    const database = this;
    database.get(query).then(items => {
      let document_ = items[0];
      document_ = util.unpackValues(document_, 'data');
      target.document = document_;
    });
  },
  loadSentences(target, documentId) {
    const query = `sentences/?document_id=${documentId}`;
    const database = this;
    database.get(query).then(items => {
      let sentences = items;
      sentences = util.unpackValues(sentences, 'data');
      target.sentences = sentences;
    });
  },
  loadSentence(target, sentenceId) {
    const query = `sentences/?id=${sentenceId}`;
    const database = this;
    database.get(query).then(items => {
      let sentence = items[0];
      sentence = util.unpackValues(sentence, 'data');
      target.sentence = sentence;
    });
  },
  loadTokens(target, sentenceId) {
    const query = `tokens/?sentence_id=${sentenceId}`;
    const database = this;
    database.get(query).then(items => {
      let tokens = items;
      tokens = util.unpackValues(tokens, 'data');
      target.tokens = tokens;
    });
  },
  loadPatterns(target) {
    const query = `patterns`;
    const database = this;
    database.get(query).then(items => {
      let patterns = items;
      target.patterns = patterns;
    });
  },
};

export default databaseLoadingHelpersMixin;
