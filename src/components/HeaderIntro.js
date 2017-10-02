import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { Menu, Segment, Button } from 'semantic-ui-react';
import StyledHeader from '../styleComponents/StyledHeader';

class Header extends Component {

    state = {
        activeItem: 'home',
    };

    render() {
        const { activeItem } = this.state;

        return (
            <StyledHeader className="header-intro">
                <div className="inside-header">
                    <div className='top-header'>
                        <img src="/images/logo.png"/>
                    </div>
                    <div className='bot-header'>
                        <ul>
                            <li><NavLink to="/how_it_works">How it Works</NavLink></li>
                            <li><NavLink to="/projects">Projects</NavLink></li>
                            <li><NavLink to="/specialist_profiles">Specialist Profiles</NavLink></li>
                            <li><NavLink to="/contact">Contact</NavLink></li>
                            <li><NavLink to="/qas">Q&As</NavLink></li>
                        </ul>
                        <ul className="right-board">
                            <li><NavLink to="/post_project">Post a project</NavLink></li>
                            <li className="proxy"><NavLink to="/sign_in">log in</NavLink></li>
                            <li className="proxy"><NavLink to="/sign_up"><Button inverted>sign up</Button></NavLink></li>
                            {/*<li className="proxy bordered"><NavLink to="/sign_up">sign up</NavLink></li>*/}
                        </ul>
                    </div>
                </div>
            </StyledHeader>
        )
    }
}

export default Header
