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
import { showSpecialistData, updateSpecialistProfile } from '../../../actions/actions';

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

    collectPropfileData() {
        const { first_name, last_name, email, address: {city, country}, phone_number, professional_experience_info, } = this.props.specialistData
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

    collectIndustryData() {
        const { job_title, position, industry_title, contact_number, hourly_rate, experience_level_id, } = this.props.specialistData;
        // const project_type_name = this.props.specialistData.project_type.name;

        const data = {
            job_title,
            position,
            industry_title,
            experience_level_id,
            contact_number,
            // project_type_name,
            hourly_rate,
        }


        console.log(data, 'data')
        return data;
    }

    collectCompanyData() {
        if (this.props.specialistData.company) {
            const { city, company_address, country, industry_area_id, number_of_employers, segment, website } = this.props.specialistData.company
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
        if (this.props.specialistData.specialist_billing) {

            const { billing_type, bank_account_details, swift_code, company_name, manager } = this.props.specialistData.specialist_billing
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

        if (this.props.specialistData) {
            if (this.props.specialistData.first_name) {
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
    }

    render() {

        console.log(this.props, 'props')
        console.log(this.state, 'state')
        const {match:{params}} = this.props;
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

        return (

            <div>
                <HeaderBasic page={sidebarCondition} userType="specialist"/>
                <S_MainContainer>
                    {sidebarCondition && <SideBarLeft projects={projects}/>}
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
            if (nextProps.specialistData.first_name) {
                this.calculatePercents()   
            }
        }
    }
}

export default connect(
    ({specialistData, confirmPassword,  educations, experiences}) => ({specialistData, confirmPassword,  educations, experiences}),
    { showSpecialistData, updateSpecialistProfile }
)(SpecialistsDashboard);