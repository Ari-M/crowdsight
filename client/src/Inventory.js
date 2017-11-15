import React, {Component} from 'react';
import axios from 'axios';
import {Row, Input, Button, Col} from 'react-materialize';

class Inventory extends Component {
	constructor(props) {
		super(props)
		this.state = {
			analyzed: false,
			anger: '',
			tentative: '',
			joy: '',
			fear: '',
			sadness: '',
			analytical: '',
			confident: '',
            title: '',
			entry: '',
			tones: [{
				score: '',
				tone_id: '',
				tone_name: ''
			}],
			sentences: [],
			name: [],
			data: []

		}
		this.componentDidMount = this.componentDidMount.bind(this)
	}
	componentDidMount(){
		this.setState({
			anger: '',
			tentative: '',
			joy: '',
			fear: '',
			sadness: '',
			analytical: '',
			confident: ''
		})
	}

	onChange(e) {
		var text = e.target.value
		this.setState({
			entry: text,
		})
    }

    onSubmit(e) {
        var savedTitle = e.target.value
        this.setState({
            title: savedTitle
        })
    }
    clickSave(e) {
		e.preventDefault()
        axios.post('/watson/save', {
            user: this.props.user,
            title: this.state.title,
            content: this.state.entry
        })
    }

	onClick(e) {
		e.preventDefault();
		axios.post('/watson', {
				text: this.state.entry
			})
			.then( (response) => {
				// THIS RESPONSE IS ALSO THE RESPONSE FROM THE API
				var text = response.data
				var tones;
				if(text) {
					tones = text.document_tone.tones
					var sentences;
				if (text.sentences_tone) {
					sentences = text.sentences_tone.map( (item, index) => ({
						className: item.tones.tone_id,
						text: item.text
					}) )
				}

				this.setState({
					analyzed: true,
					tones: tones,
					sentences: sentences
				})
				var name = this.state.tones.map( (item, index) => (item.tone_name) )
				var score = this.state.tones.map( (item, index) => (item.score) )

				this.setState({
					name: name,
					data: score,
					anger: '',
							tentative: '',
							joy: '',
							fear: '',
							sadness: '',
							analytical: '',
							confident: ''
				})
				for (var i=0; i< (response.data.document_tone.tones).length; i++){
			if(response.data.document_tone.tones[i].tone_id === 'anger'){
				this.setState({
					anger: response.data.document_tone.tones[i].score
				});
			}
			if(response.data.document_tone.tones[i].tone_id === 'tentative'){
				this.setState({
					tentative: response.data.document_tone.tones[i].score
				});
			}
			if(response.data.document_tone.tones[i].tone_id === 'fear'){
				this.setState({
					fear: response.data.document_tone.tones[i].score
				});
			}
			if(response.data.document_tone.tones[i].tone_id === 'joy'){
				this.setState({
					joy: response.data.document_tone.tones[i].score
				});
			}
			if(response.data.document_tone.tones[i].tone_id === 'sadness'){
				this.setState({
					sadness: response.data.document_tone.tones[i].score
				});
			}
			if(response.data.document_tone.tones[i].tone_id === 'analytical'){
				this.setState({
					analytical: response.data.document_tone.tones[i].score
				});
			}
			if(response.data.document_tone.tones[i].tone_id === 'confident'){
				this.setState({
					confident: response.data.document_tone.tones[i].score
				});
			}
		}
					}

				})
				.catch(function(error) {
					console.log(error)
			});
	}

	sentenceClassify() {

		//var structureArray = this.state.sentences.map( (item, index) => ({label: item.tone_id, text: item.text}))
		//var classify = this.state.sentences.map( (item, index) => )
	}

    render(){
    	var tonesResults = this.state.tones.map( (item, index) => (<div className='results'> <h6>{item.tone_name}</h6> <p>{item.score}</p> </div>) )


        return(
            <div className="text-analysis fullWidth">
                <h5>WYM Text Analyzer</h5>
                <form id='watson-tone-entry'>
					<Row>
						<Input s={9} label="Give a Title to Save" onChange={ (e) => this.onSubmit(e)} />
						<Button className="left button" onClick={ (e) => this.clickSave(e) }>Save Wym</Button>
					</Row>
					<Row>
						<Input s={9} type="textarea" className="materialize-textarea inputField" id="textarea1" label="Insert text to detect tone" value={this.props.content} onChange={ (e) => this.onChange(e) }  />
						<Button className="left button" onClick={ (e) => this.onClick(e) }>Analyze</Button>
					</Row>
                	{/* <textarea className="materialize-textarea" id="textarea1" rows='20' cols='100' placeholder='Insert text to detect tone' onChange={ (e) => this.onChange(e) } /> */}
                	{/* <input className="blue" type='button' onClick={ (e) => this.onClick(e) } value='Analyze'/> */}
                    {/* <input className="blue" type='button' onClick={ (e) => this.clickSave(e) } value='Save Entry'/> */}

                </form>
            </div>
        );
    }
}

export default Inventory;