import React, { Component } from 'react';
import Divider from 'semantic-ui-react';

import StyledSubHeaderLink from '../../../styleComponents/StyledSubHeaderLink';

class SubHeaderLink extends Component {
    constructor () {
        super ();
    }

    render () {

        return (
            <StyledSubHeaderLink className={this.props.className}>
                {this.props.number}
                {/* <span></span> */}
            </StyledSubHeaderLink>
        )
    }
}

export default SubHeaderLink; 