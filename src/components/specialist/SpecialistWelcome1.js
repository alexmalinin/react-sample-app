import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import HeaderBasic from '../layout/HeaderBasic';
import DvGrid from '../../styleComponents/layout/DvGrid';
import confirm from '../../decorators/confirm';
import SpecialistWelcomeForm1 from './forms/SpecialistWelcomeForm1';
import { Container }from '../../styleComponents/layout/Container';
import { getIndustries, updateSpecStep2 } from '../../actions/actions'

class SpecialistsWelcome1 extends Component {

    componentWillMount() {
        this.props.getIndustries();
    }

    render() {
        const { confirm, indusrties } = this.props;

        return (
            <div>
                <HeaderBasic/>
                <Container indentBot>
                    <SpecialistWelcomeForm1 indusrties={indusrties} onSubmit={this.submit}/>
                    {confirm && <Redirect to="/specialists/dashboard/welcome-to-the-village-2"/> }
                </Container>
            </div>
        )
    }

    submit = values => {
        this.props.updateSpecStep2(values);
    };
}

export default connect(({indusrties}) => ({indusrties}), { getIndustries, updateSpecStep2 })(confirm(SpecialistsWelcome1));