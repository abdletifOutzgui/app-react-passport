import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Posts from './Posts/Posts';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import Home from './Home';


const App = () => {


  return (
      <Router>
          
        <div className="App">
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/sign-in'exact component={SignIn} />
                <Route path='/sign-up' component={SignUp} />
                <Route path='/posts' component={Posts} />
            </Switch>
        </div>

      </Router>
  );
}

export default App;
