import React, { Component } from 'react';
import Divider from 'semantic-ui-react';

import StyledSubHeaderLink from '../../../styleComponents/StyledSubHeaderLink';

class SubHeaderLink extends Component {
    constructor () {
        super ();
    }

    render () {
        return (
            <StyledSubHeaderLink className={this.props.myClass}>
                {this.props.number}
            </StyledSubHeaderLink>
        )
    }
}

export default SubHeaderLink; 