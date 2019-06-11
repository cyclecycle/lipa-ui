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

function isArray(obj) {
  let isArray = null
  if (obj.length !== undefined) {
    isArray = true
  } else {
    isArray = false
  }
  return isArray
}

export default {
  objIds,
  objById,
  objsByIds,
  unpackValues,
};
