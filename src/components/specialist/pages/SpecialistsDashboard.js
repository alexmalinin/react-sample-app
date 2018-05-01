import React, {Component, Fragment} from 'react';
import HeaderBasic from '../../layout/HeaderBasic';
import SubHeader from '../../layout/SpecialistsSubHeader';
import { connect } from 'react-redux';
import { S_MainContainer } from '../../../styleComponents/layout/S_MainContainer';
import SideBarLeft from '../renders/SideBarLeft';
import SideBarRight from '../renders/SideBarRight';
import SpecialistsProfile from "./SpecialistsProfile";
import SpecialistsMyTeams from "./SpecialistsMyTeams";
import SpecialistsCompany from "./SpecialistsCompany";
import SpecialistIndustry from "./SpecialistIndustry";
import SpecialistsAbout from "./SpecialistsAbout";
import StyledClientTeam from '../../../styleComponents/StyledClientTeam';
import SpecialistsTest from "./SpecialistsTest";
import SpecialistsMyBillings from './SpecialistsMyBillings';
import SpecialistAccount from './SpecialistAccount';
import SpecialistYTD from './SpecialistYTD';
import SpecialistStatement from './SpecialistStatement';
import TheVillage from '../../TheVillage';
import { projects, days, team } from '../../../helpers/sidebarDbEmulate';
import ProjectsBoard from '../../ProjectsBoard';
import Dashboard from '../../Dashboard';
import { Container } from '../../../styleComponents/layout/Container';
import { 
    showSpecialistData, 
    updateSpecialistProfile, 
    showAllProjects, 
    showProjectWithId, 
    showAllEpics, 
    showSpecialistProjects 
} from '../../../actions/actions';
import Teams from '../../Teams';

const mapPageNameToFieldsCount = {
    'profilePercent': 7,
    'industryPercent': 10,
    'companyPercent': 8,
    'billingPercent': 2,
}

class SpecialistsDashboard extends Component {

    constructor() {
        super();
        this.state = {
            profilePercent: null,
            industryPercent: null,
            companyPercent: null,
            billingPercent: null,
        }
        this.calculatePagePercent = this.calculatePagePercent.bind(this)
    }

    componentWillMount() {
        this.props.showAllProjects();
        this.props.showSpecialistProjects();
    }

    collectPropfileData() {
        const { first_name, last_name, email, address, phone_number } = this.props.specialistData
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

    collectIndustryData() {
        const { job_title, position, industry_title, communication_type, contact_number, hourly_rate, experience_level_id, project_type, available, skills: skills_attributes } = this.props.specialistData;

        const data = {
            job_title,
            position,
            industry_title,
            industry: {},
            experience_level_id,
            contact_number,
            project_type,
            hourly_rate,
            available,
            skills_attributes,
            communication_type
        }

        return data;
    }

    collectCompanyData() {
        const { company } = this.props.specialistData
        const { name, city, company_address, country, industry_area_id, number_of_employers, segment, website } = company ? company : {}

        const data = {
            name,
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

    collectBillingData() {
        const { specialist_billing } = this.props.specialistData
        const { billing_type, bank_account_details, swift_code, company_name, manager } = specialist_billing ? specialist_billing : {}

        if (billing_type === 0) {
            const data = {
                bank_account_details,
                swift_code
            }
            return data;
        }

        if (billing_type === 1) {
            const data = {
                company_name,
                manager
            }
            return data;
        }

        return {}
    }

    calculatePagePercent(percentName, data) {
        const fieldsCount = mapPageNameToFieldsCount[percentName]

        const keys = Object.keys(data)
        const filledFields = keys.filter(key => data[key]).length

        let percents = Math.round((filledFields / fieldsCount) * 100);
        percents = percents > 100 ? 100 : percents;

        this.setState({
            [percentName]: percents,
        })
    }

    calculatePercents() {
        if (this.props.specialistData) {
            const profileData = this.collectPropfileData()
            const industryData = this.collectIndustryData()
            const companyData = this.collectCompanyData()
            const billingData = this.collectBillingData()

            this.calculatePagePercent('profilePercent', profileData);
            this.calculatePagePercent('industryPercent', industryData);
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
        else if (params['projectId']){
            page = 'board';
        }
        else if (params['projectNewModule']){
            page = 'module';
        } else page = 'root;'

        let sidebarCondition = 
             page !== 'profile' 
          && page !== 'industry'
          && page !== 'company'
          && page !== 'billings';

        return (

            <div>
                <HeaderBasic page={sidebarCondition}/>
                <S_MainContainer sidebarCondition={sidebarCondition}>
                    {sidebarCondition && <SideBarLeft projects={[]} currentProject={params['projectId']} currentEpic={params['moduleId']}/>}
                        {sidebarCondition 
                            ? this.renderPage(page)
                            : <Container sidebarCondition={sidebarCondition}>
                                <SubHeader percents={this.state}/>
                                {this.renderPage(page)}
                              </Container>
                        }
                    {sidebarCondition && <SideBarRight projects={projects} days={days}/>}
                </S_MainContainer>
            </div>
        );
    }

    renderPage = (page) => {
        switch (page) {
            case 'profile':
                return <SpecialistsProfile calculatePagePercent={this.calculatePagePercent} collectPropfileData={this.collectPropfileData}/>;
            case 'industry':
                return <SpecialistIndustry calculatePagePercent={this.calculatePagePercent} collectPropfileData={this.collectPropfileData}/>;
            case 'company':
              return <SpecialistsCompany calculatePagePercent={this.calculatePagePercent} collectPropfileData={this.collectPropfileData}/>;
            case 'billings':
              return <SpecialistsMyBillings calculatePagePercent={this.calculatePagePercent} collectPropfileData={this.collectPropfileData}/>;
            case 'about':
                return <SpecialistsAbout/>;
            case 'board':
                return <ProjectsBoard
                    projectId={this.props.match.params['projectId']}
                    currentEpic={this.props.match.params['moduleId'] || 'all'}
                    history={this.props.history}/>;
            case 'teams':
                return <Teams teams={this.props.allTeams}/>;
            case 'test':
                return <SpecialistsTest/>;
            case 'account':
                return <SpecialistAccount/>;
            case 'year_to_date':
                return <SpecialistYTD/>;
            case 'statement':
                return <SpecialistStatement/>;
            case 'the_village':
                return <TheVillage/>;
            default:
                return <Dashboard projects={this.props.specialistProjects}/>; 
        }
    };

    componentWillReceiveProps(nextProps) {

        if (nextProps.specialistData) {
            if (nextProps.specialistData.email) {
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
    ({specialistData, confirmPassword,  educations, experiences, allProjects, projectWithId, specialistProjects, allTeams}) => ({specialistData, confirmPassword,  educations, experiences, allProjects, projectWithId, specialistProjects, allTeams}),
    { showSpecialistData, updateSpecialistProfile, showAllProjects, showProjectWithId, showAllEpics, showSpecialistProjects }
)(SpecialistsDashboard);
