import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, GridRow, Form, Input } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import { showAllSpecialists, createTeamChannel, showChannels } from '../../actions/actions';

import Channel from './Channel';
import AddChannelForm from '../forms/AddChannelForm';

class Team extends Component{
    state = {
        name: '',
        channels: [],
    }

    componentWillMount() {
        const { showAllSpecialists, team, showChannels } = this.props;
        showAllSpecialists();
        showChannels(team.id);
    }

    handleChange = (e, {name, value}) => {
        this.setState({
            [name]: value,
        })
    }

    componentWillReceiveProps(nextProps) {
        //map channels from back's index
        if(nextProps.allChannels){
            if(nextProps.allChannels.length !== 0){
                if(nextProps.allChannels[0].team_id === nextProps.team.id){
                    this.setState({
                        channels: nextProps.allChannels,
                    })
                }
            } else if (nextProps.deleteChannel && nextProps.deleteChannel.team_id === nextProps.team.id){
                this.setState({
                    channels: []
                })
            }
        }

        //react to channel creation for display it instantly
        if(nextProps.createChannel && nextProps.createChannel.team_id === nextProps.team.id){
            if(this.props.createChannel){
                if(this.props.createChannel !== nextProps.createChannel){
                    nextProps.showChannels(nextProps.team.id);
                }
            } else nextProps.showChannels(nextProps.team.id);
        }

        if(nextProps.addMember){
            if(this.props.addMember){
                if(this.props.addMember !== nextProps.addMember){
                    nextProps.showChannels(nextProps.team.id);
                }
            } else nextProps.showChannels(nextProps.team.id);
        }

        if(nextProps.removeMember){
            if(this.props.removeMember){
                if(this.props.removeMember !== nextProps.removeMember){
                    nextProps.showChannels(nextProps.team.id);
                }
            } else nextProps.showChannels(nextProps.team.id);
        }

        if(nextProps.updateChannel){
            if(this.props.updateChannel){
                if(this.props.updateChannel !== nextProps.updateChannel){
                    nextProps.showChannels(nextProps.team.id);
                }
            } else nextProps.showChannels(nextProps.team.id);
        }

        if(nextProps.deleteChannel){
            if(this.props.deleteChannel){
                if(this.props.deleteChannel !== nextProps.deleteChannel && nextProps.deleteChannel.team_id === nextProps.team.id){
                    nextProps.showChannels(nextProps.team.id);
                }
            } else nextProps.showChannels(nextProps.team.id);
        }
    }

    render() {
        const { team, allSpecialists } = this.props;
        const { channels } = this.state;

        return(
            <Grid>
                <Grid.Row className='section-header'>
                    <Grid.Column computer={6} textAlign='left' floated='left'>
                        <p className='title'>{team.name} project</p>
                    </Grid.Column>
                    <Grid.Column computer={2} textAlign='right' floated='right'>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row className="channels">
                    {channels.map((channel, key) => 
                        <Channel channel={channel} key={key} allSpecialists={allSpecialists} specialists={''}/>
                    )}
                    <Form className="addChannel" onSubmit={this.submit}>
                        <Input 
                            type="text"
                            placeholder="#Add channel"
                            name="name"
                            value={this.state.name}
                            onKeyUp={e => e.keyCode === 13 && e.target.blur()}
                            onChange={this.handleChange}/>
                    </Form>
                </Grid.Row>
            </Grid>
        )
    }

    submit = () => {
        const { team, createTeamChannel }  = this.props;
        const data = {
            name: this.state.name
        }
        createTeamChannel(team.id, data);
        this.setState({name: ''})
    };
}

export default connect(
    ({allSpecialists, createChannel, allChannels, addMember, removeMember, updateChannel, deleteChannel}) => ({allSpecialists, createChannel, allChannels, addMember, removeMember, updateChannel, deleteChannel}),
    {showAllSpecialists, createTeamChannel, showChannels}
)(Team);