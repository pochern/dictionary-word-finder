import produce from 'immer'
import {
  ADD_DEFINITION,
  REMOVE_FROM_FAVORITES,
  GET_FAVORITES
} from '../actions'

const initialState = { definitions: [] }

function favorites (state = initialState, action) {
  const { data, definition, word } = action

  switch (action.type) {
    case ADD_DEFINITION:
      return produce(state, draft => {
        draft.definitions.push({
          definition: definition.definition,
          example: definition.example || '',
          image_url: definition.image_url || '',
          word: word,
          word_type: definition.type
        })
      })
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        definitions: state.definitions.filter((elem) => elem.definition.definition !== definition.definition)
      }
    case GET_FAVORITES:
      return {
        ...state,
        definitions: data
      }
    default:
      return state
  }
}

export default favorites
