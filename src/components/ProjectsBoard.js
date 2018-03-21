import React, { Component } from 'react';
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
import { S_Board } from "../styleComponents/S_Board";
import ProjectSubHeader from './layout/ProjectSubHeader';

class ProjectsBoard extends Component {
    // constructor(props){
    //     super(props);
    //     this.handleDragStart = this.handleDragStart.bind(this);
    //     this.handleDragOver = this.handleDragOver.bind(this);
    //     this.handleDrop = this.handleDrop.bind(this);
    //     this.handleDragEnter = this.handleDragEnter.bind(this);
    //     this.handleDragLeave = this.handleDragLeave.bind(this);
    //     this.handleDragEnd = this.handleDragEnd.bind(this);
    // }

    // state = {
    //     rerender: false,
    // };

    // componentWillMount() {
    //     this.props.showSpecialistData();
    // }

    render() {

        return (
            <ContainerLarge indentBot>
                    <ProjectSubHeader />
                    {/* <DvTitle mTop='80'>
                        Welcome to The Village!
                    </DvTitle>
                    <DvTitleSmall>Board</DvTitleSmall>
                    <Progress percent={44} progress active color='blue'/> */}
                    <S_Board>
                        <h3>Backlog</h3>
                        <h3>In Progress</h3>
                        <h3>Done</h3>
                        <div className="dragContainer" onDragOver={this.handleDragOver} onDrop={this.handleDrop} onDragEnter={this.handleDragEnter}>
                            <div draggable="true" onDragEnter={this.handleDragEnter} onDragLeave={this.handleDragLeave} onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} className="dragItem">
                                <DragItem/>
                            </div>
                            <div draggable="true" onDragEnter={this.handleDragEnter} onDragLeave={this.handleDragLeave} onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} className="dragItem">
                                <DragItem/>
                            </div>
                            <div draggable="true" onDragEnter={this.handleDragEnter} onDragLeave={this.handleDragLeave} onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} className="dragItem">
                                <DragItem/>
                            </div>
                        </div>
                        <div className="dragContainer" onDragOver={this.handleDragOver} onDrop={this.handleDrop} onDragEnter={this.handleDragEnter}>
                            <div draggable="true" onDragEnter={this.handleDragEnter} onDragLeave={this.handleDragLeave} onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} className="dragItem">
                                <DragItem/>
                            </div>
                        </div>
                        <div className="dragContainer" onDragOver={this.handleDragOver} onDrop={this.handleDrop} onDragEnter={this.handleDragEnter}>
                            <div draggable="true" onDragEnter={this.handleDragEnter} onDragLeave={this.handleDragLeave} onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} className="dragItem">
                                <DragItem/>
                            </div>
                            <div draggable="true" onDragEnter={this.handleDragEnter} onDragLeave={this.handleDragLeave} onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} className="dragItem">
                                <DragItem/>
                            </div>
                        </div>
                        <div className="dragContainer">
                            <h3>Module 1</h3>
                            <div className="module">
                                <h4>Sub Category, Sub Category, Sub Category, Sub Category, </h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
                                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                                    aliquip ex ea commodo consequat. 
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
                        <div className="dragContainer">
                            <h3>&nbsp;</h3>
                            <div className="module">
                                <div className="addButt">
                                    <span className="plus">+</span>
                                    <span className="add">Add module</span>
                                </div>
                            </div>
                        </div>
                    </S_Board>
            </ContainerLarge>
        )
    }

    handleDragStart = (ev) => {
        // ev.preventDefault();
        // ev.stopPropagation();
        console.log(ev.target);
        this.draggableElement = ev.target;
        this.draggableElement.classList.add('hide');
        ev.nativeEvent.dataTransfer.effectAllowed = 'move';
    };

    handleDragOver = (ev) => {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = 'move'; // sets cursor
        return false;
    };

    handleDrop = (ev) => {
        ev.preventDefault();
        let thisElement = ev.target;
        let thisEvent = ev.nativeEvent;

        if (thisElement === this.draggableElement) return;

        if (this.hoveredPosition === 'top') {
            this.hoveredElement.parentNode.insertBefore(this.draggableElement, this.hoveredElement);
        } else if (this.hoveredPosition === 'bottom'){
            this.hoveredElement.parentNode.insertBefore(this.draggableElement, this.hoveredElement.nextSibling);
        } else {
            thisElement.appendChild(this.draggableElement);
        }
    }

    handleDragEnter = (ev) => {
        let thisElement = ev.target;
        let thisEventOffset = ev.nativeEvent.offsetY;

        if (thisElement === this.draggableElement) return;
        if (thisElement === this.draggableElement.parentNode) {
            return;
        } else if (thisElement.classList.contains('dragContainer')){
            // this.hoveredElement = thisElement;
            this.hoveredPosition = 'container';
        } else {
            document.querySelectorAll('.dragItem').forEach( item => item.style = "margin-top: 10px; margin-bottom: 10px" );
            this.hoveredElement ? this.hoveredElement.style = "margin-top: 10px" : null;
            this.hoveredElement = thisElement;
            if (thisEventOffset > ev.target.getBoundingClientRect().height / 2) {
                this.hoveredPosition = 'top';
                thisElement.style = "margin-bottom: 0px";
                thisElement.style = "margin-top:" + Number(thisElement.getBoundingClientRect().height + 10) + 'px';
            } else {
                this.hoveredPosition = 'bottom';
                thisElement.style = "margin-top: 0px";
                thisElement.style = "margin-bottom:" + Number(thisElement.getBoundingClientRect().height + 10) + 'px';
            }
        }
    };

    handleDragLeave = (ev) => {
        let thisElement = ev.target;
        console.log('---leave')
        /*if (thisElement === this.draggableElement.parentNode) {
            return;
        } else*/ if (thisElement.classList.contains('dragContainer')) {
            document.querySelectorAll('.dragItem').forEach( item => item.style = "margin-top: 10px; margin-bottom: 10px" );
        }
    }

    handleDragEnd = (ev) => {
        this.draggableElement.classList.remove('hide');
        document.querySelectorAll('.dragItem').forEach( item => item.style = "margin-top: 10px; margin-bottom: 10px" );
        console.log('---dragend')
    }
}

let DragItem = () => {
    return (
        <div className="innerWrapper">
            <h4 className="title">Build's client dashboard</h4>
            <h4 className="platform">Platform - dashboard</h4>
            <div className="bell-line">
                <span className="bell"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
            <div className="persons">
                <span className="person"></span>
                <span className="person"></span>
                <span className="person"></span>
                <span className="addPerson">+</span>
            </div>
            <span className="ddtw">DDTW-35</span>
        </div>
    );
}

export default ProjectsBoard;
