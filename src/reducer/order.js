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
export const changeOrder = (orderMap, changingId, newNextId) => {
  if (!orderMap.get(changingId) || !orderMap.get(newNextId)) {
    return orderMap
  }

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

export const deleteId = (orderMap, id) => {
  if (!orderMap.get(id)) {
    return orderMap
  }

  const prevId = orderMap.findKey(item => item.get('nextId') === id)
  const nextId = orderMap.getIn([id, 'nextId'])

  return orderMap.withMutations(map => {
    map.delete(id)

    if (nextId && prevId) {
      map.setIn([prevId, 'nextId'], nextId)
    } else if (!nextId) {
      map.set(prevId, Map())
    } else {
      map.setIn([nextId, 'isFirst'], true)
    }
  })

}

export const addId = (orderMap, id) => {
  const firstId = orderMap.findKey(item => item.get('isFirst', false))
  return orderMap.withMutations(map => {
    map.set(id, Map({nextId: firstId, isFirst: true}))
    .deleteIn([firstId, 'isFirst'])
  })
}

export const createOrderMap = (array) => {
  const result = Map().asMutable()

  array.forEach((value, index, array) => {
    if (index === array.length-1) {
      result.set(value, Map())
    } else {
      result.setIn([value, 'nextId'], array[index+1])
    }

    if (index === 0) {
      result.setIn([value, 'isFirst'], true)
    }
  })

  return result.asImmutable()
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
