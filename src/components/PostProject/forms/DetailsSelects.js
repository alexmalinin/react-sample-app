import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {testCheckboxes} from '../../../helpers/selects/testCheckboxes';
import {trueFalse} from '../../../helpers/selects/trueFalse';
import {projectSpecialists} from '../../../helpers/selects/projectSpecialists';
import {remotes} from '../../../helpers/selects/remotes';
import {renderField} from '../../forms/renders/RenderField';
import RenderMarkdown from '../../forms/renders/RenderMarkdown';
import RenderSelect from '../../forms/renders/RenderSelect';
import {DropdownAvailability} from '../../../styleComponents/StyledDropdown';
import RenderCheckbox from '../../forms/renders/RenderCheckbox';
import SlideTogle from '../../SlideTogle';
import { required, } from '../../../helpers/validate';
import InputField from "../../forms/renders/InputField";

class DetailsSelects extends Component {

    render() {
        const { handleSubmit, submitting } = this.props;

        return(
            <div>
                <RenderMarkdown
                    name="explain"
                    title="In your own words, explain your project and it's requirements /"
                />
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
                <RenderMarkdown
                    name="notes"
                    title="Further notes /"
                />
            </div>
        )
    }


}

export default DetailsSelects