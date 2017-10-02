import React, {Component} from 'react';
import {StyledLogo} from '../styleComponents/StyledLogo'

class Logotype extends Component {
    render() {
        return (
            <StyledLogo to="/">
                <img src="/images/logo.png"/>
            </StyledLogo>
        )
    }
}

export default Logotype;
