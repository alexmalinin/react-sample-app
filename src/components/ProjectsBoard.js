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
import { showAllProjects, showAllEpics, deleteProjectEpic } from '../actions/actions';
import { PORT } from "../constans/constans";
import { Progress } from 'semantic-ui-react';
import Board from 'react-trello';
import { S_Board } from "../styleComponents/S_Board";
import BoardSubHeader from './layout/BoardSubHeader';
import { run } from '../helpers/scrollToElement';
import projects from '../helpers/projects';

class ProjectsBoard extends Component {

    componentWillMount() {
        this.props.showAllProjects();
        this.props.showAllEpics(this.props.projectId);
    }

    componentWillReceiveProps(nextProps){

        if(nextProps.project && nextProps.projectId){
            // console.log('board rec', nextProps.project.id, nextProps.projectId);
            if(nextProps.project.id != nextProps.projectId){
                // console.log(nextProps.projectId);
                nextProps.showAllEpics(nextProps.projectId);
            }
        }
    }

    render() {
        let { projectId, allEpics } = this.props;

        return (
            <ContainerLarge indentBot>
                    <BoardSubHeader project={projectId} epics={allEpics}/>
                    
                    <S_Board>
                        <Board data={projects} className="kanban" draggable customCardLayout>
                            <CustomCard />
                        </Board>
                        {allEpics && allEpics.map((epic, key) => 
                            <Module epic={epic} key={key} project={projectId} deleteEpic={this.props.deleteProjectEpic}/>   
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

class Module extends Component {
    render() {
        const epic = this.props.epic;

        return(
            <div className="dragContainer">
                <h3>{epic.name}</h3>
                <div className="module">
                    <h4>{epic.description}</h4> 
                    <p>
                        {epic.user_story}
                    </p>
                    <div className="subline">
                        <img src="/images/marker.png" alt="marker"/>
                        <span>Remote</span>
                    </div>
                    <div className="subline">
                        <img src="/images/calendar.png" alt="calendar"/>
                        <span>24/02/2018</span>
                    </div>
                    <div className="subline">
                        <img src="/images/dollar.png" alt="dollar"/>
                        <span>$20,000</span>
                    </div>
                    <div className="subline">
                        <img src="/images/clock.png" alt="clock"/>
                        <span>4 weeks</span>
                    </div>
                </div>
            </div>
        );
    }
}

const CustomCard = props => {
    return (
        <div className="dragItem" style={{backgroundColor: '#fff'}}>
            <h4 className="title">{props.title}</h4>
            <h4 className="platform" style={{color: `${props.descriptionColor}`}} >{props.description}&nbsp;</h4>
            <div className="bell-line">
                <span className="bell"></span>
            </div>
            <div className="persons">
                <span className="person"></span>
                <span className="person"></span>
                <span className="person"></span>
                <span className="addPerson">+</span>
            </div>
            <span className="ddtw">DDTW-{props.DDTW}</span>
        </div>
    );
}

export default connect(
    ({allProjects, allEpics}) => ({allProjects, allEpics}),
    {showAllProjects, showAllEpics, deleteProjectEpic}
)(ProjectsBoard);
