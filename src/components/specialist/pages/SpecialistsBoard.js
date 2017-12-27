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
                    <div onDragOver={this.handleDragOver} onDrop={this.handleDrop}>
                        <h3>Backlog</h3>
                        <div draggable="true" onDragEnter={this.handleDragEnter} onDragLeave={this.handleDragLeave} onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} className="item">1111111111111111111111</div>
                        <div draggable="true" onDragEnter={this.handleDragEnter} onDragLeave={this.handleDragLeave} onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} className="item">2222222222222222222222</div>
                        <div draggable="true" onDragEnter={this.handleDragEnter} onDragLeave={this.handleDragLeave} onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} className="item">3333333333333333333333</div>
                    </div>
                    <div onDragOver={this.handleDragOver} onDrop={this.handleDrop}>
                        <h3>In Progress</h3>

                    </div>
                    <div onDragOver={this.handleDragOver} onDrop={this.handleDrop}>
                        <h3>Done</h3>
                    </div>
                </S_Board>
                <div >
                </div>
                {/*<div className="item">4444444444444444444444</div>*/}
                {/*<div className="item">5555555555555555555555</div>*/}

            </Container>
        )
    }

    handleDragStart = (ev) => {
        // ev.preventDefault();
        this.draggableElement = ev.target;
        this.draggableElement.classList.add('hide')
        ev.nativeEvent.dataTransfer.effectAllowed = 'move';
        console.log(ev.target.getBoundingClientRect().height);
        // console.log(ev.nativeEvent);
        // console.log(ev.nativeEvent.dataTransfer);
    };

    handleDragOver = (ev) => {
        ev.preventDefault();
        ev.preventDefault();
        ev.dataTransfer.dropEffect = 'move'; // sets cursor
        return false;
    };

    handleDrop = (ev) => {
        ev.preventDefault();
        if (ev.target === this.draggableElement) return;
        if (ev.target.classList.contains('item')) {
           console.log('here')
        } else {
            ev.target.appendChild(this.draggableElement);
        }

    }

    handleDragEnter = (ev) => {
        console.log('offsetY', ev.nativeEvent.offsetY);
        console.log('Height', ev.target.getBoundingClientRect().height / 2);

        if (ev.target === this.draggableElement) return;
        this.hoveredElement ? this.hoveredElement.style = "margin-top: 10px" : null;
        this.hoveredElement = ev.target;
        if (ev.nativeEvent.offsetY > ev.target.getBoundingClientRect().height / 2) {
            ev.target.style = "margin-bottom: 0px";
            ev.target.style = "margin-top:" +  Number(ev.target.getBoundingClientRect().height + 10) + 'px';
        } else {
            ev.target.style = "margin-top: 10px";
            ev.target.style = "margin-bottom:" +  Number(ev.target.getBoundingClientRect().height + 10) + 'px';
        }
        // console.log('style', window.getComputedStyle(ev.target).marginTop);
        // ev.target.style = "margin-top:" +  Number(ev.target.getBoundingClientRect().height + 10) + 'px';
    }

    // handleDragLeave = (ev) => {
    //     console.log(ev.target)
    //     ev.target.style = "margin-top: 10px";
    // }

    handleDragEnd = (ev) => {
        this.hoveredElement ? this.hoveredElement.style = "margin-top: 10px" : null;
        console.log('---dragend')
    }
}

export default SpecialistsBoard;
