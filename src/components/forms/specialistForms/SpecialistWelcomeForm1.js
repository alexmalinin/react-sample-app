import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required } from '../../../helpers/validate';
import {renderField} from '../renders/RenderField';
import RenderSelect from '../renders/RenderSelect';
import RenderMultiSelect from '../renders/RenderMultiSelect';
import {industries} from '../../../helpers/industries';
import {speciality} from '../../../helpers/speciality';
import DvButton from '../../../styleComponents/DvButton';
import InputField from '../renders/InputField';
import LocationField from '../renders/LocationField';
import RenderStyledCheckbox from '../renders/RenderStyledCheckbox';
import { Route, Redirect } from 'react-router';
import { Grid } from 'semantic-ui-react';
import {DvTitle} from '../../../styleComponents/DvTitles';
import StyledWelcomeForm from '../../../styleComponents/StyledWelcomeForm';
import RenderSpecialityArea from '../renders/RenderSpecialityArea'
import RenderSkillsArea from '../renders/RenderSkillsArea'

const SpecialistWelcomeForm1 = props => {

    const { handleSubmit, submitting } = props;

    return (
        <form onSubmit={handleSubmit}>
            <Grid>
                <Grid.Row>
                    <Grid.Column mobile={16} computer={8}>
                        <StyledWelcomeForm>
                            <DvTitle mTop='80' xs>
                                Welcome to The Digital Village!
                            </DvTitle>
                            <p>
                                Please complete your profile so we can help you make the
                                most out of the Digital Village platform.
                            </p>

                            <Field
                                name='industry-select'
                                component={RenderSelect}
                                placeholder='Select your area within the digital industry /'
                                options={industries}
                                validate={[required]}
                            />
                            <InputField
                                name='industry_title'
                                placeholder='What is your industry title? /'
                                validate={[required]}
                            />
                            <LocationField/>
                        </StyledWelcomeForm>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <RenderSpecialityArea/>
                        <RenderSkillsArea/>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
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
};

export default reduxForm({
    form: 'SpecialistWelcomeForm1',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(SpecialistWelcomeForm1)
