import React from 'react'

const Notification = ({ message, isError }) => {
  const notificationStyle = {
    color: isError ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 15,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 20,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  console.log('rendering notification')
  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification