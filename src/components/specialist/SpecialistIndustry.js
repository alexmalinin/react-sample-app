import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderBasic from '../layout/HeaderBasic';
import SubHeader from '../layout/SpecialistsSubHeader';
import SpecialistIndustryForm from './forms/SpecialistIndustryForm';
import { getIndustries, showSpecialistData, updateSpecStep1 } from '../../actions/actions'
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
        this.props.getIndustries();
        this.props.showSpecialistData();
    }

    render() {
        const { renderMessage } = this.state;
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
                <Container indentBot indentTop className="relative">
                    <S_Message positive data-show={renderMessage}>
                        <Message.Header>Success!</Message.Header>
                        <p>Form updated</p>
                    </S_Message>
                    <DvTitleSmall>Industry</DvTitleSmall>
                    <SpecialistIndustryForm industries={industries} specialistData={specialistData} onSubmit={this.submit}/>
                </Container>
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.specialistData) {
            if (nextProps.specialistData.successIndustryId) {
                run(0)();
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
        this.props.updateSpecStep1(values);
    };
}

export default connect(({ industries, specialistData }) => ({ industries, specialistData }), { updateSpecStep1, getIndustries, showSpecialistData })(SpecialistIndustry);