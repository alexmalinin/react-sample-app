import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderBasic from '../layout/HeaderBasic';
import SubHeader from '../layout/SpecialistsSubHeader';
import SpecialistInfoForm from './forms/SpecialistInfoForm';
import { getProjectTypes, showSpecialistData } from '../../actions/actions'
import {DvTitle, DvTitleSmall} from '../../styleComponents/layout/DvTitles';
import { Container, ContainerLarge } from '../../styleComponents/layout/Container';

class SpecialistIndustry extends Component {

    componentWillMount() {
        this.props.showSpecialistData();
        this.props.getProjectTypes()
    }

    render() {
        const { specialistData, projectTypes } = this.props;

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
                    <SpecialistInfoForm projectTypes={projectTypes} specialistData={specialistData} onSubmit={this.submit}/>
                </Container>
            </div>
        )
    }

    submit = values => {
        console.log('---values',values)
    };
}

export default connect(
    ({ specialistData, projectTypes }) => ({ specialistData, projectTypes }),
    { showSpecialistData, getProjectTypes }
    )(SpecialistIndustry);