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
        const { showSpecialistData, showClientData, userType } = this.props;

        if(userType === 'client') {
            showClientData()
        } else if (userType === 'specialist') {
            showSpecialistData()
        }
    }

    renderDropdown = () => {
        const { userType, clientData, specialistData } = this.props;

        if(userType === 'client' && clientData) {
            return (
                <Dropdown 
                    text={clientData.first_name + ' ' + clientData.last_name} 
                    basic 
                    closeOnChange={false} 
                    item={true} 
                    icon={<div className="drop-icon"><span></span></div>}
                    onChange={()=>{}}>
                    <Dropdown.Menu> 
                        <Dropdown.Item>
                            <NavLink to='/client/dashboard/root'>Dashboard</NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <NavLink onClick={this.logOut} to='/sign_up'>Log out</NavLink>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            );
        } else if (userType === 'specialist' && specialistData) {
            return (
                <Dropdown 
                    text={specialistData.first_name + ' ' + specialistData.last_name} 
                    basic 
                    className="log-dropdown"
                    icon={<div className="drop-icon"><span></span></div>}
                    onChange={()=>{}}>
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <NavLink to='/specialists/dashboard/root'>Dashboard</NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <NavLink to='/specialists/dashboard/about'>My profile</NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <NavLink to='/specialists/dashboard/account'>Account Billings</NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <NavLink to='/specialists/dashboard/teams'>Teams</NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <NavLink onClick={this.logOut} to='/sign_up'>Log out</NavLink>
                        </Dropdown.Item>
                    </Dropdown.Menu>      
                </Dropdown>
            );
        }
    }

    render() {
        const { specialistData, clientData, page, userType } = this.props;
        const profileLink = userType ==='client' ? 'client' : 'specialists';

        return (
            <StyledHeaderBasic className='header-basic'>
                <ContainerLarge containerHeader>
                    <a href='/'>
                        <span>Digital Village</span>
                        {/* <img src='/images/logo_basic.png'/> */}
                    </a>
                    {page && <div className='right-links'>
                        <NavLink className='button square' to='#'>&nbsp;</NavLink>
                        <NavLink className='button settings' to='#'>&nbsp;</NavLink>
                        <NavLink className='button avatar' to={`/${profileLink}/dashboard/profile`}>&nbsp;</NavLink>
                        {this.renderDropdown()}
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
