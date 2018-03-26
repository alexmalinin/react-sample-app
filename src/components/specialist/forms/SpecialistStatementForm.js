import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
import RenderSelect from '../../forms/renders/RenderSelect';
import RenderField from '../../forms/renders/RenderField';
import InputField from '../../forms/renders/InputField';
import { Grid } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class SpecialistStatementForm extends Component {
    render() {

        console.log(this.props)

        return (
            <form>
                <Grid>
                    <Grid.Row>
                        <Grid.Column computer={4}>
                            <Field
                                label="start date"
                                placeholder="Select"
                                component={RenderSelect}
                                accountInput
                            />
                            <Field
                                label="end date"
                                placeholder="Select"
                                component={RenderSelect}
                                accountInput
                            />
                        </Grid.Column>
                        <Grid.Column computer={4}>
                            <Field
                                label="project"
                                placeholder="Select"
                                component={RenderSelect}
                                accountInput
                            />
                            <Field
                                label="module"
                                placeholder="Select"
                                component={RenderSelect}
                                accountInput
                            />
                        </Grid.Column>
                        <Grid.Column computer={4}>
                            <InputField 
                                name="filter"
                                label="Filter"
                                accountInput
                            />
                        </Grid.Column>
                        <Grid.Column computer={4}>
                            Download
                            <div className="statementLinks bottom">
                                <NavLink to='#' className="statementLink">
                                    exel
                                </NavLink>
                                <NavLink to='#' className="statementLink">
                                    pdf
                                </NavLink>
                                <NavLink to='#' className="statementLink">
                                    cvs
                                </NavLink>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                
            </form>
        )
    }
}

SpecialistStatementForm = reduxForm({
    form: 'SpecialistIndustryForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(SpecialistStatementForm);


export default SpecialistStatementForm;