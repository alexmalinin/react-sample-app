import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import HeaderIntro from '../layout/HeaderIntro';
import { DvTitle } from '../../styleComponents/layout/DvTitles';
import ContactForm from './ContactForm';
import DvDivider from '../../styleComponents/layout/DvDivider';
import { postContacts } from '../../actions/actions';
import { Container } from '../../styleComponents/layout/Container';
import StyledContactUs from '../../styleComponents/StyledContactUs';

class Contact extends Component {

    render() {

        return (
            <div>
                <HeaderIntro/>

                <Container indentBot>
                    <StyledContactUs>
                        <DvTitle mTop='100' fz=''>
                            Contact Us
                        </DvTitle>
                        <p>
                            Please fill in the form below and we’ll get back to you as soon as we can.
                            <br/>
                            Thanks for checking out our business, we look forward to hearing from you.
                        </p>
                        <Grid>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                        <DvDivider/>
                                        <h2>Specialist</h2>
                                        <p>
                                            If you would like to join the network of Digital Village specialists,
                                            please get in touch with us directly via phone or email to get the
                                            conversation started.
                                        </p>
                                </Grid.Column>
                                <Grid.Column>
                                        <DvDivider/>
                                        <h2>Projects</h2>
                                        <p>
                                            If you have any questions regarding a current
                                            or upcoming project then please get in touch with
                                            your project manager or call our office on 02XXXXXXXX.
                                        </p>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <ContactForm onSubmit={this.submit}/>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                        <div className="flex-wrapper">
                            <div className='contact'>
                                <p>Email /</p>
                                <p><b>letsmeet@digitalvillage.com.au</b></p>
                            </div>

                            <div className='contact'>
                                <p>Skype /</p>
                                <p><b>digital.villager</b></p>
                            </div>

                            <div className='contact'>
                                <p>Office /</p>
                                <p><b>(+61) 02 8005 0430</b></p>
                            </div>
                        </div>


                        <div className='feedback'>
                            <p><b>Feedback</b></p>
                            <p>
                                If you have questions or feedback about Digital Village, please feel free <br/>to get in touch
                                with us, we would love to hear from you.
                            </p>
                        </div>
                    </StyledContactUs>
                </Container>
            </div>
        )
    }

    submit = values => {
        this.props.postContacts(values)
    };
}

export default connect(null, { postContacts })(Contact);
