import React, {Component} from 'react';
import Entry from './Entry';
import History from './History';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import {Row, Col} from 'react-materialize';


class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            token: localStorage.getItem('mernToken'),
            user: this.props.user
        }
    }

    render(){
        return(
                <Row>
                        <Router>

                            <div>
                            <Col s={12} m={6} l={4}>
                                <div className="card sticky">
                                    <div className="card-content white-text">
                                        <span className="card-title">Dashboard</span>
                                        <h5>Hello, {this.state.user.name}</h5>
                                    </div>
                                    <div className="card-action">
                                      <ul>
                                        <li><Link className="navList center white-text" to ='/'>Create a new event</Link></li>
                                        <li><Link className="navList center white-text" to ='/history'>Your Events</Link></li>
                                      </ul>
                                    </div>
                                </div>
                             </Col>
                             <Col s={12} m={6} l={8}>
                                <Route exact path='/' render={(props) => (
                                    <Entry {...props} user={this.state.user} />
                                )} />
                                <Route path = '/history' render={(props) => (
                                    <History {...props} user={this.state.user} />
                                )} />
                            </Col>
                            </div>
                        </Router>
            <Col s={8}>
                <div>
                </div>
            </Col>
            </Row>
        )
    }
}

export default Profile;
