import React, { Component, Fragment } from "react";
import {
  ContainerLarge,
  Container
} from "../../../styleComponents/layout/Container";
import DashboardSubHeader from "../../layout/DashboardSubHeader";
import SearchFilterForm from "../../client/forms/SearchFilterForm";

export default class SearchSpecialist extends Component {
  render() {
    return (
      <ContainerLarge indentTop>
        <DashboardSubHeader />
        <Container indentTopXs sidebarCondition>
          <SearchFilterForm />
        </Container>
      </ContainerLarge>
    );
  }
}
