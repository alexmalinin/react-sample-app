import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tab, Transition } from 'semantic-ui-react';
import { Container, ContainerLarge } from '../styleComponents/layout/Container';
import { S_MainContainer } from '../styleComponents/layout/S_MainContainer';
import { DvTitle, DvTitleSmall } from '../styleComponents/layout/DvTitles';
import {StyledTabs } from '../styleComponents/StyledTabCard';
import StyledCheckbox from '../styleComponents/forms/StyledCheckbox';
import StyledProfile from '../styleComponents/StyledProfile';
import RenderTabCard from './specialist/renders/RenderTabCard';
import {
    showAllProjects,
    showAllEpics,
    deleteProjectEpic,
    updateProjectEpic,
    createEpicTask,
    showProjectEpic,
    showEpicTasks,
    updateEpicTask,
} from '../actions/actions';
import { PORT } from "../constans/constans";
import { Progress } from 'semantic-ui-react';
import Board from 'react-trello';
import { S_Board } from "../styleComponents/S_Board";
import BoardSubHeader from './layout/BoardSubHeader';
import Module from './layout/ModuleCard';
import CustomCard from './layout/CustomTaskCard';
import { run } from '../helpers/scrollToElement';
import projects from '../helpers/projects';

class ProjectsBoard extends Component {
    state = {
        fetchEpicTasks: true,
        backlogTasks: [],
        progressTasks: [],
        completedTasks: [],
        showBoard: false,
    }

    componentWillMount() {
        this.props.showAllProjects();
        this.props.showAllEpics(this.props.projectId);
    }

    componentWillReceiveProps(nextProps){
        const epicId = (nextProps.allEpics && nextProps.currentEpic !== 'all') && nextProps.allEpics[nextProps.currentEpic - 1].id;

        if(nextProps.project && nextProps.projectId){
            if(nextProps.project.id != nextProps.projectId){
                nextProps.showAllEpics(nextProps.projectId);
            }
        }

        if(nextProps.deleteEpic){
            if(this.props.deleteEpic != nextProps.deleteEpic) {
                nextProps.showAllEpics(nextProps.projectId);
            }
        }

        if(nextProps.createEpic && nextProps.createEpic.successEpicId){
            if(this.props.createEpic){
                if(this.props.createEpic.successEpicId != nextProps.createEpic.successEpicId){
                    nextProps.showAllEpics(nextProps.projectId);
                }
            }
            else nextProps.showAllEpics(nextProps.projectId);
        }

        if(nextProps.allEpics && nextProps.currentEpic != 'all'){
            if(this.props.epicTasks){
                if(this.props.currentEpic != nextProps.currentEpic){
                    nextProps.showEpicTasks(epicId);
                }
            } else if(this.state.fetchEpicTasks) {
                nextProps.showEpicTasks(epicId); this.setState({fetchEpicTasks: false})
            }
        }

        if(nextProps.createTask && nextProps.createTask.successId){
            if(this.props.createTask){
                if(this.props.createTask != nextProps.createTask){
                    nextProps.showEpicTasks(epicId);
                }
            } else nextProps.showEpicTasks(epicId);
        }

        if(nextProps.epicTasks && nextProps.currentEpic !== 'all'){
            if(this.props.epicTasks !== nextProps.epicTasks){
                console.log('mapping', this.props.epicTasks, nextProps.epicTasks)
                let backlog = [], progress = [], completed = [];
                nextProps.epicTasks.map((task) => {
                    if(task.state === 'backlog'){
                        backlog.push({
                            id: `${task.id}`,
                            title: task.name,
                            description: 'Platform - Dashboard', 
                            DDTW: `${task.id}`
                        })
                    };
                    if(task.state === 'in_progress'){
                        progress.push({
                            id: `${task.id}`,
                            title: task.name,
                            description: 'Platform - Dashboard',
                        })
                    };
                    if(task.state === 'done'){
                        completed.push({
                            id: `${task.id}`,
                            title: task.name,
                            description: 'Platform - Dashboard', 
                            DDTW: task.id
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

        if(nextProps.updateTask && epicId){
            if(this.props.updateTask){
                if(this.props.updateTask != nextProps.updateTask){
                    nextProps.showEpicTasks(epicId);
                }
            } else nextProps.showEpicTasks(epicId);
        }
    }

    handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
        const epicId = this.props.allEpics[this.props.currentEpic - 1].id;
        this.props.updateEpicTask({state: +targetLaneId}, epicId, cardId);
    }

    render() {
        let { 
            projectId, 
            allEpics, showAllEpics, 
            updateProjectEpic, 
            createEpicTask,
            createTask,
            currentEpic,
            showProjectEpic,
            epicTasks,
        } = this.props;

        const {
            backlogTasks,
            progressTasks,
            completedTasks,
            showBoard,
        } = this.state;

        return (
            <ContainerLarge indentBot>
                    <BoardSubHeader 
                        project={projectId} 
                        epics={allEpics} 
                        createEpicTask={createEpicTask} 
                        currentEpic={currentEpic}
                        completedTasksCount={completedTasks.length}
                        allTasksCount={backlogTasks.length + progressTasks.length + completedTasks.length}/>
                    
                    <S_Board>
                        <Transition
                            animation="fade"
                            duration={400}
                            visible={showBoard && (backlogTasks.length !== 0 || progressTasks.length !== 0 || completedTasks.length !== 0)}
                            >
                            <div>
                                <Board 
                                    data={{lanes: [
                                        {
                                            id: '0',
                                            title: 'Backlog',
                                            cards: this.state.backlogTasks
                                        },
                                        {
                                            id: '1',
                                            title: 'In progress',
                                            cards: this.state.progressTasks
                                        },
                                        {
                                            id: '2',
                                            title: 'Complete',
                                            cards: this.state.completedTasks
                                        },
                                    ]}}
                                    className="kanban"
                                    draggable
                                    customCardLayout
                                    handleDragEnd={this.handleDragEnd}>
                                    <CustomCard />
                                </Board>
                            </div>
                        </Transition>
                        <div className="moduleWrapper">
                            {allEpics && allEpics.map((epic, key) => 
                                <Module 
                                    epic={epic} 
                                    key={key} 
                                    number={key + 1} 
                                    project={projectId} 
                                    updateEpicList={showAllEpics} 
                                    updateProjectEpic={updateProjectEpic}/>
                            )}
                            <div className="dragContainer">
                                <h3>&nbsp;</h3>
                                <div className="module">
                                    <NavLink to={`/client/project/${projectId}/module`} className="addButt">
                                        <span className="plus">+</span>
                                        <span className="add">Add module</span>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </S_Board>
            </ContainerLarge>
        )
    }
}

export default connect(
    ({allProjects, allEpics, deleteEpic, createEpic, createTask, epicTasks, updateTask}) => ({allProjects, allEpics, deleteEpic, createEpic, createTask, epicTasks, updateTask}),
    {showAllProjects, showAllEpics, deleteProjectEpic, updateProjectEpic, createEpicTask, showEpicTasks, updateEpicTask}
)(ProjectsBoard);
