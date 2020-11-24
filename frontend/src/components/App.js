import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchFavorites } from '../utils/api'
import { getFavorites } from '../actions'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import SearchDictionary from './SearchDictionary'
import ViewFavorites from './ViewFavorites'
import '../App.css'

function App () {
  const [active, setActive] = useState('Search Dictionary')
  const buttons = ['Search Dictionary', 'View Favorites']
  const dispatch = useDispatch()

  useEffect(() => {
    fetchFavorites()
      .then(data => {
        data.definitions && dispatch(getFavorites(data.definitions))
      })
  }, [])

  const setButtonActive = (name) => {
    setActive(name)
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <ButtonGroup color='primary' aria-label='outlined primary button group'>
          {buttons.map((name, index) => (
            <Button
              key={name}
              className={active === name ? 'active' : ''}
              onClick={() => setButtonActive(name)}
            >
              {name}
            </Button>
          ))}
        </ButtonGroup>
      </header>
      <main>
        {active === 'Search Dictionary'
          ? <SearchDictionary />
          : <ViewFavorites />
        }
      </main>
    </div>
  )
}

export default App
