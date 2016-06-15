import React from 'react'
import { Editor, EditorState, ContentState } from 'draft-js'
import './TaskTitle.less'

const titleBlockStyleFn = () => 'task-info__title-text-block'
const titleEditorState = title => title ? EditorState.createWithContent(ContentState.createFromText(title)) : EditorState.createEmpty()

export default class TaskTitle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: titleEditorState(this.props.title),
      stackLenght: {
        undo: 0,
        redo: 0
      }
    }
    this.onChange = editorState => this._onChange(editorState)
    this.focus = () => this.refs.editor.focus()
  }
  _onChange(editorState) {
    this.setState({editorState})
    if (!editorState.getSelection().getHasFocus()) {
      this.props.onBlur(this.props.id, editorState.getCurrentContent().getPlainText())
      this.refs.frame.classList.remove('is-active')
    } else {
      if (this.state.stackLenght.undo !== editorState.getUndoStack().count() || this.state.stackLenght.redo !== editorState.getRedoStack().count()) {
        this.props.onChange(this.props.id, editorState.getCurrentContent().getPlainText())
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
    if (!this.state.editorState.getSelection().getHasFocus() && this.state.editorState.getCurrentContent() !== titleEditorState(nextProps.title)) {
      this.setState({
        editorState: titleEditorState(nextProps.title),
        stackLenght: {
          undo: 0,
          redo: 0
        }
      })
    }
  }
  render() {
    return (
      <div className='task-info__title' ref='frame'>
        <Editor ref='editor' editorState={this.state.editorState} onChange={this.onChange} placeholder='Task Title' blockStyleFn={titleBlockStyleFn} />
      </div>
    )
  }
}

TaskTitle.propTypes = {
  id: React.PropTypes.string.isRequired,
  title: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onBlur: React.PropTypes.func

}
