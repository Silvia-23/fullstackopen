import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : action.data)
      case 'NEW_ANECDOTE':
        return [...state, action.data]
      case 'INIT_ANECDOTES':
        return action.data
    default:
      return state
  }
}

export const voteAnecdote = (data) => {
  return async dispatch => {
    const modifiedAnecdote = await anecdoteService.updateAnecdote({
      content: data.content,
      id: data.id,
      votes: data.votes + 1
    })
    dispatch({
      type: 'VOTE',
      data: modifiedAnecdote
    })
  }
}

export const createAnecdote = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(
      {
        content: data,
        votes: 0
      }
    )
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    }) 
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(
      {
        type: 'INIT_ANECDOTES',
        data: anecdotes
      }
    )
  }
}

export default anecdoteReducer