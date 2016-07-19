import * as actionTypes from '../constants/actionTypes'

 export function addContext(properties) {
   return {type: actionTypes.ADD_CONTEXT, properties: { ...properties, createdDate: Date.now() }}
 }

 export function removeContext(id) {
   return {type: actionTypes.REMOVE_CONTEXT, id}
 }

 export function deleteContext(id, status) {
   return {type: actionTypes.DELETE_CONTEXT, id, status}
 }

 export function editContext(id, properties) {
   return {type: actionTypes.EDIT_CONTEXT, id, properties}
 }

 export const replaceContext = (id, newContext) => ({ type: actionTypes.REPLACE_CONTEXT, id, newContext })

 export const changeContextPosition = (id, nextId) => ({ type: actionTypes.CHANGE_CONTEXT_POSITION, id, nextId })
