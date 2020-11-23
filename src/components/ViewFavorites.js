/* eslint-disable no-unused-vars */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import { removeFromFavorites } from '../actions'
import WordList from './WordList'

function ViewFavorites () {
  const definitions = useSelector(state => state.definitions)
  console.log('THESE ARE THEM', definitions)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <Typography variant='h6' style={{ marginBottom: '2em' }}>
          View Favorites
        </Typography>
        <WordList
          definitions={definitions}
          onRemove={(definition, word) => {
            dispatch(removeFromFavorites({ definition, word }))
          }}
        />
      </div>
    </div>
  )
}

export default ViewFavorites
