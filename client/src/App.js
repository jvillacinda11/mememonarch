import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Search from './pages/Search'
import Formupload from './components/Formupload'

import AppBar from './components/AppBar'

function App() {
  return (
   <>
   {/* <h1>App Page</h1> */}
      <Router>
        <div>
          <AppBar/>
          {/* <div>
            <Link to='/'>home</Link>
            <Link to='/login'>login</Link>
            <Link to='/profile'>profile</Link>
          </div> */}
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/Login'>
              <Login />
            </Route>
            <Route path='/profile'>
              <Profile />
            </Route>
            <Route path ='/search'>
              <Search />
            </Route>
          
          <Route path='/Formupload'>
            <Formupload />
          </Route>
          </Switch>
        </div>
      </Router>
   </>
  );
}

export default App;
