import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderBasic from '../../layout/HeaderBasic';
import SubHeader from '../../layout/SpecialistsSubHeader';
import { getIndustries, updateSpecStep2, showSpecialistData } from '../../../actions/actions'
import {DvTitle, DvTitleSmall} from '../../../styleComponents/layout/DvTitles';
import { Container, ContainerLarge } from '../../../styleComponents/layout/Container';
import { S_MainContainer } from '../../../styleComponents/layout/S_MainContainer';
import { Message } from 'semantic-ui-react';
import { S_Message } from '../../../styleComponents/layout/S_Message';
import { run } from '../../../helpers/scrollToElement';
import SpecialistCompanyForm from "../forms/SpecialistCompanyForm";

class SpecialistCompany extends Component {

  state = {
    renderMessage: false,
    renderErrorMessage: false,
  };

  componentWillMount() {
    this.props.getIndustries();
  }

  render() {
    const { renderMessage, renderErrorMessage } = this.state;
    const { industries } = this.props;

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
        <DvTitleSmall>My Company</DvTitleSmall>

        <SpecialistCompanyForm industries={industries} onSubmit={this.submit} />

      </Container>
    )
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    debugger
    if (nextProps.specialistData) {
      if (nextProps.specialistData.successUpdateId) {
        run(0)();
        this.showMessage('success')
      } else if(nextProps.specialistData.errorUpdateId) {
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

    this.props.updateSpecStep2(values);
  };
}

export default connect(({ industries, company, specialistData }) => ({ industries, company, specialistData }),
  { getIndustries, updateSpecStep2, showSpecialistData })(SpecialistCompany);