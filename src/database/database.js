import axios from 'axios';


class Database {
  constructor(env) {
    this.env = env
    // this.mock = (env === 'mock')
  }

  addUrl(url) {
    this.url = url
    this.trimmedUrl = this.trimUrl(url)
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
    // All fields named 'data' are encoded in JSON formatc
    console.log('parse json field started')
    if (item instanceof Object) {
      console.log('object item being parsed')
      const parsedItem = {}
      Object.keys(item).forEach(key => {
        if (key === 'data') {
          const value = item[key]
          const parsedValue = JSON.parse(value)
          parsedItem[key] = parsedValue
        }
      })
      return parsedItem
    }
    console.log(item)
    if (item instanceof Array) {
      console.log('array item being parsed')
      const parsedItem = item.map(element => {
        console.log(element)
        const parsedElement = this.parseJsonFields(element)
        return parsedElement
      })
      console.log(parsedItem)
      return parsedItem
    }
  }

  get(queryString) {
    const queryUrl = this.queryUrl(queryString)
    return axios.get(queryUrl)
      .then(response => {
        const items = response.data
        console.log(items)
        const parsedItems = this.parseJsonFields(items)
        return parsedItems
      })
      .catch(e => {
        throw e
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
        const data = JSON.parse(response.data)
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

export default Database