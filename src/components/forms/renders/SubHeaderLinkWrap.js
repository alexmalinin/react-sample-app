import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import SubHeaderLink from './SubHeaderLink'

class SubHeaderLinkWrap extends Component {
    constructor (props) {
        super (props)
    }

    render () {
        return (
            <NavLink className='button' to={this.props.url}>
                <SubHeaderLink myClass={this.props.myClass} number={this.props.content}/>
                {this.props.children}
            </NavLink>
        )
    }
}

export default SubHeaderLinkWrap;

// <SubHeaderLinkWrap content='1' url='/specialists/dashboard/profile' process={}>
// My Profile
// </SubHeaderLinkWrap>
// {/*  */}