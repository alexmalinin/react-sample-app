import React, { Component } from "react";
import {
  Container,
  ContainerLarge
} from "../../../styleComponents/layout/Container";
import {
  DvTitle,
  DvTitleSmall
} from "../../../styleComponents/layout/DvTitles";
import "./styles.css";
import { S_Board } from "../../../styleComponents/S_Board";
import TestForm from "../renders/TestForm";

class SpecialistsTest extends Component {
  state = {
    value: "Hello"
  };

  render() {
    const value = this.state.value;

    return (
      <Container indentBot indentTop>
        <DvTitleSmall>{value}</DvTitleSmall>
        <S_Board>
          <TestForm onChange={this.handleChange} inputValue={value} />
        </S_Board>
        <div />
      </Container>
    );
  }

  handleChange = ev => {
    console.log(ev.nativeEvent);
    this.setState({
      value: ev.target.value
    });
  };
}

export default SpecialistsTest;
