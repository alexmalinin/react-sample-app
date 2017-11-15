import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderBasic from '../layout/HeaderBasic';
import SubHeader from '../layout/SpecialistsSubHeader';
import SpecialistAvailabilityForm from './Availability/SpecialistAvailabilityForm';
import { DvTitle, DvTitleSmall } from '../../styleComponents/layout/DvTitles';
import { Container, ContainerLarge } from '../../styleComponents/layout/Container';
import { showSpecialistData } from '../../actions/actions';

class SpecialistsAvailability extends Component {

    componentWillMount() {
        this.props.showSpecialistData();
    }

    render() {

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
                    <DvTitleSmall>Availability</DvTitleSmall>
                    <SpecialistAvailabilityForm onSubmit={this.submit}/>
                </Container>
            </div>
        )
    }

    submit = values => {
        console.log('----values:',values);
    };
}

export default connect(null, {showSpecialistData} )(SpecialistsAvailability);