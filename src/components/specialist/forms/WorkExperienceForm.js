import React, { Component } from 'react';
import { Field, reduxForm, change} from 'redux-form';
import { required } from '../../../helpers/validate';
import {renderField} from '../../forms/renders/RenderField';
import { DvButton } from '../../../styleComponents/layout/DvButton';
import InputField from '../../forms/renders/InputField';
import LocationField from '../../forms/renders/LocationField';
import { Grid } from 'semantic-ui-react';
import StyledWelcomeForm from '../../../styleComponents/StyledWelcomeForm';
import RenderTextArea from '../../forms/renders/RenderTextArea';

let renderError = true;

class WorkExperienceForm extends Component {

    render() {
        const { handleSubmit, submitting } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column mobile={16} computer={8}>
                            <StyledWelcomeForm>
                                <br/>
                                <br/>
                                <InputField
                                    name='name'
                                    placeholder='Company/Project /'
                                    validate={[required]}
                                />
                                <LocationField/>
                                <InputField
                                    name='position'
                                    placeholder='Title/Position/Role /'
                                    validate={[required]}
                                />
                                <InputField
                                    name='started_at'
                                    placeholder='From /'
                                    validate={[required]}
                                />
                                <InputField
                                    name='finished_at'
                                    placeholder='To /'
                                    validate={[required]}
                                />
                            </StyledWelcomeForm>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <label>
                                Description
                                <Field
                                    name="description"
                                    component={RenderTextArea}
                                    validate={[required]}
                                />
                            </label>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <DvButton
                                type="submit"
                                disabled={submitting}
                                content='SAVE & CONTINUE'
                                primary
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <DvButton
                                onClick={ this.closeModal }
                                content='CLOSE'
                                disabled={submitting}
                                primary
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </form>
        )
    };

    componentWillReceiveProps(nextProps){
        if(nextProps.experience) {
            if(nextProps.experience.experienceSuccessId) {
                if (renderError) {
                    this.fillFields(nextProps.experience);
                    renderError = false
                }
            }
        }
    }

    fillFields = data => {
        let { name, position, country, city, degree, description, started_at, finished_at } = data;

        this.props.dispatch(change('WorkExperienceForm', 'name',        name));
        this.props.dispatch(change('WorkExperienceForm', 'position',    position));
        this.props.dispatch(change('WorkExperienceForm', 'country',     country));
        this.props.dispatch(change('WorkExperienceForm', 'city',        city));
        this.props.dispatch(change('WorkExperienceForm', 'degree',      degree));
        this.props.dispatch(change('WorkExperienceForm', 'description', description));
        this.props.dispatch(change('WorkExperienceForm', 'started_at',  started_at));
        this.props.dispatch(change('WorkExperienceForm', 'finished_at', finished_at));
    };


    closeModal = ev => {
        ev.preventDefault();
        let close = document.querySelector('i.close.icon');
        close.click();
    };

    componentWillUnmount(){
        renderError = true
    }
}

export default reduxForm({
    form: 'WorkExperienceForm',
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true,
})(WorkExperienceForm);
