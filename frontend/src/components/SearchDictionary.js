import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fade, makeStyles } from '@material-ui/core/styles'
import { fetchDefinitions, fetchFavorites, postFavorite } from '../utils/api'
import { addDefinition, getFavorites } from '../actions'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import Typography from '@material-ui/core/Typography'
import WordList from './WordList'

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25)
    },
    marginRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'fit-content'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}))

function SearchDictionary () {
  const classes = useStyles()
  const [inputValue, setInputValue] = useState('')
  const [word, setWord] = useState('')
  const [definitions, setDefinitions] = useState([])
  const [loadingResults, setLoadingResults] = useState(false)

  const dispatch = useDispatch()

  const searchWord = () => {
    if (inputValue === '') {
      return
    }

    setLoadingResults(true)

    fetchDefinitions(inputValue)
      .then(data => {
        data.definitions ? setDefinitions(data.definitions) : setDefinitions([])
        data.word ? setWord(data.word.toLowerCase()) : setWord(inputValue)
        setLoadingResults(false)
      })
  }

  const addToFavorites = (definition) => {
    dispatch(addDefinition({ definition, word }))
    // Add to db
    postFavorite(definition, word).then(
      // Refresh state with updated db
      fetchFavorites()
        .then(data => {
          data.definitions && dispatch(getFavorites(data.definitions))
        })
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', marginBottom: '2em' }}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
        </div>
        <Button
          onClick={() => searchWord()}
          variant="contained"
          color="primary"
        >
          Search
        </Button>
      </div>
      <div>
        {loadingResults === true
          ? <CircularProgress />
          : <div>
              <Typography variant='h6' style={{ marginBottom: '2em' }}>
                Search Results
              </Typography>
              {word !== '' && (
                <WordList
                  word={word}
                  definitions={definitions}
                  onFavorite={definition => addToFavorites(definition)}
                />)}
            </div>}
      </div>
    </div>
  )
}

export default SearchDictionary
