import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import SLinkList from '../styleComponents/SLinkList'

class NavigationLinks extends Component {

    render() {
        return (
            <SLinkList {...this.props}>
                <li><NavLink to='/how_it_works'>How it Works</NavLink></li>
                <li><NavLink to='/projects'>Projects</NavLink></li>
                <li><NavLink to='/specialist_profiles'>Specialist Profiles</NavLink></li>
                <li className='linked-in'><NavLink to='#'><img src='/images/linkedIn.png' alt=''/></NavLink></li>
                <li><NavLink to='/contact'>Contact</NavLink></li>
                <li><NavLink to='/qas'>Q&As</NavLink></li>
            </SLinkList>
        )
    }
}

export default NavigationLinks;
