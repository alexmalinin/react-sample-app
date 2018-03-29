import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import HeaderBasic from '../../layout/HeaderBasic';
import SubHeader from '../../layout/SpecialistsSubHeader';
import SpecialistIndustryForm from '../forms/SpecialistIndustryForm';
import { getProjectTypes, getExperienceLevels, getIndustries, showSpecialistData, updateSpecStep1 } from '../../../actions/actions'
import {DvTitle, DvTitleSmall} from '../../../styleComponents/layout/DvTitles';
import { Container, ContainerLarge } from '../../../styleComponents/layout/Container';
import { S_MainContainer } from '../../../styleComponents/layout/S_MainContainer';
import { Message } from 'semantic-ui-react';
import { S_Message } from '../../../styleComponents/layout/S_Message';
import { run } from '../../../helpers/scrollToElement';

class SpecialistIndustry extends Component {

    constructor() {
        super();

        this.state = {
            renderMessage: false,
            renderErrorMessage: false,
            nextStep: false,
        };

        this.data = {
            job_title: null,
            position: null,
            industry_title: null,
            experience_level_id: null,
            contact_number: null,
            // project_type_name: null,
            hourly_rate: null,
            available: null,
        }

        this.handleFormField = this.handleFormField.bind(this);
    }

    handleFormField(e) {
        let data = e.target.value;
        this.data[e.target.name] = data;

        this.props.calculatePagePercent('industryPercent', this.data);
    }

    setData() {
        if(this.props.specialistData) {
            if(this.props.specialistData.project_type) {
                const { job_title, position, industry_title, contact_number, hourly_rate, experience_level_id, } = this.props.specialistData;
                const project_type_name = this.props.specialistData.project_type.name;

                this.data = {
                    job_title,
                    position,
                    industry_title,
                    experience_level_id,
                    contact_number,
                    // project_type_name,
                    hourly_rate,
                }
            }
        }
    }

    componentWillMount() {
        this.props.getIndustries();
        this.props.getProjectTypes();
        this.props.getExperienceLevels();
        this.props.showSpecialistData();
    }

    render() {

        const { renderMessage, renderErrorMessage } = this.state;
        const { industries, projectTypes, experienceLevels, specialistData } = this.props;

        return (
            <div>
                <S_Message positive data-show={renderMessage}>
                    <Message.Header>Success!</Message.Header>
                    <p>Form updated</p>
                </S_Message>
                <S_Message negative data-show={renderErrorMessage}>
                    <Message.Header>Error!</Message.Header>
                    <p>Something went wrong, please try again</p>
                </S_Message>
                <SpecialistIndustryForm
                        handleFormField={this.handleFormField}
                        industries={industries}
                        projectTypes={projectTypes}
                        experienceLevels={experienceLevels}
                        specialistData={specialistData}
                        onSubmit={this.submit} />
                        {this.state.nextStep && <Redirect to="company"/>}
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.specialistData) {
            if (this.props.specialistData.first_name) {
                this.setData()
            }
        }

        if (nextProps.specialistData) {
            if (nextProps.specialistData.successIndustryId) {
                run(0)();
                this.showMessage('success')
            } else if(nextProps.specialistData.errorIndustryId) {
                run(0)();
                this.showMessage()
            }
        }
    }

    showMessage = status => {
        setTimeout( () => {
                return this.setState({
                    renderMessage: false,
                    renderErrorMessage: false,
                })
            }, 1500
        );

        status === 'success'
            ? this.setState({
                renderMessage: true,
                nextStep: true
            })
            : this.setState({
                renderErrorMessage: true,
            })
    };

    submit = values => {
        this.props.updateSpecStep1(values);
    };
}

export default connect(
    ({ industries, projectTypes, experienceLevels, specialistData }) => ({ industries, projectTypes, experienceLevels, specialistData }),
    { updateSpecStep1, getIndustries, getProjectTypes, getExperienceLevels, showSpecialistData }
)(SpecialistIndustry);