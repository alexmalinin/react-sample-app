import React from "react";

import StyledSubHeaderLink from "@styled/SubHeaderLink";

export default ({ className, content }) => (
  <StyledSubHeaderLink className={className}>{content}</StyledSubHeaderLink>
);
