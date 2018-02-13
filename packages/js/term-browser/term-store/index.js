import { createStore } from 'lib/store'
import { query } from 'lib/graphql'
import { withKeys } from 'lib/collection'

const actions = {}

export const termStore = createStore({
  termCache: {
    entropy: {
      id: "entropy", // a default item just to get things started. Will probably add a way to get a random one later
      name: "Entropy",
      value: "Entropy represents the possible {{term:kinetic_state}} of a {{term:system_of_particles}}. A larger Entropy means there are more possible states the {{term: system_of_particles}} could be in. Entropy is measured from an arbitrary origin value; thus entropies can only be compared if they have the same origin value."
    }
  },
  selectedTerm: null,
  breadcrumbs: []
}, (state, type, data) => actions[type] ? actions[type](state, data) : { done: Promise.resolve() });

actions.fetchTerm = (state, { termId }) => {
  const done = new Promise(resolve => {
    query`
      query getTerm {
        term(id: "${termId}") {
          id
          name
          value
          terms {
            id
            name
            value
          }
        }
      }
    `
      .then(data => [data.term, ...data.term.terms].map(withKeys(["id", "name", "value"])))
      .then(newTerms => termStore.dispatch("addTerms", { terms: newTerms }))
      .then(resolve)
  })

  return {
    done
  }
}

actions.addTerms = (state, { terms = [] }) => {
  terms.forEach(t => state.termCache[t.id] = t)
  return {
    done: Promise.resolve(),
    state
  }
}

actions.selectTerm = (state, { termId }) => {
  state.selectedTerm = termId
  if (termId !== state.breadcrumbs[state.breadcrumbs.length - 1]) state.breadcrumbs.push(termId)
  return {
    done: Promise.resolve(),
    state
  }
}

actions.loadCrumb = (state, { crumbIndex }) => {
  state.breadcrumbs = state.breadcrumbs.slice(0, crumbIndex + 1)
  return {
    done: Promise.resolve().then(() => termStore.dispatch("selectTerm", { termId: state.breadcrumbs[crumbIndex] })),
    state
  }
}
