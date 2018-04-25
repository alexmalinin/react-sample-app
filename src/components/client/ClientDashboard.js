import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { showClientData, showAllProjects, showProjectWithId, showAllEpics } from '../../actions/actions'
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
import Teams from '../Teams';
import Dashboard from '../Dashboard';
import TheVillage from '../TheVillage';

const mapPageNameToFieldsCount = {
  'profilePercent': 7,
  'companyPercent': 11,
  'billingPercent': null
}

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

  componentWillMount() {
    this.props.showAllProjects();

    let projectId = this.props.match.params["projectId"];

    if(projectId && !this.props.projectWithId){
      this.props.showProjectWithId(projectId);
    }
  }

  collectPropfileData() {
    const { first_name, last_name, email, address, phone_number } = this.props.clientData
    const { city, country } = address ? address : {}
    const data = {
        first_name,
        last_name,
        email,
        city,
        country,
        phone_number,
        additionalField: 'additionalField'
    }
    return data;
  }

  collectCompanyData() {
    const { company } = this.props.clientData;
    const { name, city, abn_acn, tell_about, register_name, company_address, country, industry_area_id, number_of_employers, segment, website } = company ? company : {}

    const data = {
        abn_acn,
        name,
        company_address,
        city, 
        country, 
        industry_area_id, 
        number_of_employers, 
        register_name,
        segment, 
        website,
        tell_about,
        ololo: {}
    }
    return data;
  }

  collectBillingData() {
    const { customer_billing } = this.props.clientData;
    const { billing_type, 
            account_number, 
            password, 
            card_name, 
            card_number, 
            expiry_date, 
            ccv, 
            account_details } = customer_billing ? customer_billing : {}

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

  calculatePagePercent(percentName, data ) {

    if (!data) {
      return 0
    }

    if (percentName === 'billingPercent') {

      let fieldsCount = data.count;
      let mydata = data.data;

      if (!mydata) {
        return 0
      }

      const keys = Object.keys(mydata)
      const filledFields = keys.filter(key => mydata[key]).length
      
      let percents = Math.round((filledFields / fieldsCount) * 100);
      percents = percents > 100 ? 100 : percents

      this.setState({
        [percentName]: percents,
      })    
      return
    }
    

    let fieldsCount = mapPageNameToFieldsCount[percentName]

    const keys = Object.keys(data)
    const filledFields = keys.filter(key => data[key]).length
    
    let percents = Math.round((filledFields / fieldsCount) * 100);
    percents = percents > 100 ? 100 : percents

    this.setState({
      [percentName]: percents,
    })        
  }

  calculatePercents() {

    if (this.props.clientData) {
      const profileData = this.collectPropfileData()
      const companyData = this.collectCompanyData()
      const billingData = this.collectBillingData()

      this.calculatePagePercent('profilePercent', profileData);
      this.calculatePagePercent('companyPercent', companyData);
      this.calculatePagePercent('billingPercent', billingData);
    }
  } 

  render() {
    const {match:{params}, allProjects} = this.props;
    let page;

    if(params['page']){
      page = params['page'];
    }
    else if (params['projectId'] && params['moduleId']){
      page = 'board';
    }
    else if (params['projectId']){
      page = 'module';
    }

    let sidebarCondition = 
           page === 'projects'
        || page === 'board'
        || page === 'teams'
        || page === 'module'
        || page === 'root'
        || page === 'the_village';

    return (
      <div>
        <HeaderBasic props={this.props} page={sidebarCondition} userType='client'/>
          <S_MainContainer sidebarCondition={sidebarCondition}>
            {sidebarCondition && <SideBarLeft currentProject={params['projectId']} currentEpic={params['moduleId']} projects={allProjects}/>}
              {sidebarCondition 
                ? this.renderPage(page)
                  : <Container sidebarCondition={sidebarCondition}>
                      <SubHeader percents={this.state} sidebarCondition={sidebarCondition}/>
                      {this.renderPage(page)}
                    </Container>
              }
            {sidebarCondition && <SideBarRight projects={projects} days={days}/>}
          </S_MainContainer>
      </div>
    )
  }

  renderPage = (page) => {
    switch (page) {
      case 'profile':
        document.title = 'Profile | Digital Village';
        return <ClientProfile calculatePagePercent={this.calculatePagePercent}/>;
      case 'company':
        document.title = 'Company | Digital Village';
        return <ClientCompany calculatePagePercent={this.calculatePagePercent}/>;
      case 'billing':
        document.title = 'Billing | Digital Village';
        return <ClientBilling calculatePagePercent={this.calculatePagePercent}/>;
      case 'projects':
        document.title = 'Add Project | Digital Village';
        return <ClientProjects />;
      case 'module':
        document.title = 'Add Module | Digital Village';
        return <ClientModule projectId={this.props.match.params['projectId']}/>;
      case 'board':
        return <ProjectsBoard 
            project={this.props.projectWithId}
            projectId={this.props.match.params['projectId']}
            allEpics={this.props.allEpics}
            currentEpic={this.props.match.params['moduleId'] || 'all'}
          />;
      case 'teams':
        document.title = 'Teams | Digital Village';
        return <Teams/>;    
      case 'the_village':
        document.title = 'The Village | Digital Village';
        return <TheVillage/>;
      case 'root':
        document.title = 'Dashboard | Digital Village';
        return <Dashboard/>;
      default:
        document.title = 'Digital Village';
        return <ClientProfile/>
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.clientData) {
      if (nextProps.clientData.email) {
          this.calculatePercents()   
      }
    }

    let projectId = nextProps.match.params["projectId"];

    if(projectId && nextProps.projectWithId){
      if(nextProps.projectWithId.id != projectId){
        nextProps.showProjectWithId(projectId);
        nextProps.showAllEpics(projectId);
      }
    }
    else if(projectId) {
      nextProps.showProjectWithId(projectId);
    }
  }
}

export default connect(
  ({allProjects, projectWithId, allEpics}) => ({allProjects, projectWithId, allEpics}),
  { showAllProjects, showProjectWithId, showAllEpics }
)(ClientDashboard);
