const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'REMOVE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = (notification, displayTime) => {
  return async dispatch => {
    await dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    })
   setTimeout(() => dispatch(removeNotification()), displayTime)  
  }
  
}

export const removeNotification = notification => {
  return {
    type: 'REMOVE_NOTIFICATION',
    notification,
  }
}

export default notificationReducer