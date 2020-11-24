import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import SearchDictionary from './SearchDictionary'
import ViewFavorites from './ViewFavorites'
import '../App.css'

function App () {
  const [active, setActive] = useState('Search Dictionary')
  const buttons = ['Search Dictionary', 'View Favorites']

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
