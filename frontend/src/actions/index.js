import {
  ADD_DEFINITION,
  REMOVE_DEFINITION,
  GET_FAVORITES
} from '../constants'

export function getFavorites () {
  return {
    type: GET_FAVORITES
  }
}

export function addDefinition ({ definition, word }) {
  return {
    type: ADD_DEFINITION,
    definition,
    word
  }
}

export function removeDefinition ({ id }) {
  return {
    type: REMOVE_DEFINITION,
    id
  }
}
