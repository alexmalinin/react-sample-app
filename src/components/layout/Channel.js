import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Form, Input } from 'semantic-ui-react';

import {AssignDropdown, PersonTile} from './AssignDropdown';

import { IMAGE_PORT, CLIENT, SPECIALIST } from '../../constans/constans';
import { addToChannel, removeFromChannel, updateTeamChannel, deleteTeamChannel } from '../../actions/actions';

class Channel extends Component{
    state = {
        name: this.props.channel.name,
        editFocused: false,
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            name: nextProps.channel.name
        })
    }

    handleAssign = (type, specId) => {
        const { channel, addToChannel, removeFromChannel} = this.props;
        
        if(type === 'assign'){
            addToChannel(channel.team_id, channel.id, specId);
        } else removeFromChannel(channel.team_id, channel.id, specId);;
    }

    handleEdit = (e, {name, value}) => {
        this.setState({
            [name]: value,
        })
    }

    deleteChannel = () => {
        const { deleteTeamChannel, channel } = this.props;
        deleteTeamChannel(channel.team_id, channel.id);
        setTimeout(() => {
            this.hideDeleteConfirmation();
        }, 100);
    }

    openDeleteConfirmation = () => {
        this.setState({
            showDeleteConfirmation: true,
        })
    }

    hideDeleteConfirmation = () => {
        this.setState({
            showDeleteConfirmation: false,
            name: this.props.channel.name
        })
    }

    render() {
        const { channel, specialists, removeFromChannel, teamId, allSpecialists, changeUserType } = this.props;
        const { showDropdown, assignedIds } = this.state;

        return(
            <div className="channel">
                <div className="title">
                    <Form className="editChannel" onSubmit={this.submit}>
                        <Input 
                            type="text"
                            placeholder="Channel name"
                            name="name"
                            disabled={changeUserType === SPECIALIST}
                            value={this.state.name}
                            ref={Input => this.editInput = Input}
                            onKeyUp={e => e.keyCode === 13 && e.target.blur()}
                            onBlur={this.closeEditForm}
                            onChange={this.handleEdit}/>
                    </Form>
                    {changeUserType === CLIENT &&
                    <div className={`deleteConfirmation${this.state.showDeleteConfirmation ? ' show' : ''}`}>
                        <button onClick={this.deleteChannel}>Yes</button>
                        <button onClick={this.hideDeleteConfirmation}>No</button>
                    </div>}
                    {changeUserType === CLIENT &&
                    <button onClick={this.openDeleteConfirmation} className="delete">
                        <img src="/images/trashcan.png" alt="delete"/>
                    </button>}
                </div>
                <div className="members">
                    {channel.specialists.map((person, key) => 
                        <PersonTile
                            key={key}
                            specialist={person} 
                            handleRemove={this.handleAssign}
                            labeled
                            removeTitle="channel"
                            userType={changeUserType}/>
                    )}
                    <AssignDropdown 
                        label="Add member" 
                        specialists={channel.specialists} 
                        allSpecialists={allSpecialists} 
                        handleAssign={this.handleAssign}
                        userType={changeUserType}/>
                </div>
            </div>
        )
    }

    submit = () => {
        const { updateTeamChannel, channel }  = this.props;
        const data = {
            name: this.state.name
        }
        if(!!this.state.name){
            updateTeamChannel(channel.team_id, channel.id, data);
        } else this.openDeleteConfirmation();
    };
}

export default connect(
    ({changeUserType}) => ({changeUserType}),
    {addToChannel, removeFromChannel, updateTeamChannel, deleteTeamChannel}
)(Channel);
