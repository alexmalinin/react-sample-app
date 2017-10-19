import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {testCheckboxes} from '../../../helpers/selects/testCheckboxes';
import {trueFalse} from '../../../helpers/selects/trueFalse';
import {projectSpecialists} from '../../../helpers/selects/projectSpecialists';
import {remotes} from '../../../helpers/selects/remotes';
import {renderField} from '../../forms/renders/RenderField';
import RenderSelect from '../../forms/renders/RenderSelect';
import {DropdownAvailability} from '../../../styleComponents/StyledDropdown';
import RenderCheckbox from '../../forms/renders/RenderCheckbox';
import SlideTogle from '../../SlideTogle';
import { required, } from '../../../helpers/validate';
import InputField from "../../forms/renders/InputField";
import RichTextEditor from 'react-rte';

class DetailsSelects extends Component {

    state = {
        value: RichTextEditor.createEmptyValue()
    };

    render() {
        window.value = this.state.value.toString('html');

        const { handleSubmit, submitting } = this.props;
        const toolbarConfig = {
            // Optionally specify the groups to display (displayed in the order listed).
            display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS',],
            INLINE_STYLE_BUTTONS: [
                {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
                {label: 'Italic', style: 'ITALIC'},
            ],
            BLOCK_TYPE_BUTTONS: [
                {label: 'UL', style: 'unordered-list-item'},
                {label: 'OL', style: 'ordered-list-item'}
            ]
        };

        return(
            <div>
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

                <RichTextEditor
                    value={this.state.value}
                    onChange={this.onChange}
                    toolbarConfig={toolbarConfig}
                />
            </div>
        )
    }

    onChange = (value) => {
        this.setState({value});
    };
}

export default DetailsSelects