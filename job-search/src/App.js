import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

const JobSearch = React.lazy(() => import('./components/JobSearch'));

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
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
