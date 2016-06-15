import { fromJS } from 'immutable'

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    return fromJS(JSON.parse(serializedState))
  } catch (err) {
    return undefined
  }
}

export const saveState = (state) => {
  const serializedState = JSON.stringify(state.toJS())
  try {
    localStorage.setItem('state', serializedState)
  } catch (err) {
    //
  }
}
