import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderBasic from '../layout/HeaderBasic';
import SubHeader from '../layout/SpecialistsSubHeader';
import SpecialistInfoForm from './forms/SpecialistInfoForm';
import { getProjectTypes, showSpecialistData, updateSpecialistInfo } from '../../actions/actions'
import {DvTitle, DvTitleSmall} from '../../styleComponents/layout/DvTitles';
import { Container, ContainerLarge } from '../../styleComponents/layout/Container';
import { Message } from 'semantic-ui-react';
import { S_Message } from '../../styleComponents/layout/S_Message';
import { run } from '../../helpers/scrollToElement';

class SpecialistIndustry extends Component {

    state = {
        renderMessage: false,
    };

    componentWillMount() {
        this.props.showSpecialistData();
        this.props.getProjectTypes()
    }

    render() {
        const { renderMessage } = this.state;
        const { specialistData, projectTypes, educations, experiences } = this.props;

        return (
            <div>
                <HeaderBasic/>
                <ContainerLarge>
                    <DvTitle mTop='80'>
                        Welcome to The Village!
                    </DvTitle>
                </ContainerLarge>
                <SubHeader/>
                <Container indentBot indentTop className="relative">
                    <S_Message positive data-show={renderMessage}>
                        <Message.Header>Success!</Message.Header>
                        <p>Form updated</p>
                    </S_Message>
                    <DvTitleSmall>Info</DvTitleSmall>
                    <SpecialistInfoForm educations={educations} experiences={experiences} projectTypes={projectTypes} specialistData={specialistData} onSubmit={this.submit}/>
                </Container>
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.specialistData) {
            if (nextProps.specialistData.successInfoId) {
                console.log('ID', nextProps.specialistData.successInfoId);
                run(0, 10)();
                this.showMessage()
            }
        }
    }

    showMessage = () => {
        setTimeout( () => {
                return this.setState({
                    renderMessage: false,
                })
            }, 2000
        );

        this.setState({
            renderMessage: true,
        });
    };

    submit = values => {
        const { updateSpecialistInfo, educations, experiences } = this.props;
        updateSpecialistInfo(values, educations, experiences)
    };
}

export default connect(
    ({ specialistData, projectTypes, educations, experiences }) => ({ specialistData, projectTypes, educations, experiences }),
    { showSpecialistData, getProjectTypes, updateSpecialistInfo }
    )(SpecialistIndustry);