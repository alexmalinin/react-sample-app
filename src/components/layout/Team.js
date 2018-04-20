import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, GridRow, Form, Input } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import { showAllSpecialists, createChannel } from '../../actions/actions';

import Channel from './Channel';
import AddChannelForm from '../forms/AddChannelForm';

class Team extends Component{
    state = {
        name: ''
    }
    componentWillMount() {
        const { showAllSpecialists, team } = this.props;
        showAllSpecialists();
    }

    handleChange = (e, {name, value}) => {
        this.setState({
            [name]: value,
        })
    }

    render() {
        const { team, allSpecialists } = this.props;

        return(
            <Grid>
                <Grid.Row className='section-header'>
                    <Grid.Column computer={6} textAlign='left' floated='left'>
                        <p className='title'>{team.name} project</p>
                    </Grid.Column>
                    <Grid.Column computer={2} textAlign='right' floated='right'>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={16} className="channels">
                        {team.channels.map((channel, key) => 
                            <Channel channel={channel} key={key} allSpecialists={allSpecialists} specialists={''}/>
                        )}
                        {/* <AddChannelForm onSubmit={this.submit}/> */}
                        <Form className="addChannel" onSubmit={this.submit}>
                            <Input 
                                type="text"
                                placeholder="#Add channel"
                                name="name"
                                value={this.state.name}
                                onKeyUp={e => e.keyCode === 13 && e.target.blur()}
                                onChange={this.handleChange}/>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    submit = () => {
        const { team, createChannel }  = this.props;
        const data = {
            name: this.state.name
        }
        createChannel(team.id, data);
        this.setState({name: ''})
    };
}

export default connect(
    ({allSpecialists, createChannel}) => ({allSpecialists, createChannel}),
    {showAllSpecialists, createChannel}
)(Team);