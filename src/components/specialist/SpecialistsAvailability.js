import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderBasic from '../layout/HeaderBasic';
import SubHeader from '../layout/SpecialistsSubHeader';
import SpecialistAvailabilityForm from './Availability/SpecialistAvailabilityForm';
import { DvTitle, DvTitleSmall } from '../../styleComponents/layout/DvTitles';
import { Container, ContainerLarge } from '../../styleComponents/layout/Container';
import { S_Message } from '../../styleComponents/layout/S_Message';
import { showSpecialistData, updateSpecialistAvailability } from '../../actions/actions';
import { Message } from 'semantic-ui-react';
import { run } from '../../helpers/scrollToElement';

class SpecialistsAvailability extends Component {

    state = {
        renderMessage: false,
    };

    componentWillMount() {
        this.props.showSpecialistData();
    }

    render() {
        const { renderMessage } = this.state;

        return (
            <div>
                <HeaderBasic/>
                <ContainerLarge>
                    <DvTitle mTop='80'>
                        Welcome to The Village!
                    </DvTitle>
                </ContainerLarge>
                <SubHeader/>
                <Container indentTop indentBot  className="relative">
                    <S_Message positive data-show={renderMessage}>
                        <Message.Header>Success!</Message.Header>
                        <p>Form updated</p>
                    </S_Message>
                    <DvTitleSmall>Availability</DvTitleSmall>
                    <SpecialistAvailabilityForm onSubmit={this.submit}/>
                </Container>
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.specialistData.successAvailabilityId) {
            this.showMessage();
            run(0)();
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
        this.props.updateSpecialistAvailability(values)
    };
}

export default connect(({specialistData}) => ({specialistData}), {showSpecialistData, updateSpecialistAvailability} )(SpecialistsAvailability);