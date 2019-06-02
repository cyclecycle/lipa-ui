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


export default { unpackValues };
