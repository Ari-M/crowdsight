import React, {Component} from 'react';
import axios from 'axios';
import Response from './Response';
import {Row, Input, Button} from 'react-materialize';


class Entry extends Component {

	constructor(props) {
		super(props)
		this.state = {

		}
	}

	test(e) {
		e.preventDefault();
		axios.get('/groups/test')
		.then(function(response) {
			console.log(response);
			console.log("This works")
		})
		.catch(function(error) {
			console.log(error);
		})
	}

	render(){
		return(
			<div className='entry'>
				<Button className="left button" onClick={ (e) => this.test(e) }>Test</Button>
			</div>
		)
	}
}

export default Entry;
