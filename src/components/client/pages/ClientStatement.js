import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, change } from "redux-form";
import { Grid, Tab } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import RenderSelect from "../../forms/renders/RenderSelect";
import ClientStatementForm from "../forms/ClientStatementForm";
import {
  getProjectTypes,
  getExperienceLevels,
  getIndustries,
  showClientData,
  updateSpecStep1
} from "../../../actions/actions";

import { Container } from "../../../styleComponents/layout/Container";
import SpecialistAccountSubHeader from "../../layout/SpecialistAccountSubHeader";
import StyledAccountPages from "../../../styleComponents/StyledAccountPages";

class ClientStatement extends Component {
  componentWillMount() {
    this.props.getIndustries();
    this.props.getProjectTypes();
    this.props.showClientData();
  }

  render() {
    const {
      industries,
      projectTypes,
      experienceLevels,
      ClientData
    } = this.props;

    return (
      <StyledAccountPages>
        <SpecialistAccountSubHeader />
        <Container className="sample" sidebarCondition>
          <Grid>
            <SectionHeader content="statement" />

            <Grid.Row className="sectionTitle">
              <Grid.Column computer={12}>regent</Grid.Column>
              <Grid.Column computer={4}>download</Grid.Column>
            </Grid.Row>

            <Grid.Row className="sectionContent">
              <Grid.Column computer={12}>2017</Grid.Column>
              <Grid.Column computer={4} className="statementLinks">
                <NavLink to="#" className="statementLink">
                  exel
                </NavLink>
                <NavLink to="#" className="statementLink">
                  pdf
                </NavLink>
                <NavLink to="#" className="statementLink">
                  cvs
                </NavLink>
              </Grid.Column>
            </Grid.Row>

            <SectionHeader content="general report" />

            <Grid.Row className="sectionTitle">
              <Grid.Column className="sectionColumn" computer={16}>
                <ClientStatementForm onSubmit={this.submit} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </StyledAccountPages>
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

export default connect(
  ({ industries, projectTypes, ClientData }) => ({
    industries,
    projectTypes,
    ClientData
  }),
  {
    updateSpecStep1,
    getIndustries,
    getProjectTypes,
    getExperienceLevels,
    showClientData
  }
)(ClientStatement);
