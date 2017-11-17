import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderBasic from '../layout/HeaderBasic';
import SubHeader from '../layout/SpecialistsSubHeader';
import SpecialistInfoForm from './forms/SpecialistInfoForm';
import { getProjectTypes, showSpecialistData, updateSpecialistInfo } from '../../actions/actions'
import {DvTitle, DvTitleSmall} from '../../styleComponents/layout/DvTitles';
import { Container, ContainerLarge } from '../../styleComponents/layout/Container';

class SpecialistIndustry extends Component {

    componentWillMount() {
        this.props.showSpecialistData();
        this.props.getProjectTypes()
    }

    render() {
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
                <Container indentBot indentTop>
                    <DvTitleSmall>Info</DvTitleSmall>
                    <SpecialistInfoForm educations={educations} experiences={experiences} projectTypes={projectTypes} specialistData={specialistData} onSubmit={this.submit}/>
                </Container>
            </div>
        )
    }

    submit = values => {
        console.log('render')
        const { updateSpecialistInfo, educations, experiences } = this.props;
        console.log('educations', educations);
        console.log('experiences', experiences);
        updateSpecialistInfo(values, educations, experiences)
    };
}

export default connect(
    ({ specialistData, projectTypes, educations, experiences }) => ({ specialistData, projectTypes, educations, experiences }),
    { showSpecialistData, getProjectTypes, updateSpecialistInfo }
    )(SpecialistIndustry);