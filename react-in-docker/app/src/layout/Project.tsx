import React, { FunctionComponent } from 'react'
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home'

const Project: FunctionComponent = () => {
    return (
        <React.Fragment>
            <Switch>
                <Route
                    exact path="/"
                    render={() => <Home />}
                />
            </Switch>
        </React.Fragment>
    )
}

export default Project
