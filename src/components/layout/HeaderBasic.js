import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class Header extends Component {

    state = {
        activeItem: 'home',
    };

    render() {
        const { activeItem } = this.state;

        return (
            <header className="header-basic">
                    <div className='top-header'>
                        <img src="/images/logo_basic.png"/>
                    </div>
                    <div className='bot-header'>
                        <NavLink className="button" to="/sign_up">sign up</NavLink>
                    </div>
            </header>
        )
    }
}

export default Header
