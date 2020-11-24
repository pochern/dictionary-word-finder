import produce from 'immer'
import {
  ADD_DEFINITION,
  FAVORITES_RECEIVED,
  REMOVE_DEFINITION
} from '../constants'

const initialState = { definitions: [] }

function favorites (state = initialState, action) {
  const { data, definition, id, word } = action

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
    case REMOVE_DEFINITION:
      return {
        ...state,
        definitions: state.definitions.filter((elem) => elem.id !== id)
      }
    case FAVORITES_RECEIVED:
      return {
        ...state,
        definitions: data
      }
    default:
      return state
  }
}

export default favorites
