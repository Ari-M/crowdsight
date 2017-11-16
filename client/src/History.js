import React, {Component} from 'react';
import Inventory from './Inventory';
import axios from 'axios';
import { Button, Card, Row, Col } from 'react-materialize';

class History extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: this.props.user.id,
            groups: []
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
    //Get Individual wym props
    onClick(e){
        // axios.post('/watson/wym', {
        //     user: this.props.user.id,
        //     id: e.target.value
        // }).then(result => {
        //     this.setState({toView: result.data[0].content})
        //     console.log(this.state.toView)
        //     console.log(result.data.data.content)
        // })
    }

    render(){
        var groups = this.state.groups.map( (item, index) => (
            <Row key={index} m={12} s={12}>
                <Card className='blue-grey darken-1' textClassName='white-text' title={item.name} actions={[<a href='#'>Send Message</a>]}>
                    Organizer: {item.organizer}<br/>
                    Location: {item.location}<br/>
                </Card>
            </Row>
        ) );

        return(
            <div>
                <br/>
                <h3 className='container'>Your Groups</h3>
                {groups}
                
            </div>
        );
    }
}

export default History;