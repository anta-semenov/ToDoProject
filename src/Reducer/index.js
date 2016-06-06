import context from './context'
import project from './project'
import task from './task'
import uiState from './uiState'
import userInfo from './userInfo'
import auth from './auth.js'

export default function rootReduser(state, action) {
  return state.withMutations(map => map
    .set('task', task(map.get('task'), action))
    .set('context', context(map.get('context'), action))
    .set('project', project(map.get('project'), action))
    .set('uiState', uiState(map.get('uiState'), action))
    .set('userInfo', userInfo(map.get('userInfo'), action))
    .set('auth', auth(map.get('auth'), action))
  )
}
