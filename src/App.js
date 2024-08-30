import React from 'react';
import './style.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Shop from './Shop';
import Possession from './Possession';
import Mine from './Mine';
import Cut from './Cut';
import Grade from './Grade';
import Verify from './Verify';
import Authority from './Authority';

const App = () => {
  return(
    <Router>
          <Switch>
            <Route path="/" exact component={Shop} />
            <Route path="/possession" component={Possession} />
            <Route path="/mine" component={Mine} />
            <Route path="/cut" component={Cut} />
            <Route path="/grade" component={Grade} />
            <Route path="/verify" component={Verify} />
            <Route path="/authority" component={Authority} />
          </Switch>
      </Router>
  );
};

export default App;