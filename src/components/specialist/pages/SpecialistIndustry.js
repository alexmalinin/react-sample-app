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
            allFields: 6,
            filedFields: 0,
        };

        this.data = {};
        this.handleFormField = this.handleFormField.bind(this);
    }

    handleFormField(e) {

        let data = e.target.value;
        this.data[e.target.name] = data;
        this.calculatePercent(this.data);
        
        console.log('1313', this.data,)
    }

    handleInit() {

        if (this.props.specialistData) {
            if(this.props.specialistData.job_title){

                const job_title = this.props.specialistData.job_title;
                const position = this.props.specialistData.position;
                const industry_title = this.props.specialistData.industry_title;
                const experience_level_id = this.props.specialistData.experience_level_id;
                const contact_number = this.props.specialistData.contact_number;
                const hourly_rate = this.props.specialistData.hourly_rate;
                const posavailableition = this.props.specialistData.available;
                
                this.data = {
                    job_title,
                    position, 
                    industry_title, 
                    experience_level_id, 
                    contact_number,  
                    hourly_rate,    
                    }
                }
            console.log('thisdata', this.data)
            this.calculatePercent(this.data);
        }   
    }     

    calculatePercent(data) {
        let arr = [];
        for (let key in data) {
            if (data[key] !== '') {
                arr.push(data[key]) 
            }   
        }
        let countFields = arr.length;
        this.setState({
            filedFields: countFields,
        })
        let percents = Math.round((countFields / this.state.allFields) * 100);
        this.setState({
            percents
        });
    }

    componentWillMount() {
        this.props.getIndustries();
        this.props.getProjectTypes();
        this.props.getExperienceLevels();
        this.props.showSpecialistData();
    }

    render() {
        console.log('iv alive', this.data, this.state.percents)

        const { renderMessage, renderErrorMessage } = this.state;
        const { industries, projectTypes, experienceLevels, specialistData } = this.props;

        return (
            <div>
                {/*<ContainerLarge>*/}
                {/* <DvTitle mTop='80'>
                    Welcome to The Village!
                </DvTitle> */}
                {/*</ContainerLarge>*/}
                <S_Message positive data-show={renderMessage}>
                    <Message.Header>Success!</Message.Header>
                    <p>Form updated</p>
                </S_Message>
                <S_Message negative data-show={renderErrorMessage}>
                    <Message.Header>Error!</Message.Header>
                    <p>Something went wrong, please try again</p>
                </S_Message>
                {/* <DvTitleSmall>My Services</DvTitleSmall> */}
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
            this.handleInit()
        }

        console.log(nextProps);
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