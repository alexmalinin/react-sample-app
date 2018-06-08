import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import {
  Container,
  ContainerLarge
} from "../../../styleComponents/layout/Container";
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
      if (clientData["billing"]) {
        const {
          billing_type,
          card_name,
          card_number,
          correspondent_bank,
          beneficiary_bank,
          beneficiary_name,
          swift_code,
          iban,
          purpose_of_payment,
          beneficiary_account
        } = clientData["billing"];

        switch (billing_type) {
          case 0:
            return (
              <Grid.Row className="billing">
                <Grid.Column computer={16}>
                  <div className="billing-type">Credit card</div>
                </Grid.Column>
                <Grid.Column computer={3}>
                  <div className="billingItem">
                    <p>Card name</p>
                    <h3>{card_name || "No correspondent bank"}</h3>
                  </div>
                  <div className="billingItem">
                    <p>Card number</p>
                    <h3>{card_number || "No correspondent bank"}</h3>
                  </div>
                </Grid.Column>
              </Grid.Row>
            );
          case 1:
            return (
              <Grid.Row className="billing">
                <Grid.Column computer={16}>
                  <div className="billing-type">Direct Payment</div>
                </Grid.Column>
                <Grid.Column computer={3}>
                  <div className="billingItem">
                    <p>Correspond bank</p>
                    <h3>{correspondent_bank || "No correspondent bank"}</h3>
                  </div>
                  <div className="billingItem">
                    <p>Beneficiary bank</p>
                    <h3>{beneficiary_bank || "No beneficiary bank"}</h3>
                  </div>
                  <div className="billingItem">
                    <p>Beneficiary name</p>
                    <h3>{beneficiary_name || "No beneficiary name"}</h3>
                  </div>
                </Grid.Column>
                <Grid.Column computer={1} />
                <Grid.Column computer={3}>
                  <div className="billingItem">
                    <p>Swift code</p>
                    <h3>{swift_code || "No Swift code"}</h3>
                  </div>
                  <div className="billingItem">
                    <p>IBAN</p>
                    <h3>{iban || "No IBAN"}</h3>
                    <p>Purpose of payment</p>
                    <h3>{purpose_of_payment || "No purpose"}</h3>
                  </div>
                  <div className="billingItem">
                    <p>Beneficiary account</p>
                    <h3>{beneficiary_account || "No beneficiary account"}</h3>
                  </div>
                </Grid.Column>
              </Grid.Row>
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
              {this.renderBillingData()}
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
