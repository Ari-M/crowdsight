import React, {Component} from 'react';
import Inventory from './Inventory';
import axios from 'axios';
import { Button, Card, Input, Row, Col } from 'react-materialize';

class History extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: this.props.user.id,
            groups: [],
            message: ''
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }
 
    componentDidMount(){
        axios.get('/groups', {
            params: {
                user: this.state.user
            }
        })
        .then(response => {
            this.setState({
                groups: response.data
            })
            console.log(this.state.groups)
        })
    }

    onChange(e) {
        var text = e.target.value
        this.setState({
            message: text
        })
    }

    // SEND MESSAGE TO GROUP 
    onClick(e){
        e.preventDefault();
        var groupId = e.target.id;
        var group = this.state.groups[groupId];
        var numbers = [];
        for(var i = 0; i < group.contacts.length; i++) {
            numbers.push(group.contacts[i].number)
        }
        console.log(numbers);
        console.log(this.state.message);
        axios.post('/groups/send', {
            numbers: numbers,
            message: this.state.message
        }).then(result => {
            console.log('Sent!')
        }).catch(err => {
            console.log(err)
        })
    }

    render(){
     
        return(
            <div>
                <br/>
                <h3 className='container'>Your Groups</h3>
                {this.state.groups.map( (group, index) => (
                    <div className='card container right'>
                        <h4>{group.name}</h4> <hr/>
                        <h5>Organizer: {group.organizer}</h5> <br/>
                        <h5>Location: {group.location}</h5> <br/>
                        <h5>Contacts:</h5>
                        <ul>
                            {group.contacts.map( (contact, index) => (<li> {contact.name} | {contact.number} </li>))}
                        </ul>
                        <form>
                            <Input s={9} label="Message Group" onChange={ (e) => this.onChange(e)} />
                            <Button id={index} className="left button" onClick={ (e) => this.onClick(e) }>Send</Button>
                        </form>
                    </div>
                ))}
            </div>
            
        );
    }
}

export default History;