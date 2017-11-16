import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderBasic from '../layout/HeaderBasic';
import SubHeader from '../layout/SpecialistsSubHeader';
import SpecialistIndustryForm from './forms/SpecialistIndustryForm';
import { getIndustries, showSpecialistData } from '../../actions/actions'
import {DvTitle, DvTitleSmall} from '../../styleComponents/layout/DvTitles';
import { Container, ContainerLarge } from '../../styleComponents/layout/Container';

class SpecialistIndustry extends Component {

    componentWillMount() {
        this.props.getIndustries();
        this.props.showSpecialistData();
    }

    render() {
        const { indusrties, specialistData } = this.props;

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
                    <SpecialistIndustryForm indusrties={indusrties} specialistData={specialistData} onSubmit={this.submit}/>
                </Container>
            </div>
        )
    }

    submit = values => {
        console.log('---values',values)
    };
}

export default connect(({ indusrties, specialistData }) => ({ indusrties, specialistData }), { getIndustries, showSpecialistData })(SpecialistIndustry);