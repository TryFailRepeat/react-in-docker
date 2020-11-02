import { Dispatch, Action } from 'redux'
import { Error } from '../types'

/*
  catFact {
    // https://alexwohlbruck.github.io/cat-facts/docs/models/fact.html
  }
*/

export interface Notification {
  id: string,
  message: string
}

const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const getNotification = (json: any): Notification => {
  const all: Array<any> = json['all'] || []
  const random = getRandomInt(0, all.length)
  const entry = all[random]

  return {
    id: entry && entry._id || '',
    message: entry && entry.text || ''
  }
}

export const ERROR_NOTIFICATIONS = 'ERROR_NOTIFICATIONS'
export interface ErrorNotificationAction extends Action {
  type: typeof ERROR_NOTIFICATIONS,
  error: Error,
  receivedAt: number
}
function errorNotifications(error: Error): ErrorNotificationAction {
    return {
        type: ERROR_NOTIFICATIONS,
        error: error,
        receivedAt: Date.now()
    };
}

export const RECEIVE_NOTIFICATIONS = 'RECEIVE_NOTIFICATIONS'
export interface ReceiveNotificationAction extends Action {
  type: typeof RECEIVE_NOTIFICATIONS,
  receivedAt: number,
  payload: Array<Notification>
}
function receiveNotifications(notifications: Array<Notification>): ReceiveNotificationAction {
  return {
      type: RECEIVE_NOTIFICATIONS,
      receivedAt: Date.now(),
      payload: notifications,
  }
}

export const REQUEST_NOTIFICATIONS = 'REQUEST_NOTIFICATIONS'
export interface RequestNotificationAction extends Action {
  type: typeof REQUEST_NOTIFICATIONS
}
export const requestNotifications = () => async (dispatch: Dispatch<NotificationActionTypes>) => {
  dispatch({
      type: REQUEST_NOTIFICATIONS
  })

  /*
  enable for caching
  const cachedNotifications = localStorage.getItem('notifications')
  if (cachedNotifications) {
    return dispatch(receiveNotifications(JSON.parse(cachedNotifications)))
  }
  */

  try {
    const url = 'https://cat-fact.herokuapp.com/facts'
    const result = await fetch(url)

    if (result.status === 200) {
      const json = await result.json()
      const notifications = [getNotification(json)]

      localStorage.setItem('notifications', JSON.stringify(notifications))

      return dispatch(receiveNotifications(notifications))
    } else {
      dispatch(errorNotifications({
          status: result.status,
          message: result.statusText
      }))
    }
  } catch (e) {
    return dispatch(errorNotifications(e))
  }
}

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
export interface AddNotificationAction extends Action {
  type: typeof ADD_NOTIFICATION,
  payload: Notification
}
export const addNotification = () => async (dispatch: Dispatch<NotificationActionTypes>) => {
  dispatch({
    type: REQUEST_NOTIFICATIONS
  })

  try {
    const url = 'https://cat-fact.herokuapp.com/facts/5a4d75a38827521790281b99'
    const result = await fetch(url)

    if (result.status === 200) {
      const json = await result.json()
      const notification: Notification = getNotification(json)

      const notifications: Array<Notification> = JSON.parse(localStorage.getItem('notifications') || '') || []
      notifications.push(notification)
      localStorage.setItem('notifications', JSON.stringify(notifications))

      return dispatch({
        type: ADD_NOTIFICATION,
        payload: notification
      })
    } else {
      dispatch(errorNotifications({
          status: result.status,
          message: result.statusText
      }))
    }
  } catch (e) {
    return dispatch(errorNotifications(e))
  }
}

export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION'
export interface DeleteNotificationAction extends Action {
  type: typeof DELETE_NOTIFICATION,
  payload: string
}
export const deleteNotification = (id: string) => async (dispatch: Dispatch<NotificationActionTypes>) => {
  try {
    const notifications: Array<Notification> = JSON.parse(localStorage.getItem('notifications') || '') || []

    if (notifications) {
      notifications.filter((notification: Notification) => notification.id != id)
      localStorage.setItem('notifications', JSON.stringify(notifications))

      return dispatch({
        type: DELETE_NOTIFICATION,
        payload: id
      })
    } else {
      dispatch(errorNotifications({
          status: 404,
          message: 'resource not found'
        }))
    }

  } catch (e) {
    return dispatch(errorNotifications(e))
  }
}

export const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS'
export interface ClearNotificationAction extends Action {
  type: typeof CLEAR_NOTIFICATIONS
}
export const clearNotifications = () => async (dispatch: Dispatch<NotificationActionTypes>) => {
  try {
    localStorage.setItem('notification', JSON.stringify([]))

    return dispatch({
        type: CLEAR_NOTIFICATIONS
      })

  } catch (e) {
    return dispatch(errorNotifications(e))
  }
}

export type NotificationActionTypes = ErrorNotificationAction
  | ReceiveNotificationAction
  | RequestNotificationAction
  | AddNotificationAction
  | DeleteNotificationAction
  | ClearNotificationAction

