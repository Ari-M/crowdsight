import React, {Component} from 'react';
import axios from 'axios';
import {Row, Input, Button} from 'react-materialize';


class Entry extends Component {

	constructor(props) {
		super(props)
		this.state = {
			name: '',
			organizer: '',
			date: '',
			location: ''
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

	handleName(e) {
		var text = e.target.value
		this.setState({
			name: text
		})
    }

    handleOrganizer(e) {
    	var text = e.target.value
    	this.setState({
    		organizer: text
    	})
    }

    handleDate(e) {
    	var date = e.target.value
    	this.setState({
    		date: date
    	})
    }

    handleLocation(e) {
    	var text = e.target.value
    	this.setState({
    		location: text
    	})
    	console.log(this.state)
    }



	render(){
		return(
			<div className='entry-container full-width'>
			<Button onClick={(e) => this.test(e)}>Test</Button>
				<h4>Create an Event</h4>
				<p className='container'>Creating an event is easy, simply fill out the following forms and click save, you can edit the contact/SMS aspect of this event later</p>
				<form id='create-event'>
					<Row>
						<Input s={9} label="Event Name" onChange={ (e) => this.handleName(e)} />
						<Input s={9} label="Event Organizer" onChange={ (e) => this.handleOrganizer(e)} />
						<Input s={9} label='Event Date' name='on' type='date' onChange={ (e) => this.handleDate(e)} />
						<Input s={9} label="Event Location" onChange={ (e) => this.handleLocation(e)} />
						<Button className="left button" onClick={ (e) => this.onClick(e) }>Create Event</Button>
					</Row>
				</form>
			</div>
		)
	}
}

export default Entry;
