import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

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

const AnecdoteList = ({}) => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)

  return (
    <div>
       <h2>Anecdotes</h2>
        {anecdotes.sort((a1, a2) => a2.votes - a1.votes)
          .map(anecdote =>
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
              handleClick={() => dispatch(voteAnecdote(anecdote.id))}
            />
      )}
    </div>
  )
}

export default AnecdoteList