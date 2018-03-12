import React, { Component } from 'react';
import { connect } from 'react-redux';
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

    state = {
        renderMessage: false,
        renderErrorMessage: false,
    };

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
            <Container indentBot indentTop className="relative">
                <SubHeader />
                {/*<ContainerLarge>*/}
                <DvTitle mTop='80'>
                    Welcome to The Village!
                </DvTitle>
                {/*</ContainerLarge>*/}
                <S_Message positive data-show={renderMessage}>
                    <Message.Header>Success!</Message.Header>
                    <p>Form updated</p>
                </S_Message>
                <S_Message negative data-show={renderErrorMessage}>
                    <Message.Header>Error!</Message.Header>
                    <p>Something went wrong, please try again</p>
                </S_Message>
                <DvTitleSmall>My Services</DvTitleSmall>
                <SpecialistIndustryForm
                        industries={industries}
                        projectTypes={projectTypes}
                        experienceLevels={experienceLevels}
                        specialistData={specialistData}
                        onSubmit={this.submit} />
            </Container>
        )
    }

    componentWillReceiveProps(nextProps) {
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
            }, 2000
        );

        status === 'success'
            ? this.setState({
                renderMessage: true,
            })
            : this.setState({
                renderErrorMessage: true,
            })
    };

    submit = values => {
        this.props.updateSpecStep1(values);
    };
}

export default connect(({ industries, projectTypes, experienceLevels, specialistData }) => ({ industries, projectTypes, experienceLevels, specialistData }),
  { updateSpecStep1, getIndustries, getProjectTypes, getExperienceLevels, showSpecialistData })(SpecialistIndustry);