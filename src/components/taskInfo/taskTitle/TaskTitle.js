import React from 'react'
import { Editor, EditorState, ContentState } from 'draft-js'
import './TaskTitle.less'

const titleBlockStyleFn = () => 'task-info__title-text-block'
const titleEditorState = title => title ? EditorState.createWithContent(ContentState.createFromText(title)) : EditorState.createEmpty()

export default class TaskTitle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {editorState: titleEditorState(this.props.title)}
    this.onChange = editorState => this._onChange(editorState)
    this.focus = () => this.refs.editor.focus()
  }
  _onChange(editorState) {
    this.setState({editorState})
    this.props.onChange(this.props.id, editorState.getCurrentContent().getPlainText())
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({editorState: titleEditorState(nextProps.title)})
    }
  }
  render() {
    return (
      <div className='task-info__title'>
        <Editor ref='editor' editorState={this.state.editorState} onChange={this.onChange} placeholder='Task Title' blockStyleFn={titleBlockStyleFn} />
      </div>
    )
  }
}

TaskTitle.propTypes = {
  id: React.PropTypes.number.isRequired,
  title: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired
}
