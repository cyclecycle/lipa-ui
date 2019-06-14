function objIds (objs) {
  const ids = objs.map(obj => obj.id)
  return ids
}

function objById (objs, id) {
  const filtered = objs.filter(obj => {
    return id === obj.id
  })
  const obj = filtered[0]
  return obj
}

function objsByIds (objs, ids) {
  const filtered = objs.filter(obj => {
    return ids.includes(obj.id)
  })
  return filtered
}

function removeObjById (objs, id) {
  const filtered = objs.filter(obj => {
    return obj.id !== id
  })
  return filtered
}

function unpackValues (intoItems, fromKey) {
  const unpack = (item, fromKey) => {
    let newItem = {...item}
    delete newItem[fromKey]
    newItem = {
      ...newItem,
      ...item[fromKey]
    }
    return newItem
  }
  if (isArray(intoItems)) {
    const items = intoItems
    const newItems = items.map(item => unpack(item, fromKey))
    return newItems
  } else {
    const item = intoItems
    const newItem = unpack(item, fromKey)
    return newItem
  }
}

function unpackFields(items, fields) {
  fields.forEach(field => {
    items = unpackValues(items, field)
  })
  return items
}

function isArray(obj) {
  let isArray = null
  if (obj.length !== undefined) {
    isArray = true
  } else {
    isArray = false
  }
  return isArray
}

function incrementStartChunkValue (startChunk, endChunk) {
  startChunk = endChunk + 1
  return startChunk;
}

function getEndChunkValue (startChunk, chunkSize) {
  const endChunk = startChunk + chunkSize - 1
  return endChunk;
}

function loadOnto(items, target, targetAttribute) {
  if (target !== undefined && targetAttribute !== undefined) {
    items.forEach(item => {
      target[targetAttribute].push(item)
    })
  }
}

export default {
  objIds,
  objById,
  objsByIds,
  removeObjById,
  unpackValues,
  unpackFields,
  incrementStartChunkValue,
  getEndChunkValue,
  loadOnto,
};
