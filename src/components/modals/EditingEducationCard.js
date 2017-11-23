import React, { Component } from 'react'
import { connect } from "react-redux";
import { Button, Header, Modal } from 'semantic-ui-react'
import { S_PointCard }from '../../styleComponents/layout/S_PointCard';
import { editEducationCardWithId, editEducationCardWithOutId } from "../../actions/actions";
import EducationForm from "../specialist/forms/EducationForm";

class EditingEducationCard extends Component {

    state = {
        open: false
    };

    render() {
        const { open, size } = this.state;
        const { id, education } = this.props;
        if (id) {
            this.educationId = Math.random();
            education.educationSuccessId = this.educationId
        }

        return (
            <div>
                <S_PointCard color='red' data-edit className="edit icon" onClick={this.show}/>
                <Modal open={open} onClose={this.close} closeIcon>
                    <Modal.Header>
                        Editing Your Card
                    </Modal.Header>
                    <Modal.Content >
                        <Modal.Description>
                            <Header>/ List your formal education here /</Header>
                            <EducationForm education={education} onSubmit={this.submit}/>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }

    show = ()  => {
        return this.setState({ open: true });
    };

    submit = education => {
        let {editEducationCardWithId, editEducationCardWithOutId, id} = this.props;
        id ? editEducationCardWithId(education, id) : editEducationCardWithOutId(education, this.props.education.educationSuccessId);
        this.close()
    };

    close = () => this.setState({ open: false });
}

export default connect(null, {editEducationCardWithId, editEducationCardWithOutId})(EditingEducationCard)