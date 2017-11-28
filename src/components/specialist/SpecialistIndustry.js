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
        renderErrorMessage: false,
    };

    componentWillMount() {
        this.props.getIndustries();
        this.props.showSpecialistData();
    }

    render() {
        const { renderMessage, renderErrorMessage } = this.state;
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
                    <S_Message negative data-show={renderErrorMessage}>
                        <Message.Header>Error!</Message.Header>
                        <p>Something went wrong, please try again</p>
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

export default connect(({ industries, specialistData }) => ({ industries, specialistData }), { updateSpecStep1, getIndustries, showSpecialistData })(SpecialistIndustry);