import React from "react";
import { NavLink } from "react-router-dom";

import SubHeaderLink from "./SubHeaderLink";

export default ({ className, url, onClick, children, label }) => (
  <NavLink exact className="button" to={url} onClick={onClick}>
    <SubHeaderLink className={className} content={children} />
    <span>{label}</span>
  </NavLink>
);
