import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import StyledHeaderBasic from '../../styleComponents/layout/StyledHeaderBasic';
import { ContainerLarge }from '../../styleComponents/layout/Container';
import { showSpecialistData } from '../../actions/actions';
import { Dropdown } from 'semantic-ui-react';

class Header extends Component {

    state = {
        activeItem: 'home',
    };

    componentWillMount() {
        this.props.showSpecialistData();
    }

    render() {
        let { specialistData, page } = this.props;
        
        return (
            <StyledHeaderBasic className='header-basic'>
                <ContainerLarge>
                    <a href='/'>
                        <span>Digital Village</span>
                        {/* <img src='/images/logo_basic.png'/> */}
                    </a>
                    {page && <div>
                        <NavLink className='button square' to='#'></NavLink>
                        <NavLink className='button settings' to='#'></NavLink>
                        <NavLink className='button avatar' to='#'></NavLink>
                        {/* {specialistData 
                            ? (specialistData.first_name && specialistData.last_name) && 
                                <NavLink className='button' to='/specialists/dashboard/profile'>
                                    {specialistData.first_name + ' ' + specialistData.last_name}
                                </NavLink>
                            : null
                        } */}
                        <NavLink className='button' to='/specialists/dashboard/profile'>
                            {specialistData ? (specialistData.first_name || '') + ' ' + (specialistData.last_name || '') : null}
                        </NavLink>
                        <Dropdown text='' icon='none' className='log-out'>
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <NavLink to='/specialists/dashboard/about'>My profile</NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <NavLink to='#'>Projects</NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <NavLink to='#'>Teams</NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <NavLink onClick={this.logOut} to='/sign_up'>Log out</NavLink>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
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
    ({ specialistData }) => ({ specialistData }),
    { showSpecialistData }
)(Header);
