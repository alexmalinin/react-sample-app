import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import InfoForm from "./InfoForm";

class SpecialistWelcomeForm2 extends Component {

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <InfoForm signUp={true} {...this.props}/>
            </form>
        )
    }
}

export default reduxForm({
    form: 'SpecialistWelcomeForm2',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(
    connect(({educations, experiences, projectTypes}) => ({educations, experiences, projectTypes}))(SpecialistWelcomeForm2)
)
