import { expect } from 'chai'
import { mergeProps, mapStateToProps, mapDispatchToProps } from '../../src/containers/Sidebar'
import { fromJS, Set } from 'immutable'
import * as sectionTypes from '../../src/constants/sectionTypes'
import * as sectionNames from '../../src/constants/sectionNames'
import { BASIC, PROJECTS, CONTEXTS} from '../../src/constants/navGroupTypes'
import { ADD_NEW_CONTEXT_TITLE, ADD_NEW_PROJECT_TITLE } from '../../src/constants/defaults'

describe('Sidebar container', () => {
  const testState = fromJS({
    task: [
      {
        id: 0,
        title: 'test task 1',
        completed: false,
        today: false
      },
      {
        id: 2,
        title: 'test task 2',
        completed: false,
        today: true,
        project: 1
      },
      {
        id: 3,
        title: 'test task 3',
        completed: true,
        today: false,
        project: 1
      },
      {
        id: 4,
        title: 'test task 4',
        completed: false,
        today: true,
        project: 2,
        context: Set([1])
      }
    ],
    context: [
      {
        id: 0,
        title: 'test context 1'
      },
      {
        id: 1,
        title: 'test context 2'
      }
    ],
    project: [
      {
        id: 0,
        title: 'test project 1',
        completed: true
      },
      {
        id: 1,
        title: 'test project 2',
        completed: false
      },
      {
        id: 2,
        title: 'test project 3',
        completed: false
      }
    ],
    uiState: {
      selectedSection: {
        type: sectionTypes.CONTEXT,
        id: 0
      }
    }
  })

  it('Should generate correct props from state', () => {
    const props = mapStateToProps(testState)

    expect(props.groups.length).to.equal(3)
    expect(props.nextProjectID).to.equal(3)
    expect(props.nextContextID).to.equal(2)
    expect(props.groups[0].type).to.equal(BASIC)
    expect(props.groups[0].items).to.equal(fromJS([
      {
        type: sectionTypes.INBOX,
        title: sectionNames.INBOX,
        active: false,
        count: 1
      },
      {
        type: sectionTypes.TODAY,
        title: sectionNames.TODAY,
        active: false,
        count: 2
      },
      {
        type: sectionTypes.NEXT,
        title: sectionNames.NEXT,
        active: false
      }
    ]))
    expect(props.groups[1].type).to.equal(CONTEXTS)
    expect(props.groups[1].title).to.equal(sectionNames.CONTEXTS)
    expect(props.groups[1].addNewTitle).to.equal(ADD_NEW_CONTEXT_TITLE)
    expect(props.groups[1].items).to.equal(fromJS([
      {
        id: 0,
        type: sectionTypes.CONTEXT,
        title: 'test context 1',
        active: true,
        editing: false,
        count: 0
      },
      {
        id: 1,
        type: sectionTypes.CONTEXT,
        title: 'test context 2',
        active: false ,
        editing: false,
        count: 1
      }
    ]))

    expect(props.groups[2].type).to.equal(PROJECTS)
    expect(props.groups[2].title).to.equal(sectionNames.PROJECTS)
    expect(props.groups[2].addNewTitle).to.equal(ADD_NEW_PROJECT_TITLE)
    expect(props.groups[2].items).to.equal(fromJS([
      {
        id: 1,
        type: sectionTypes.PROJECT,
        title: 'test project 2',
        active: false,
        editing: false
      },
      {
        id: 2,
        type: sectionTypes.PROJECT,
        title: 'test project 3',
        active: false,
        editing: false
      }
    ]))
  })
})
