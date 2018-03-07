import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { run } from '../../../helpers/scrollToElement';

class SpecialistWelcomeForm2 extends Component {

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                {/* <InfoForm signUp={true} {...this.props}/> */}
            </form>
        )
    }
}

const handleSubmitFail = (errors) => {
    // console.log(Object.keys(errors)[0]);
    run(document.getElementById(`${Object.keys(errors)[0]}`))();
};

export default reduxForm({
    form: 'SpecialistWelcomeForm2',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    onSubmitFail: handleSubmitFail,
})(
    connect(({educations, experiences, projectTypes}) => ({educations, experiences, projectTypes}))(SpecialistWelcomeForm2)
)
