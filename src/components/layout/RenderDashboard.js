import React, { Component } from 'react';
import { connect } from 'react-redux';

import RenderCard from './RenderCard';
import StyledDashBoard from '../../styleComponents/StyledDashBoard';

import { showAllSpecialists } from '../../actions/actions';
import cards from '../../helpers/cardsData';

class RenderDashboard extends Component {

    componentWillMount() {
        this.props.showAllSpecialists();
    }

    renderCards (type) {
        const data = cards;
        let dueCards = data.filter((item) => {
            return item.type === type
        })
        return (
            <div>
                {dueCards.map((card, index) => {
                        return (
                            <RenderCard key={index} type={type} data={card}/>
                        )
                    }
                )}
            </div>
        )
    }

    render() {
        const { allProjects } = this.props;

        let overview;
        if(allProjects){
            overview = {
                name: 'Projects overview',
                subtitle: 'Status',
                size: {
                    col: 2,
                    row: 2,
                },
                projects: allProjects,
            }
        }

        return (
            <StyledDashBoard>
                <div className='tasksDue'>
                    {this.renderCards('tasks_due')}
                </div>
                <div className='projects'>
                    {allProjects && 
                    <div>
                        <RenderCard type="overview" data={overview}/>
                        {allProjects.map((project, key) =>
                            <RenderCard type="project" key={key} data={project}/>
                        )}
                    </div>}
                </div>
                <div className='tasks'>
                    {this.renderCards('tasks')}
                </div>
            </StyledDashBoard>
        )
    }
}

export default connect(
    ({allProjects}) => ({allProjects}),
    {showAllSpecialists}
)(RenderDashboard);
