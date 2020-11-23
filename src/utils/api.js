const APP_KEY = process.env.REACT_APP_APP_KEY

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
