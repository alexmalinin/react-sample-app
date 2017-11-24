import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { Button } from 'semantic-ui-react';

class AccountLinks extends Component {

    render() {
        return(
            <ul>
                {/*<li><NavLink to='/post_project'>Post a Project</NavLink></li>*/}
                <li><NavLink to='/sign_in' className='proxy'>log in</NavLink></li>
                <li><NavLink to='/sign_up' className='proxy'><Button inverted>sign up</Button></NavLink></li>
            </ul>
        )
    }
}

export default AccountLinks;
