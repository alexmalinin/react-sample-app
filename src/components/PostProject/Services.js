import React, { Component } from 'react';
import RenderField from '../forms/renders/RenderField';
import WebDevelopment from './forms/WebDevelopment';
import WebDesign from './forms/WebDesign';
import ApplicationDesign from './forms/ApplicationDesign';

class Services extends Component  {

    render() {
        return (
            <div>
                <WebDevelopment/>
                <WebDesign/>
                <ApplicationDesign/>
            </div>
        )
    }
}

export default Services;
