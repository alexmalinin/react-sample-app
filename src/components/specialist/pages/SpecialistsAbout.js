import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Grid, Tab } from 'semantic-ui-react'
import HeaderBasic from '../../layout/HeaderBasic';
import SubHeader from '../../layout/SpecialistsSubHeader';
import { Container, ContainerLarge } from '../../../styleComponents/layout/Container';
import { S_MainContainer } from '../../../styleComponents/layout/S_MainContainer';
import { DvTitle, DvTitleSmall } from '../../../styleComponents/layout/DvTitles';
import {StyledTabs } from '../../../styleComponents/StyledTabCard';
import SubscribeForm from '../../forms/SubscribeForm';
import StyledCheckbox from '../../../styleComponents/forms/StyledCheckbox';
import StyledProfile from '../../../styleComponents/StyledProfile';
import RenderTabCard from '../renders/RenderTabCard';
import { showSpecialistData, getExperienceLevels } from '../../../actions/actions';
import { PORT } from "../../../constans/constans";
import AboutSubHeader from '../../layout/SpecialistAboutSubHeader';

class SpecialistsAbout extends Component {
    // state = {
    //     rerender: false,
    // };

    componentWillMount() {
        this.props.getExperienceLevels();
        this.props.showSpecialistData();
    }

    renderText = (value) => value ? value : `Select`;

    render() {
        const {specialistData, experienceLevels} = this.props;

        let allSkills = specialistData ? specialistData["skills"] : null;
        let educations_experience = specialistData ? specialistData["educations"] : [];
        let work_experience = specialistData ? specialistData["work_experiences"] : [];
        let {avatar} = specialistData || false;
        // let industryArea = specialistData ? specialistData[];

        const panes = [
            {
                menuItem: 'Work History',
                render: () => <Tab.Pane attached={false}>
                                {work_experience.length
                                    ? work_experience.map(
                                        (work, index) =>
                                            <RenderTabCard key={index} context='work' work={work}/> )
                                    : <RenderTabCard context='work'/>
                                }
                                </Tab.Pane>
            },
            {
                menuItem: 'Education',
                render: () => <Tab.Pane attached={false}>
                                { educations_experience.length
                                    ? educations_experience.map(
                                        (education, index) =>
                                            <RenderTabCard key={index} context='education' education={education}/>)
                                    : <RenderTabCard context='education'/>
                                }
                              </Tab.Pane>
            },
        ];

        console.log(this.props);

        return (
            <ContainerLarge>
                <AboutSubHeader />
                <Container indentBot>                    
                    <StyledProfile>
                        <Grid padded={14}>

                            <SectionHeader />
                            <Grid.Row className='main-info'>
                                <Grid.Column computer={8} textAlign='right'>
                                    <div className='profile-image'>
                                        <div className="image-wrapper">
                                            <img src={avatar ? PORT + avatar.url : '/images/undefUser.png'} alt='avatar'/>
                                            {/* <img src='/images/undefUser.png' alt='avatar'/> */}
                                        </div>
                                    </div>
                                </Grid.Column>
                                <Grid.Column computer='8' textAlign='left'>
                                    <div className="profile-info">
                                        <h3>
                                            {specialistData ? specialistData["first_name"] : null} &nbsp;
                                            {specialistData ? specialistData["last_name"] : null}
                                        </h3>
                                        <p>{specialistData ? specialistData["industry_title"] : null}</p>
                                        <p>{specialistData ? specialistData["email"] : null}</p>
                                        <p>{specialistData ? specialistData["phone_number"] : null}</p>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>

                            <SectionHeader content='Services'/>
                            <Grid.Row className='services'>
                                <Grid.Column computer={16}>
                                    <h3>{specialistData ? specialistData["job_title"] : null}</h3>
                                </Grid.Column>
                                <Grid.Column computer={8} verticalAlign='middle' >
                                    <p>${specialistData ? specialistData["hourly_rate"] : null}/hr</p>
                                    <p>{specialistData ? specialistData["available"] : null} (40HRS/WK)</p>
                                    <p>
                                        <img src="../../../public/images/location.png" alt=""/>
                                        {specialistData ? specialistData["address"]["city"] : null}, &nbsp;
                                        {specialistData ? specialistData["address"]["country"] : null}
                                    </p>
                                </Grid.Column>
                                <Grid.Column computer={4}>
                                    <span>Industry area</span>
                                    <h3>
                                        {specialistData 
                                            ? this.renderText(specialistData["specialities"][0]["industry_area"]["name"]) 
                                            : null
                                        }
                                    </h3>
                                    <span>Experience level</span>
                                    <h3>
                                        {experienceLevels && specialistData 
                                            ? this.renderText(experienceLevels[specialistData.experience_level_id - 1]["label"]) 
                                            : null
                                        }
                                    </h3>
                                </Grid.Column>
                                <Grid.Column computer={4}>
                                    <span>Project interests</span>
                                    <h3>{specialistData ? this.renderText(specialistData['project_interest']) : null}</h3>
                                    <span>Speciality within that niche</span>
                                    <h3 className='niche'>
                                        {specialistData 
                                            ? specialistData["specialities"].map((item, key) => <span key={key}>{item.name}</span>) 
                                            : null}
                                    </h3>
                                </Grid.Column>
                            </Grid.Row>

                            <SectionHeader content='Skills'/>
                            <Grid.Row className='skills' >
                                <Grid.Column computer={16}>
                                    <div className='flex-wrapper'>

                                        { allSkills && allSkills.map(item =>
                                            <StyledCheckbox key={item.name}>
                                                <div>{item.name}</div>
                                            </StyledCheckbox>
                                        ) }

                                    </div>
                                </Grid.Column>
                            </Grid.Row>

                            <SectionHeader content='Work / Proffesional experience'/>
                            <Grid.Row>

                            </Grid.Row>

                            <SectionHeader content='Education'/>
                            <Grid.Row>

                            </Grid.Row>
                        </Grid>

                        {/* <div className='skills'>
                            <h4>
                                All skills /
                            </h4>

                            <div className='flex-wrapper'>

                                { allSkills && allSkills.map(item =>
                                    <StyledCheckbox key={item.name}>
                                        <div>{item.name}</div>
                                    </StyledCheckbox>
                                ) }

                            </div>

                            <p>
                                {specialistData ? specialistData["professional_experience_info"] : null}
                            </p>
                        </div>
                        { (work_experience ||
                        educations_experience) ?
                        <StyledTabs menu={{text: true}} panes={panes} onClick={this.activeTab}/>
                            : null
                        } */}

                        <SubscribeForm onSubmit={this.submit}/>

                    </StyledProfile>
                </Container>
            </ContainerLarge>
        )
    }

    // shouldComponentUpdate() {
    //     return true
    // }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.specialistData) {
    //         console.log('----update')
    //         // this.showMessage()
    //     }
    // }
    //
    // showMessage = () => {
    //     this.setState({
    //         rerender: !this.state.rerender,
    //     });
    // };
}

function SectionHeader({ content }) {
    return (
        <Grid.Row className='section-header' >
            <Grid.Column computer={6} textAlign='left' floated='left'>
                <span className='title'>{content}</span>
            </Grid.Column>
            <Grid.Column computer={2} textAlign='right' floated='right'>
                <Dots />
            </Grid.Column>
        </Grid.Row>
    );
}

// function SectionHeader({ content }) {
//     return (
//         <div className='section-header'>
//             <span>{content}</span>
//             <Dots />
//         </div>
//     );
// }

function Dots() {
    return (
        <div className='dots'>
            <span></span> <span></span> <span></span>
        </div>
    );
}

export default connect(
    ({specialistData, experienceLevels}) => ({specialistData, experienceLevels}),
    {showSpecialistData, getExperienceLevels}
)(SpecialistsAbout);
