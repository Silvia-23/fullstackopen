import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'
import Filter from './Filter'

const Anecdote = ({anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anec = useSelector(({ notification, filter, anecdotes }) => {
    console.log('anecdotes', anecdotes)
    return filter === undefined 
      ? anecdotes
      : anecdotes.filter(a => a.content.includes(filter))
  })

  const handleVoteAnecdote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`You voted ${anecdote.content}`, 5000))
  }

  return (
    <div>
       <h2>Anecdotes</h2>
       <Filter />
        {anec.sort((a1, a2) => a2.votes - a1.votes)
          .map(anecdote =>
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
              handleClick={() => handleVoteAnecdote(anecdote)}
            />
      )}
    </div>
  )
}

export default AnecdoteList