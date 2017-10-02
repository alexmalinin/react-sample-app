import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class SubHeader extends Component {

    render() {

        return (
            <div className="sub-header">
                <div className='bot-header'>
                    <NavLink className="button" to="/client/dashboard/profile">Profile</NavLink>
                    <NavLink className="button" to="/client/dashboard/projects">Projects</NavLink>
                    <NavLink className="button" to="/client/dashboard/my_teams">My Teams</NavLink>
                </div>
            </div>
        )
    }
}

export default SubHeader
