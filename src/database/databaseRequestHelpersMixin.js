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
  buildRecursiveRequest ({ queryUrl, startRow, rowLimit, itemsHandler, resolve, chunkSize }) {
    console.log(startRow, rowLimit)
    if ( rowLimit !== undefined && startRow >= rowLimit ) {
      throw 'Row limit reached'
    }
    if (chunkSize === undefined) {
      chunkSize = databaseLoadingChunkSize
    }
    const endRow = util.getEndChunkValue(startRow, chunkSize)
    const params = this.buildRequestParamsObject(startRow, endRow)
    const request = axios.get(queryUrl, params)
      .then(response => {
        let items = response.data
        items = itemsHandler(items)
        let startRow = util.incrementStartChunkValue(startRow, endRow)
        const nextRequestArgs = {
          queryUrl,
          startRow,
          rowLimit,
          itemsHandler,
          resolve,
          chunkSize,
        }
        const nextRequest = this.buildRecursiveRequest(nextRequestArgs)
        return nextRequest
      })
    return request
  },
  recursiveRequestErrorHandler (e, resolve) {
    if (e.response !== undefined) {
      if (e.response.status === 404) { // Not found. No results for the given query
        resolve(e)
      }
      if (e.response.status === 416) { // Range not satisfiable
        resolve()
      } else {
        console.log(e)
      }
    } else {
      if (e.message === 'Network Error') {
        resolve()
        // console.log(e)
      } else {
        console.log(e)
      }
    }
    resolve()
  },
}

export default databaseRequestHelpersMixin;
