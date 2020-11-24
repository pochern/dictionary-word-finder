const API_KEY = process.env.REACT_APP_API_KEY

// owlbot API
export function fetchDefinitions (word = '') {
  word = word.trim()

  const url = `https://owlbot.info/api/v4/dictionary/${word}`

  const params = {
    method: 'GET',
    headers: {
      Authorization: 'Token ' + API_KEY
    }
  }

  return fetch(url, params)
    .then((response) => response.json())
}
