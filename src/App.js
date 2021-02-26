import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Posts from './Posts/Posts';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import Home from './Home';
import ShowPost from './Posts/ShowPost';
import PageNotFound from './Pages/PageNotFound';
import EditPost from './Posts/EditPost';
import NewPost from './Posts/NewPost';
import { GlobalProvider } from './Context/GlobalContext';

const App = () => {
  return (
    <GlobalProvider>
        <Router>  
          <div className="App">
              <Switch>
                  <Route path='/' exact component={Home} />
                  <Route path='/sign-in'exact component={SignIn} />
                  <Route path='/sign-up' component={SignUp} />
                  <Route path='/posts' exact component={Posts} />
                  <Route path='/new/post' exact component={NewPost} />
                  <Route path='/posts/:id' exact component={ShowPost} />
                  <Route path='/posts/:id/edit' exact component={EditPost} />
                  <Route component={PageNotFound} />
              </Switch>
          </div>
        </Router>
    </GlobalProvider>
  );
}

export default App;
