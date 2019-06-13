/*
These functions are loaded into the database class so that
they can be called like:
database.loadDocument(this, documentId)
*/

import axios from 'axios';
import util from '../util';
import config from '../config';

const { databaseLoadingChunkSize } = config

const databaseRequestHelpersMixin = {
  buildRequestParamsObject (startRow, endRow) {
    const params = {
      headers: {
        range: `rows=${startRow}-${endRow}`, // The range is inclusive
      },
    }
    return params
  },
  buildRecursiveRequest (args) {
    const { queryUrl, startRow, itemsHandler, resolve } = args
    const chunkSize = databaseLoadingChunkSize
    const endRow = util.getEndChunkValue(startRow, chunkSize)
    const params = this.buildRequestParamsObject(startRow, endRow)
    const request = axios.get(queryUrl, params)
      .then(response => {
        let items = response.data
        items = itemsHandler(items)
        const nextStartRow = util.incrementStartChunkValue(startRow, endRow)
        const nextRequestArgs = {
          queryUrl,
          nextStartRow,
          itemsHandler,
          resolve,
        }
        const nextRequest = this.buildRecursiveRequest(nextRequestArgs)
        return nextRequest
      })
      .catch((e) => {
        if (e.response !== undefined) {
          if (e.response.status === 416) {
            resolve()
          } else {
            throw e
          }
        } else {
          if (e.message === 'Network Error') {
            console.log(e)
          } else {
            throw e
          }
        }
      })
    return request
  },
  getRowsIteratively (queryUrl) {
    const rows = []
    let wrappedItemsHandler = (items) => {
      items = this.itemsHandler(items)
      items.forEach(item => {
        rows.push(item)
      })
    }
    const startRow = 0
    const requestPromise = new Promise((resolve, reject) => {
      const requestArgs = {
        queryUrl,
        startRow,
        wrappedItemsHandler,
        resolve,
      }
      const recursiveRequest = this.buildRecursiveRequest(requestArgs)
    })
    return requestPromise
  },
}

export default databaseRequestHelpersMixin;
