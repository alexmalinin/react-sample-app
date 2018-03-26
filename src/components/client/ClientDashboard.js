import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import HeaderBasic from '../layout/HeaderBasic';
import SubHeader from '../layout/ClientSubHeader';
import { S_MainContainer } from '../../styleComponents/layout/S_MainContainer';
import { Container } from '../../styleComponents/layout/Container';
import ClientProfile from './ClientProfile';
import ClientCompany from './ClientCompany';
import ClientBilling from './ClientBilling';
import ProjectsBoard from '../ProjectsBoard';
import SideBarLeft from './renders/SideBarLeft';
import SideBarRight from './renders/SideBarRight';
import { projects, days } from '../../helpers/sidebarDbEmulate';
import ClientProjects from './ClientProjects';
import ClientModule from './ClientModule';
import Dashboard from '../Dashboard';
import TheVillage from '../TheVillage';
import { showClientData } from '../../actions/actions';

class ClientDashboard extends Component {

  constructor() {
    super();
    this.state = {
        profilePercent: null,
        companyPercent: null,
        billingPercent: null,
    }
    this.calculatePagePercent = this.calculatePagePercent.bind(this)
  }

  collectPropfileData() {
    const { first_name, last_name, email, address: {city, country}, phone_number, professional_experience_info, } = this.props.clientData
    const data = {
        first_name,
        last_name,
        email,
        city,
        country,
        phone_number,
        professional_experience_info,
    }
    return data;
  }

  collectCompanyData() {
    if (this.props.clientData.company) {
      const { city, company_address, country, industry_area_id, number_of_employers, segment, website } = this.props.clientData.company
        const data = {
        city, 
        company_address, 
        country, 
        industry_area_id, 
        number_of_employers, 
        segment, 
        website
      }
      return data;
    }  
  }

  collectBillingData() {

    if (this.props.clientData.customer_billing) {
      const { billing_type, account_number, password, card_name, card_number, expiry_date, ccv, account_details} = this.props.clientData.customer_billing

      if(billing_type === 0) {
        const data = {
          account_number,
          password,
        }
        return data;
      }

      if(billing_type === 1) {
        const data = {
          card_name,
          card_number,
          expiry_date,
          ccv,
        }
        return data;
      }

      if(billing_type === 2) {
        const data = {
          account_details
        }
        return data;
      }
    }
  }

  calculatePagePercent(percentName, data) {
    let arr = [];
    let arr2 = [];
    for (let key in data) {
      if (data[key]) {
        arr2.push(data[key]) 
      }
      arr.push(data[key])
    }

    const filedFields = arr2.length
    const allFields = arr.length
    
    const percents = Math.round((filedFields / allFields) * 100);

    this.setState({
        [percentName]: percents,
    })       
  }

  calculatePercents() {

    if (this.props.clientData) {
      if (this.props.clientData.first_name) {
        const profileData = this.collectPropfileData()
        const companyData = this.collectCompanyData()
        const billingData = this.collectBillingData()

        this.calculatePagePercent('profilePercent', profileData);
        this.calculatePagePercent('companyPercent', companyData);
        this.calculatePagePercent('billingPercent', billingData);

      }
    }
  } 

  render() {

    console.log(this.state, '123132');

    const {match:{params}} = this.props;
    let page = params['page'];
    let sidebarCondition = page === 'projects' || page === 'board' || page === 'module' || page === 'root' || page === 'the_village';

    return (
      <div>
        <HeaderBasic props={this.props} page={sidebarCondition} userType='client'/>
        <S_MainContainer>
          {sidebarCondition && <SideBarLeft projects={projects}/>}
            <Container>  
              <SubHeader percents={this.state}/>
              {this.renderPage(page)}
            </Container>
          {sidebarCondition && <SideBarRight projects={projects} days={days}/>}
        </S_MainContainer>
      </div>
    )
  }

  renderPage = (page) => {
    switch (page) {
      case 'profile':
        return <ClientProfile calculatePagePercent={this.calculatePagePercent}/>;
      case 'company':
        return <ClientCompany calculatePagePercent={this.calculatePagePercent}/>;
      case 'billing':
        return <ClientBilling calculatePagePercent={this.calculatePagePercent}/>;
      case 'projects':
        return <ClientProjects/>;
      case 'module':
        return <ClientModule/>;
      case 'board':
        return <ProjectsBoard/>;
      case 'the_village':
        return <TheVillage/>;
      case 'root':
        return <Dashboard/>;
      default:
        return <ClientProfile/>
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.clientData) {
      if (nextProps.clientData.first_name) {
          this.calculatePercents()   
      }
  }
  }
}

export default connect(({clientData}) => ({clientData}), {showClientData})(ClientDashboard);