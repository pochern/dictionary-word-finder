import { put, takeLatest, all } from 'redux-saga/effects'
import { sentenceCase } from '../utils/helpers'

const url = '/data.json'

function * fetchFavorites () {
  try {
    const data = yield fetch('/data.json')
      .then(response => response.json())
    yield put({ type: 'FAVORITES_RECEIVED', data: data.definitions })
  } catch (e) {
    console.log(e)
  }
}

function * deleteFavorite (action) {
  const { id } = action

  const params = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id })
  }

  try {
    yield fetch(url, params)
      .then(data => data.json())
  } catch (e) {
    console.log(e)
  }
}

function * postFavorite (action) {
  const { definition, word } = action

  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      definition: definition.definition, example: sentenceCase(definition.example) || '', image_url: definition.image_url || '', word: word, word_type: definition.type
    })
  }

  try {
    yield fetch(url, params)
      .then(data => data.json())
    yield put({ type: 'GET_FAVORITES' })
  } catch (e) {
    console.log(e)
  }
}

/*
 *   Alternatively you may use takeLatest.
 *     Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
 *       dispatched while a fetch is already pending, that pending fetch is cancelled
 *         and only the latest one will be run.
 *         */
export default function * rootSaga () {
  yield all([
    getSaga(),
    deleteSaga(),
    postSaga()
  ])
}

export function * getSaga () {
  yield takeLatest('GET_FAVORITES', fetchFavorites)
}

export function * deleteSaga () {
  yield takeLatest('REMOVE_DEFINITION', deleteFavorite)
}

export function * postSaga () {
  yield takeLatest('ADD_DEFINITION', postFavorite)
}
