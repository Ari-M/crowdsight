import React, {Component} from 'react';
import TwitterProfile from './TwitterProfile';
import History from './History';
import Profile from './Profile';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class User extends Component {
    render(){
        return(
            <Router>
              <div className="row user">
                  <div className="col s12 m6">
                    <div className="card">
                      <div className="card-content white-text">
                        <span className="card-title">Your Profile</span>
                        <p>Welcome to your Watson profile!</p>
                      </div>
                      <div className="card-action">
                        <Link to ='/history'>History</Link>
                        <Link to ='/twitterprofile'>Twitter</Link>
                        <Link to ='/profile'>Upload new text</Link>
                      </div>
                    </div>
                    </div>
                  <Route path = '/history' component = { History }/>
                  <Route path = '/twitterprofile' component = { TwitterProfile } />
            </div>
          </Router>
        )
    }
}

export default User;
