import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Tab } from "semantic-ui-react";

import {
  ContainerLarge,
  Container
} from "../../../styleComponents/layout/Container";
import SpecialistAccountSubHeader from "../../layout/SpecialistAccountSubHeader";
import StyledAccountPages from "../../../styleComponents/StyledAccountPages";

class SpecialistAccount extends Component {
  render() {
    return (
      <ContainerLarge>
        <StyledAccountPages>
          <SpecialistAccountSubHeader />
          <Container sidebarCondition>
            <Grid>
              <SectionHeader content="completed tasks" />

              <Grid.Row className="sectionTitle">
                <Grid.Column computer={10}>tasks</Grid.Column>
                <Grid.Column computer={4}>outstanding amount</Grid.Column>
                <Grid.Column computer={2}>due date</Grid.Column>
              </Grid.Row>

              <Grid.Row className="sectionContent">
                <Grid.Column computer={10}>projectXYZ</Grid.Column>
                <Grid.Column computer={4}>$200</Grid.Column>
                <Grid.Column computer={2}>01/01/18</Grid.Column>
              </Grid.Row>

              <Grid.Row className="sectionContent">
                <Grid.Column computer={10}>projectABC</Grid.Column>
                <Grid.Column computer={4}>$400</Grid.Column>
                <Grid.Column computer={2}>01/01/18</Grid.Column>
              </Grid.Row>

              <Grid.Row className="sectionSummury">
                <Grid.Column computer={10} textAlign="right">
                  Total
                </Grid.Column>
                <Grid.Column computer={4}>$600</Grid.Column>
              </Grid.Row>

              <SectionHeader content="Bonus Incentives" />

              <Grid.Row className="sectionTitle">
                <Grid.Column computer={10}>incentives</Grid.Column>
                <Grid.Column computer={4}>outstanding amount</Grid.Column>
                <Grid.Column computer={2}>due date</Grid.Column>
              </Grid.Row>

              <Grid.Row className="sectionContent">
                <Grid.Column computer={10}>Bonus</Grid.Column>
                <Grid.Column computer={4}>$50</Grid.Column>
                <Grid.Column computer={2}>01/01/18</Grid.Column>
              </Grid.Row>

              <Grid.Row className="sectionSummury">
                <Grid.Column computer={10} textAlign="right">
                  Total
                </Grid.Column>
                <Grid.Column computer={4}>$50</Grid.Column>
              </Grid.Row>

              <SectionHeader content="Work In Progress" />
              <Grid.Row className="sectionTitle">
                <Grid.Column computer={10}>current project</Grid.Column>
                <Grid.Column computer={4}>outstanding amount</Grid.Column>
                <Grid.Column computer={2}>due date</Grid.Column>
              </Grid.Row>

              <Grid.Row className="sectionContent">
                <Grid.Column computer={10}>ProjectXYZ</Grid.Column>
                <Grid.Column computer={4}>$800</Grid.Column>
                <Grid.Column computer={2}>01/06/18</Grid.Column>
              </Grid.Row>

              <Grid.Row className="sectionSummury">
                <Grid.Column computer={10} textAlign="right">
                  Total
                </Grid.Column>
                <Grid.Column computer={4}>$800</Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </StyledAccountPages>
      </ContainerLarge>
    );
  }
}

function SectionHeader({ content }) {
  return (
    <Grid.Row className="section-header">
      <Grid.Column computer={6} textAlign="left" floated="left">
        <span className="title">{content}</span>
      </Grid.Column>
      <Grid.Column computer={2} textAlign="right" floated="right" />
    </Grid.Row>
  );
}

export default SpecialistAccount;
