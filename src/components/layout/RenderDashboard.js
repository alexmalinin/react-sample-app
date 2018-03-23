import React, { Component } from 'react';
import RenderCard from './RenderCard';
import cards from '../../helpers/cardsData';
import StyledDashBoard from '../../styleComponents/StyledDashBoard';

class RenderDashboard extends Component {

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
            <StyledDashBoard>
                <div className='tasksDue'>
                     {this.renderCards('tasks_due')}
                </div>
                <div className='projects'>
                    {this.renderCards('projects')}
                </div>
                <div className='tasks'>
                    {this.renderCards('tasks')}
                </div>
            </StyledDashBoard>
        )
    }
}

export default RenderDashboard;


