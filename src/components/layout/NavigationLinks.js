import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import SLinkList from '../../styleComponents/SLinkList'
import { run } from '../../helpers/scrollToElement';

class NavigationLinks extends Component {

    render() {
        return (
            <SLinkList {...this.props}>
                <li><NavLink onClick={this.scroll} to='/how_it_works'>How it Works</NavLink></li>
                <li><NavLink onClick={this.scroll} to='/projects'>Projects</NavLink></li>
                <li><NavLink onClick={this.scroll} to='/specialist_profiles'>Specialist Profiles</NavLink></li>
                <li className='linked-in'><NavLink to='#'><img src='/images/linkedIn.png' alt=''/></NavLink></li>
                <li><NavLink onClick={this.scroll} to='/contact'>Contact</NavLink></li>
                <li><NavLink onClick={this.scroll} to='/qas'>Q&As</NavLink></li>
            </SLinkList>
        )
    }

    scroll = () => {
        run(0)(true);
    }
}

export default NavigationLinks;
