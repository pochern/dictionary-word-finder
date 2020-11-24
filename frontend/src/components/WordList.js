/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2)
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  }
}))

WordList.propTypes = {
  definitions: PropTypes.array,
  onFavorite: PropTypes.func,
  onRemove: PropTypes.func,
  word: PropTypes.string
}

function WordList ({ word, definitions, onFavorite, onRemove }) {
  const classes = useStyles()
  if (definitions.length === 0) {
    return <p>No results.</p>
  }

  return (
    <Grid container spacing={3}>
      {definitions.map((item, index) => (
        <Grid key={index} item xs={6} sm={3}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              {(item.image_url || item.definition.image_url) &&
                <Grid item>
                  <img className={classes.img} alt="complex" src={item.image_url || item.definition.image_url} />
                </Grid>
              }
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="h6">
                      {word || item.word}
                    </Typography>
                    <Typography variant="subtitle1">
                      <em>{item.word_type || item.definition.type}</em>
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {typeof item.definition === 'string' ? item.definition : item.definition.definition}
                    </Typography>
                    {(item.example || item.definition.example) &&
                      <Typography variant="body2" color="textSecondary">
                        "{item.example || item.definition.example}"
                      </Typography>
                    }
                  </Grid>
                  <Grid item>
                    {onFavorite &&
                      <Button color='primary' onClick={() => onFavorite(item)}>
                        Add to favorites
                      </Button>
                    }
                    {onRemove &&
                      <Button color='primary' onClick={() => onRemove(item.id)}>
                        Remove from favorites
                      </Button>
                    }
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}

export default WordList
