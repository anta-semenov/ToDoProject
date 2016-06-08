import { expect } from 'chai'
import { mergeProps, mapStateToProps, mapDispatchToProps } from '../../src/containers/Nav'
import { fromJS, Set } from 'immutable'
import * as sectionTypes from '../../src/constants/sectionTypes'
import * as sectionNames from '../../src/constants/sectionNames'
import { BASIC, PROJECTS, CONTEXTS} from '../../src/constants/navGroupTypes'
import { ADD_NEW_CONTEXT_TITLE, ADD_NEW_PROJECT_TITLE } from '../../src/constants/defaults'

describe('Sidebar container', () => {
  const testState = fromJS({
    task: {
      b41sogy3s0oc: {
        id: 'b41sogy3s0oc',
        title: 'test task 1',
        completed: false,
        today: false
      },
      b41sogy3s0ok: {
        id: 'b41sogy3s0ok',
        title: 'test task 2',
        completed: false,
        today: true,
        project: 'ab6sof83s1o1'
      },
      b41sogy3s0om: {
        id: 'b41sogy3s0om',
        title: 'test task 3',
        completed: true,
        today: false,
        project: 'ab6sof83s1o1'
      },
      b41sogy3s0oq: {
        id: 'b41sogy3s0oq',
        title: 'test task 4',
        completed: false,
        today: true,
        project: 'ab6sof83s1o2',
        context: Set(['a23sogy3s0oq'])
      }
    },
    context: {
      a21sogy3s0oq: {
        id: 'a21sogy3s0oq',
        title: 'test context 1'
      },
      a23sogy3s0oq: {
        id: 'a23sogy3s0oq',
        title: 'test context 2'
      }
    },
    project: {
      ab6sof83s1oq: {
        id: 'ab6sof83s1oq',
        title: 'test project 1',
        completed: true
      },
      ab6sof83s1o1: {
        id: 'ab6sof83s1o1',
        title: 'test project 2',
        completed: false
      },
      ab6sof83s1o2: {
        id: 'ab6sof83s1o2',
        title: 'test project 3',
        completed: false
      }
    },
    uiState: {
      selectedSection: {
        type: sectionTypes.CONTEXT,
        id: 'a21sogy3s0oq'
      }
    }
  })

  it('Should generate correct props from state', () => {
    const props = mapStateToProps(testState)

    expect(props.groups.length).to.equal(3)
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
        id: 'a21sogy3s0oq',
        type: sectionTypes.CONTEXT,
        title: 'test context 1',
        active: true,
        editing: false,
        count: 0
      },
      {
        id: 'a23sogy3s0oq',
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
        id: 'ab6sof83s1o1',
        type: sectionTypes.PROJECT,
        title: 'test project 2',
        active: false,
        editing: false
      },
      {
        id: 'ab6sof83s1o2',
        type: sectionTypes.PROJECT,
        title: 'test project 3',
        active: false,
        editing: false
      }
    ]))
  })
})
