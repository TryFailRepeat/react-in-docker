import { AsyncRequest } from '../types'
import {
  Notification, NotificationActionTypes,
  REQUEST_NOTIFICATIONS, RECEIVE_NOTIFICATIONS, ERROR_NOTIFICATIONS,
  ADD_NOTIFICATION, DELETE_NOTIFICATION, CLEAR_NOTIFICATIONS } from '../actions/notifications';

export interface NotificationsState extends AsyncRequest {
  data: Array<Notification>
}

const INITIAL_STATE: NotificationsState = {
  data: [],
  fetching: false,
  fetched: false,
  error: null
}

export default function (state = INITIAL_STATE, action: NotificationActionTypes): NotificationsState {

  switch (action.type) {
    case REQUEST_NOTIFICATIONS:
      return {
        ...state,
        fetching: true
      }
    case RECEIVE_NOTIFICATIONS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        data: action.payload,
      }
    case ERROR_NOTIFICATIONS:
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    case ADD_NOTIFICATION:
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: false,
        data: [...state.data, action.payload]
      }
    case DELETE_NOTIFICATION:
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: false,
        data: state.data.filter((notification: Notification) => notification.id !== action.payload)
      }
    case CLEAR_NOTIFICATIONS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: false,
        data: []
      }
    default:
      return state
  }
}
