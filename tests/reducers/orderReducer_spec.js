import { expect } from 'chai'
import { fromJS } from 'immutable'
import * as fromOrder from '../../src/reducer/order'

describe('Order', () => {
  const testOrderArray = fromJS([
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
  ])

  describe('Change order', () => {
    it('Should change position', () => {
      const expectedOrderArray = fromJS([
        'b41sogy3s0o2',
        'b41sogy3s0o3',
        'b41sogy3s0o4',
        'b41sogy3s0o7',
        'b41sogy3s0o5',
        'b41sogy3s0o6',
        'b41sogy3s0o8',
        'b41sogy3s0o9',
        'b41sogy3s010',
        'b41sogy3s011',
        'b41sogy3s012',
        'b41sogy3s0o1'
      ])

      const nextOrderedArray = fromOrder.changeOrder(testOrderArray, 'b41sogy3s0o7', 'b41sogy3s0o5')

      expect(nextOrderedArray).to.equal(expectedOrderArray)
    })

    it('Should change position when nextId is first element', () => {
      const expectedOrderArray = fromJS([
        'b41sogy3s0o7',
        'b41sogy3s0o2',
        'b41sogy3s0o3',
        'b41sogy3s0o4',
        'b41sogy3s0o5',
        'b41sogy3s0o6',
        'b41sogy3s0o8',
        'b41sogy3s0o9',
        'b41sogy3s010',
        'b41sogy3s011',
        'b41sogy3s012',
        'b41sogy3s0o1'
      ])

      const nextOrderedArray = fromOrder.changeOrder(testOrderArray, 'b41sogy3s0o7', 'b41sogy3s0o2')

      expect(nextOrderedArray).to.equal(expectedOrderArray)
    })

    it('Should change position of last element', () => {
      const expectedOrderArray = fromJS([
        'b41sogy3s0o2',
        'b41sogy3s0o3',
        'b41sogy3s0o4',
        'b41sogy3s0o5',
        'b41sogy3s0o6',
        'b41sogy3s0o7',
        'b41sogy3s0o1',
        'b41sogy3s0o8',
        'b41sogy3s0o9',
        'b41sogy3s010',
        'b41sogy3s011',
        'b41sogy3s012'
      ])

      const nextOrderedArray = fromOrder.changeOrder(testOrderArray, 'b41sogy3s0o1', 'b41sogy3s0o8')

      expect(nextOrderedArray).to.equal(expectedOrderArray)
    })

    it('Should change position of last element when newId is first element', () => {
      const expectedOrderArray = fromJS([
        'b41sogy3s0o1',
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
        'b41sogy3s012'
      ])

      const nextOrderedArray = fromOrder.changeOrder(testOrderArray, 'b41sogy3s0o1', 'b41sogy3s0o2')

      expect(nextOrderedArray).to.equal(expectedOrderArray)
    })

    it('Should change position of first element when newId is last element', () => {
      const expectedOrderArray = fromJS([
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
        'b41sogy3s0o2',
        'b41sogy3s0o1'
      ])

      const nextOrderedArray = fromOrder.changeOrder(testOrderArray, 'b41sogy3s0o2', 'b41sogy3s0o1')

      expect(nextOrderedArray).to.equal(expectedOrderArray)
    })

    it('Should do nothing when nextId is the same nextId', () => {
      const expectedOrderArray = fromJS([
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
      ])

      const nextOrderedArray = fromOrder.changeOrder(testOrderArray, 'b41sogy3s0o7', 'b41sogy3s0o8')

      expect(nextOrderedArray).to.equal(expectedOrderArray)
    })

    it('Should do nothing with wrong nextId', () => {
      const expectedOrderArray = fromJS([
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
      ])

      const nextOrderedArray = fromOrder.changeOrder(testOrderArray, 'b41sogy3s0o7', 'b41sogy3s0o0')

      expect(nextOrderedArray).to.equal(expectedOrderArray)
    })

    it('Should do element last with empty nextId', () => {
      const expectedOrderArray = fromJS([
        'b41sogy3s0o2',
        'b41sogy3s0o3',
        'b41sogy3s0o4',
        'b41sogy3s0o5',
        'b41sogy3s0o6',
        'b41sogy3s0o8',
        'b41sogy3s0o9',
        'b41sogy3s010',
        'b41sogy3s011',
        'b41sogy3s012',
        'b41sogy3s0o1',
        'b41sogy3s0o7'
      ])

      const nextOrderedArray = fromOrder.changeOrder(testOrderArray, 'b41sogy3s0o7')

      expect(nextOrderedArray).to.equal(expectedOrderArray)
    })

    it('Should do nothing with wrong id', () => {
      const expectedOrderArray = fromJS([
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
      ])

      const nextOrderedArray = fromOrder.changeOrder(testOrderArray, 'b41sogy3s0o0', 'b41sogy3s0o4')

      expect(nextOrderedArray).to.equal(expectedOrderArray)
    })
  })

  describe('Delete id', () => {
    it('Should delete id from map', () => {
      const expectedOrderArray = fromJS([
        'b41sogy3s0o2',
        'b41sogy3s0o3',
        'b41sogy3s0o4',
        'b41sogy3s0o5',
        'b41sogy3s0o6',
        'b41sogy3s0o7',
        'b41sogy3s0o9',
        'b41sogy3s010',
        'b41sogy3s011',
        'b41sogy3s012',
        'b41sogy3s0o1'
      ])

      const nextOrderedArray = fromOrder.deleteId(testOrderArray, 'b41sogy3s0o8')

      expect(nextOrderedArray).to.equal(expectedOrderArray)
    })

    it('Should delete last id from map', () => {
      const expectedOrderArray = fromJS([
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
        'b41sogy3s012'
      ])

      const nextOrderedArray = fromOrder.deleteId(testOrderArray, 'b41sogy3s0o1')

      expect(nextOrderedArray).to.equal(expectedOrderArray)
    })

    it('Should delete first id from map', () => {
      const expectedOrderArray = fromJS([
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
      ])

      const nextOrderedArray = fromOrder.deleteId(testOrderArray, 'b41sogy3s0o2')

      expect(nextOrderedArray).to.equal(expectedOrderArray)
    })

    it('Should do nothing with wrong id', () => {
      const expectedOrderArray = fromJS([
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
      ])

      const nextOrderedArray = fromOrder.deleteId(testOrderArray, 'b41sogy3s0o0')

      expect(nextOrderedArray).to.equal(expectedOrderArray)
    })
  })

  it('Should add id to the begining of the list', () => {
    const expectedOrderArray = fromJS([
      'b41sogy3s0o0',
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
    ])

    const nextOrderedArray = fromOrder.addId(testOrderArray, 'b41sogy3s0o0')

    expect(nextOrderedArray).to.equal(expectedOrderArray)
  })
})
