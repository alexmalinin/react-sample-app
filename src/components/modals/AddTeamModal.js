import React, { Component } from 'react';
import { Header, Modal } from 'semantic-ui-react';
import StyledSubHeaderLink from '../../styleComponents/StyledSubHeaderLink';
import AddTeamForm from '../forms/AddTeamForm';

class AddTeamModal extends Component {

    render() {
        const { number} = this.props;

        return(
            <Modal trigger={<a className="button"><StyledSubHeaderLink className='rightLink addButt'/>Add team</a>} closeIcon>
                {/* <Modal.Header >New Team</Modal.Header> */}
                <Modal.Content >
                    <Modal.Description>
                        <Header>Create new team</Header>
                        <AddTeamForm/>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }

    submit = data => {
        let close = document.querySelector('i.close.icon');
        let { currentEpicId, createEpicTask}  = this.props;
        close.click();
        createEpicTask(data, currentEpicId);
    };
}

export default AddTeamModal;
