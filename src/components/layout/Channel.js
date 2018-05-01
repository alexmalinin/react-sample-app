import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import { IMAGE_PORT } from '../../constans/constans';
import { addToChannel, removeFromChannel, updateTeamChannel, deleteTeamChannel } from '../../actions/actions';

class Channel extends Component{
    state = {
        options: [],
        assignedIds: [],
        showDropdown: false,
        showDeleteConfirmation: false,
        name: this.props.channel.name,
        editFocused: false,
    }

    //Assign members dropdown

    openDropdown = () => {
        let assignedIds = [];
        this.props.channel.specialists.forEach(spec => assignedIds.push(spec.id));
        this.setState({
            options: this.props.allSpecialists,
            assignedIds,
            showDropdown: true,
        });
        setTimeout(() => {
            this.searchInput.focus()
        }, 10);
    }

    closeDropdown = (e) => {
        setTimeout(() => {
            this.setState({
                showDropdown: false,
            });
        }, 100);
        if(e){
            e.target.value = '';
        }
    }

    handleSearch = (e, data) => {
        if(data.value != ''){
            let result = [];
            this.state.options.forEach((spec) => {
                let name = spec.first_name + ' ' + spec.last_name;
                if(name.toLocaleLowerCase().indexOf(data.value.toLocaleLowerCase()) >= 0){
                    result.push(spec);
                }
            })
            this.setState({
                options: result
            })
        } else this.setState({
            options: this.props.allSpecialists
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            name: nextProps.channel.name
        })
    }

    addMember = (e) => {
        const { channel, addToChannel, removeFromChannel} = this.props;
        const specId = e.target.getAttribute('data');
        
        if(this.state.assignedIds.indexOf(+specId) < 0 ){
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
        const { channel, specialists, removeFromChannel, teamId } = this.props;
        const { showDropdown, assignedIds } = this.state;

        return(
            <div className="channel">
                <div className="title">
                    <Form className="editChannel" onSubmit={this.submit}>
                        <Input 
                            type="text"
                            placeholder="Channel name"
                            name="name"
                            value={this.state.name}
                            ref={Input => this.editInput = Input}
                            onKeyUp={e => e.keyCode === 13 && e.target.blur()}
                            onBlur={this.closeEditForm}
                            onChange={this.handleEdit}/>
                    </Form>
                    <div className={`deleteConfirmation${this.state.showDeleteConfirmation ? ' show' : ''}`}>
                        <button onClick={this.deleteChannel}>Yes</button>
                        <button onClick={this.hideDeleteConfirmation}>No</button>
                    </div>
                    <button onClick={this.openDeleteConfirmation} className="delete">
                        <img src="/images/trashcan.png" alt="delete"/>
                    </button>
                </div>
                <div className="members">
                    {channel.specialists.map((person, key) => 
                        <Member
                            key={key}
                            specialist={person} 
                            removeSpecialist={removeFromChannel}
                            team={channel.team_id}
                            channel={channel.id}/>
                    )}
                    <div className="addPerson">
                        <a tabIndex="1" onClick={this.openDropdown}><span>+</span>Add member</a>
                        <div className={`dropdown${showDropdown ? ' visible': ''}`}>
                            <div className="close" onClick={this.closeDropdown}></div>
                            <p className="dropdownTitle">Members</p>
                            <Input
                                type="text"
                                placeholder="Search members"
                                name="searchSpec"
                                ref={input => this.searchInput = input}
                                onClick={(e)=>e.target.focus()}
                                onBlur={this.closeDropdown}
                                onChange={this.handleSearch}/>
                            <div className="dropdown-list">
                                {this.state.options.map((specialist, key) => 
                                    <div 
                                        key={key} 
                                        data={specialist.id} 
                                        onClick={this.addMember}
                                        className={this.state.assignedIds.indexOf(specialist.id) >=0 ? 'assigned': ''}>
                                        <img 
                                            data={specialist.id}
                                            src={specialist.avatar.url ?  IMAGE_PORT + specialist.avatar.url : '/images/uploadImg.png'} alt="member"/>
                                        {specialist.first_name + ' ' + specialist.last_name}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
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
    ({}) => ({}),
    {addToChannel, removeFromChannel, updateTeamChannel, deleteTeamChannel}
)(Channel);


//need to make this independent component in Layout, same as kanban board member component

class Member extends Component {
    state = {
        showDropdown: false
    }

    openDropdown = () => {
        this.setState({
            showDropdown: true
        })
    }

    closeDropdown = () => {
        this.setState({
            showDropdown: false
        })
    }

    removeSpecialist = (event, data) => {
        const { removeSpecialist, team, channel, specialist} = this.props;
        removeSpecialist(team, channel, specialist.id);
        this.setState({
            showDropdown: false
        })
    }

    render() {
        const { specialist } = this.props;

        return(
            <div className="person">
                <a tabIndex="1" onClick={this.openDropdown} onBlur={this.closeDropdown}>
                    <img 
                        src={specialist.avatar.url ?  IMAGE_PORT + specialist.avatar.url : '/images/uploadImg.png'}
                        onClick={(e)=>e.target.parentNode.focus()}
                        alt="avatar"/>
                    <p>{specialist.first_name} {specialist.last_name}</p>
                </a>
                <div className={`delete${this.state.showDropdown ? ' show' : ''}`}>
                    <div className="close" onClick={this.closeDropdown}></div>
                    <p className="dropdownTitle">Profile</p>
                    <div className="info">
                        <img src={specialist.avatar.url ?  IMAGE_PORT + specialist.avatar.url : '/images/uploadImg.png'} alt="avatar"/>
                        <div>
                            <p>{specialist.first_name + ' ' +specialist.last_name}</p>
                            <button data={specialist.id} onClick={this.removeSpecialist} className="remove">Remove from channel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
