import React, { Component } from 'react';
import StyledDashboardCard from '../../styleComponents/StyledDashboardCard'

class RenderCard extends Component {
    render () {
        
        console.log(this.props.data);
        
        let {title, subtitle } = this.props.data;

        return (
            <StyledDashboardCard>
                <p>{ title }</p>
                <p>{ subtitle }</p>
            </StyledDashboardCard>
        )
    }
}

export default RenderCard;