import React, { Component } from "react";

import { ContainerLarge, Container } from "../styleComponents/layout/Container";
import RenderDashboard from "./layout/RenderDashboard";
import DashboardSubHeader from "./layout/DashboardSubHeader";

export default class Dashboard extends Component {
  state = {
    loading: false
  };

  componentDidMount() {
    this.setState({
      loading: true
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.projects && nextProps.projects.successId) {
      this.setState({ loading: false });
    }
  }

  render() {
    const { projects } = this.props;

    return (
      <ContainerLarge>
        <DashboardSubHeader dashboard />
        <Container
          className={this.state.loading && "loading"}
          sidebarCondition
          dashboardContainer
          transparent
        >
          <i className="fa fa-spinner fa-3x fa-pulse preloader" />
          <RenderDashboard projects={projects} />
        </Container>
      </ContainerLarge>
    );
  }
}
