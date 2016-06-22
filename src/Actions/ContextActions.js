import * as actionTypes from '../constants/actionTypes'

 export function addContext(properties) {
   return {type: actionTypes.ADD_CONTEXT, properties: { ...properties, createdDate: Date.now() }}
 }

 export function removeContext(id) {
   return {type: actionTypes.REMOVE_CONTEXT, id}
 }

 export function editContext(id, properties) {
   return {type: actionTypes.EDIT_CONTEXT, id, properties}
 }
