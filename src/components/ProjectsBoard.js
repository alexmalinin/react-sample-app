import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { Tab } from 'semantic-ui-react'
import { Container, ContainerLarge } from '../styleComponents/layout/Container';
import { S_MainContainer } from '../styleComponents/layout/S_MainContainer';
import { DvTitle, DvTitleSmall } from '../styleComponents/layout/DvTitles';
import {StyledTabs } from '../styleComponents/StyledTabCard';
import StyledCheckbox from '../styleComponents/forms/StyledCheckbox';
import StyledProfile from '../styleComponents/StyledProfile';
import RenderTabCard from './specialist/renders/RenderTabCard';
import { showSpecialistData } from '../actions/actions';
import { PORT } from "../constans/constans";
import { Progress } from 'semantic-ui-react';
import Board from 'react-trello';
import { S_Board } from "../styleComponents/S_Board";
import BoardSubHeader from './layout/BoardSubHeader';
import { run } from '../helpers/scrollToElement';
import projects from '../helpers/projects'

class ProjectsBoard extends Component {
    componentWillMount() {
        this.props.updateProjectList();
    }

    render() {

        return (
            <ContainerLarge indentBot>
                    <BoardSubHeader />
                    
                    <S_Board>
                        {this.props.project}
                        <Board data={projects} className="kanban" draggable customCardLayout>
                            <CustomCard />
                        </Board>
                        <div className="dragContainer">
                            <h3>&nbsp;</h3>
                            <div className="module">
                                <NavLink to="module" onClick={run(0)()} className="addButt">
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

export default ProjectsBoard;
