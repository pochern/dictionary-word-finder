export const ADD_DEFINITION = 'ADD_DEFINITION'
export const REMOVE_DEFINITION = 'REMOVE_DEFINITION'
export const GET_FAVORITES = 'GET_FAVORITES'

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
