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
import {speciality} from '../../helpers/speciality';
import DvButtonForm from '../../styleComponents/DvButtonForm'
import DvButton from '../../styleComponents/DvButton'
import StyledCheckbox from '../../styleComponents/forms/StyledCheckbox'
import InputField from './renders/InputField'
import LocationField from './renders/LocationField'
import RenderStyledCheckbox from './renders/RenderStyledCheckbox';

import { Route, Redirect } from 'react-router';
import { Grid, Button } from 'semantic-ui-react';

import DvTitle from '../../styleComponents/DvTitle'
import DvForm from '../../styleComponents/Tabs';
import RenderCustomSkills from '../RenderCustomSkills';
import RenderChosenSpecialises from '../RenderChosenSpecialises';

const SpecialistWelcomeResult1 = props => {
    const { handleSubmit, submitting } = props;
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <RenderChosenSpecialises/>
                    <p>Your Skillset includes /</p>
                    <RenderCustomSkills/>

                    <DvButton
                        type="submit"
                        disabled={submitting}
                        content='CONTINUE'
                        primary
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default SpecialistWelcomeResult1