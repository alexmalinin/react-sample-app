import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { Grid, Button, Tab } from 'semantic-ui-react';

import HeaderIntro from './HeaderIntro';
import DvGrid from '../styleComponents/DvGrid';
import DvTitle from '../styleComponents/DvTitle';
import ContactForm from './ContactForm';
import DvForm from '../styleComponents/DvForm';
import DvDivider from '../styleComponents/DvDivider';
import confirm from '../decorators/confirm';
import { userType, postContacts } from '../actions/actions';

class SignUp extends Component {

    state ={
        name: '',
        surname: '',
        email: '',
        message: '',
    };

    render() {
        window.state = this.state;

        return (
            <div>
                <HeaderIntro/>
                <DvGrid left="340px" right="485px">
                    <DvTitle mTop="107" fz="">
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
                                <DvGrid width="600px" mL="0">
                                    <DvDivider/>
                                    <h2>Specialist</h2>
                                    <p>
                                        If you would like to join the network of Digital Village specialists,
                                        please get in touch with us directly via phone or email to get the
                                        conversation started.
                                    </p>
                                </DvGrid>
                            </Grid.Column>
                            <Grid.Column>
                                <DvGrid width="600px" float="right">
                                    <DvDivider/>
                                    <h2>Projects</h2>
                                    <p>
                                        If you have any questions regarding a current
                                        or upcoming project then please get in touch with
                                        your project manager or call our office on 02XXXXXXXX.
                                    </p>
                                </DvGrid>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <ContactForm onSubmit={this.submit}/>
                            </Grid.Column>
                        </Grid.Row>
                        <form action="" onSubmit={this.contactUs}>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                        <input onChange={this.name} type="text"/>
                                        <input onChange={this.surname} type="text"/>
                                        <input onChange={this.email} type="email"/>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <textarea onChange={this.message} name="" id="" cols="30" rows="10"></textarea>
                                    <br/>
                                    <Button className="form-footer"
                                            content='Continue'
                                            primary
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </form>
                    </Grid>
                </DvGrid>
            </div>
        )
    }

    submit = (values) => {
        // print the form values to the console
        console.log(values)
    }

    contactUs = ev => {
        ev.preventDefault();
        this.props.postContacts(this.state);

    };

    name = ev => {
        let name = ev.target.value;
        this.setState({
            name,
        })
    };

    surname = ev => {
        let surname = ev.target.value;
        this.setState({
            surname,
        })
    };

    email = ev => {
        let email = ev.target.value;
        this.setState({
            email,
        })
    };

    message = ev => {
        let message = ev.target.value;
        this.setState({
            message,
        })
    }
}

export default connect(null, { postContacts })(SignUp);