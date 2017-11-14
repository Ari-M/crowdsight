import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom';
import {Button, Input} from 'react-materialize';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      redirect: false
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value})
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/auth/login', {
      email: this.state.email,
      password: this.state.password
    }).then(result => {
      localStorage.setItem('mernToken', result.data.token)
      console.log(result.data.token)
      console.log(result.data.user)
      this.props.lift(result.data)
      this.setState({redirect: true})
    })
  }

  render() {
    const {redirect} = this.state;
    if(redirect){
      return <Redirect to ='/profile'/>
    };
    return (
      // <div id='modal1' className='modal'>
      //   <div className="modal-content">
        <div>
          <form className="loginField" onSubmit={this.handleSubmit}>
            <Input label="Email" type='text' value={this.state.email} onChange={this.handleEmailChange} />
            <Input label="Password" type='password' value={this.state.password} onChange={this.handlePasswordChange} />
            <Button type="submit" className="valign-wrapper submitButton"onSubmit={this.handleSubmit}><i class="material-icons right-align">security</i> Log in</Button>
          </form>
          {/* <img src="img/watson-image.png" alt="Watson" className="responsive-img" height="100" width="100" /> */}
        </div>

    );
  }
}

export default Login;
