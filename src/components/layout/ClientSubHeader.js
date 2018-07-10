import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import StyledSubHeader from "../../styleComponents/layout/StyledSubHeader";
import StyledSubHeaderLink from "../../styleComponents/StyledSubHeaderLink";
import SubHeaderLinkWrap from "../forms/renders/SubHeaderLinkWrap";
import ProgressBars from "../layout/ProgressBar";
import { getAllUrlParams } from "../../helpers/functions";

class SubHeader extends Component {
  state = {
    isEditing: false
  };

  componentWillMount() {
    let param = getAllUrlParams().edit;
    let isEditing = param ? param : false;
    this.setState({ isEditing });
  }

  navLinks = [
    {
      url: "info",
      label: "My Profile",
      percents: this.props.percents.profilePercent
    },
    {
      url: "company",
      label: "My Company",
      percents: this.props.percents.companyPercent
    },
    {
<<<<<<< cffb0315402d21ed6bd9ab6f9fccde4609ce3012
      url: "billing",
=======
      url: "billings",
>>>>>>> [Refactor] JWT refactor to new api
      label: "My Billings",
      percents: this.props.percents.billingPercent
    }
  ];

  render() {
    const { page } = this.props;
    const { isEditing } = this.state;

    return (
      <StyledSubHeader profileForm="true" greenGradient>
        <div className="progressBarsLink">
          {this.navLinks.map(({ url, label, percents }, key) => (
            <SubHeaderLinkWrap
              key={key}
              url={`/profile/${url}${isEditing ? "?edit" : ""}`}
              label={label}
<<<<<<< cffb0315402d21ed6bd9ab6f9fccde4609ce3012
=======
              noExact
>>>>>>> [Refactor] JWT refactor to new api
            >
              {key + 1}
              <ProgressBars percents={percents} />
            </SubHeaderLinkWrap>
          ))}
        </div>
        <div>
          {page !== "profile" &&
            !this.state.isEditing && (
              <NavLink exact className="button" to="/dashboard/">
                <StyledSubHeaderLink className="right-link arrow" />
                Complete Later
                <span />
              </NavLink>
            )}
        </div>
      </StyledSubHeader>
    );
  }
}

export default SubHeader;
