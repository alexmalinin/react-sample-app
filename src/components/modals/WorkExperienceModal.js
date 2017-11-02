import React from 'react';
import { Header, Modal } from 'semantic-ui-react';
import { AddNewBtn } from '../../styleComponents/layout/DvButton'

const WorkExperienceModal = () => (
    <Modal trigger={<AddNewBtn basic content='Add new'/>} closeIcon>
        <Modal.Header>Work Experience</Modal.Header>
        <Modal.Content image>
            <Modal.Description>
                <Header>Please read this information</Header>
                <p>This information will be soon</p>
            </Modal.Description>
        </Modal.Content>
    </Modal>
);

export default WorkExperienceModal;