import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Transition, Input } from 'semantic-ui-react';
import { PORT } from '../../constans/constans';

class CustomCard extends React.Component {
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

    removeSpeciaist = (event, data) => {
        const { removeSpecialist, id} = this.props;
        removeSpecialist(id, event.target.getAttribute('data'));

        event.target.parentNode.parentNode.blur();
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
            options: this.props.specialistList
        });
    }

    render() {
        const { title, description, id, specialists } = this.props;
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
                        <a tabIndex="1" key={key} className="person">
                            <img src={specialist.avatar.url ?  PORT + specialist.avatar.url : '/images/uploadImg.png'} alt="avatar" onClickCapture={(e)=>{e.target.parentNode.focus()}}/>
                            <div className="delete" data={specialist.id} onClick={this.removeSpecialist}>
                                <div className="row">
                                    <img src={specialist.avatar.url ?  PORT + specialist.avatar.url : '/images/uploadImg.png'} alt="avatar"/>
                                    <p>{specialist.first_name + ' ' +specialist.last_name}</p>
                                </div>
                                <button data={specialist.id} onClick={this.removeSpeciaist} className="remove">Remove from card</button>
                            </div>
                        </a>
                    )}
                    <a tabIndex="1" className="addPerson" onClick={this.openDropdown} onBlur={this.closeDropdown}>+</a>
                    <div className={`dropdown${showDropdown ? ` visible` : ``}`}>
                        <Input
                            type="text"
                            placeholder="Search specialist"
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
                                    <img src={specialist.avatar.url ?  PORT + specialist.avatar.url : '/images/uploadImg.png'} alt=""/>
                                    {specialist.first_name + ' ' + specialist.last_name}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <span className="ddtw">DDTW-{id}</span>
            </div>
        );
    }
}

export default CustomCard;
