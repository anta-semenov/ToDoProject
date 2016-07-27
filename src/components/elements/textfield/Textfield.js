import React from 'react'
import { Editor, EditorState, ContentState } from 'draft-js'
import classNames from 'classnames'
import './Textfield.less'

const textIntoState = (text = '') => EditorState.createWithContent(ContentState.createFromText(text))

export default class Textfield extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: textIntoState(this.props.text),
      stackLenght: {
        undo: 0,
        redo: 0
      }
    }
    this.onChange = editorState => this._onChange(editorState)
    this.focus = () => this.editor.focus()
  }
  _onChange(editorState) {
    this.setState({editorState})
    if (!editorState.getSelection().getHasFocus()) {
      if (this.props.onBlur) {
        this.props.onBlur(editorState.getCurrentContent().getPlainText())
      }
      if (this.props.onChange) {
        this.props.onChange(editorState.getCurrentContent().getPlainText())
      }
      this.frame.classList.remove('is-active')
    } else {
      if (this.state.stackLenght.undo !== editorState.getUndoStack().count() || this.state.stackLenght.redo !== editorState.getRedoStack().count()) {
        if (this.props.onChange) {
          this.props.onChange(editorState.getCurrentContent().getPlainText())
        }
        this.setState({
          stackLenght: {
            undo: editorState.getUndoStack().count(),
            redo: editorState.getRedoStack().count()
          }
        })
      }
      if (editorState.getCurrentContent().getPlainText() === '') {
        this.frame.classList.add('is-empty')
      } else if (editorState.getCurrentContent().getPlainText() !== '') {
        this.frame.classList.remove('is-empty')
      }
      if (!this.frame.classList.contains('is-active')) {
        this.frame.classList.add('is-active')
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.editorState.getSelection().getHasFocus() && this.state.editorState.getCurrentContent().getPlainText() !== nextProps.text) {
      this.setState({
        editorState: textIntoState(nextProps.text),
        stackLenght: {
          undo: 0,
          redo: 0
        }
      })
    }
  }
  render() {
    const textfieldClasses = classNames({
      'textfield': true,
      [`textfield--${this.props.appearance}`]: true
    })
    return (
      <div className={textfieldClasses} ref={(c) => this.frame = c}>
        <Editor ref={(c) => this.editor = c} editorState={this.state.editorState} onChange={this.onChange} placeholder={this.props.placeholder} blockStyleFn={() => 'textfield__block'} />
      </div>
    )
  }
}

Textfield.propTypes = {
  appearance: React.PropTypes.oneOf(['task-title', 'section-header', 'default']).isRequired,
  text: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onBlur: React.PropTypes.func
}

Textfield.defaultProps = {
  appearance: 'default'
}
