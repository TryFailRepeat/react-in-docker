import React                        from 'react'
import ReactDOM                     from 'react-dom'
import { Provider }                 from 'react-redux'
import { BrowserRouter as Router }  from 'react-router-dom'

import store                        from './redux/store'
import Project                      from './layout/Project'

const app = document.getElementById('app')
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Project />
        </Router>
    </Provider>,
    app)
