import { devlog } from 'lib/debug'

export const query = (queryParts, ...args) => {
  const queryString = queryParts.reduce((acc, next, i) => {
    acc += next
    if (args[i]) acc += typeof args[i] === 'function' ? args[i]() : args[i]
    return acc
  }, "");

  return fetch("http://localhost:8911/graph/", {
    method: 'POST',
    body: JSON.stringify({ query: queryString }),
  }).then(r => r.json()).then(r => {
    devlog("Graphql Request", queryString, r.errors)
    if (r.errors) throw new Error(`Graphql Request failed with ${r.errors.length} errors`)
    return r.data
  }).catch(e => devlog("Graphql Request Error", e))
}
