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
    match.slotContent = slotsContent
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

function matchesToAnnotations (matches) {
  if (matches.length === 0) {
    return []
  }
  const annotationsMapped = matches.map(match => {
    const annotations = matchToAnnotations(match)
    return annotations
  })
  const annotations = annotationsMapped.reduce((a, b) => a.concat(b))
  return annotations
}

function matchToAnnotations (match) {
  const annotations = []
  const matchId = match.match_id
  const patternId = match.pattern_id
  const slots = match.slots
  const slotLabels = Object.keys(slots)
  slotLabels.forEach(slotLabel => {
    let slotTokens = [...slots[slotLabel]]
    slotTokens = slotTokens.forEach(slotToken => {
      const annotation = slotToken
      annotation.label = slotLabel
      annotation.patternId = patternId
      annotation.matchId = matchId
      const annotationId = `${patternId}-${slotLabel}`
      annotation.id = annotationId
      annotations.push(slotToken)
    })
  })
  return annotations
}

export default {
  getSlotsContent,
  textifyMatchTokens,
  addSlotContentRepresentations,
  matchToAnnotations,
  matchesToAnnotations,
}