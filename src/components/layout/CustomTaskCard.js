import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Transition, Input } from 'semantic-ui-react';
import { IMAGE_PORT } from '../../constans/constans';

class CustomCard extends Component {
    state = {
        options: [],
        assignedIds: [],
        showDropdown: false,
    }

    // Search dropdown

    openDropdown = () => {
        let assignedIds = [];
        this.props.specialists.forEach(spec => assignedIds.push(spec.id));
        this.setState({
            options: this.props.specialistList,
            assignedIds,
            showDropdown: true,
        });
        setTimeout(() => {
            this.searchInput.focus()
        }, 10);
    }

    closeDropdown = (e) => {
        this.setState({
            showDropdown: false,
        });
        if(e){
            e.target.value = '';
        }
    }

    assignSpeciaist = (event, data) => {
        const { assignSpecialist, removeSpecialist, id} = this.props;
        let specId = event.target.getAttribute('data');

        if(this.state.assignedIds.indexOf(+specId) >= 0){
            removeSpecialist(id, specId);
        } else assignSpecialist(id, specId);

        this.closeDropdown();
    }

    // remove button dropdown

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
            options: this.props.specialistList
        });
    }

    render() {
        const { title, description, id, specialists, removeSpecialist } = this.props;
        const { showDropdown, assignedIds } = this.state;

        return (
            <div className="dragItem" style={{backgroundColor: '#fff'}}>
                <h4 className="title">{title}</h4>
                <h4 className="platform">{description}&nbsp;</h4>
                <div className="bell-line">
                    <span className="bell"></span>
                </div>
                <div className="persons">
                    {specialists.map((specialist, key)=>
                        <PersonTile specialist={specialist} key={key} removeSpecialist={removeSpecialist} taskId={id}/>
                    )}
                    <div className="addPerson">
                        <a tabIndex="1" onClick={this.openDropdown} onBlur={this.closeDropdown}>+</a>
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
                                        onClick={this.assignSpeciaist}
                                        className={this.state.assignedIds.indexOf(specialist.id) >=0 ? 'assigned': ''}>
                                        <img 
                                            data={specialist.id} 
                                            src={specialist.avatar.url ?  IMAGE_PORT + specialist.avatar.url : '/images/uploadImg.png'} alt=""/>
                                        {specialist.first_name + ' ' + specialist.last_name}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <span className="ddtw">DDTW-{id}</span>
            </div>
        );
    }
}

class PersonTile extends Component {
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
        const { removeSpecialist, taskId, specialist} = this.props;
        removeSpecialist(taskId, specialist.id);
        setTimeout(() => {
            this.setState({
                showDropdown: false
            })
        }, 100);
    }

    render() {
        const { specialist } = this.props;

        return(
            <div className="person">
                <a tabIndex="1" onClick={this.openDropdown} onBlur={this.closeDropdown}>
                    <img 
                        src={specialist.avatar.url ? IMAGE_PORT + specialist.avatar.url : '/images/uploadImg.png'}
                        onClick={(e)=>e.target.parentNode.focus()}
                        alt="avatar"/>
                </a>
                <div className={`delete${this.state.showDropdown ? ' show' : ''}`}>
                    <div className="close" onClick={this.closeDropdown}></div>
                    <p className="dropdownTitle">Profile</p>
                    <div className="row">
                        <img src={specialist.avatar.url ? IMAGE_PORT + specialist.avatar.url : '/images/uploadImg.png'} alt="avatar"/>
                        <div>
                            <p>{specialist.first_name + ' ' +specialist.last_name}</p>
                            <button data={specialist.id} onClick={this.removeSpecialist} className="remove">Remove from card</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CustomCard;
