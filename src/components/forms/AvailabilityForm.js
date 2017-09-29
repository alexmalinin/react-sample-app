import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
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
import {connect} from 'react-redux';
import { phoneCodes } from '../../helpers/phoneCodes'
import { required, minLength2, email } from '../../helpers/validate';
import { RenderField } from './renders/RenderField';
import RenderRadio from './renders/RenderRadio';
import StyledPhoneField from '../../styleComponents/forms/StyledPhoneField'
import StyledRequireBox from '../../styleComponents/forms/StyledRequireBox'
import ModalTerms from '../modals/ModalTerms';
import PrivacyPolicy from '../modals/PrivacyPolicy';
import EmailField from './renders/EmailField';
import { Select } from 'semantic-ui-react'
import { Form, Radio } from 'semantic-ui-react';

class AvailabilityForm extends Component  {

    render() {
        const { handleSubmit, submitting, person, changeUserType, hasPerson } = this.props;
        return (
            <div>
                <p>Full-time / Part-time / Not available</p>
                <div>
                    <Field name="availability"
                           component={RenderRadio}
                           type="radio"
                           label="Full Time"
                           value="Full Time"

                    />
                    <Field name="availability"
                           component={RenderRadio}
                           type="radio"
                           label="Part Time"
                           value="Part Time"
                    />
                    <Field name="availability"
                           component={RenderRadio}
                           type="radio"
                           label="Not available"
                           value="Not available"
                    />
                </div>
            </div>
        )
    }
}

export default AvailabilityForm;