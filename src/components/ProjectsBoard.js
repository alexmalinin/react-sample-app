import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import { Container, ContainerLarge } from '../styleComponents/layout/Container';
import { S_MainContainer } from '../styleComponents/layout/S_MainContainer';
import { DvTitle, DvTitleSmall } from '../styleComponents/layout/DvTitles';
import {StyledTabs } from '../styleComponents/StyledTabCard';
import StyledCheckbox from '../styleComponents/forms/StyledCheckbox';
import StyledProfile from '../styleComponents/StyledProfile';
import RenderTabCard from './specialist/renders/RenderTabCard';
import { showAllProjects, showAllEpics, deleteProjectEpic, updateProjectEpic } from '../actions/actions';
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

    componentWillMount() {
        this.props.showAllProjects();
        this.props.showAllEpics(this.props.projectId);
    }

    componentWillReceiveProps(nextProps){
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
    }

    render() {
        let { projectId, allEpics, showAllEpics, updateProjectEpic } = this.props;

        return (
            <ContainerLarge indentBot>
                    <BoardSubHeader project={projectId} epics={allEpics}/>
                    
                    <S_Board>
                        <Board data={projects} className="kanban" draggable customCardLayout>
                            <CustomCard />
                        </Board>
                        {allEpics && allEpics.map((epic, key) => 
                            <Module epic={epic} key={key} number={key + 1} project={projectId} updateEpicList={showAllEpics} updateProjectEpic={updateProjectEpic}/>   
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
                    </S_Board>
            </ContainerLarge>
        )
    }
}

export default connect(
    ({allProjects, allEpics, deleteEpic, createEpic}) => ({allProjects, allEpics, deleteEpic, createEpic}),
    {showAllProjects, showAllEpics, deleteProjectEpic, updateProjectEpic}
)(ProjectsBoard);
