import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Tab } from 'semantic-ui-react'
import HeaderBasic from '../../layout/HeaderBasic';
import SubHeader from '../../layout/SpecialistsSubHeader';
import { Container, ContainerLarge } from '../../../styleComponents/layout/Container';
import { S_MainContainer } from '../../../styleComponents/layout/S_MainContainer';
import { DvTitle, DvTitleSmall } from '../../../styleComponents/layout/DvTitles';
import {StyledTabs } from '../../../styleComponents/StyledTabCard';
import SubscribeForm from '../../forms/SubscribeForm';
import StyledCheckbox from '../../../styleComponents/forms/StyledCheckbox';
import StyledProfile from '../../../styleComponents/StyledProfile';
import RenderTabCard from '../renders/RenderTabCard';
import { showSpecialistData } from '../../../actions/actions';
import { PORT } from "../../../constans/constans";
import { Progress } from 'semantic-ui-react';
import './styles.css';
import { S_Board } from "../../../styleComponents/S_Board";
class SpecialistsBoard extends Component {

    // state = {
    //     rerender: false,
    // };

    // componentWillMount() {
    //     this.props.showSpecialistData();
    // }

    render() {

        return (
            <Container indentBot indentTop>
                <DvTitle mTop='80'>
                    Welcome to The Village!
                </DvTitle>
                <DvTitleSmall>Board</DvTitleSmall>
                <Progress percent={44} progress active color='blue'/>
                <S_Board>
                    <div className="dragContainer" onDragOver={this.handleDragOver} onDrop={this.handleDrop}>
                        <h3>Backlog</h3>
                        <div draggable="true" onDragEnter={this.handleDragEnter} onDragLeave={this.handleDragLeave} onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} className="dragItem">
                            1111111111111111111111
                        </div>
                        <div draggable="true" onDragEnter={this.handleDragEnter} onDragLeave={this.handleDragLeave} onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} className="dragItem">
                            2222222222222222222222
                        </div>
                        <div draggable="true" onDragEnter={this.handleDragEnter} onDragLeave={this.handleDragLeave} onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} className="dragItem">
                            3333333333333333333333
                        </div>
                        <div draggable="true" onDragEnter={this.handleDragEnter} onDragLeave={this.handleDragLeave} onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} className="dragItem">
                            4444444444444444444444
                        </div>
                        <div draggable="true" onDragEnter={this.handleDragEnter} onDragLeave={this.handleDragLeave} onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} className="dragItem">
                            5555555555555555555555
                        </div>
                    </div>
                    <div className="dragContainer" onDragOver={this.handleDragOver} onDrop={this.handleDrop}>
                        <h3>In Progress</h3>

                    </div>
                    <div className="dragContainer" onDragOver={this.handleDragOver} onDrop={this.handleDrop}>
                        <h3>Done</h3>
                    </div>
                </S_Board>
                <div >
                </div>
            </Container>
        )
    }

    handleDragStart = (ev) => {
        // ev.preventDefault();
        this.draggableElement = ev.target;
        this.draggableElement.classList.add('hide');
        ev.nativeEvent.dataTransfer.effectAllowed = 'move';
    };

    handleDragOver = (ev) => {
        ev.preventDefault();
        ev.preventDefault();
        ev.dataTransfer.dropEffect = 'move'; // sets cursor
        return false;
    };

    handleDrop = (ev) => {
        ev.preventDefault();
        let thisElement = ev.target;
        let thisEvent = ev.nativeEvent;

        if (thisElement === this.draggableElement) return;

        console.log('---this.hoveredElement.offsetY', this.hoveredPosition)
        if (this.hoveredPosition === 'top') {
            console.log('insert before');
            this.hoveredElement.parentNode.insertBefore(this.draggableElement, this.hoveredElement);
        } else if (this.hoveredPosition === 'bottom'){
            this.hoveredElement.parentNode.insertBefore(this.draggableElement, this.hoveredElement.nextSibling);
        } else {
            console.log('here');
            thisElement.appendChild(this.draggableElement);
        }
    }

    handleDragEnter = (ev) => {
        // ev.nativeEvent.offsetY;
        // console.log(ev.nativeEvent.offsetY);
        // console.log('Height', ev.target.getBoundingClientRect().height / 2);
        let thisElement = ev.target;
        let thisEventOffset = ev.nativeEvent.offsetY;

        if (thisElement === this.draggableElement) return;
        if (thisElement.classList.contains('dragContainer')) {
            this.hoveredElement = thisElement;
            this.hoveredPosition = 'container'
        } else {
            this.hoveredElement ? this.hoveredElement.style = "margin-top: 10px" : null;
            this.hoveredElement = thisElement;
            if (thisEventOffset > ev.target.getBoundingClientRect().height / 2) {
                this.hoveredPosition = 'top';
                thisElement.style = "margin-bottom: 0px";
                thisElement.style = "margin-top:" + Number(thisElement.getBoundingClientRect().height + 10) + 'px';
            } else {
                this.hoveredPosition = 'bottom';
                thisElement.style = "margin-top: 10px";
                thisElement.style = "margin-bottom:" + Number(thisElement.getBoundingClientRect().height + 10) + 'px';
            }
        }
    };

    // handleDragLeave = (ev) => {
    //     setTimeout(() => {
    //         console.log(this)
    //         this.hoveredElement.style = "margin-top: 10px; margin-bottom: 10px";
    //     }, 300);
    // }

    handleDragEnd = (ev) => {
        this.draggableElement.classList.remove('hide');
        this.hoveredElement ? this.hoveredElement.style = "margin-top: 10px; margin-bottom: 10px" : null;
        console.log('---dragend')
    }
}

export default SpecialistsBoard;
