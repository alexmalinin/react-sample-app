import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Grid, Tab } from "semantic-ui-react";
import HeaderBasic from "../../layout/HeaderBasic";
import SubHeader from "../../layout/SpecialistsSubHeader";
import {
  Container,
  ContainerLarge
} from "../../../styleComponents/layout/Container";
import { S_MainContainer } from "../../../styleComponents/layout/S_MainContainer";
import {
  DvTitle,
  DvTitleSmall
} from "../../../styleComponents/layout/DvTitles";
import { StyledTabs } from "../../../styleComponents/StyledTabCard";
import SubscribeForm from "../../forms/SubscribeForm";
import StyledCheckbox from "../../../styleComponents/forms/StyledCheckbox";
import StyledProfile from "../../../styleComponents/StyledProfile";
import { showClientData } from "../../../actions/actions";
import { IMAGE_PORT } from "../../../constans/constans";
import AboutSubHeader from "../../layout/SpecialistAboutSubHeader";

class ClientAbout extends Component {
  componentWillMount() {
    this.props.showClientData();
  }

  renderText = value => (value ? value : `Select`);

  renderBillingData() {
    const { clientData } = this.props;

    if (clientData) {
      if (clientData["customer_billing"]) {
        let billingData = clientData["customer_billing"];
        let billingType = billingData["billing_type"];

        switch (billingType) {
          case 0:
            return (
              <Fragment>
                <Grid.Column computer={4}>
                  <div className="billing-type">Paypal</div>
                  <span>
                    {billingData["account_number"]
                      ? billingData["account_number"]
                      : "No account number"}
                  </span>
                  <br />
                  <span>
                    {billingData["password"]
                      ? billingData["password"]
                      : "No password"}
                  </span>
                </Grid.Column>
              </Fragment>
            );
          case 1:
            return (
              <Fragment>
                <Grid.Column computer={4}>
                  <div className="billing-type">Credit card</div>
                  <span>
                    {billingData["card_name"]
                      ? billingData["card_name"]
                      : "No card name"}
                  </span>
                  <br />
                  <span>
                    {billingData["card_number"]
                      ? billingData["card_number"]
                      : "No card number"}
                  </span>
                </Grid.Column>
                <Grid.Column computer={4}>
                  <span>
                    {billingData["expiry_date"]
                      ? billingData["expiry_date"]
                      : "No expiry date"}
                  </span>
                  <br />
                  <span>
                    {billingData["ccv"] ? billingData["ccv"] : "No ccv"}
                  </span>
                </Grid.Column>
              </Fragment>
            );
          case 2:
            return (
              <Fragment>
                <Grid.Column computer={4}>
                  <div className="billing-type">Accounts</div>
                  <span>
                    {billingData["account_details"]
                      ? billingData["account_details"]
                      : "No account details"}
                  </span>
                </Grid.Column>
              </Fragment>
            );
          default:
            return (
              <Grid.Column computer={4}>
                <div>No information</div>
              </Grid.Column>
            );
        }
      } else {
        return (
          <Grid.Column computer={4}>
            <div>No information</div>
          </Grid.Column>
        );
      }
    }
  }

  render() {
    const { clientData } = this.props;

    let { avatar } = clientData || false;

    return (
      <ContainerLarge>
        <AboutSubHeader />
        <Container indentBot sidebarCondition>
          <StyledProfile>
            <Grid>
              <SectionHeader page="profile" />
              <Grid.Row className="main-info">
                <Grid.Column computer={8} textAlign="right">
                  <div className="profile-image">
                    <div className="image-wrapper">
                      <img
                        src={
                          avatar && avatar.url
                            ? IMAGE_PORT + avatar.url
                            : "/images/undefUser.png"
                        }
                        alt="avatar"
                      />
                    </div>
                  </div>
                </Grid.Column>
                <Grid.Column computer="8" textAlign="left">
                  <div className="profile-info">
                    <h3>
                      {clientData
                        ? clientData["first_name"] || "No name"
                        : null}{" "}
                      &nbsp;
                      {clientData
                        ? clientData["last_name"] || "No last name"
                        : null}
                    </h3>
                    <span>
                      {clientData
                        ? clientData["industry_title"] || "No title"
                        : null}
                    </span>
                    <span>
                      {clientData ? clientData["email"] || "No email" : null}
                    </span>
                    <span>
                      {clientData
                        ? clientData["phone_number"] || "No phone number"
                        : null}
                    </span>
                  </div>
                </Grid.Column>
              </Grid.Row>

              <SectionHeader content="Address" page="profile" />
              <Grid.Row className="Address">
                <Grid.Column computer={16}>
                  <span>
                    <img src="../../../../images/location.png" alt="marker" />
                    {clientData
                      ? clientData["address"]
                        ? clientData["address"]["city"]
                        : "No city"
                      : null}, &nbsp;
                    {clientData
                      ? clientData["address"]
                        ? clientData["address"]["country"]
                        : "No country"
                      : null}
                  </span>
                </Grid.Column>
              </Grid.Row>

              <SectionHeader content="Company" page="company" />
              <Grid.Row className="company">
                <Grid.Column computer={4}>
                  <span>
                    {clientData
                      ? clientData["company"]
                        ? clientData["company"]["name"]
                        : "No name"
                      : null}, &nbsp;
                  </span>
                  <span>
                    {clientData
                      ? clientData["company"]
                        ? clientData["company"]["company_address"]
                        : "No company"
                      : null}, &nbsp;
                  </span>
                  <br />
                  <span>
                    {clientData
                      ? clientData["company"]
                        ? clientData["company"]["country"]
                        : "No country"
                      : null}, &nbsp;
                  </span>
                  <span>
                    {clientData
                      ? clientData["company"]
                        ? clientData["company"]["city"]
                        : "No city"
                      : null}, &nbsp;
                  </span>
                </Grid.Column>
                <Grid.Column computer={4}>
                  <span>
                    {clientData
                      ? clientData["company"]
                        ? clientData["company"]["registered_name"]
                        : "No registered name"
                      : null}, &nbsp;
                  </span>
                  <br />
                  <span>
                    {clientData
                      ? clientData["company"]
                        ? clientData["company"]["segment"]
                        : "No segment"
                      : null}, &nbsp;
                  </span>
                  <span>
                    {clientData
                      ? clientData["company"]
                        ? clientData["company"]["number_of_employers"]
                        : "No employers"
                      : null}, &nbsp;
                  </span>
                </Grid.Column>
                <Grid.Column computer={4}>
                  <span>
                    {clientData
                      ? clientData["company"]
                        ? clientData["company"]["website"]
                        : "No website"
                      : null}, &nbsp;
                  </span>
                </Grid.Column>
                <Grid.Column computer={4}>
                  <span>
                    {clientData
                      ? clientData["company"]
                        ? clientData["company"]["tell_about"]
                        : "No description"
                      : null}, &nbsp;
                  </span>
                </Grid.Column>
              </Grid.Row>

              <SectionHeader content="Billing" page="billing" />
              <Grid.Row className="billing">
                {this.renderBillingData()}
              </Grid.Row>
            </Grid>
          </StyledProfile>
        </Container>
      </ContainerLarge>
    );
  }
}

function SectionHeader({ content, page }) {
  return (
    <Grid.Row className="section-header">
      <Grid.Column computer={6} textAlign="left" floated="left">
        <span className="title">{content}</span>
      </Grid.Column>
      <Grid.Column computer={2} textAlign="right" floated="right">
        <NavLink to={`/dashboard/${page}?edit`}>
          <Dots />
        </NavLink>
      </Grid.Column>
    </Grid.Row>
  );
}

function Dots() {
  return (
    <div className="dv-btn">
      <i className="fas fa-user-edit" />
    </div>
  );
}

export default connect(
  ({ clientData }) => ({
    clientData
  }),
  { showClientData }
)(ClientAbout);
