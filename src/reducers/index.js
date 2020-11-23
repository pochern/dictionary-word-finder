import produce from 'immer'
import {
  ADD_DEFINITION,
  REMOVE_FROM_FAVORITES
} from '../actions'

const initialState = { definitions: [] }

function favorites (state = initialState, action) {
  const { definition, word } = action

  switch (action.type) {
    case ADD_DEFINITION:
      return produce(state, draft => {
        draft.definitions.push({
          definition: definition,
          word: word
        })
      })
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        definitions: [state.definitions.filter((elem) => elem.definition.definition !== definition.definition)]
      }
    default:
      return state
  }
}

export default favorites
