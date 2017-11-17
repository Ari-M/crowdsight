import React, {Component} from 'react';
import axios from 'axios';
import {Row, Input, Button} from 'react-materialize';
import $ from "jquery";



class Entry extends Component {

	constructor(props) {
		super(props)
		this.state = {
			user: this.props.user.id,
			name: '',
			organizer: '',
			location: '',
			contacts: [
				{
					name: '',
					number: undefined
				},
				{
					name: '',
					number: undefined
				},
				{
					name: '',
					number: undefined
				},
				{
					name: '',
					number: undefined
				},
				{
					name: '',
					number: undefined
				}
			]
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
    }

    one(e) {
    	if(e.target.className.includes("name")) {
    		var contacts = this.state.contacts
    		contacts[0].name = e.target.value
    		this.setState({
    			contacts: contacts
    		})
    	} else {
    		var contacts =this.state.contacts
    		contacts[0].number = e.target.value
    		this.setState({
    			contacts: contacts
    		})
    	}
    }

    two(e) {
    	if(e.target.className.includes("name")) {
    		var contacts = this.state.contacts
    		contacts[1].name = e.target.value
    		this.setState({
    			contacts: contacts
    		})
    	} else {
    		var contacts =this.state.contacts
    		contacts[1].number = e.target.value
    		this.setState({
    			contacts: contacts
    		})
    	}
    }

    three(e) {
    	if(e.target.className.includes("name")) {
    		var contacts = this.state.contacts
    		contacts[2].name = e.target.value
    		this.setState({
    			contacts: contacts
    		})
    	} else {
    		var contacts = this.state.contacts
    		contacts[2].number = e.target.value
    		this.setState({
    			contacts: contacts
    		})
    	}
    }

    four(e) {
    	
    if(e.target.className.includes("name")) {
    		var contacts = this.state.contacts
    		contacts[3].name = e.target.value
    		this.setState({
    			contacts: contacts
    		})
    	} else {
    		var contacts = this.state.contacts
    		contacts[3].number = e.target.value
    		this.setState({
    			contacts: contacts
    		})
    	}
    }

    five(e) {
    	if(e.target.className.includes("name")) {
    		var contacts = this.state.contacts
    		contacts[4].name = e.target.value
    		this.setState({
    			contacts: contacts
    		})
    	} else {
    		var contacts = this.state.contacts
    		contacts[4].number = e.target.value
    		this.setState({
    			contacts: contacts
    		})
    	}
    }

    onClick(e) {
    	var group = this.state;
    	var id = this.state.user.id
    	console.log(group)
    	e.preventDefault();
    	axios.post('/groups/create', {
    		group
    	})
    	.then( (response) => {
    		//console.log(response)
    	})
    }

	render(){

		return(
			<div className='entry-container full-width'>
			<Button onClick={(e) => this.test(e)}>Test</Button>
				<h4>Create a group</h4>
				<p className='container'>Creating a group is easy, simply fill out the following form and click "Create Group", you can edit the contact/SMS aspect of this group later</p>
				<form id='create-event'>
					<Row>
						<Input s={9} label="Group Name" onChange={ (e) => this.handleName(e)} />
						<Input s={9} label="Group Organizer" onChange={ (e) => this.handleOrganizer(e)} />
						<Input s={9} label="Group Location" onChange={ (e) => this.handleLocation(e)} />
					</Row>
					<h5>Add Members</h5>
					<p class='container'>You can add up to 5 members to a group (this will be improved later)!</p>
					<ul id='members'>
						<li className='member'>
							<Row>
								<Input s={6} className='name' label="Name" validate onChange={(e) => this.one(e)}></Input>
								<Input s={6} className='number' label="Telephone" validate type='tel' onChange={(e) => this.one(e)}></Input>
							</Row>
						</li>
						<li className='member'>
							<Row>
								<Input s={6} className='name' label="Name" validate onChange={ (e) => this.two(e) }></Input>
								<Input s={6} className='number'label="Telephone" validate type='tel' onChange={ (e) => this.two(e)}></Input>
							</Row>
						</li>
						<li className='member'>
							<Row>
								<Input s={6} className='name' label="Name" validate onChange={ (e) => this.three(e) }></Input>
								<Input s={6} className='number' label="Telephone" validate type='tel' onChange={ (e) => this.three(e) }></Input>
							</Row>
						</li>
						<li className='member'>
							<Row>
								<Input s={6} className='name' label="Name" validate onChange={ (e) => this.four(e) }></Input>
								<Input s={6} className='number' label="Telephone" validate type='tel' onChange={ (e) => this.four(e) }></Input>
							</Row>
						</li>
						<li className='member'>
							<Row>
								<Input s={6} className='name' label="Name" validate onChange={ (e) => this.five(e) }></Input>
								<Input s={6} className='number' label="Telephone" validate type='tel' onChange={ (e) => this.five(e) }></Input>
							</Row>
						</li>
					</ul>
					<Button className="left button" onClick={ (e) => this.onClick(e) }>Create Group</Button>
				</form>
			</div>
		)
	}
}

export default Entry;
