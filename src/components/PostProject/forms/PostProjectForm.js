import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Services from '../Services';
import Details from '../Deails';

import { DvButton } from '../../../styleComponents/layout/DvButton';
import { DvTitleSmall } from '../../../styleComponents/layout/DvTitles';

class PostProjectForm extends Component {

    render() {
        const { handleSubmit, submitting } = this.props;

        return(
            <form onSubmit={handleSubmit}>
                <DvTitleSmall>
                    What services do
                    <br/>
                    you need?
                </DvTitleSmall>
                <Services/>
                <DvTitleSmall>
                    Project Details
                </DvTitleSmall>
                <Details/>
                <DvButton
                    type='submit'
                    disabled={submitting}
                    content='Continue'
                    primary
                />
            </form>
        )
    }
}

export default reduxForm({
    form: 'PostProjectForm'
})(PostProjectForm)