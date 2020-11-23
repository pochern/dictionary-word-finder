export const ADD_DEFINITION = 'ADD_DEFINITION'
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES'

export function addDefinition ({ definition, word }) {
  return {
    type: ADD_DEFINITION,
    definition,
    word
  }
}

export function removeFromFavorites ({ definition, word }) {
  return {
    type: REMOVE_FROM_FAVORITES,
    definition,
    word
  }
}
