import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderBasic from '../layout/HeaderBasic';
import SubHeader from '../layout/SpecialistsSubHeader';
import SpecialistIndustryForm from './forms/SpecialistIndustryForm';
import { getIndustries, showSpecialistData, updateSpecStep1 } from '../../actions/actions'
import {DvTitle, DvTitleSmall} from '../../styleComponents/layout/DvTitles';
import { Container, ContainerLarge } from '../../styleComponents/layout/Container';

class SpecialistIndustry extends Component {

    componentWillMount() {
        this.props.getIndustries();
        this.props.showSpecialistData();
    }

    render() {
        const { industries, specialistData } = this.props;

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
                    <DvTitleSmall>Industry</DvTitleSmall>
                    <SpecialistIndustryForm industries={industries} specialistData={specialistData} onSubmit={this.submit}/>
                </Container>
            </div>
        )
    }

    submit = values => {
        this.props.updateSpecStep1(values);
    };
}

export default connect(({ industries, specialistData }) => ({ industries, specialistData }), { updateSpecStep1, getIndustries, showSpecialistData })(SpecialistIndustry);