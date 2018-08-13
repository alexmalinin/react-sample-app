import React, { Component } from "react";

import Search from "./Search";

import { Container } from "@styled/Containers";

class SearchContainer extends Component {
  render() {
    return (
      <Container fluid indentTopXs sidebarCondition>
        <Search />
      </Container>
    );
  }
}

export default SearchContainer;
