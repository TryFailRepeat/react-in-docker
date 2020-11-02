import { combineReducers }  from 'redux'

import ReducerNotifications  from './reducer-notifications'

const reducers = combineReducers({
    notifications: ReducerNotifications
})

export type RootState = ReturnType<typeof reducers>

export default reducers
