import axios from 'axios';
import config from '../config';
import util from '../util';

const fieldsToUnpack = config.databaseUnpackFields

class Database {
  constructor(env) {
    this.env = env
    this.url = null
    this.trimmedUrl = null
    this.jsonFields = []
  }

  addUrl(url) {
    this.url = url
    this.trimmedUrl = this.trimUrl(url)
  }

  addJsonFields(fields) {
    this.jsonFields = fields
  }

  trimUrl(url) {
    const lastCharIdx = url.length - 1
    const lastChar = url[lastCharIdx]
    const lastCharIsSlash = (lastChar === '/')
    let trimmedUrl = url
    if (lastCharIsSlash) {
      trimmedUrl = trimmedUrl.slice(0, lastCharIdx)
    }
    return trimmedUrl
  }

  trimQuery(query) {
    const firstCharIdx = 0
    const firstChar = query[0]
    const firstCharIsSlash = (firstChar === '/')
    let trimmedQuery = query
    if (firstCharIsSlash) {
      trimmedQuery = trimmedQuery.slice(1, trimmedQuery.length)
    }
    return trimmedQuery
  }

  queryUrl(query) {
    const trimmedUrl = this.trimmedUrl
    const trimmedQuery = this.trimQuery(query)
    const queryUrl = `${trimmedUrl}/${trimmedQuery}`
    return queryUrl
  }

  parseJsonFields(item) {
    const parsedItem = {}
    Object.keys(item).forEach(key => {
      const keyIsJsonField = this.jsonFields.includes(key)
      const value = item[key]
      let newValue = value
      if (keyIsJsonField) {
        const parsedValue = JSON.parse(value)
        newValue = parsedValue
      }
      parsedItem[key] = newValue
    })
    return parsedItem
  }

  itemsHandler(items, loadOntoTarget, targetAttribute) {
    items = items.map(item => this.parseJsonFields(item))
    items = util.unpackFields(items, fieldsToUnpack)
    util.loadOnto(items, loadOntoTarget, targetAttribute)
    return items
  }

  get(queryString) {
    const queryUrl = this.queryUrl(queryString)
    console.log(queryUrl)
    return axios.get(queryUrl)
      .then(response => {
        let items = response.data
        items = this.itemsHandler(items)
        console.log(items)
        return items
      })
      .catch(e => {
        console.log(e)
      })
  }

  delete(queryString) {
    const queryUrl = this.queryUrl(queryString)
    return axios.delete(queryUrl)
      .catch(e => {
        throw e
      })
  }

  post(queryString, payload) {
    const queryUrl = this.queryUrl(queryString)
    return axios.post(queryUrl, payload)
      .then(response => {
        let data = response.data
        data = this.parseJsonFields(data)
        return data
      })
      .catch(e => {
        throw e
      })
  }

  update(queryString, payload) {
    const queryUrl = this.queryUrl(queryString)  
    return axios.update(queryUrl, payload)
      .then(response => {
        const data = JSON.parse(response.data)
        return data
      })
      .catch(e => {
        throw e
      })
  }
}

export default Database;