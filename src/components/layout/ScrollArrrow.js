import React, {Component} from 'react';
import { colors } from '../../styleComponents/constants/colors'
import {StyledScrollArrow, ColoredSpan} from '../../styleComponents/layout/StyledScrollArrow'

class ScrollArrow extends Component {

    render() {
        return(
            <StyledScrollArrow>
                <ColoredSpan color={colors.green}/>
                <ColoredSpan color={colors.purple}/>
                <ColoredSpan color={colors.blue}/>
            </StyledScrollArrow>
        )
    }
}

export default ScrollArrow;