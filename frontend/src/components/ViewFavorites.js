/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromFavorites } from '../actions'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import WordList from './WordList'

function ViewFavorites () {
  const definitions = useSelector(state => state.definitions)
  const [filteredDefinitions, setFilteredDefinitions] = useState(definitions)
  const [type, setType] = useState('')
  const dispatch = useDispatch()

  // Applies filter after definition is removed
  useEffect(() => {
    applyFilter()
  }, [definitions])

  // Applies filter after type is selected
  useEffect(() => {
    applyFilter()
  }, [type])

  const applyFilter = () => {
    if (type !== '') {
      setFilteredDefinitions(definitions.filter((elem) => type === elem.word_type))
    } else {
      setFilteredDefinitions(definitions)
    }
  }

  const handleChange = (e) => {
    setType(e.target.value)
  }

  const types = ['noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'interjection', 'numeral', 'article', 'determiner']

  return (
    <div>
      <div>
        <FormControl variant="outlined" style={{ minWidth: '5em', marginBottom: '2em' }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            onChange={handleChange}
            label="Type"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {types.map((elem, index) => (
              <MenuItem key={index} value={elem}>{elem}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant='h6' style={{ marginBottom: '2em' }}>
          View Favorites
        </Typography>
        <WordList
          definitions={filteredDefinitions}
          onRemove={(definition, word) => {
            dispatch(removeFromFavorites({ definition, word }))
          }}
        />
      </div>
    </div>
  )
}

export default ViewFavorites
