import taskUpdater from './taskUpdater'
import projectUpdater from './projectUpdater'
import contextUpdater from './contextUpdater'

export default function mainUpdater(action, newState) {
  const updatedObjects = []
  const priority = newState.getIn(['userInfo', 'clientKey'])
  taskUpdater(updatedObjects, action, newState.get('task'), priority)
  projectUpdater(updatedObjects, action, newState.get('project'), priority)
  contextUpdater(updatedObjects, action, newState.get('context'), priority)
  let result = {}
  updatedObjects.forEach(item => {
    if (item.updateURL) {
      result[item.updateURL] = item.value
    }
  })
  console.log(result);
  return result
}
