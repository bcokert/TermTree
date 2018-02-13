import React from 'react'

/**
 * Creates a store that contains state and updates its subscribers whenever the state changes via a dispatch
 * State can only be changed by the exported dispatch function, which accepts an action
 * The given reducer will receive the current state and the dispatched actions type and data, and should return an object with the optional new state and an optional promise that resolves when it's done
 * To share state with different components, create a singleton store and pass it to the connect of both components
 */
export const createStore = (initialState, reducer) => {
  const subscribers = []
  let _state = initialState || {}

  const getState = () => Object.assign({}, _state)

  // Ensures the given callback is called whenever the state changes. Returns an unsubscribe function
  const subscribe = fn => {
    subscribers.push(fn)
    fn(getState())
    return () => subscribers.splice(subscribers.indexOf(fn), 1)
  }

  // Triggers an action, which might have side effects and might return a new state (otherwise state doesnt change)
  const dispatch = (type, data) => {
    const { state, done } = reducer(getState(), type, data) || {}
    if (state) _state = state
    subscribers.map(fn => fn(getState()))
    return done || Promise.resolve()
  }

  return {
    getState,
    subscribe,
    dispatch
  }
}

/**
 * Give it a store and a map from the stores state and the wrappers props to the props to pass to the component
 * They'll be passed in whenever the stores state changes
 */
export const connect = ({ getState, subscribe }, map = state => state) => Component => class extends React.Component {
  componentDidMount() {
    this.canBeUpdated = true
    this.unsubscribe = subscribe(() => {
      if (this.canBeUpdated) this.forceUpdate()
    })
  }

  componentWillUnmount() {
    this.canBeUpdated = false
    this.unsubscribe()
  }

  render() {
    return <Component {...{...this.props, ...map(getState(), this.props)}} />
  }
}
