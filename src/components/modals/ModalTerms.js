import React from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

const ModalTerms = () => (
    <Modal trigger={<b>terms of use</b>} closeIcon>
        <Modal.Header>Terms of Use</Modal.Header>
        <Modal.Content image>
            <Modal.Description>
                <Header>Please read this information</Header>
                <p>This information will be soon</p>
            </Modal.Description>
        </Modal.Content>
    </Modal>
)

export default ModalTerms