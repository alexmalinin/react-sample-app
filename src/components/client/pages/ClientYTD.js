import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import {
  ContainerLarge,
  Container
} from "../../../styleComponents/layout/Container";
import SpecialistAccountSubHeader from "../../layout/SpecialistAccountSubHeader";
import StyledAccountPages from "../../../styleComponents/StyledAccountPages";

class ClientYTD extends Component {
  render() {
    return (
      <ContainerLarge>
        <StyledAccountPages className="sasas">
          <SpecialistAccountSubHeader />
          <Container className="sample" sidebarCondition>
            <Grid>
              <SectionHeader content="year to date" />

              <Grid.Row className="sectionTitle">
                <Grid.Column computer={14}>earnings/paid</Grid.Column>
                <Grid.Column computer={2}>total pade</Grid.Column>
              </Grid.Row>

              <Grid.Row className="sectionContent">
                <Grid.Column computer={14}>projectXYZ</Grid.Column>
                <Grid.Column computer={2}>$200</Grid.Column>
              </Grid.Row>

              <Grid.Row className="sectionContent">
                <Grid.Column computer={14}>projectABC</Grid.Column>
                <Grid.Column computer={2}>$800</Grid.Column>
              </Grid.Row>

              <Grid.Row className="sectionSummury">
                <Grid.Column computer={14} textAlign="right">
                  Total
                </Grid.Column>
                <Grid.Column computer={2}>$1000</Grid.Column>
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

export default ClientYTD;
