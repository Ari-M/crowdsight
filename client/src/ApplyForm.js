import React, {Component} from 'react';

class ApplyForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// This is where the form information will be stored
		}
	}

	render() {

		return(
			<div id='apply-form'>
				<h1>Hello, this is where someone who has a link to an event will apply to it.</h1>
			</div>
		)
	}
}