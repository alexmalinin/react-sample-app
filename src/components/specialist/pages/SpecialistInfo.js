import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderBasic from '../../layout/HeaderBasic';
import SubHeader from '../../layout/SpecialistsSubHeader';
import SpecialistInfoForm from '../forms/SpecialistInfoForm';
import { getProjectTypes, showSpecialistData, updateSpecialistInfo } from '../../../actions/actions'
import {DvTitle, DvTitleSmall} from '../../../styleComponents/layout/DvTitles';
import { Container, ContainerLarge } from '../../../styleComponents/layout/Container';
import { Message } from 'semantic-ui-react';
import { S_Message } from '../../../styleComponents/layout/S_Message';
import { S_MainContainer } from '../../../styleComponents/layout/S_MainContainer';
import { run } from '../../../helpers/scrollToElement';

class SpecialistInfo extends Component {

    state = {
        renderMessage: false,
        renderErrorMessage: false
    };

    componentWillMount() {
        this.props.showSpecialistData();
        this.props.getProjectTypes()
    }

    render() {
        const { renderMessage, renderErrorMessage } = this.state;
        const { specialistData, projectTypes, educations, experiences } = this.props;

        return (
            <Container indentBot indentTop className="relative">
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
                <DvTitleSmall>Info</DvTitleSmall>
                <SpecialistInfoForm 
                    educations={educations} 
                    experiences={experiences} 
                    projectTypes={projectTypes} 
                    specialistData={specialistData} 
                    onSubmit={this.submit}
                />
            </Container>
        )
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.specialistData) {
            if (nextProps.specialistData.successInfoId) {
                console.log('ID', nextProps.specialistData.successInfoId);
                run(0, 6)();
                this.showMessage('success')
            } else if(nextProps.specialistData.errorInfoId) {
                this.showMessage();
                run(0, 6)();
            }
        }
    }

    showMessage = status => {
        setTimeout( () => {
                return this.setState({
                    renderMessage: false,
                    renderErrorMessage: false,
                })
            }, 3700
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
        const { updateSpecialistInfo, educations, experiences } = this.props;
        updateSpecialistInfo(values, educations, experiences)
    };
}

export default connect(
    ({ specialistData, projectTypes, educations, experiences }) => ({ specialistData, projectTypes, educations, experiences }),
    { showSpecialistData, getProjectTypes, updateSpecialistInfo }
    )(SpecialistInfo);