import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Transition, Input } from 'semantic-ui-react';
import { IMAGE_PORT } from '../../constans/constans';
import {AssignDropdown, PersonTile} from './AssignDropdown';

class CustomCard extends Component {
    state = {
        showDropdown: false,
    }

    assignSpeciaist = (type, specId) => {
        const { assignSpecialist, removeSpecialist, id} = this.props;

        if(type === 'assign'){
            assignSpecialist(id, specId);
        } else removeSpecialist(id, specId);
    }

    render() {
        const { title, description, id, specialists, removeSpecialist, specialistList, userType } = this.props;

        return (
            <div className="dragItem" style={{backgroundColor: '#fff'}}>
                <h4 className="title">{title}</h4>
                <h4 className="platform">{description}&nbsp;</h4>
                <div className="bell-line">
                    <span className="bell"></span>
                </div>
                <div className="persons">
                    {specialists.map((specialist, key)=>
                        <PersonTile 
                            specialist={specialist} 
                            key={key} 
                            removeSpecialist={this.assignSpeciaist} 
                            taskId={id} 
                            removeTitle="task"
                            userType={userType}/>
                    )}
                    <AssignDropdown  
                        specialists={specialists} 
                        allSpecialists={specialistList} 
                        handleAssign={this.assignSpeciaist}
                        userType={userType}/>
                </div>
                <span className="ddtw">DDTW-{id}</span>
            </div>
        );
    }
}

export default CustomCard;
