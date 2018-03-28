import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import HeaderBasic from '../../layout/HeaderBasic';
import SubHeader from '../../layout/SpecialistsSubHeader';
import { getIndustries, updateSpecialistBillings, showSpecialistData } from '../../../actions/actions'
import {DvTitle, DvTitleSmall} from '../../../styleComponents/layout/DvTitles';
import { Container, ContainerLarge } from '../../../styleComponents/layout/Container';
import { S_MainContainer } from '../../../styleComponents/layout/S_MainContainer';
import { Message } from 'semantic-ui-react';
import { S_Message } from '../../../styleComponents/layout/S_Message';
import { run } from '../../../helpers/scrollToElement';
import SpecialistBillingForm from '../forms/SpecialistBillingForm';

class SpecialistsMyBillings extends Component {

  constructor() {
    super();

    this.state = {
      renderMessage: false,
      renderErrorMessage: false,
      nextStep: false,
    };

    this.data = {
      bank_account_details: null, 
      swift_code: null
    }

    this.handleFormField = this.handleFormField.bind(this);
  }

  handleFormField(e) {
    let data = e.target.value;
    this.data[e.target.name] = data;

    this.props.calculatePagePercent('billingPercent', this.data);
  }

  setData() {
    if(this.props.specialistData) {
      if(this.props.specialistData.specialist_billing) {
        const { bank_account_details, swift_code } = this.props.specialistData.specialist_billing
        this.data = {
            bank_account_details, 
            swift_code
        }
      }
    }
  }

  componentWillMount() {
    this.props.showSpecialistData();
  }

  render() {
    const { renderMessage, renderErrorMessage } = this.state;

    return (
      <div>
        {/*<ContainerLarge>*/}
        {/* <DvTitle mTop='80'>
          Welcome to The Village!
        </DvTitle> */}
        {/*</ContainerLarge>*/}
        <S_Message positive data-show={renderMessage}>
          <Message.Header>Success!</Message.Header>
          <p>Form updated</p>
        </S_Message>
        <S_Message negative data-show={renderErrorMessage}>
          <Message.Header>Error!</Message.Header>
          <p>Something went wrong, please try again</p>
        </S_Message>
        {/* <DvTitleSmall>My Billings</DvTitleSmall> */}

        <SpecialistBillingForm data={this.props.specialistData} onSubmit={this.submit} handleFormField={this.handleFormField}/>
        {this.state.nextStep && <Redirect to="about"/>}

      </div>
    )
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.specialistData) {
      if (this.props.specialistData.first_name) {
        this.setData()
      }
    }

    if (nextProps.specialistData) {
      if (nextProps.specialistData.successUpdateId) {
        run(0)();
        this.showMessage('success')
      } else if(nextProps.specialistData.errorUpdateId) {
        run(0)();
        this.showMessage();
      }
    }
  }

  showMessage = status => {
    setTimeout( () => {
        return this.setState({
          renderMessage: false,
          renderErrorMessage: false,
          nextStep: true,
        })
      }, 1500
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
    this.props.updateSpecialistBillings(values);
  };
}

export default connect(
  ({ specialistData }) => ({ specialistData }),
  { updateSpecialistBillings, showSpecialistData }
)(SpecialistsMyBillings);
