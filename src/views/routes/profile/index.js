import React from "react";
import HeaderIntro from "view/components/HeaderIntro";
import { Route } from "react-router-dom";

import info from "./info";
import company from "./company";

export default ({ match }) => (
  <div>
    <HeaderIntro />

    <Route path={`${match.url}/info`} component={info} />
    <Route path={`${match.url}/company`} component={company.specialist} />
    <Route path={`${match.url}/info`} component={info} />
  </div>
);
