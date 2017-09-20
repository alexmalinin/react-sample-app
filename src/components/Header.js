import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Menu, Segment } from 'semantic-ui-react';

class Header extends Component {

    state = {
        activeItem: 'home',
    }

    render() {
        const { activeItem } = this.state;

        return (
            <header className="header">
                <div className="inside-header">
                    <div className='top-header'>
                        <img src="images/logo.png"/>
                    </div>
                    <Segment inverted>
                        <Menu inverted pointing secondary>
                          <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
                          <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick} />
                          <Menu.Item name='friends' active={activeItem === 'friends'} onClick={this.handleItemClick} />
                        </Menu>
                    </Segment>
                </div>
            </header>
        )
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

}

export default Header
