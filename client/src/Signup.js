import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import {Col} from 'react-materialize';
import {CloudinaryContext, Transformation, Image, Cloudinary} from 'cloudinary-react'
import {
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom';
import {Input, Button} from 'react-materialize'

const CLOUDINARY_UPLOAD_PRESET = 'spe0k8pn';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/drdpp9jiw/upload';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      uploadedFileCloudinaryUrl: '',
      redirect: false
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);
  }


  handleNameChange(e) {
    this.setState({name: e.target.value})
  }
  handleEmailChange(e) {
    this.setState({email: e.target.value})
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/auth/signup', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      profilePic: this.state.uploadedFileCloudinaryUrl
    }).then(result => {
      console.log(result.data)
      localStorage.setItem('mernToken', result.data.token)
      //Justen - I commented this out for it to work
      console.log(this.props)
      console.log(this)
      this.props.lift(result.data)
      this.setState({redirect: true})
    })

  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });
    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);
    upload.end((err, response) => {
      if(err) {
        console.log(err);
      }
      if(response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
        console.log(this.state.uploadedFileCloudinaryUrl);
      }
    });
  }


  render() {
    const {redirect} = this.state;
    if(redirect){
      return <Redirect to ='/'/>
    };
    return (
      <div>
        <form className="inline loginField" onSubmit={this.handleSubmit}>
          <Input label="Name" value={this.state.name} onChange={this.handleNameChange} />
          <Input label="Email" type='text' value={this.state.email} onChange={this.handleEmailChange} />
          <Input label="Password" type='password' value={this.state.password} onChange={this.handlePasswordChange} />
          <Button type="submit" className="valign-wrapper submitButton"onSubmit={this.handleSubmit}><i class="material-icons right-align">security</i> Log in</Button>
        </form>
        <div className="FileUpload inline">
          <Dropzone
            multiple={false}
            accept="image/*"
            onDrop={this.onImageDrop.bind(this)}>
            <p>Drop an image or click to select a file to upload.</p>
          </Dropzone>
        </div>
        <div>
          {this.state.uploadedFileCloudinaryUrl === '' ? null :
          <div>
            <p>{this.state.uploadedFile.name}</p>
            <img src={this.state.uploadedFileCloudinaryUrl} />
          </div>}
        </div>
      </div>
    );
  }
}

export default Signup;
