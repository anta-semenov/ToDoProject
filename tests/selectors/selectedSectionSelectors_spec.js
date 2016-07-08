import { expect } from 'chai'
import { fromJS } from 'immutable'
import * as sectionTypes from '../../src/constants/sectionTypes'
import * as sectionNames from '../../src/constants/sectionNames'
import { getSelectedSectionName } from '../../src/reducer'

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

describe('getSelectedSectionName selector', () => {
  it('Should return name for INBOX', () => {
    const state = fromJS({
      uiState: {
        selectedSection: {
          type: sectionTypes.INBOX
        }
      }
    })
    expect(getSelectedSectionName(state)).to.equal(sectionNames.INBOX)
  })
  it('Should return name for TODAY', () => {
    const state = fromJS({
      uiState: {
        selectedSection: {
          type: sectionTypes.TODAY
        }
      }
    })
    expect(getSelectedSectionName(state)).to.equal(sectionNames.TODAY)
  })
  it('Should return name for NEXT', () => {
    const state = fromJS({
      uiState: {
        selectedSection: {
          type: sectionTypes.NEXT
        }
      }
    })
    expect(getSelectedSectionName(state)).to.equal(sectionNames.NEXT)
  })
  it('Should return name for PROJECT', () => {
    const state = fromJS({
      project: testProjects,
      uiState: {
        selectedSection: {
          type: sectionTypes.PROJECT,
          id: 'bh52ogy5s0fm'
        }
      }
    })
    expect(getSelectedSectionName(state)).to.equal('Test project 0')
  })
  it('Should return name for CONTEXT', () => {
    const state = fromJS({
      context: testContexts,
      uiState: {
        selectedSection: {
          type: sectionTypes.CONTEXT,
          id: 'cf1sobz3s0oc'
        }
      }
    })
    expect(getSelectedSectionName(state)).to.equal('Test context 0')
  })
})
