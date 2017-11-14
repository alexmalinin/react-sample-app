import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Grid, Tab } from 'semantic-ui-react'
import HeaderBasic from '../layout/HeaderBasic';
import SubHeader from '../layout/SpecialistsSubHeader';
import { DvTitle } from '../../styleComponents/layout/DvTitles';
import RenderProfileForm from '../forms/RenderProfileForm';
import { Container, ContainerLarge } from '../../styleComponents/layout/Container';
import { DvTitleSmall } from '../../styleComponents/layout/DvTitles';
import StyledProfile from '../../styleComponents/StyledProfile';
import StyledCheckbox from '../../styleComponents/forms/StyledCheckbox';
import RenderTabCard from './renders/RenderTabCard';
import { StyledTabs } from '../../styleComponents/StyledTabCard';
import SubscribeForm from '../forms/SubscribeForm';
import { showSpecialistData } from '../../actions/actions';

class SpecialistsProfile extends Component {

    componentWillMount() {
        sessionStorage.removeItem('spec_step2');
        localStorage.removeItem('user_email');
        this.props.showSpecialistData();
    }

    render() {

        // const panes = [
        //     { menuItem: 'Work History', render: () => <Tab.Pane attached={false}><RenderTabCard context='work'/></Tab.Pane> },
        //     { menuItem: 'Education', render: () => <Tab.Pane attached={false}><RenderTabCard context='education'/></Tab.Pane> },
        // ];

        return (
            <div>
                <HeaderBasic/>

                <ContainerLarge>
                    <DvTitle mTop='80'>
                        Welcome to The Village!
                    </DvTitle>
                </ContainerLarge>

                <SubHeader/>

                <Container indentTop indentBot>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column mobile={16} computer={8}>
                                <DvTitleSmall>Basic details</DvTitleSmall>
                                <RenderProfileForm onSubmit={this.submit}/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    {/*<StyledProfile>*/}
                        {/*<div className='main-info'>*/}
                            {/*<h2>Jason H.</h2>*/}
                            {/*<p>Project Manager</p>*/}

                            {/*<div className='profile-image'>*/}
                                {/*<img src='/images/profile-image.png' alt=''/>*/}
                            {/*</div>*/}

                            {/*<div className='flex-between'>*/}
                                {/*<span>*/}
                                    {/*<img src='/images/location.png' alt=''/>*/}
                                    {/*Sydney, Australia*/}
                                {/*</span>*/}
                                {/*<span>*/}
                                    {/*<img src='/images/time.png' alt=''/>*/}
                                    {/*Full-time*/}
                                {/*</span>*/}
                            {/*</div>*/}
                        {/*</div>*/}

                        {/*<div className='skills'>*/}
                            {/*<h4>*/}
                                {/*All skills /*/}
                            {/*</h4>*/}

                            {/*<div className='flex-wrapper'>*/}
                                {/*<StyledCheckbox>*/}
                                    {/*<label>*/}
                                        {/*<input type='text'/>*/}
                                        {/*<div>Project management</div>*/}
                                    {/*</label>*/}
                                {/*</StyledCheckbox>*/}

                                {/*<StyledCheckbox>*/}
                                    {/*<label>*/}
                                        {/*<input type='text'/>*/}
                                        {/*<div>Marketing</div>*/}
                                    {/*</label>*/}
                                {/*</StyledCheckbox>*/}

                                {/*<StyledCheckbox>*/}
                                    {/*<label>*/}
                                        {/*<input type='text'/>*/}
                                        {/*<div>Strategy</div>*/}
                                    {/*</label>*/}
                                {/*</StyledCheckbox>*/}

                                {/*<StyledCheckbox>*/}
                                    {/*<label>*/}
                                        {/*<input type='text'/>*/}
                                        {/*<div>Website design</div>*/}
                                    {/*</label>*/}
                                {/*</StyledCheckbox>*/}

                                {/*<StyledCheckbox>*/}
                                    {/*<label>*/}
                                        {/*<input type='text'/>*/}
                                        {/*<div>Project management</div>*/}
                                    {/*</label>*/}
                                {/*</StyledCheckbox>*/}

                                {/*<StyledCheckbox>*/}
                                    {/*<label>*/}
                                        {/*<input type='text'/>*/}
                                        {/*<div>Marketing</div>*/}
                                    {/*</label>*/}
                                {/*</StyledCheckbox>*/}

                                {/*<StyledCheckbox>*/}
                                    {/*<label>*/}
                                        {/*<input type='text'/>*/}
                                        {/*<div>Strategy</div>*/}
                                    {/*</label>*/}
                                {/*</StyledCheckbox>*/}

                                {/*<StyledCheckbox>*/}
                                    {/*<label>*/}
                                        {/*<input type='text'/>*/}
                                        {/*<div>Website design</div>*/}
                                    {/*</label>*/}
                                {/*</StyledCheckbox>*/}
                            {/*</div>*/}

                            {/*<p>*/}
                                {/*Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor*/}
                                {/*incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud*/}
                                {/*exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.*/}
                            {/*</p>*/}

                            {/*<p>*/}
                                {/*Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat*/}
                                {/*nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui*/}
                                {/*officia deserunt mollit anim id est laborum.*/}
                            {/*</p>*/}
                        {/*</div>*/}

                        {/*<StyledTabs menu={{ text: true }} panes={panes} onClick={this.activeTab}/>*/}

                        {/*<SubscribeForm onSubmit={this.submit}/>*/}

                    {/*</StyledProfile>*/}
                </Container>
            </div>
        )
    }

    submit = values => {
        console.log('----values:', values);

    };
}

export default connect(null, { showSpecialistData } )(SpecialistsProfile);
