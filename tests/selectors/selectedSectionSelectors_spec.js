import { expect } from 'chai'
import { fromJS } from 'immutable'
import * as sectionNames from '../../src/constants/sectionNames'
import { getSelectedSection } from '../../src/reducer'

const testProjects = fromJS({
  bh52ogy5s0fm: {
    id: 'bh52ogy5s0fm',
    title: 'Test project 0',
    completed: false
  },
  bh52ogy5s0f1: {
    id: 'bh52ogy5s0f1',
    title: 'Test project 1',
    completed: false
  }
})
const testContexts = fromJS({
  cf1sobz3s0oc: {
    id: 'cf1sobz3s0oc',
    title: 'Test context 0'
  },
  cf1sobz3s0o1: {
    id: 'cf1sobz3s0o1',
    title: 'Test context 1'
  }
})

describe('getSelectedSection selector', () => {
  it('Should return correct name for INBOX', () => {
    const state = fromJS({})
    const ownProps = { section: 'inbox' }
    expect(getSelectedSection(state, ownProps).sectionName).to.equal(sectionNames.INBOX)
  })
  it('Should return name for TODAY', () => {
    const state = fromJS({})
    const ownProps = { section: 'today' }
    expect(getSelectedSection(state, ownProps).sectionName).to.equal(sectionNames.TODAY)
  })
  it('Should return name for NEXT', () => {
    const state = fromJS({})
    const ownProps = { section: 'next' }
    expect(getSelectedSection(state, ownProps).sectionName).to.equal(sectionNames.NEXT)
  })
  it('Should return name for PROJECT', () => {
    const state = fromJS({
      project: testProjects
    })
    const ownProps = { section: 'bh52ogy5s0fm' }
    expect(getSelectedSection(state, ownProps).sectionName).to.equal('Test project 0')
  })
  it('Should return name for CONTEXT', () => {
    const state = fromJS({
      context: testContexts
    })
    const ownProps = { section: 'cf1sobz3s0oc' }
    expect(getSelectedSection(state, ownProps).sectionName).to.equal('Test context 0')
  })
})
