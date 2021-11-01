import axios from 'axios'
import anecdoteReducer from '../reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log(response)
  return response.data
}

const createNew = async (data) => {
  const response = await axios.post(baseUrl, data)
  return response.data
}

const updateAnecdote = async (newAnecdote) => {
  const response = await axios.put(`${baseUrl}/${newAnecdote.id}`, newAnecdote)
  return response.data
}

export default { getAll, createNew, updateAnecdote }