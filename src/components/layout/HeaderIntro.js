import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import {Button} from 'semantic-ui-react';
import StyledHeader from '../../styleComponents/StyledHeader';
import NavigationLinks from '../NavigationLinks'
import Logotype from './Logotype'
import { ContainerLarge } from '../../styleComponents/Container';

class Header extends Component {

    state = {
        activeItem: 'home',
    };

    render() {
        return (

            <StyledHeader className='header-intro'>
                <div className='inside-header'>
                    <div className='top-header'>
                        <ContainerLarge>
                            <Logotype/>
                        </ContainerLarge>
                    </div>
                    <div className='bot-header'>
                        <ContainerLarge>
                            <NavigationLinks/>
                            <ul className='right-board'>
                                <li><NavLink to='/post_project'>Post a project</NavLink></li>
                                <li className='proxy'><NavLink to='/sign_in'>log in</NavLink></li>
                                <li className='proxy'><NavLink to='/sign_up'><Button inverted>sign up</Button></NavLink>
                                </li>
                            </ul>
                        </ContainerLarge>
                    </div>
                </div>
            </StyledHeader>
        )
    }
}

export default Header
