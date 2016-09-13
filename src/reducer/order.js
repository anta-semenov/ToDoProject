import { fromJS } from 'immutable'
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

    //common
    case actionTypes.REPLACE_ORDER:
      return state.set(action.orderType, fromJS(action.value))
    case actionTypes.SET_STATE:
      return action.state.has('order') ? action.state.get('order', fromJS({})) : state

    default:
      return state
  }
}

export default order

/*
 * Staff function
 */
export const changeOrder = (orderArray = fromJS([]), changingId, newNextId) => {
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

export const deleteId = (orderArray = fromJS([]), id) => orderArray.filter(item => item !== id)
export const addId = (orderArray = fromJS([]), id) => orderArray.insert(0, id)

/*
 * Selectors
 */

export const getProjectOrder = (state = fromJS({})) => state.get('project', fromJS([]))
export const getContextOrder = (state = fromJS({})) => state.get('context', fromJS([]))

/*
 * Helper function
 */

export const sortedList = (orderList, mapForOrdering) =>
  orderList.size > 0 ? orderList.map(id => mapForOrdering.get(id)).filter(id => id) : mapForOrdering.toList()
