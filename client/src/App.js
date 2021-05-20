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
import Upload from './pages/Upload'
import OtherUserProfile from './pages/OtherUserProfile'

import AppBar from './components/AppBar'

function App() {
  return (
   <>

      <Router>
        <div>
          <AppBar/>
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
            <Route path='/Upload'>
              <Upload />
            </Route>
            <Route path= '/OtherUserProfile'>
              <OtherUserProfile />
            </Route>
          </Switch>
        </div>
      </Router>
   </>
  );
}

export default App;
