import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

const JobSearch = React.lazy(() => import('./components/JobSearch'));
const JobView = React.lazy(() => import('./components/JobView'));

function App(props) {
  return (
    <BrowserRouter>
      <React.Suspense fallback={'Loading...'}>
        <Switch>
          <Route
            exact
            path='/'
            name='Job Search App'
            render={(props) => <JobSearch {...props} />}
          />
          <Route
            exact
            path='/view/:id'
            name='Job Search View App'
            render={(props) => <JobView {...props} />}
          />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
