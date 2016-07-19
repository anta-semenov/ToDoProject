import { expect } from 'chai'
import { fromJS } from 'immutable'
import * as fromOrder from '../../src/reducer/order'

describe('Order', () => {
  const testOrderMap = fromJS({
    b41sogy3s0o1: {},
    b41sogy3s0o2: {nextId: 'b41sogy3s0o3', isFirst: true},
    b41sogy3s0o4: {nextId: 'b41sogy3s0o5'},
    b41sogy3s0o3: {nextId: 'b41sogy3s0o4'},
    b41sogy3s0o7: {nextId: 'b41sogy3s0o8'},
    b41sogy3s0o9: {nextId: 'b41sogy3s010'},
    b41sogy3s0o8: {nextId: 'b41sogy3s0o9'},
    b41sogy3s0o6: {nextId: 'b41sogy3s0o7'},
    b41sogy3s010: {nextId: 'b41sogy3s011'},
    b41sogy3s012: {nextId: 'b41sogy3s0o1'},
    b41sogy3s0o5: {nextId: 'b41sogy3s0o6'},
    b41sogy3s011: {nextId: 'b41sogy3s012'}
  })

  it('Should produce correct ordered array', () => {
    const expectedArray = [
      'b41sogy3s0o2',
      'b41sogy3s0o3',
      'b41sogy3s0o4',
      'b41sogy3s0o5',
      'b41sogy3s0o6',
      'b41sogy3s0o7',
      'b41sogy3s0o8',
      'b41sogy3s0o9',
      'b41sogy3s010',
      'b41sogy3s011',
      'b41sogy3s012',
      'b41sogy3s0o1'
    ]

    expect(fromOrder.getOrderedList(testOrderMap)).to.deep.equal(expectedArray)
  })
})
