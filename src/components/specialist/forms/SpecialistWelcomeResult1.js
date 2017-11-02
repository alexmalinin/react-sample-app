import React, { Component } from 'react';
import {renderField} from '../../forms/renders/RenderField';
import { DvButton } from '../../../styleComponents/layout/DvButton'
import { Route, Redirect } from 'react-router';
import { Grid } from 'semantic-ui-react';
import RenderCustomSkills from '../renders/RenderCustomSkills';
import RenderChosenSpecialises from '../renders/RenderChosenSpecialises';
import { run } from '../../../helpers/scrollToElement';

class SpecialistWelcomeResult1 extends Component {

    render() {

        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <RenderChosenSpecialises/>
                        <p>Your Skillset includes /</p>

                        <RenderCustomSkills/>

                        <DvButton
                            content='CONTINUE'
                            primary
                            onClick={this.scroll}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    scroll = ev => {
        run(ev.target)();
    }
}


export default SpecialistWelcomeResult1
