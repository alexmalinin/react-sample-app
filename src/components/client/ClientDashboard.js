import React, {Component, Fragment} from 'react';
import HeaderBasic from '../layout/HeaderBasic';
import SubHeader from '../layout/SpecialistsSubHeader';
import { S_MainContainer } from '../../styleComponents/layout/S_MainContainer';
import { Container } from '../../styleComponents/layout/Container';
import ClientProfile  from './ClientProfile';
import ClientCompany  from './ClientCompany';
import ClientBilling  from './ClientBilling';
import ClientProjects from './ClientProjects';

class ClientDashboard extends Component {

    render() {

        console.log(this.props, '123132');

        const {match:{params}} = this.props;
        let page = params['page'];

        return (
            <div>
                <HeaderBasic props={this.props}/>
                {this.renderPage(page)}
            </div>
        )
    }

    renderPage = (page) => {
        switch (page) {
            case 'profile':
              return <ClientProfile/>;
            case 'company':
              return <ClientCompany/>;
            case 'billing':
              return <ClientBilling/>;
            case 'projects':
              return <ClientProjects/>;
            default:
              return <ClientProfile/>
        }
    };
}

export default ClientDashboard;
