import { connect } from 'react-redux'
import TaskTracker from '../components/taskTracker/TaskTracker'
import { stopTaskTracking } from '../actions/taskActions'
import { getTrackingTaskTitle, getTrackingTaskStartTime, getTrackingTaskId } from '../reducer'

const mapStateToProps = state => {
  return {
  title: getTrackingTaskTitle(state),
  startTime: getTrackingTaskStartTime(state),
  id: getTrackingTaskId(state)
}}
const mapDispatchToProps = dispatch => ({
  stopTracking: (taskId, trackingTaskId) => {
    if (trackingTaskId === taskId) {dispatch(stopTaskTracking(taskId))}
  }
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    ...stateProps,
    stopTracking: (taskId) => dispatchProps.stopTracking(taskId, stateProps.id)
  }
}


const TaskTrackerContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(TaskTracker)
export default TaskTrackerContainer
