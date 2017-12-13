import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import Services from '../Services';
import Details from './Details';

import { DvButton } from '../../../styleComponents/layout/DvButton';
import { DvTitle } from '../../../styleComponents/layout/DvTitles';

class PostProjectForm extends Component {

    render() {
        const { handleSubmit, submitting } = this.props;

        return(
            <form name='details' onSubmit={handleSubmit}>
                <DvTitle mTop='90' mBot='90'>
                    What services do
                    <br/>
                    you need?
                </DvTitle>

                <Services/>

                <DvTitle mTop='90' mBot='90'>
                    Project Details
                </DvTitle>

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
