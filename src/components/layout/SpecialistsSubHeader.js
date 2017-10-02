import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class SubHeader extends Component {

    render() {

        return (
            <div className="sub-header">
                <div className='bot-header'>
                    <NavLink className="button" to="/specialists/dashboard/profile">Profile</NavLink>
                    <NavLink className="button" to="/specialists/dashboard/my_teams">My Teams</NavLink>
                    <NavLink className="button" to="/specialists/dashboard/availability">Availability</NavLink>
                </div>
            </div>
        )
    }
}

export default SubHeader
