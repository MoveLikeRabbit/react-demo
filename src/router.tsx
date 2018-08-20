import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ErrorBoundary from './lib/ErrorBoundary';


import Entries from './pages/Entries';
import Assembling from './pages/Assembling';
import TaskList from './pages/rehandling/TaskList';
import Change from './pages/rehandling/Change';
import Check from './pages/rehandling/Check';
import TaskLink from './pages/rehandling/TaskLink';
import CheckSteps from './pages/qualityCheck/CheckSteps';
import MultimediaCheck from './pages/qualityCheck/MultimediaCheck';
import CheckResult from './pages/qualityCheck/CheckResult';
import NoPrivilege from './pages/NoPrivilege';


export const AppRouter: React.SFC<{}> = () => (
    <ErrorBoundary>
        <Switch>
            <Route exact path="/">
                <Redirect to="/entries"/>
            </Route>
            <Route exact path="/entries" component={Entries}/>
            <Route exact path="/noPrivilege" component={NoPrivilege}/>
            <Route exact path="/assembling" component={Assembling}/>
            <Route exact path="/rehandling/tasklist" component={TaskList}/>
            <Route exact path="/rehandling/change/:rackId/:type" component={Change}/>
            <Route exact path="/rehandling/link" component={TaskLink}/>
            <Route exact path="/rehandling/check/:oldRackId/:newUuid" component={Check}/>
            <Route exact path="/qualitycheck/steps" component={CheckSteps}/>
            <Route exact path="/qualitycheck/multimedia/:deviceSN/:checkId" component={MultimediaCheck}/>
            <Route exact path="/qualitycheck/result/:deviceSN/:videoStatus" component={CheckResult}/>
        </Switch>
    </ErrorBoundary>
);