import styled from "styled-components";
import { Dropdown } from "react-semantic-redux-form";

import { fontColors, colors } from "@styled/constants/colors";

export default styled(Dropdown)`
  &.ui.selection.dropdown {
    font-family: "Roboto";
    font-size: 16px;
    color: ${fontColors.regular};
    padding: 7px 10px;
    line-height: 22px;
    letter-spacing: 1.5px;
    border-radius: 6px;
    border: 1px solid ${colors.lightGreyBlue};
    min-height: auto;

    & > .dropdown.icon {
      line-height: 1em;
    }

    & > .default.text {
      color: ${fontColors.light};
    }
  }

  &.ui.selection.active.dropdown {
    border-color: ${colors.blue};

    .menu {
      border-color: inherit;
    }
  }
`;
