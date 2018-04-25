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
import { showSpecialistData, updateSpecialistProfile, showAllProjects } from '../../../actions/actions';

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
        let page = params['page'];
        let sidebarCondition =
             page === 'about'
          || page === 'board'
          || page === 'test'
          || page === 'statement'
          || page === 'year_to_date'
          || page === 'account'
          || page === 'teams'
          || page === 'the_village'
          || page === 'root';

          // console.log('spec',this.props)

        return (

            <div>
                <HeaderBasic page={sidebarCondition} userType="specialist"/>
                <S_MainContainer>
                    {sidebarCondition && <SideBarLeft projects={allProjects}/>}
                        {sidebarCondition
                            ? this.renderPage(page)
                            : <Container>
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
            case 'teams':
                return <SpecialistsMyTeams team={team}/>;
            case 'industry':
                return <SpecialistIndustry calculatePagePercent={this.calculatePagePercent} collectPropfileData={this.collectPropfileData}/>;
            case 'company':
              return <SpecialistsCompany calculatePagePercent={this.calculatePagePercent} collectPropfileData={this.collectPropfileData}/>;
            case 'billings':
              return <SpecialistsMyBillings calculatePagePercent={this.calculatePagePercent} collectPropfileData={this.collectPropfileData}/>;
            case 'about':
                return <SpecialistsAbout/>;
            case 'board':
                return <ProjectsBoard/>;
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
            case 'root':
                return <Dashboard/>;
            default:
                return <SpecialistsAbout/>;
        }
    };

    componentWillReceiveProps(nextProps) {

        if (nextProps.specialistData) {
            if (nextProps.specialistData.email) {
                this.calculatePercents()
            }
        }
    }
}

export default connect(
    ({specialistData, confirmPassword,  educations, experiences, allProjects}) => ({specialistData, confirmPassword,  educations, experiences, allProjects}),
    { showSpecialistData, updateSpecialistProfile, showAllProjects }
)(SpecialistsDashboard);
