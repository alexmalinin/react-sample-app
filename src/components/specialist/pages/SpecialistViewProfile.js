import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import {
  Container,
  ContainerLarge
} from "../../../styleComponents/layout/Container";
import StyledCheckbox from "../../../styleComponents/forms/StyledCheckbox";
import StyledProfile from "../../../styleComponents/StyledProfile";
import {
  showSpecialistData,
  getExperienceLevels
} from "../../../actions/actions";
import { IMAGE_PORT } from "../../../constans/constans";
import AboutSubHeader from "../../layout/SpecialistAboutSubHeader";

class SpecialistViewProfile extends Component {
  componentWillMount() {
    this.props.getExperienceLevels();
    this.props.showSpecialistData();
  }

  renderText = value => (value ? value : `Select`);

  hoursPerWeek = availability => {
    switch (availability) {
      case "Full Time":
        return "(40HRS/WK)";
      case "Part Time":
        return "(20HRS/WK)";
      case "Not available":
        return "";
      default:
        return "";
    }
  };

  renderBillingData() {
    const { specialistData } = this.props;

    if (specialistData) {
      if (specialistData["specialist_billing"]) {
        let billingData = specialistData["specialist_billing"];
        let billingType = billingData["billing_type"];

        switch (billingType) {
          case 0:
            return (
              <Fragment>
                <Grid.Column computer={4}>
                  <div className="billing-type">Direct payment</div>
                  <span>
                    {billingData["bank_account_details"]
                      ? billingData["bank_account_details"]
                      : "No bank account details"}
                  </span>
                  <br />
                  <span>
                    {billingData["swift_code"]
                      ? billingData["swift_code"]
                      : "No swift code"}
                  </span>
                </Grid.Column>
              </Fragment>
            );
          case 1:
            return (
              <Fragment>
                <Grid.Column computer={4}>
                  <div className="billing-type">Payment to company</div>
                  <span>
                    {billingData["company_name"]
                      ? billingData["company_name"]
                      : "No company name"}
                  </span>
                  <br />
                  <span>
                    {billingData["manager"]
                      ? billingData["manager"]
                      : "No manager"}
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
    const { specialistData, experienceLevels } = this.props;

    let allSkills = specialistData ? specialistData["skills"] : [];
    let educations_experience = specialistData
      ? specialistData["educations"]
      : [];
    let work_experience = specialistData
      ? specialistData["work_experiences"]
      : [];
    let { avatar } = specialistData || false;

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
                      {/* <img src='/images/undefUser.png' alt='avatar'/> */}
                    </div>
                  </div>
                </Grid.Column>
                <Grid.Column computer="8" textAlign="left">
                  <div className="profile-info">
                    <h3>
                      {specialistData
                        ? specialistData["first_name"] || "No name"
                        : null}{" "}
                      &nbsp;
                      {specialistData
                        ? specialistData["last_name"] || "No last name"
                        : null}
                    </h3>
                    <span>
                      {specialistData
                        ? specialistData["industry_title"] || "No title"
                        : null}
                    </span>
                    <span>
                      {specialistData
                        ? specialistData["email"] || "No email"
                        : null}
                    </span>
                    <span>
                      {specialistData
                        ? specialistData["phone_number"] || "No phone number"
                        : null}
                    </span>
                  </div>
                </Grid.Column>
              </Grid.Row>

              <SectionHeader content="Services" page="industry" />
              <Grid.Row className="services">
                <Grid.Column computer={16}>
                  <h3>
                    {specialistData
                      ? specialistData["job_title"] || "No job title"
                      : null}
                  </h3>
                </Grid.Column>
                <Grid.Column computer={8} verticalAlign="middle">
                  <span>
                    ${specialistData
                      ? specialistData["hourly_rate"] || "0"
                      : null}/hr
                  </span>
                  <br />
                  <span>
                    {specialistData
                      ? specialistData["available"] || "Availability"
                      : null}&nbsp;
                    {specialistData
                      ? this.hoursPerWeek(specialistData["available"])
                      : null}
                  </span>
                  <br />
                  <span>
                    <img src="../../../../images/location.png" alt="marker" />
                    {specialistData
                      ? specialistData["address"]
                        ? specialistData["address"]["city"]
                        : "No city"
                      : null}, &nbsp;
                    {specialistData
                      ? specialistData["address"]
                        ? specialistData["address"]["country"]
                        : "No country"
                      : null}
                  </span>
                </Grid.Column>
                <Grid.Column computer={4}>
                  <span>Industry area</span>
                  <h3>
                    {specialistData
                      ? specialistData["specialities"][0]
                        ? specialistData["specialities"][0]["industry_area"][
                            "name"
                          ]
                        : "No industry"
                      : null}
                  </h3>
                  <span>Experience level</span>
                  <h3>
                    {experienceLevels && specialistData
                      ? experienceLevels[specialistData.experience_level_id - 1]
                        ? experienceLevels[
                            specialistData.experience_level_id - 1
                          ]["label"]
                        : "No  exp lvl"
                      : null}
                  </h3>
                </Grid.Column>
                <Grid.Column computer={4}>
                  <span>Project interests</span>
                  <h3>
                    {specialistData
                      ? this.renderText(specialistData["project_interest"])
                      : null}
                  </h3>
                  <span>Speciality within that niche</span>
                  <h3 className="niche">
                    {specialistData
                      ? specialistData["specialities"].map((item, key) => (
                          <span key={key}>{item.name}</span>
                        ))
                      : null}
                  </h3>
                </Grid.Column>
              </Grid.Row>

              <SectionHeader content="Skills" page="industry" />
              <Grid.Row className="skills">
                <Grid.Column computer={16}>
                  <div className="flex-wrapper">
                    {specialistData &&
                    specialistData["skills"] &&
                    specialistData["skills"].length !== 0
                      ? specialistData["skills"].map(item => (
                          <StyledCheckbox key={item.name}>
                            <div>{item.name}</div>
                          </StyledCheckbox>
                        ))
                      : "No skills"}
                  </div>
                </Grid.Column>
              </Grid.Row>

              <SectionHeader
                content="Work / Proffesional experience"
                page="profile"
              />
              <Grid.Row>
                <Grid.Column computer={8}>
                  {work_experience.length
                    ? work_experience.map((work, index) => (
                        <div key={index} className="card">
                          <p>
                            {work.started_at} - {work.finished_at}
                          </p>
                          <h3>{work.position}</h3>
                          <p>{work.name}</p>
                        </div>
                      ))
                    : "No work experience"}
                </Grid.Column>
                <Grid.Column computer={8}>
                  <p className="prof-exp">
                    {specialistData
                      ? specialistData["professional_experience_info"]
                        ? specialistData["professional_experience_info"]
                        : "No prof experience"
                      : null}
                  </p>
                </Grid.Column>
              </Grid.Row>

              <SectionHeader content="Education" page="profile" />
              <Grid.Row className="educations">
                <Grid.Column computer={16}>
                  {educations_experience.length
                    ? educations_experience.map((educations, index) => (
                        <div key={index} className="card">
                          <p>
                            {educations.started_at} - {educations.finished_at}
                          </p>
                          <h3>{educations.degree}</h3>
                          <p>{educations.name}</p>
                        </div>
                      ))
                    : "No educations"}
                </Grid.Column>
              </Grid.Row>

              <SectionHeader content="Company" page="company" />
              <Grid.Row className="company">
                <Grid.Column computer={4}>
                  <span>
                    {specialistData
                      ? specialistData["company"]
                        ? specialistData["company"]["name"]
                        : "No name"
                      : null}, &nbsp;
                  </span>
                  <span>
                    {specialistData
                      ? specialistData["company"]
                        ? specialistData["company"]["company_address"]
                        : "No company"
                      : null}, &nbsp;
                  </span>
                  <br />
                  <span>
                    {specialistData
                      ? specialistData["company"]
                        ? specialistData["company"]["country"]
                        : "No country"
                      : null}, &nbsp;
                  </span>
                  <span>
                    {specialistData
                      ? specialistData["company"]
                        ? specialistData["company"]["city"]
                        : "No city"
                      : null}, &nbsp;
                  </span>
                </Grid.Column>
                <Grid.Column computer={4}>
                  <span>
                    {specialistData
                      ? specialistData["company"]
                        ? specialistData["company"]["registered_name"]
                        : "No registered name"
                      : null}, &nbsp;
                  </span>
                  <br />
                  <span>
                    {specialistData
                      ? specialistData["company"]
                        ? specialistData["company"]["segment"]
                        : "No segment"
                      : null}, &nbsp;
                  </span>
                  <span>
                    {specialistData
                      ? specialistData["company"]
                        ? specialistData["company"]["number_of_employers"]
                        : "No employers"
                      : null}, &nbsp;
                  </span>
                </Grid.Column>
                <Grid.Column computer={4}>
                  <span>
                    {specialistData
                      ? specialistData["company"]
                        ? specialistData["company"]["website"]
                        : "No website"
                      : null}, &nbsp;
                  </span>
                </Grid.Column>
                <Grid.Column computer={4}>
                  <span>
                    {specialistData
                      ? specialistData["company"]
                        ? specialistData["company"]["tell_about"]
                        : "No description"
                      : null}, &nbsp;
                  </span>
                </Grid.Column>
              </Grid.Row>

              <SectionHeader content="Billing" page="billings" />
              <Grid.Row className="billing">
                {this.renderBillingData()}
              </Grid.Row>
            </Grid>
          </StyledProfile>
        </Container>
      </ContainerLarge>
    );
  }

  // shouldComponentUpdate() {
  //     return true
  // }

  // componentWillReceiveProps(nextProps) {
  //     if (nextProps.specialistData) {
  //         console.log('----update')
  //         // this.showMessage()
  //     }
  // }
  //
  // showMessage = () => {
  //     this.setState({
  //         rerender: !this.state.rerender,
  //     });
  // };
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
  ({ specialistData, experienceLevels }) => ({
    specialistData,
    experienceLevels
  }),
  { showSpecialistData, getExperienceLevels }
)(SpecialistViewProfile);
