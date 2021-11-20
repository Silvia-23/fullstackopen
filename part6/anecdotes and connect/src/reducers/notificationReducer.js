const notificationReducer = (state = {notification: '', timeoutId: ''}, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        notification: action.notification,
        timeoutId: state.timeoutId
      }
    case 'REMOVE_NOTIFICATION':
      return {
        notification: '',
        timeoutId: state.timeoutId
      }
    case 'SET_TIMEOUT':
        return {
          notification: state.notification,
          timeoutId: action.timeoutId
        }
    default:
      return state
  }
}

export const setNotification = (notification, oldTimeoutId, displayTime) => {
  return async dispatch => {
    await dispatch({
      type: 'SET_NOTIFICATION',
      notification: notification,
    })
    clearTimeout(oldTimeoutId)
   let timeoutId = setTimeout(() => dispatch(removeNotification()), displayTime)  
    await dispatch({
      type: 'SET_TIMEOUT',
      timeoutId: timeoutId
    })
  }
  
}

export const removeNotification = notification => {
  return {
    type: 'REMOVE_NOTIFICATION',
    notification: notification,
  }
}

export default notificationReducer