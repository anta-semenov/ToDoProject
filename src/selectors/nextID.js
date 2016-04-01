import { createSelector } from 'reselect'
import { fromJS } from 'immutable'

export const nextID = createSelector(
  [state => state],
  (state = fromJS([])) => {
    return state.reduce((id, item) => {
      return Math.max(id, item.get('id'))
    }, -1) + 1
  }
)

export const makeNextIDSelector = () => nextID
