import React from 'react'
import { Editor, EditorState, ContentState } from 'draft-js'
import './Textfield.less'

const textIntoContent = (text = '') => EditorState.createWithContent(ContentState.createFromText(text))

export default class Textfield extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: textIntoContent(this.props.initialText),
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
      if (this.props.onBlur) {this.props.onBlur(editorState.getCurrentContent().getPlainText())}
      if (this.props.onChange) { this.props.onChange(editorState.getCurrentContent().getPlainText())}
      this.refs.frame.classList.remove('is-active')
    } else {
      if (this.state.stackLenght.undo !== editorState.getUndoStack().count() || this.state.stackLenght.redo !== editorState.getRedoStack().count()) {
        if (this.props.onChange) { this.props.onChange(editorState.getCurrentContent().getPlainText())}
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
    if (!this.state.editorState.getSelection().getHasFocus() && this.state.editorState.getCurrentContent() !== textIntoContent(nextProps.initialText)) {
      this.setState({
        editorState: textIntoContent(nextProps.initialText),
        stackLenght: {
          undo: 0,
          redo: 0
        }
      })
    }
  }
  render() {
    return (
      <div className={`textfield textfield--${this.props.appearance}`} ref='frame'>
        <Editor ref='editor' editorState={this.state.editorState} onChange={this.onChange} placeholder={this.props.placeholder} blockStyleFn={() => 'textfield__block'} />
      </div>
    )
  }
}

Textfield.propTypes = {
  appearance: React.PropTypes.oneOf(['task-title', 'section-header', 'default']).isRequired,
  initialText: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onBlur: React.PropTypes.func
}

Textfield.defaultProps = {
  appearance: 'default'
}
