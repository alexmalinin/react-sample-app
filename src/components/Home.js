import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import { StyledHome, FullScreen, ColoredLinks } from '../styleComponents/StyledHome'
import { Container } from '../styleComponents/layout/Container'
import { DvTitleMedium } from '../styleComponents/layout/DvTitles'
import SubscribeForm from './forms/SubscribeForm'
import ScrollArrow from './layout/ScrollArrrow'

class Home extends Component {

    render() {

        const colors = {
            green: '#19df2b',
            purple: '#8f1ae5',
            blue: '#1991fa',
        };

        return (
            <StyledHome>
                <Container>
                    <ScrollArrow/>
                    <FullScreen centered border={colors.blue}>
                        <img src='/images/logo-home.png' alt=''/>
                        <p className='limit-width'>
                            is a platform that brings specialist digital <br/>
                            <ColoredLinks to='/how_it_works' color={colors.green}>contractors</ColoredLinks> together to create <ColoredLinks to='/how_it_works' color={colors.purple}>teams</ColoredLinks> that <br/>
                            deliver complex <ColoredLinks to='/projects' color={colors.blue}>projects</ColoredLinks>.
                        </p>
                    </FullScreen>

                    <FullScreen centered border={colors.purple}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column mobile={16} tablet={8} computer={8}>
                                    <DvTitleMedium>
                                        why/
                                    </DvTitleMedium>
                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={8} computer={8}>
                                    <p>
                                        The necessary <ColoredLinks to='/how_it_works' color={colors.blue}>skills</ColoredLinks> to
                                        complete  a digital project is ever-expanding and varying.
                                        It requires <br/> <ColoredLinks to='/how_it_works' color={colors.green}>collaboration</ColoredLinks> to between
                                        technical specialists, strategists, managers and
                                        the client.
                                    </p>

                                    <p>
                                        The Digital Village facilitates this to provide clients with a cost-effective,
                                        transparent and flexible <ColoredLinks to='/how_it_works' color={colors.purple}>solution</ColoredLinks>.
                                    </p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </FullScreen>

                    <FullScreen centered border={colors.blue}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column mobile={16} tablet={8} computer={8}>
                                    <DvTitleMedium>
                                        find/
                                    </DvTitleMedium>
                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={8} computer={8}>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem est
                                        odio perspiciatis quod, sapiente tenetur! Delectus dolorem quas qui repudiandae
                                        sequi. Fuga necessitatibus nesciunt, perspiciatis quae quos
                                        recusandae voluptatum.
                                    </p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </FullScreen>

                    <FullScreen centered border={colors.purple}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column mobile={16} tablet={8} computer={8}>
                                    <DvTitleMedium>
                                        vip/
                                    </DvTitleMedium>
                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={8} computer={8}>
                                    <p className='bolder' color={colors.blue}>
                                        This is an invitation only platform.
                                    </p>

                                    <p>
                                        Village we hand pick consultants who are specialists in their field to provide
                                        the best quality service.
                                    </p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </FullScreen>

                    <FullScreen centered border={colors.blue}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column mobile={16} tablet={8} computer={7}>
                                    <div className='title'>
                                        Contractors
                                    </div>
                                </Grid.Column>

                                <Grid.Column mobile={16} tablet={7} computer={7}>
                                    <p className='description'>
                                        Create teams and invite others on the network to join. Build long lasting relationships
                                        and work on future projects together.
                                    </p>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column mobile={16} tablet={8} computer={7}>
                                    <div className='title'>
                                        Projects
                                    </div>
                                </Grid.Column>

                                <Grid.Column mobile={16} tablet={7} computer={7}>
                                    <p className='description'>
                                        Post your project and we will work with you to scope out the requirements to make sure
                                        there is clarity from the start. Select to have an experienced product manager take
                                        care of the hassle of managing a project.
                                    </p>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column mobile={16} tablet={8} computer={7}>
                                    <div className='title'>
                                        Teams
                                    </div>
                                </Grid.Column>

                                <Grid.Column mobile={16} tablet={7} computer={7}>
                                    <p className='description'>
                                        Create a project and peruse the platform to find the the right people needed for your
                                        project. Hand-pick your team and introduce yourself. You can save your teams and use
                                        them again next time!
                                    </p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </FullScreen>

                    <FullScreen centered border={colors.purple}>
                        <Grid>
                            <Grid.Row columns={1}>
                                <Grid.Column>
                                    <DvTitleMedium left>
                                        our values/
                                    </DvTitleMedium>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row columns={3}>
                                <Grid.Column mobile={16} tablet={5} computer={5}>
                                    <div className='values'>
                                        <span>Innovation /</span>
                                        <p>
                                            Positive and creative vision keeps us at the forefront of the industry.
                                            Always changing, always growing, always innovating to evolve into something
                                            better than yesterday.
                                        </p>
                                    </div>
                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={5} computer={5}>
                                    <div className='values'>
                                        <span>Globalisation /</span>
                                        <p>
                                            Globalisation is an evolution. A connected world where everyone benefits
                                            through balancing economies, spreading ideas and sharing knowledge.
                                        </p>
                                    </div>
                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={5} computer={5}>
                                    <div className='values'>
                                        <span>Transparency /</span>
                                        <p>
                                            Open communication of ideas, business operations and agreements creates trust
                                            and positive relationships between all parties in our supply network.
                                        </p>
                                    </div>
                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={5} computer={5}>
                                    <div className='values'>
                                        <span>Flexibility /</span>
                                        <p>
                                            Allows us to interpret, respond and adapt to provide the best solutions
                                            for our clients.
                                        </p>
                                    </div>
                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={5} computer={5}>
                                    <div className='values'>
                                        <span>Respect /</span>
                                        <p>
                                            Business is a relationship, Digital Village treats all its connections, big or
                                            small with respect. We give people time and love to listen.  If it’s important
                                            to you, it’s important to us.
                                        </p>
                                    </div>
                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={5} computer={5}>
                                    <div className='values'>
                                        <span>Integrity /</span>
                                        <p>
                                            Our values are an important foundation of our business and everything we do
                                            is carried out with consideration, honesty  and integrity.
                                        </p>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </FullScreen>

                    <FullScreen centered border={colors.blue}>
                        <SubscribeForm onSubmit={this.submit}/>
                    </FullScreen>

                </Container>
            </StyledHome>
        )
    }

    submit = values => {
        console.log('----values:',values);
    };
}

export default Home
