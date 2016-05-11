import taskUpdater from './taskUpdater'
import projectUpdater from './projectUpdater'
import contextUpdater from './contextUpdater'

export default function mainUpdater(action, newState) {
  const updatedObjects = []
  taskUpdater(updatedObjects, action, newState.get('task'))
  projectUpdater(updatedObjects, action, newState.get('project'))
  contextUpdater(updatedObjects, action, newState.get('context'))

  let result = {}
  updatedObjects.forEach(item => {
    if (item.updateURL && item.value) {
      result[item.updateURL] = item.value
    }
  })

  return result
}
