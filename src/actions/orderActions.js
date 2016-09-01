import { REPLACE_ORDER } from '../constants/actionTypes'

export const replaceOrder = (orderType, value) => ({ type: REPLACE_ORDER, orderType, value})
