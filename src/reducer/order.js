import { fromJS, Map, List } from 'immutable'
import { createSelector } from 'reselect'
import * as actionTypes from '../constants/actionTypes'

const order = (state = fromJS({}), action) => {
  switch (action.type) {
    //projects
    case actionTypes.DELETE_PROJECT:
    case actionTypes.COMPLETE_PROJECT:
      if (action.status) {
        return state.updateIn(['project'], orderArray => deleteId(orderArray, action.id))
      } else {
        return state.updateIn(['project'], orderArray => addId(orderArray, action.id))
      }
    case actionTypes.REMOVE_PROJECT:
      return state.updateIn(['project'], orderArray => deleteId(orderArray, action.id))
    case actionTypes.ADD_PROJECT:
      return state.updateIn(['project'], orderArray => addId(orderArray, action.properties.id))
    case actionTypes.CHANGE_PROJECT_POSITION:
      return state.updateIn(['project'], orderArray => changeOrder(orderArray, action.id, action.nextId))

    //contexts
    case actionTypes.DELETE_CONTEXT:
      if (action.status) {
        return state.updateIn(['context'], orderArray => deleteId(orderArray, action.id))
      } else {
        return state.updateIn(['context'], orderArray => addId(orderArray, action.id))
      }
    case actionTypes.REMOVE_CONTEXT:
      return state.updateIn(['context'], orderArray => deleteId(orderArray, action.id))
    case actionTypes.ADD_CONTEXT:
      return state.updateIn(['context'], orderArray => addId(orderArray, action.properties.id))
    case actionTypes.CHANGE_CONTEXT_POSITION:
      return state.updateIn(['context'], orderArray => changeOrder(orderArray, action.id, action.nextId))

    default:
      return state
  }
}

export default order

/*
Staff function
*/
export const changeOrder = (orderArray, changingId, newNextId) => {
  const tempArray = orderArray.filter(item => item !== changingId)

  if (tempArray.size === orderArray.size) {
    return orderArray
  }

  if (!newNextId) {
    return tempArray.push(changingId)
  }

  const insertIndex = tempArray.findIndex(item => item === newNextId)
  if (insertIndex === -1) {
    return orderArray
  }

  return tempArray.insert(insertIndex, changingId)
}

export const deleteId = (orderArray, id) => orderArray.filter(item => item !== id)

export const addId = (orderArray, id) => {
  return orderArray.insert(0, id)
}

export const createOrderMap = array => fromJS(array)

/*
Selectors
*/

export const getProjectOrder = createSelector(
  state => state.get('project'),
  list => list.toArray()
)
export const getContextOrder = createSelector(
  state => state.get('context'),
  list => list.toArray()
)

/*
Helper function
*/

export const sortedList = (orderArray, mapForOrdering) => {
  const result = List().asMutable()

  orderArray.forEach(id => {
    result.push(mapForOrdering.get(id))
  })

  return result.asImmutable()
}

export const initState = (projectArray, contextArray) => Map().set('project', createOrderMap(projectArray)).set('context', createOrderMap(contextArray))
