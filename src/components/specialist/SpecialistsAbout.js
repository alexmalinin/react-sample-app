import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Tab } from 'semantic-ui-react'
import HeaderBasic from '../layout/HeaderBasic';
import SubHeader from '../layout/SpecialistsSubHeader';
import { Container, ContainerLarge } from '../../styleComponents/layout/Container';
import { DvTitle, DvTitleSmall } from '../../styleComponents/layout/DvTitles';
import {StyledTabs } from '../../styleComponents/StyledTabCard';
import SubscribeForm from '../forms/SubscribeForm';
import StyledCheckbox from '../../styleComponents/forms/StyledCheckbox';
import StyledProfile from '../../styleComponents/StyledProfile';
import RenderTabCard from './renders/RenderTabCard';
import { showSpecialistData } from '../../actions/actions';


class SpecialistsAbout extends Component {

    componentWillMount() {
        this.props.showSpecialistData();
    }

    render() {
        const {specialistData} = this.props;
        console.log(specialistData);

        let allSkills = specialistData ? specialistData.skills : null;
        let educations_experience = specialistData ? specialistData.educations : null;
        let work_experience = specialistData ? specialistData.work_experiences : null;

        const panes = [
            {
                menuItem: 'Work History',
                render: () => <Tab.Pane attached={false}><RenderTabCard context='work' work={work_experience}/></Tab.Pane>
            },
            {
                menuItem: 'Education',
                render: () => <Tab.Pane attached={false}><RenderTabCard context='education' education={educations_experience}/></Tab.Pane>
            },
        ];

        return (
            <div>
                <HeaderBasic/>
                <ContainerLarge>
                    <DvTitle mTop='80'>
                        Welcome to The Village!
                    </DvTitle>
                </ContainerLarge>

                <SubHeader/>

                <Container indentBot indentTop>

                    <DvTitleSmall>About</DvTitleSmall>

                    <StyledProfile>

                        <div className='main-info'>
                            <h2>{specialistData ? specialistData.first_name : null}</h2>
                            <p>{specialistData ? specialistData.industry_title : null}</p>

                            <div className='profile-image'>
                                <img src='/images/profile-image.png' alt=''/>
                            </div>

                            <div className='flex-between'>
                                <span>
                                    <img src='/images/location.png' alt=''/>
                                    {specialistData ? specialistData.address.city : null}, {specialistData ? specialistData.address.country : null}

                                </span>

                                <span>
                                    <img src='/images/time.png' alt=''/>
                                    {specialistData ? specialistData.available : null}
                                </span>
                            </div>
                        </div>

                        <div className='skills'>
                            <h4>
                                All skills /
                            </h4>

                            <div className='flex-wrapper'>

                                {allSkills && allSkills.map(item => {
                                    return (
                                        <StyledCheckbox key={item.name}>
                                            <div>{item.name}</div>
                                        </StyledCheckbox>
                                    )
                                })}

                            </div>

                            <p>
                                {specialistData ? specialistData.professional_experience_info : null}
                            </p>
                        </div>

                        <StyledTabs menu={{text: true}} panes={panes} onClick={this.activeTab}/>

                        <SubscribeForm onSubmit={this.submit}/>

                    </StyledProfile>
                </Container>
            </div>
        )
    }
}

export default connect(({specialistData}) => ({specialistData}), {showSpecialistData})(SpecialistsAbout);
