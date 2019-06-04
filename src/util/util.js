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

function objsById (objs, ids) {
  const filtered = objs.filter(obj => {
    return ids.includes(obj.id)
  })
  return filtered
}

export default {
  objIds,
  objById,
  objsById,
};
