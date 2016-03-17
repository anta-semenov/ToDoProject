import { fromJS} from 'immutable'

export default function project(state = fromJS([]), action) {
  switch (action.type) {
    default:
      return state
  }
}
