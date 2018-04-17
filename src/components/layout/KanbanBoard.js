import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from 'react-trello';
import CustomCard from './CustomTaskCard';
import { Transition } from 'semantic-ui-react';

import { updateEpicTask } from '../../actions/actions';

class KanbanBoard extends Component {
    constructor(props){
        super(props);
        this.state = {
            backlogTasks: [],
            progressTasks: [],
            completedTasks: [],
            showBoard: false,
        }
    }

    handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
        this.props.updateEpicTask({state: +targetLaneId}, this.props.epicId, cardId);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.currentEpic !== nextProps.currentEpic){
            this.setState({
                showBoard: false,
            })
        }

        if(nextProps.epicTasks && nextProps.currentEpic !== 'all'){
            if(this.props.epicTasks !== nextProps.epicTasks){
                let backlog = [], progress = [], completed = [];
                nextProps.epicTasks.map((task) => {
                    if(task.state === 'backlog'){
                        backlog.push({
                            id: `${task.id}`,
                            title: task.name,
                            description: 'Platform - Dashboard',
                            specialists: task.specialists,
                        })
                    };
                    if(task.state === 'in_progress'){
                        progress.push({
                            id: `${task.id}`,
                            title: task.name,
                            description: 'Platform - Dashboard',
                            specialists: task.specialists,
                        })
                    };
                    if(task.state === 'done'){
                        completed.push({
                            id: `${task.id}`,
                            title: task.name,
                            description: 'Platform - Dashboard', 
                            specialists: task.specialists,
                        })
                    }
                });
                this.setState({
                    backlogTasks: backlog,
                    progressTasks: progress,
                    completedTasks: completed,
                    showBoard: true,
                })
            }
        } else {
            let backlog = [], progress = [], completed = [];
            this.setState({
                showBoard: false,
            })
        }
    }

    render() {
        const { currentEpic } = this.props;
        const { backlogTasks, progressTasks, completedTasks, showBoard } = this.state;

        return(
            <Transition
                animation="fade"
                duration={400}
                visible={showBoard}>
                    {backlogTasks.length !== 0 || progressTasks.length !== 0 || completedTasks.length !== 0
                    ?<Board 
                        data={{lanes: [
                            {
                                id: '0',
                                title: 'Backlog',
                                cards: backlogTasks
                            },
                            {
                                id: '1',
                                title: 'In progress',
                                cards: progressTasks
                            },
                            {
                                id: '2',
                                title: 'Complete',
                                cards: completedTasks
                            },
                        ]}}
                        className="kanban"
                        draggable
                        customCardLayout
                        handleDragEnd={this.handleDragEnd}>
                    <CustomCard />
                </Board>
                : <p>No tasks for now</p>}
            </Transition>
        )
    }
}

export default connect(
    ({epicTasks}) => ({epicTasks}),
    {updateEpicTask}
)(KanbanBoard);