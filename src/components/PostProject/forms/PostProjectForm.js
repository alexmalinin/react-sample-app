import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Services from '../Services';
import Details from './Details';
import { DvButton } from '../../../styleComponents/layout/DvButton';
import { DvTitle } from '../../../styleComponents/layout/DvTitles';
import { Grid } from "semantic-ui-react";
import { saveCreatedProgect, submitCreatedProgect } from "../../../actions/actions";

class PostProjectForm extends Component {

    state = {
        request: ''
    };

    render() {
        let { handleSubmit, submitting, saveCreatedProgect, submitCreatedProgect } = this.props;
        let { request } = this.state;

        return(
            <form name='details' onSubmit={handleSubmit((values) => {
                    request === 'save' ? saveCreatedProgect(values) : submitCreatedProgect(values);
                })}
            >
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
                                onClick={this.handleRequest}
                            />
                        </Grid.Column>

                        <Grid.Column mobile={16} tablet={8} computer={8}>
                            <DvButton
                                type='submit'
                                disabled={submitting}
                                content='Submit'
                                primary
                                onClick={this.handleRequest}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </form>
        )
    }

    handleRequest = ev => {
        let request = ev.target.innerText.toLowerCase();
        this.setState({
            request,
        });
    }
}

PostProjectForm = reduxForm({
    form: 'PostProjectForm'
})(PostProjectForm);

export default connect(null, {saveCreatedProgect, submitCreatedProgect})(PostProjectForm);
