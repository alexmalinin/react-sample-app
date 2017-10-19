import React from 'react';
import {renderField} from '../../forms/renders/RenderField';
import { DvButton } from '../../../styleComponents/layout/DvButton'
import { Route, Redirect } from 'react-router';
import { Grid } from 'semantic-ui-react';
import RenderCustomSkills from '../renders/RenderCustomSkills';
import RenderChosenSpecialises from '../renders/RenderChosenSpecialises';

const SpecialistWelcomeResult1 = props => {

    const { submitting } = props;

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
};

export default SpecialistWelcomeResult1
