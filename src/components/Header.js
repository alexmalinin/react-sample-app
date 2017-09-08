import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'

class Header extends Component {

    render() {

        return (
            <header className="header">
                <div className='top-header'>Header</div>
                <div className='bot-header'>Header</div>
            </header>
        )
    }

}

export default Header
