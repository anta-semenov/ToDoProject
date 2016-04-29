import React from 'react'
import { Editor, convertToRaw } from 'draft-js'
import { Map } from 'immutable'
import { descriptionToEditorState } from '../../../utils/descriptionTransform'
import './TaskDescription.less'

const descriptionBlockStyleFn = () => 'text-info__description-text-block'

export default class TaskDescription extends React.Component {
  constructor(props) {
    super(props)
    this.state = {editorState: descriptionToEditorState(this.props.description)}
    this.onChange = editorState => this._onChange(editorState)
    this.focus = () => this.refs.editor.focus()
  }

  _onChange(editorState) {
    this.setState({editorState})
    this.props.onChange(this.props.id, Map(convertToRaw(editorState.getCurrentContent())))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({editorState: descriptionToEditorState(nextProps.description)})
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
    React.PropTypes.instanceOf(Map)
  ]),
  onChange: React.PropTypes.func.isRequired
}
