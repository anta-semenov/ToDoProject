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

  describe('Change order', () => {
    it('Should change position', () => {
      const expectedOrderArray = [
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
      ]

      const nextOrderedMap = fromOrder.changeOrder(testOrderMap, 'b41sogy3s0o7', 'b41sogy3s0o5')

      expect(fromOrder.getOrderedList(nextOrderedMap)).to.deep.equal(expectedOrderArray)
    })

    it('Should change position when nextId is first element', () => {
      const expectedOrderArray = [
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
      ]

      const nextOrderedMap = fromOrder.changeOrder(testOrderMap, 'b41sogy3s0o7', 'b41sogy3s0o2')

      const expectedMap = fromJS({
        b41sogy3s0o1: {},
        b41sogy3s0o2: {nextId: 'b41sogy3s0o3'},
        b41sogy3s0o4: {nextId: 'b41sogy3s0o5'},
        b41sogy3s0o3: {nextId: 'b41sogy3s0o4'},
        b41sogy3s0o7: {nextId: 'b41sogy3s0o2', isFirst: true},
        b41sogy3s0o9: {nextId: 'b41sogy3s010'},
        b41sogy3s0o8: {nextId: 'b41sogy3s0o9'},
        b41sogy3s0o6: {nextId: 'b41sogy3s0o8'},
        b41sogy3s010: {nextId: 'b41sogy3s011'},
        b41sogy3s012: {nextId: 'b41sogy3s0o1'},
        b41sogy3s0o5: {nextId: 'b41sogy3s0o6'},
        b41sogy3s011: {nextId: 'b41sogy3s012'}
      })

      expect(nextOrderedMap).to.equal(expectedMap)
      expect(fromOrder.getOrderedList(nextOrderedMap)).to.deep.equal(expectedOrderArray)
    })

    it('Should change position of last element', () => {
      const expectedOrderArray = [
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
      ]

      const nextOrderedMap = fromOrder.changeOrder(testOrderMap, 'b41sogy3s0o1', 'b41sogy3s0o8')

      const expectedMap = fromJS({
        b41sogy3s0o1: {nextId: 'b41sogy3s0o8'},
        b41sogy3s0o2: {nextId: 'b41sogy3s0o3', isFirst: true},
        b41sogy3s0o4: {nextId: 'b41sogy3s0o5'},
        b41sogy3s0o3: {nextId: 'b41sogy3s0o4'},
        b41sogy3s0o7: {nextId: 'b41sogy3s0o1'},
        b41sogy3s0o9: {nextId: 'b41sogy3s010'},
        b41sogy3s0o8: {nextId: 'b41sogy3s0o9'},
        b41sogy3s0o6: {nextId: 'b41sogy3s0o7'},
        b41sogy3s010: {nextId: 'b41sogy3s011'},
        b41sogy3s012: {},
        b41sogy3s0o5: {nextId: 'b41sogy3s0o6'},
        b41sogy3s011: {nextId: 'b41sogy3s012'}
      })

      expect(nextOrderedMap).to.equal(expectedMap)
      expect(fromOrder.getOrderedList(nextOrderedMap)).to.deep.equal(expectedOrderArray)
    })

    it('Should change position of last element when newId is first element', () => {
      const expectedOrderArray = [
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
      ]

      const nextOrderedMap = fromOrder.changeOrder(testOrderMap, 'b41sogy3s0o1', 'b41sogy3s0o2')

      const expectedMap = fromJS({
        b41sogy3s0o1: {nextId: 'b41sogy3s0o2', isFirst: true},
        b41sogy3s0o2: {nextId: 'b41sogy3s0o3'},
        b41sogy3s0o4: {nextId: 'b41sogy3s0o5'},
        b41sogy3s0o3: {nextId: 'b41sogy3s0o4'},
        b41sogy3s0o7: {nextId: 'b41sogy3s0o8'},
        b41sogy3s0o9: {nextId: 'b41sogy3s010'},
        b41sogy3s0o8: {nextId: 'b41sogy3s0o9'},
        b41sogy3s0o6: {nextId: 'b41sogy3s0o7'},
        b41sogy3s010: {nextId: 'b41sogy3s011'},
        b41sogy3s012: {},
        b41sogy3s0o5: {nextId: 'b41sogy3s0o6'},
        b41sogy3s011: {nextId: 'b41sogy3s012'}
      })

      expect(nextOrderedMap).to.equal(expectedMap)
      expect(fromOrder.getOrderedList(nextOrderedMap)).to.deep.equal(expectedOrderArray)
    })

    it('Should change position of first element when newId is last element', () => {
      const expectedOrderArray = [
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
      ]

      const nextOrderedMap = fromOrder.changeOrder(testOrderMap, 'b41sogy3s0o2', 'b41sogy3s0o1')

      const expectedMap = fromJS({
        b41sogy3s0o1: {},
        b41sogy3s0o2: {nextId: 'b41sogy3s0o1'},
        b41sogy3s0o4: {nextId: 'b41sogy3s0o5'},
        b41sogy3s0o3: {nextId: 'b41sogy3s0o4', isFirst: true},
        b41sogy3s0o7: {nextId: 'b41sogy3s0o8'},
        b41sogy3s0o9: {nextId: 'b41sogy3s010'},
        b41sogy3s0o8: {nextId: 'b41sogy3s0o9'},
        b41sogy3s0o6: {nextId: 'b41sogy3s0o7'},
        b41sogy3s010: {nextId: 'b41sogy3s011'},
        b41sogy3s012: {nextId: 'b41sogy3s0o2'},
        b41sogy3s0o5: {nextId: 'b41sogy3s0o6'},
        b41sogy3s011: {nextId: 'b41sogy3s012'}
      })

      expect(nextOrderedMap).to.equal(expectedMap)
      expect(fromOrder.getOrderedList(nextOrderedMap)).to.deep.equal(expectedOrderArray)
    })

    it('Should do nothing when nextId is the same nextId', () => {
      const expectedOrderArray = [
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

      const nextOrderedMap = fromOrder.changeOrder(testOrderMap, 'b41sogy3s0o7', 'b41sogy3s0o8')

      expect(nextOrderedMap).to.equal(testOrderMap)
      expect(fromOrder.getOrderedList(nextOrderedMap)).to.deep.equal(expectedOrderArray)
    })

    it('Should do nothing with wrong nextId', () => {
      const expectedOrderArray = [
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

      const nextOrderedMap = fromOrder.changeOrder(testOrderMap, 'b41sogy3s0o7', 'b41sogy3s0o0')

      expect(nextOrderedMap).to.equal(testOrderMap)
      expect(fromOrder.getOrderedList(nextOrderedMap)).to.deep.equal(expectedOrderArray)
    })

    it('Should do element last with empty nextId', () => {
      const expectedOrderArray = [
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
      ]

      const expectedMap = fromJS({
        b41sogy3s0o1: {nextId: 'b41sogy3s0o7'},
        b41sogy3s0o2: {nextId: 'b41sogy3s0o3', isFirst: true},
        b41sogy3s0o4: {nextId: 'b41sogy3s0o5'},
        b41sogy3s0o3: {nextId: 'b41sogy3s0o4'},
        b41sogy3s0o7: {},
        b41sogy3s0o9: {nextId: 'b41sogy3s010'},
        b41sogy3s0o8: {nextId: 'b41sogy3s0o9'},
        b41sogy3s0o6: {nextId: 'b41sogy3s0o8'},
        b41sogy3s010: {nextId: 'b41sogy3s011'},
        b41sogy3s012: {nextId: 'b41sogy3s0o1'},
        b41sogy3s0o5: {nextId: 'b41sogy3s0o6'},
        b41sogy3s011: {nextId: 'b41sogy3s012'}
      })

      const nextOrderedMap = fromOrder.changeOrder(testOrderMap, 'b41sogy3s0o7')

      expect(nextOrderedMap).to.equal(expectedMap)
      expect(fromOrder.getOrderedList(nextOrderedMap)).to.deep.equal(expectedOrderArray)
    })

    it('Should do nothing with wrong id', () => {
      const expectedOrderArray = [
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

      const nextOrderedMap = fromOrder.changeOrder(testOrderMap, 'b41sogy3s0o0', 'b41sogy3s0o4')

      expect(nextOrderedMap).to.equal(testOrderMap)
      expect(fromOrder.getOrderedList(nextOrderedMap)).to.deep.equal(expectedOrderArray)
    })
  })

  describe('Delete id', () => {
    it('Should delete id from map', () => {
      const expectedMap = fromJS({
        b41sogy3s0o1: {},
        b41sogy3s0o2: {nextId: 'b41sogy3s0o3', isFirst: true},
        b41sogy3s0o4: {nextId: 'b41sogy3s0o5'},
        b41sogy3s0o3: {nextId: 'b41sogy3s0o4'},
        b41sogy3s0o7: {nextId: 'b41sogy3s0o9'},
        b41sogy3s0o9: {nextId: 'b41sogy3s010'},
        b41sogy3s0o6: {nextId: 'b41sogy3s0o7'},
        b41sogy3s010: {nextId: 'b41sogy3s011'},
        b41sogy3s012: {nextId: 'b41sogy3s0o1'},
        b41sogy3s0o5: {nextId: 'b41sogy3s0o6'},
        b41sogy3s011: {nextId: 'b41sogy3s012'}
      })

      const expectedOrderArray = [
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
      ]

      const nextOrderedMap = fromOrder.deleteId(testOrderMap, 'b41sogy3s0o8')

      expect(fromOrder.getOrderedList(nextOrderedMap)).to.deep.equal(expectedOrderArray)
      expect(nextOrderedMap).to.equal(expectedMap)
    })

    it('Should delete last id from map', () => {
      const expectedMap = fromJS({
        b41sogy3s0o2: {nextId: 'b41sogy3s0o3', isFirst: true},
        b41sogy3s0o4: {nextId: 'b41sogy3s0o5'},
        b41sogy3s0o3: {nextId: 'b41sogy3s0o4'},
        b41sogy3s0o7: {nextId: 'b41sogy3s0o8'},
        b41sogy3s0o9: {nextId: 'b41sogy3s010'},
        b41sogy3s0o8: {nextId: 'b41sogy3s0o9'},
        b41sogy3s0o6: {nextId: 'b41sogy3s0o7'},
        b41sogy3s010: {nextId: 'b41sogy3s011'},
        b41sogy3s012: {},
        b41sogy3s0o5: {nextId: 'b41sogy3s0o6'},
        b41sogy3s011: {nextId: 'b41sogy3s012'}
      })

      const expectedOrderArray = [
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
      ]

      const nextOrderedMap = fromOrder.deleteId(testOrderMap, 'b41sogy3s0o1')

      expect(fromOrder.getOrderedList(nextOrderedMap)).to.deep.equal(expectedOrderArray)
      expect(nextOrderedMap).to.equal(expectedMap)
    })

    it('Should delete first id from map', () => {
      const expectedMap = fromJS({
        b41sogy3s0o1: {},
        b41sogy3s0o4: {nextId: 'b41sogy3s0o5'},
        b41sogy3s0o3: {nextId: 'b41sogy3s0o4', isFirst: true},
        b41sogy3s0o7: {nextId: 'b41sogy3s0o8'},
        b41sogy3s0o9: {nextId: 'b41sogy3s010'},
        b41sogy3s0o8: {nextId: 'b41sogy3s0o9'},
        b41sogy3s0o6: {nextId: 'b41sogy3s0o7'},
        b41sogy3s010: {nextId: 'b41sogy3s011'},
        b41sogy3s012: {nextId: 'b41sogy3s0o1'},
        b41sogy3s0o5: {nextId: 'b41sogy3s0o6'},
        b41sogy3s011: {nextId: 'b41sogy3s012'}
      })

      const expectedOrderArray = [
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

      const nextOrderedMap = fromOrder.deleteId(testOrderMap, 'b41sogy3s0o2')

      expect(fromOrder.getOrderedList(nextOrderedMap)).to.deep.equal(expectedOrderArray)
      expect(nextOrderedMap).to.equal(expectedMap)
    })

    it('Should do nothing with wrong id', () => {
      const expectedOrderArray = [
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

      const nextOrderedMap = fromOrder.deleteId(testOrderMap, 'b41sogy3s0o0')

      expect(nextOrderedMap).to.equal(testOrderMap)
      expect(fromOrder.getOrderedList(nextOrderedMap)).to.deep.equal(expectedOrderArray)
    })
  })

  it('Should add id to the begining of the list', () => {
    const expectedOrderArray = [
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
    ]

    const expectedMap = fromJS({
      b41sogy3s0o1: {},
      b41sogy3s0o2: {nextId: 'b41sogy3s0o3'},
      b41sogy3s0o4: {nextId: 'b41sogy3s0o5'},
      b41sogy3s0o3: {nextId: 'b41sogy3s0o4'},
      b41sogy3s0o7: {nextId: 'b41sogy3s0o8'},
      b41sogy3s0o9: {nextId: 'b41sogy3s010'},
      b41sogy3s0o8: {nextId: 'b41sogy3s0o9'},
      b41sogy3s0o6: {nextId: 'b41sogy3s0o7'},
      b41sogy3s010: {nextId: 'b41sogy3s011'},
      b41sogy3s012: {nextId: 'b41sogy3s0o1'},
      b41sogy3s0o5: {nextId: 'b41sogy3s0o6'},
      b41sogy3s011: {nextId: 'b41sogy3s012'},
      b41sogy3s0o0: {nextId: 'b41sogy3s0o2', isFirst: true}
    })

    const nextOrderedMap = fromOrder.addId(testOrderMap, 'b41sogy3s0o0')

    expect(nextOrderedMap).to.equal(expectedMap)
    expect(fromOrder.getOrderedList(nextOrderedMap)).to.deep.equal(expectedOrderArray)
  })

  it('Should create orderMap from array', () => {
    const testArray = [
      'b41sogy3s0o2',
      'b41sogy3s0o8',
      'b41sogy3s0o4',
      'b41sogy3s0o5',
      'b41sogy3s0o6',
      'b41sogy3s0o9'
    ]

    const expectedMap = fromJS({
      b41sogy3s0o2: {nextId: 'b41sogy3s0o8', isFirst: true},
      b41sogy3s0o8: {nextId: 'b41sogy3s0o4'},
      b41sogy3s0o4: {nextId: 'b41sogy3s0o5'},
      b41sogy3s0o5: {nextId: 'b41sogy3s0o6'},
      b41sogy3s0o6: {nextId: 'b41sogy3s0o9'},
      b41sogy3s0o9: {}
    })

    expect(fromOrder.createOrderMap(testArray)).to.equal(expectedMap)
  })
})
