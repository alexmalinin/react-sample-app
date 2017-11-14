import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Grid } from 'semantic-ui-react';
import {trueFalse} from '../../../helpers/selects/trueFalse';
import {projectSpecialists} from '../../../helpers/selects/projectSpecialists';
import {remotes} from '../../../helpers/selects/remotes';
import { renderField } from '../../forms/renders/RenderField';
import RenderMarkdown from '../../forms/renders/RenderMarkdown';
import RenderSelect from '../../forms/renders/RenderSelect';
import { required, } from '../../../helpers/validate';
import InputField from "../../forms/renders/InputField";

class DetailsSelects extends Component {

    render() {

        return(
            <div>
                <RenderMarkdown
                    name="explain"
                    title="In your own words, explain your project and it's requirements /"
                />

                <Grid>
                    <Grid.Row>
                        <Grid.Column mobile={16} tablet={12} computer={8}>
                            <Field
                                name="projectManager"
                                component={RenderSelect}
                                placeholder="Will you require a Product/Project Manager?"
                                options={trueFalse}
                                validate={[required]}
                            />
                            <Field
                                name="specialists"
                                component={RenderSelect}
                                placeholder="How many specialists do you think your project needs? /"
                                options={projectSpecialists}
                                validate={[required]}
                            />

                            <InputField
                                name="name"
                                placeholder="Name of your Project /"
                                validate={[required]}
                            />

                            <Field
                                name="remote"
                                component={RenderSelect}
                                placeholder="Remote or on-site? /"
                                options={remotes}
                                validate={[required]}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <RenderMarkdown
                    name="notes"
                    title="Further notes /"
                />
            </div>
        )
    }


}

export default DetailsSelects
