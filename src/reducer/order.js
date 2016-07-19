import { fromJS, Map, List } from 'immutable'
import { createSelector } from 'reselect'

const order = (state = fromJS({}), action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default order

/*
Staff function
*/
const changeOrder = (orderMap, changingId, newNextId) => {
  const currentNextId = orderMap.getIn([changingId, 'nextId'])
  const prevId = orderMap.findKey(item => item.get('nextId') === changingId)
  const prevNextId = orderMap.findKey(item => item.get('nextId') === newNextId)
  const willBeFirst = prevNextId === undefined

  return orderMap.withMutations(map => {
    map.setIn([changingId, 'nextId'], newNextId)

    if (currentNextId) {
      map.setIn([prevId, 'nextId'], currentNextId)
    } else {
      map.set(prevId, Map())
    }

    if (prevNextId) {
      map.setIn([prevNextId, 'nextId'], changingId)
    }

    if (willBeFirst) {
      map.setIn([changingId, 'isFirst'], true).deleteIn([newNextId, 'isFirst'])
    }
  })
}

const deleteId = (orderMap, id) => {

}

const insertId = (orderMap, id) => {

}

const createOrderMap = (array) => {

}

/*
Selectors
*/

export const getProjectOrder = createSelector(
  state => state.get('project'),
  orderMap => getOrderedList(orderMap)
)
export const getContextOrder = createSelector(
  state => state.get('context'),
  orderMap => getOrderedList(orderMap)
)

export const getOrderedList = (orderMap) => {
  const result = []
  let nextId = orderMap.findKey(item => item.get('isFirst', false))

  while (nextId) {
    result.push(nextId)
    nextId = orderMap.getIn([nextId, 'nextId'])
  }

  return result
}

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
