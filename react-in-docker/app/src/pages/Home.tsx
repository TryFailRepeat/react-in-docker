// @flow
import React, { FunctionComponent } from 'react'
import { Dispatch } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/reducer/index'
import { requestNotifications, Notification } from '../redux/actions/notifications'
import Page from '../layout/Page'
import Richtext from '../elements/Richtext'
import Icon from '../elements/Icon'

const Home: FunctionComponent = () => {
  const dispatch: Dispatch<any> = useDispatch()

  // state
  const notifications = useSelector((state: RootState) => state.notifications)

  if (!notifications.fetching && !notifications.fetched && !notifications.error) {
    dispatch(requestNotifications())
  }

  // error state
  if (notifications.error) {
    return (<div class="error"><p>error loading notifications</p></div>)
  }

  // loading state
  if (!notifications.fetched) {
    return (<div class="loading"><p>loading notifications...</p></div>)
  }

  const { data } = notifications

  return (
    <Page title={'home'} >
      <Richtext content={'# Hello World!'} />
      <div style={{ textAlign: 'center' }}>
        <Icon className="o-icon" symbol="heart" />
        <Icon className="o-icon" symbol="heart" />
        <Icon className="o-icon" symbol="heart" />
      </div>
      <ul>
      { data.map((notification: Notification, index: number) => {
        const { message } = notification
        return <li key={index}>{ message }</li>
      }) }
      </ul>
    </Page>
  )
}

export default Home
