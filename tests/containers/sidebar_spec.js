import { mapStateToProps } from '../../src/containers/Nav'
import { fromJS, Set } from 'immutable'
import * as sectionTypes from '../../src/constants/sectionTypes'

describe('Sidebar container', () => {
  const testState = fromJS({
    task: {
      b41sogy3s0oc: {
        id: 'b41sogy3s0oc',
        title: 'test task 1',
        completed: false,
        completedDeleted: false,
        today: false
      },
      b41sogy3s0ok: {
        id: 'b41sogy3s0ok',
        title: 'test task 2',
        completed: false,
        completedDeleted: false,
        today: true,
        project: 'ab6sof83s1o1'
      },
      b41sogy3s0om: {
        id: 'b41sogy3s0om',
        title: 'test task 3',
        completed: true,
        completedDeleted: true,
        today: false,
        project: 'ab6sof83s1o1'
      },
      b41sogy3s0oq: {
        id: 'b41sogy3s0oq',
        title: 'test task 4',
        completed: false,
        completedDeleted: false,
        today: true,
        project: 'ab6sof83s1o2',
        context: Set(['a23sogy3s0oq'])
      }
    },
    context: {
      a21sogy3s0oq: {
        id: 'a21sogy3s0oq',
        title: 'test context 1',
        deleted: false
      },
      a23sogy3s0oq: {
        id: 'a23sogy3s0oq',
        title: 'test context 2',
        delted: false
      }
    },
    project: {
      ab6sof83s1oq: {
        id: 'ab6sof83s1oq',
        title: 'test project 1',
        completed: true,
        completedDeleted: true
      },
      ab6sof83s1o1: {
        id: 'ab6sof83s1o1',
        title: 'test project 2',
        completed: false,
        completedDeleted: false
      },
      ab6sof83s1o2: {
        id: 'ab6sof83s1o2',
        title: 'test project 3',
        completed: false,
        completedDeleted: false
      }
    },
    uiState: {
      selectedSection: {
        type: sectionTypes.CONTEXT,
        id: 'a21sogy3s0oq'
      }
    },
    order: {
      project: ['ab6sof83s1o1', 'ab6sof83s1o2'],
      context: ['a21sogy3s0oq', 'a23sogy3s0oq']
    }
  })

  test('Should generate correct props from state', () => {
    const ownProps = { section: 'a21sogy3s0oq'}
    const props = mapStateToProps(testState, ownProps)

    expect(props).toMatchSnapshot()
  })
})
