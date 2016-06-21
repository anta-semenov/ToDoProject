
import context from './context'
import project from './project'
import task from './task'
import uiState from './uiState'
import auth, * as fromAuth from './auth.js'

export default function rootReduser(state, action) {
  return state.withMutations(map => map
    .set('task', task(map.get('task'), action))
    .set('context', context(map.get('context'), action))
    .set('project', project(map.get('project'), action))
    .set('uiState', uiState(map.get('uiState'), action))
    .set('auth', auth(map.get('auth'), action))
  )
}

/*
 * Selectors
 */
export const getMaxKey = (state, dataType = 'task') => state.get(dataType).keySeq().max()
export const getUid = state => fromAuth.getUid(state.get('auth'))
export const getClientId = state => fromAuth.getClientId(state.get('auth'))
