import React, { Component } from 'react';
import { connect }  from 'react-redux'
import { Header, Modal } from 'semantic-ui-react';
import { AddNewBtn } from '../../styleComponents/layout/DvButton'
import EducationForm from '../specialist/forms/EducationForm';
import { education } from "../../actions/actions"

class EdicationModal extends Component {


    render() {

        return(
            <Modal trigger={<AddNewBtn basic content='Add new'/>} closeIcon>
                <Modal.Header >Education</Modal.Header>
                <Modal.Content >
                    <Modal.Description>
                        <Header>/ List any formal education here /</Header>
                        <EducationForm onSubmit={this.submit}/>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }

    submit = values => {
        // this.props.confirmAccount();
        let close = document.querySelector('i.close.icon');
        close.click();
        this.props.education(values);
    };
}

export default connect(null, {education})(EdicationModal);