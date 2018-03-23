import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import StyledHeaderBasic from '../../styleComponents/layout/StyledHeaderBasic';
import { ContainerLarge }from '../../styleComponents/layout/Container';
import { showSpecialistData, showClientData } from '../../actions/actions';
import { Dropdown } from 'semantic-ui-react';

class Header extends Component {

    state = {
        activeItem: 'home',
    };

    componentWillMount() {


        if(this.props.userType === 'specialist'){
            this.props.showSpecialistData();
        }

        if(this.props.userType === 'client'){
            this.props.showClientData();
        }
    }

    render() {
        let { specialistData, clientData, page, userType } = this.props;

        return (
            <StyledHeaderBasic className='header-basic'>
                <ContainerLarge containerHeader>
                    <a href='/'>
                        <span>Digital Village</span>
                        {/* <img src='/images/logo_basic.png'/> */}
                    </a>
                    {page && <div className='right-links' >
                        <NavLink className='button square' to='#'>&nbsp;</NavLink>
                        <NavLink className='button settings' to='#'>&nbsp;</NavLink>
                        <NavLink className='button avatar' to='#'>&nbsp;</NavLink>

                        <NavLink className='button' to='/specialists/dashboard/profile'>
                            {userType === 'specialist' && specialistData ? (specialistData.first_name || '') + ' ' + (specialistData.last_name || '') : null}
                            {userType === 'client' && clientData ? (clientData.first_name || '') + ' ' + (clientData.last_name || '') : null}
                        </NavLink>
                        <a tabIndex='1' className='log-out'>&nbsp;</a>
                        {userType === 'specialist' && <div className="log-dropdown">
                            <NavLink to='/specialists/dashboard/root'>Dashboard</NavLink>
                            <NavLink to='/specialists/dashboard/about'>My profile</NavLink>
                            <NavLink to='/specialists/dashboard/account'>Account Billings</NavLink>
                            <NavLink to='/specialists/dashboard/teams'>Teams</NavLink>
                            <NavLink onClick={this.logOut} to='/sign_up'>Log out</NavLink>
                        </div>}
                        {userType === 'client' && <div className="log-dropdown">
                            <NavLink to='/client/dashboard/root'>Dashboard</NavLink>
                            <NavLink onClick={this.logOut} to='/sign_up'>Log out</NavLink>
                        </div>}
                    </div>}
                </ContainerLarge>
            </StyledHeaderBasic>
        )
    }

    logOut = () => {
        localStorage.clear();
        window.location.reload();
    }
}

export default connect(
    ({ specialistData, clientData }) => ({ specialistData, clientData }),
    { showSpecialistData, showClientData }
)(Header);
