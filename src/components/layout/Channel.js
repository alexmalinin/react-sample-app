import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import { PORT } from '../../constans/constans';
import { addMemberToChannel } from '../../actions/actions';

class Channel extends Component{
    state = {
        options: [],
        showDropdown: false,
    }

    openDropdown = () => {
        let assignedIds = [];
        this.props.allSpecialists.forEach(spec => assignedIds.push(spec.id));
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
                if( name.toLocaleLowerCase().indexOf(data.value.toLocaleLowerCase()) >= 0){
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

    addMember = (e) => {
        const { channel, addMemberToChannel } = this.props;
        console.log('added')
        addMemberToChannel(channel.team_id, channel.id, e.target.getAttribute("data"));
    }

    render() {
        const { channel, specialists } = this.props;
        const { showDropdown } = this.state;

        return(
            <div className="channel">
                <h4>#{channel.name}</h4>
                <div className="members">
                    <div className="addPerson">
                        <a tabIndex="1" onClick={this.openDropdown}>+</a>
                        <div className={`dropdown${showDropdown ? ` visible` : ``}`}>
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
                                        <img src={specialist.avatar.url ?  PORT + specialist.avatar.url : '/images/uploadImg.png'} alt=""/>
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
}

export default connect(
    (state) => (state),
    {addMemberToChannel}
)(Channel);