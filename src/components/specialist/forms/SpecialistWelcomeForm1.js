import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required } from '../../../helpers/validate';
import {renderField} from '../../forms/renders/RenderField';
import RenderSelect from '../../forms/renders/RenderSelect';
import RenderMultiSelect from '../../forms/renders/RenderMultiSelect';
import {industries} from '../../../helpers/selects/industries';
import {speciality} from '../../../helpers/selects/speciality';
import { DvButton } from '../../../styleComponents/layout/DvButton';
import InputField from '../../forms/renders/InputField';
import LocationField from '../../forms/renders/LocationField';
import RenderStyledCheckbox from '../../forms/renders/RenderStyledCheckbox';
import { Route, Redirect } from 'react-router';
import { Grid } from 'semantic-ui-react';
import {DvTitle} from '../../../styleComponents/layout/DvTitles';
import StyledWelcomeForm from '../../../styleComponents/StyledWelcomeForm';
import RenderSpecialityArea from '../../forms/renders/RenderSpecialityArea'
import RenderSkillsArea from '../../forms/renders/RenderSkillsArea'

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
