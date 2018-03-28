import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
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

  constructor() {
    super();

    this.state = {
      renderMessage: false,
      renderErrorMessage: false,
      nextStep: false,
    };

    this.data = {
      city: null, 
      company_address: null, 
      country: null, 
      industry_area_id: null, 
      name: null, 
      number_of_employers: null, 
      segment: null, 
      website: null,
    }

    this.handleFormField = this.handleFormField.bind(this);
  }

  handleFormField(e) {
    let data = e.target.value;
    this.data[e.target.name] = data;

    this.props.calculatePagePercent('companyPercent', this.data);
  }

  setData() {
    if(this.props.specialistData) {
      if(this.props.specialistData.company) {
        const { city, company_address, country, industry_area_id, name, number_of_employers, segment, website } = this.props.specialistData.company
        
        this.data = {
            city, 
            company_address, 
            country, 
            industry_area_id, 
            name, 
            number_of_employers, 
            segment, 
            website
        }
      }
    }
  }

  componentWillMount() {
    this.props.getIndustries();
    this.props.showSpecialistData();
  }

  render() {
    const { renderMessage, renderErrorMessage } = this.state;
    const { industries } = this.props;

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
        {/* <DvTitleSmall>My Company</DvTitleSmall> */}

        <SpecialistCompanyForm industries={industries} onSubmit={this.submit} handleFormField={this.handleFormField} />
        {this.state.nextStep && <Redirect to="billings"/>}

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
        })
      }, 1500
    );

    status === 'success'
      ? this.setState({
      renderMessage: true,
      nextStep: true,
    })
      : this.setState({
      renderErrorMessage: true,
    })
  };

  submit = values => {

    this.props.updateSpecStep2(values);
  };
}

export default connect(
  ({ industries, company, specialistData }) => ({ industries, company, specialistData }),
  { getIndustries, updateSpecStep2, showSpecialistData }
)(SpecialistCompany);
