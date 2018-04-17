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
import KanbanBoard from './layout/KanbanBoard';
import CustomCard from './layout/CustomTaskCard';
import { run } from '../helpers/scrollToElement';
import projects from '../helpers/projects';

class ProjectsBoard extends Component {
    state = {
        fetchEpicTasks: true,
    }

    componentWillMount() {
        this.props.showAllProjects();
        this.props.showAllEpics(this.props.projectId);
    }

    componentWillReceiveProps(nextProps){
        let epicId;
        if(nextProps.allEpics && nextProps.currentEpic !== 'all'){
            epicId = nextProps.allEpics[nextProps.currentEpic - 1].id;
        }

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

        if(epicId){
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

        if(nextProps.updateTask && epicId){
            if(this.props.updateTask){
                if(this.props.updateTask != nextProps.updateTask){
                    nextProps.showEpicTasks(epicId);
                }
            } else nextProps.showEpicTasks(epicId);
        }
    }

    render() {
        let { 
            projectId, 
            allEpics, 
            showAllEpics, 
            updateProjectEpic, 
            createEpicTask,
            createTask,
            currentEpic,
            showProjectEpic,
            epicTasks,
        } = this.props;

        const epicId = allEpics && currentEpic !== 'all' ? allEpics[currentEpic - 1].id : null;

        return (
            <ContainerLarge indentBot>
                    <BoardSubHeader 
                        project={projectId} 
                        epics={allEpics} 
                        createEpicTask={createEpicTask} 
                        currentEpic={currentEpic}
                        epicId={epicId}
                        epicTasks={epicTasks}/>
                    <S_Board>
                        <KanbanBoard
                            currentEpic={currentEpic}
                            epicId={epicId}/>

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
