import { expect } from 'chai'
import * as actions from '../../src/actions/taskActions'
import * as types from '../../src/constants/actionTypes'

describe('Task action creators', () => {
    it('Should create an action to add a task', () => {
        const properties = {
          title: 'New task',
          description: 'Description of the task'
        }
        const expectedAction = {
            type: types.ADD_TASK,
            properties
        }

        expect(actions.addTask(properties)).to.deep.equal(expectedAction)
    })

    it('Should create an action to remove a task', () => {
        const id = 0
        const expectedAction = {
            type: types.REMOVE_TASK,
            id
        }
        expect(actions.removeTask(id)).to.deep.equal(expectedAction)
    })

    it('Should create an action to edit a task', () => {
        const id = 0
        const properties = {
            title: 'New task title',
            description: 'Description of task'
        }
        const expectedAction = {
            type: types.EDIT_TASK,
            id,
            properties
        }
        expect(actions.editTask(id, properties)).to.deep.equal(expectedAction)
    })

    it('Should create an action to complete a task', () => {
        const id = 0
        const status = true
        const expectedAction = {
            type: types.COMPLETE_TASK,
            id,
            status
        }
        expect(actions.completeTask(id, status)).to.deep.equal(expectedAction)
    })

    it('Should create an action to add task to a project', () => {
        const id = 0
        const projectId = 0;
        const expectedAction = {
            type: types.ADD_TASK_TO_PROJECT,
            id,
            project: projectId
        }
        expect(actions.addTaskToProject(id, projectId)).to.deep.equal(expectedAction);
    })

    it('Should create an action to add context to a task', () => {
        const id = 0
        const contextId = 0
        const expectedAction = {
            type: types.ADD_TASK_CONTEXT,
            id,
            context: contextId
        }
        expect(actions.addTaskContext(id, contextId)).to.deep.equal(expectedAction)
    })

    it('Should create an action to remove context from a task', () => {
        const id = 0
        const contextId = 0
        const expectedAction = {
            type: types.REMOVE_TASK_CONTEXT,
            id,
            context: contextId
        }
        expect(actions.removeTaskContext(id, contextId)).to.deep.equal(expectedAction)
    })
    it('Should create an action to switch task context', () => {
        const id = 0
        const contextId = 0
        const expectedAction = {
            type: types.SWITCH_TASK_CONTEXT,
            id,
            context: contextId
        }
        expect(actions.switchTaskContext(id, contextId)).to.deep.equal(expectedAction)
    })

    it('Should create an action to add task to today', () => {
        const id = 0
        const status = true
        const expectedAction = {
            type: types.SET_TASK_TODAY,
            id,
            status
        }
        expect(actions.setTaskToday(id, status)).to.deep.equal(expectedAction)
    })

})
