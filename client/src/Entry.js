import React, {Component} from 'react';
import axios from 'axios';
import Response from './Response';
import {Row, Input, Button} from 'react-materialize';


class Entry extends Component {

	constructor(props) {
		super(props)
		this.state = {
			eventName: '',
			organizer: '',

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
			<div className='entry create-event full-width'>
				<h4>Create an Event</h4>
				<Row>
					<Input s={9} label="Event Name" onChange={ (e) => this.onSubmit(e)} />
					<Input s={9} label="Event Organizer Name(s)" onChange={ (e) => this.onSubmit(e)} />
				</Row>
				<Row>
					<Input s={9} label='Event Date' name='on' type='date' onChange={function(e, value) {}} />
				</Row>
			</div>
		)
	}
}

export default Entry;
