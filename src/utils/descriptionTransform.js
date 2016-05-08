import { EditorState, ContentState, convertFromRaw } from 'draft-js'
import { Map } from 'immutable'

const descriptionToContentState = description => {
  if (description) {
    if (typeof description === 'string') {return ContentState.createFromText(description)}
    else if (description instanceof Map) {
      const content = convertFromRaw(Object.assign({}, {entityMap: {}}, description.toJS()))
      if (content instanceof Array) {
        return ContentState.createFromBlockArray(content)
      } else {
        return content
      }
    }
    return new ContentState()
  }
  return new ContentState()
}

export const descriptionToEditorState = description => description ? EditorState.createWithContent(descriptionToContentState(description)) : EditorState.createEmpty()

export const descriptionToString = description => description ? descriptionToContentState(description).getPlainText() : undefined
