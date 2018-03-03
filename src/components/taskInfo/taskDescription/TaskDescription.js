import PropTypes from 'prop-types';
import React from 'react'
import { Editor, convertToRaw } from 'draft-js'
import { Map } from 'immutable'
import { descriptionToEditorState } from '../../../utils/descriptionTransform'
import './TaskDescription.less'

const descriptionBlockStyleFn = () => 'text-info__description-text-block'

export default class TaskDescription extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: descriptionToEditorState(this.props.description),
      stackLenght: {
        undo: 0,
        redo: 0
      }
    }
    this.onChange = editorState => this._onChange(editorState)
    this.focus = () => {
      this.refs.editor.focus()
    }
  }

  _onChange(editorState) {
    this.setState({editorState})
    if (!editorState.getSelection().getHasFocus()) {
      this.props.onBlur(this.props.id, Map(convertToRaw(editorState.getCurrentContent())))
      this.refs.frame.classList.remove('is-active')
    } else {
      if (this.state.stackLenght.undo !== editorState.getUndoStack().count() || this.state.stackLenght.redo !== editorState.getRedoStack().count()) {
        this.props.onChange(this.props.id, Map(convertToRaw(editorState.getCurrentContent())))
        this.setState({
          stackLenght: {
            undo: editorState.getUndoStack().count(),
            redo: editorState.getRedoStack().count()
          }
        })
      }
      if (!this.refs.frame.classList.contains('is-active')) {
        this.refs.frame.classList.add('is-active')
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.editorState.getSelection().getHasFocus() && this.state.editorState.getCurrentContent() !== descriptionToEditorState(nextProps.description)) {
      this.setState({
        editorState: descriptionToEditorState(nextProps.description),
        stackLenght: {
          undo: 0,
          redo: 0
        }
      })
    }
  }

  render() {
    return (
      <div className='task-info__description' ref='frame'>
        <Editor ref='editor' editorState={this.state.editorState} onChange={this.onChange} placeholder='Type task description here...' blockStyleFn={descriptionBlockStyleFn} />
      </div>
    )
  }
}

TaskDescription.propTypes = {
  id: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Map)
  ]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func
}
