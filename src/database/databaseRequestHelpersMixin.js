/*
These functions are loaded into the database class so that
they can be called like:
database.loadDocument(this, documentId)
*/

import axios from 'axios';
import util from '../util';


const databaseRequestHelpersMixin = {
  buildRequestParamsObject (startRow, endRow) {
    const params = {
      headers: {
        range: `rows=${startRow}-${endRow}`, // The range is inclusive
      },
    }
    return params
  },
  buildRecursiveRequest (queryUrl, startRow, chunkSize, resolve, rows) {
    const endRow = util.getEndChunkValue(startRow, chunkSize)
    const params = this.buildRequestParamsObject(startRow, endRow)
    const request = axios.get(queryUrl, params)
      .then(response => {
        const items = response.data
        items.forEach(item => {
          // console.log(item)
          rows.push(items)
        })
        const nextStartRow = util.incrementStartChunkValue(startRow, endRow)
        const nextRequest = this.buildRecursiveRequest(
          queryUrl,
          nextStartRow,
          chunkSize,
          resolve,
          rows,
        )
        return nextRequest
      })
      .catch((e) => {
        if (e.response !== undefined) {
          if (e.response.status === 416) {
            resolve(rows)
          }
        }
        if (e.message === 'Network Error') {
          console.log(e)
          // pass
        }
      })
    return request
  },
  getRowsIteratively (queryUrl, chunkSize) {
    if (chunkSize === undefined) {
      chunkSize = 2
    }
    const startRow = 0
    const rows = []
    const requestPromise = new Promise((resolve, reject) => {
      const recursiveRequest = this.buildRecursiveRequest(
        queryUrl,
        startRow,
        chunkSize,
        resolve,
        rows,
      )
    })
    return requestPromise
  },
}

export default databaseRequestHelpersMixin;
