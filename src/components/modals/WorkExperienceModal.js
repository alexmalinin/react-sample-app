import React, { Component } from 'react';
import { connect }  from 'react-redux'
import { Header, Modal } from 'semantic-ui-react';
import { AddNewBtn } from '../../styleComponents/layout/DvButton';
import WorkExperienceForm from '../specialist/forms/WorkExperienceForm';
import { workExperience } from "../../actions/actions";

class WorkExperienceModal extends Component {
    render() {

        return(
            <Modal trigger={<AddNewBtn onClick={this.handleClick} basic content='Add new'/>} closeIcon>
                <Modal.Header>Work Experience</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Header>/ Tell us about previous companies
                            you’ve worked at, projects you’ve worked on or things
                            you’ve built /
                        </Header>
                        <WorkExperienceForm onSubmit={this.submit}/>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }

    handleClick = ev => {
        ev.preventDefault();
    };

    submit = values => {
        let close = document.querySelector('i.close.icon');
        close.click();
        this.props.workExperience(values);
    };
}


export default connect(null, { workExperience })(WorkExperienceModal);