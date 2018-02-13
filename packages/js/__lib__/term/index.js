import React from 'react'

const termMetaRegexp = /([^\{}]*)\{\{([^\}]+)\}\}(.*)/
const metaTermRegexp = /term:([^;]+)/
const metaDisplayRegexp = /display:([^;]+)/

/**
 * Given a termMap and the value of a term, returns an array of text and react elements with term metadata replaced with the output of the linkBuilder
 * The linkBuilder will receive the display text of the term, and possibly the term itself from the cache, and should return a react element
 * Note that the linkBuilder might not receive a term, if the term value was misconfigured (eg: a typo in the metadata leading to no term being found)
 */
export const interpolate = (termMap, value, linkBuilder) => {
  // given a full metadata (the stuff inside {{...}}), build a usable link element
  const linkFromMetadata = (metadata, index) => {
    const metaTerm = metaTermRegexp.exec(metadata)
    const metaDisplay = metaDisplayRegexp.exec(metadata)

    let termId = Array.isArray(metaTerm) ? metaTerm[1].trim() : undefined
    let display = Array.isArray(metaDisplay) ? metaDisplay[1].trim() : undefined
    
    const displayText = display || (termId && termMap[termId] ? termMap[termId].name : "<unkown term>")
    return React.cloneElement(linkBuilder(displayText, termId ? termMap[termId] : undefined), { key: index })
  }

  const output = []
  let numFound = 0

  let match = termMetaRegexp.exec(value)
  if (!Array.isArray(match)) {
    // No match, so just output the text
    output.push(value)
  } else {
    let lastValue = ""
    while (Array.isArray(match)) {
      const textBefore = match[1]
      const metadata = match[2]
      lastValue = match[3]
      const link = linkFromMetadata(metadata.trim(), numFound++)

      output.push(textBefore)
      output.push(link)

      match = termMetaRegexp.exec(lastValue)
    }

    // after the loop, our last match failed but may not be empty, so add it
    if (lastValue.length > 0) output.push(lastValue)
  }

  return output
}
