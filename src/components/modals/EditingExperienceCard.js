import React, { Component } from 'react'
import { connect } from "react-redux";
import { Button, Header, Modal } from 'semantic-ui-react'
import { S_PointCard }from '../../styleComponents/layout/S_PointCard';
import { editExperienceCardWithId, editExperienceCardWithOutId } from "../../actions/actions";
import WorkExperienceForm from "../specialist/forms/EducationForm";

class DeletingEducationCard extends Component {

    state = {
        open: false
    };


    render() {
        const { open, size } = this.state;
        const { id, experience } = this.props;
        if (id) {
            this.experienceId = Math.random();
            education.experienceSuccessId = this.experienceId
        }
        console.log(education.educationSuccessId)

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
                            <WorkExperienceForm experience={experience} onSubmit={this.submit}/>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }

    show = ()  => {
        return this.setState({ open: true });
    };

    submit = experience => {
        let {editExperienceCardWithId, editExperienceCardWithOutId, id} = this.props;
        id ? editExperienceCardWithId(experience, id)
           : editExperienceCardWithOutId(experience, this.props.experience.experienceSuccessId);
        this.close()
    };

    close = () => this.setState({ open: false });
}

export default connect(null, {editExperienceCardWithId, editExperienceCardWithOutId})(DeletingEducationCard)