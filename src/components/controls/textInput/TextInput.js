import React from 'react'
import { Editor, EditorState } from 'draft-js'
import { TASK_TITLE_FIELD, TASK_DESCRIPTION_FIELD } from '../../../constants/controlTypes'

export default class TextInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {editorState: this.props.content ? EditorState.createWithContent(this.props.content) : EditorState.createEmpty()}
    this.onChange = editorState => this._onChange(editorState)
  }
  _onChange(editorState) {
    this.setState({editorState})
    this.props.onChange(editorState)
  }
  _classNameFn(type) {
    switch (type) {
      case TASK_TITLE_FIELD:
        return 'text-input text-input--title'
      case TASK_DESCRIPTION_FIELD:
        return 'text-input text-input--description'
    }
  }
  /*componentWillReceiveProps(nextProps) {
    this.setState({editorState: EditorState.createWithContent(nextProps.content)})
  }*/
  render() {
    return (
      <div className={this._classNameFn}>
        <Editor editorState={this.state.editorState} onChange={this.onChange} />
      </div>
    )
  }
}
TextInput.componentWillReceiveProps()

TextInput.propTypes = {
  type: React.PropTypes.string.isRequired,
  content: React.PropTypes.object,
  onChange: React.PropTypes.func.isRequired
}
