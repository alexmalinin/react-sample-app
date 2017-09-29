import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { required, minLength2 } from '../../helpers/validate';
import {renderField} from './renders/RenderField';
import RenderSelect from './renders/RenderSelect';
import RenderCheckbox from './renders/RenderCheckbox';
import RenderMultiSelect from './renders/RenderMultiSelect';
import {industries} from '../../helpers/industries';
import {experiences} from '../../helpers/experiences';
import {clientCategories} from '../../helpers/clientCategories';
import DvButtonForm from '../../styleComponents/DvButtonForm'
import DvButton from '../../styleComponents/DvButton'
import StyledCheckbox from '../../styleComponents/forms/StyledCheckbox'
import InputField from './renders/InputField'
import LocationField from './renders/LocationField'
import RenderStyledCheckbox from './renders/RenderStyledCheckbox';
import RenderTextArea from './renders/RenderTextArea';

import { Route, Redirect } from 'react-router';
import { Grid, Button } from 'semantic-ui-react';

import DvTitle from '../../styleComponents/DvTitle'
import DvForm from '../../styleComponents/Tabs';

const ClientWelcomeForm = props => {
    const { handleSubmit, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <Grid>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <Field
                            name="client-categories"
                            component={RenderSelect}
                            options={clientCategories}
                            placeholder="We are a... /"
                            validate={[required]}
                        />
                        <InputField
                            name="client-company"
                            placeholder="Company name /"
                            validate={[required]}
                        />
                        <LocationField/>
                        <InputField
                            name="client-industry"
                            placeholder="Industry /"
                            validate={[required]}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <span>Tell us about your business /</span>
                        <Field name="client-business" component={RenderTextArea}/>
                        <DvButton
                            type="submit"
                            disabled={submitting}
                            content='SAVE & CONTINUE'
                            primary
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </form>
    )
}

export default reduxForm({
    form: 'SpecialistWelcomeForm1',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(ClientWelcomeForm)