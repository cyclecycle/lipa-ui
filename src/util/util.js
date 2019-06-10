function textifyMatchTokens (matches) {
  const textifiedMatches = matches.map(match => {
    const slotLabels = Object.keys(match.slots)
    const textifiedMatch = {...match}
    slotLabels.forEach(label => {
      const tokens = textifiedMatch.slots[label]
      const tokenTexts = tokens.map(token => token.text)
      const joinedTokenTexts = tokenTexts.join(', ')
      textifiedMatch[label] = joinedTokenTexts
    })
    return textifiedMatch
  })
  return textifiedMatches
}

function addSlotContentRepresentations (matches, kwargs) {
  const modifiedMatches = matches.map(match => {
    const slotsContent = getSlotsContent(match.slots, kwargs)
    match.slotContent = joinedSlotRepresentations
    return match
  })
  return modifiedMatches
}

function getSlotsContent (slots, kwargs) {
  let options = {
      noSlotLabels: false,
  }
  if (kwargs !== undefined) {
    options = {
      ...options,
      ...kwargs,
    }
  }
  const slotRepresentations = []
  const slotLabels = Object.keys(slots)
  slotLabels.forEach(label => {
    const tokens = slots[label]
    const tokenTexts = tokens.map(token => token.text)
    const joinedTokenTexts = tokenTexts.join(', ')
    let repr = ''
    if (options.noSlotLabels) {
      repr = `[${joinedTokenTexts}]`
    } else {
      repr = `${label}: [${joinedTokenTexts}]`
    }
    slotRepresentations.push(repr)
  })
  let joinedSlotRepresentations = ''
  if (options.noSlotLabels) {
    joinedSlotRepresentations = slotRepresentations.join(' ')
  } else {
    joinedSlotRepresentations = slotRepresentations.join(', ')
  }
  const slotsContent = joinedSlotRepresentations
  return slotsContent
}

export default {
  getSlotsContent,
  textifyMatchTokens,
  addSlotContentRepresentations,
}