import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import Services from '../Services';
import Details from './Details';
import { DvButton } from '../../../styleComponents/layout/DvButton';
import { DvTitle } from '../../../styleComponents/layout/DvTitles';
import { Grid } from "semantic-ui-react";

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

                <Grid>
                    <Grid.Row>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                            <DvButton
                                type='submit'
                                disabled={submitting}
                                content='Save'
                                primary
                                xsIndent
                            />
                        </Grid.Column>

                        <Grid.Column mobile={16} tablet={8} computer={8}>
                            <DvButton
                                type='submit'
                                disabled={submitting}
                                content='Submit'
                                primary
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </form>
        )
    }
}

export default reduxForm({
    form: 'PostProjectForm'
})(PostProjectForm)
