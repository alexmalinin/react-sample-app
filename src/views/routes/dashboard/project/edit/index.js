import React, { Fragment } from "react";

import { Container } from "@styled/Containers";
import StyledProject from "@components/Projects/StyledProject";

import BoardSubHeader from "@components/BoardSubHeader";
import EditProject from "@components/Projects/edit";

const Project = props => {
  return (
    <Fragment>
      <BoardSubHeader />
      <Container
        indentBot
        sidebarCondition
        transparent
        dashboardContainer
        // className={this.state.loading && "loading"}
      >
        <i className="fa fa-spinner fa-3x fa-pulse preloader" />
        <StyledProject>
          <EditProject {...props} />
        </StyledProject>
      </Container>
    </Fragment>
  );
};

export default Project;
