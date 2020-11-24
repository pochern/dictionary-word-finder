const APP_KEY = process.env.REACT_APP_APP_KEY

// owlbot API
export function fetchDefinitions (word = '') {
  word = word.trim()

  const url = `https://owlbot.info/api/v4/dictionary/${word}`

  const params = {
    method: 'GET',
    headers: {
      Authorization: 'Token ' + APP_KEY
    }
  }

  return fetch(url, params)
    .then((response) => response.json())
}

// local DB
export function fetchFavorites () {
  const url = '/data.json'

  return fetch(url)
    .then(response => response.json())
    .catch(() => console.log('Can’t access ' + url + ' response. Blocked by browser?'))
}
