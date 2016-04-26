import React from 'react'
import { Editor, EditorState, ContentState } from 'draft-js'
import './TaskDescription.less'

const descriptionBlockStyleFn = () => 'text-info__description-text-block'
const descriptionEditorState = description => {
  if (description) {
    return typeof description === 'string' ? EditorState.createWithContent(ContentState.createFromText(description)) : EditorState.createWithContent(description)
  }
  return EditorState.createEmpty()
}

export default class TaskDescription extends React.Component {
  constructor(props) {
    super(props)
    this.state = {editorState: descriptionEditorState(this.props.description)}
    this.onChange = editorState => this._onChange(editorState)
    this.focus = () => this.refs.editor.focus()
  }

  _onChange(editorState) {
    this.setState({editorState})
    this.props.onChange(this.props.id, editorState.getCurrentContent())
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({editorState: descriptionEditorState(nextProps.description)})
    }
  }

  render() {
    return (
      <div className='task-info__description'>
        <Editor ref='editor' editorState={this.state.editorState} onChange={this.onChange} placeholder='Type task description here...' blockStyleFn={descriptionBlockStyleFn} />
      </div>
    )
  }
}

TaskDescription.propTypes = {
  id: React.PropTypes.number.isRequired,
  description: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.instanceOf(ContentState)
  ]),
  onChange: React.PropTypes.func.isRequired
}
