import React from 'react';
import {renderField} from '../renders/RenderField';
import DvButton from '../../../styleComponents/DvButton'
import { Route, Redirect } from 'react-router';
import { Grid } from 'semantic-ui-react';
import RenderCustomSkills from '../../specialist/RenderCustomSkills';
import RenderChosenSpecialises from '../../specialist/RenderChosenSpecialises';

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
}

export default SpecialistWelcomeResult1