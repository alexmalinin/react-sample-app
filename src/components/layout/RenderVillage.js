import React, { Component } from 'react';
import RenderCard from './RenderCard';
import cards from '../../helpers/cardsData';
import StyledDashBoard from '../../styleComponents/StyledDashBoard';

class RenderVillage extends Component {

    renderCards (type) {
        const data = cards;
        let dueCards = data.filter((item) => {
            return item.type === type
        })
        return (
            <div>
                {dueCards.map((card, index) => {
                        return (
                            <RenderCard key={index} data={card}/>
                        )
                    }
                )}
            </div>
        )
    }

    render() {

        return (
            <StyledDashBoard village>
                <div>
                    <div>{cards.map((card, index) => {
                    return (
                        <RenderCard key={index} data={card} village/>
                    )
                })}</div>
                </div>
            </StyledDashBoard>
        )
    }
}

export default RenderVillage;


