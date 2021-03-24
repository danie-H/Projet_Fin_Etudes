import { Switch, Route, BrowserRouter as Router,} from 'react-router-dom';
import User from '../User';
import React from 'react';

import Agenda from '../Planning/index';
import Parameter from '../Parameter';
//import Agenda from '../Planning/Agenda';



function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/agenda" component={Agenda} />
        <Route exact path="/parameter" component={Parameter} />
        <Route exact path="/" component={User} />
      </Switch>
    </Router>
  );
}

export default App;
