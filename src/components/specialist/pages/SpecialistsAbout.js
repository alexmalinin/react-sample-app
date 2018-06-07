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
  getIndustries,
  showSpecialistWithId,
  getExperienceLevels
} from "../../../actions/actions";
import { IMAGE_PORT } from "../../../constans/constans";
import AboutSubHeader from "../../layout/SpecialistAboutSubHeader";
import { run } from "../../../helpers/scrollToElement";

class SpecialistsWithId extends Component {
  componentWillMount() {
    const {
      specialistId,
      getIndustries,
      getExperienceLevels,
      showSpecialistData,
      showSpecialistWithId
    } = this.props;

    getIndustries();
    getExperienceLevels();
    specialistId ? showSpecialistWithId(specialistId) : showSpecialistData();
    run(0)(true);
  }

  renderText = value => (value ? value : `Select`);

  renderIndustryName = () => {
    const { specialistData, industries } = this.props;

    console.log(this.props);

    let industry = null;

    if (industries && industries["industry"] && specialistData) {
      industry =
        industries["industry"][specialistData.industry_area_id - 1].label;
    }

    return industry;
  };

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
      if (specialistData["billing"]) {
        let billingData = specialistData["billing"];
        let billingType = billingData["billing_type"];

        switch (billingType) {
          case 0:
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
          case 1:
            return (
              <Fragment>
                <Grid.Column computer={4}>
                  <div className="billing-type">Direct Payment</div>
                  <span>
                    {billingData["correspondent_bank"]
                      ? billingData["correspondent_bank"]
                      : "No correspondent bank"}
                  </span>
                  <br />
                  <span>
                    {billingData["swift_code"]
                      ? billingData["swift_code"]
                      : "No Swift code"}
                  </span>
                  <br />
                  <span>
                    {billingData["iban"]
                      ? billingData["iban"]
                      : "No IBAN"}
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
    const {
      specialistWithId,
      experienceLevels,
      specialistData,
      industries,
      specialistId
    } = this.props;
    let specialist;

    if (specialistId) {
      specialist = specialistWithId;
      if (specialistWithId) {
        document.title =
          specialistWithId.first_name +
          " " +
          specialistWithId.last_name +
          " | Digital Village";
      }
    } else specialist = specialistData;

    let allSkills = specialist ? specialist["skills"] : [];
    let educations_experience = specialist ? specialist["educations"] : [];
    let work_experience = specialist ? specialist["work_experiences"] : [];
    let { avatar } = specialist || false;

    return (
      <ContainerLarge>
        <AboutSubHeader />
        <Container indentBot sidebarCondition>
          <StyledProfile>
            <Grid>
              <SectionHeader page="profile" editCondition={!specialistId} />
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
                      {specialist
                        ? specialist["first_name"] || "No name"
                        : null}{" "}
                      &nbsp;
                      {specialist
                        ? specialist["last_name"] || "No last name"
                        : null}
                    </h3>
                    <span>
                      {specialist
                        ? specialist["industry_title"] || "No title"
                        : null}
                    </span>
                    <span>
                      {specialist ? specialist["email"] || "No email" : null}
                    </span>
                    <span>
                      {specialist
                        ? specialist["phone_number"] || "No phone number"
                        : null}
                    </span>
                  </div>
                </Grid.Column>
              </Grid.Row>

              <SectionHeader
                content="Services"
                page="industry"
                editCondition={!specialistId}
              />
              <Grid.Row className="services">
                <Grid.Column computer={16}>
                  <h3>
                    {specialist
                      ? specialist["job_title"] || "No job title"
                      : null}
                  </h3>
                </Grid.Column>
                <Grid.Column computer={8} verticalAlign="middle">
                  <span>
                    ${specialist ? specialist["hourly_rate"] || "0" : null}/hr
                  </span>
                  <br />
                  <span>
                    {specialist
                      ? specialist["available"] || "Availability"
                      : null}&nbsp;
                    {specialist
                      ? this.hoursPerWeek(specialist["available"])
                      : null}
                  </span>
                  <br />
                  <span>
                    <img src="../../../../images/location.png" alt="marker" />
                    {specialist
                      ? specialist["address"]
                        ? specialist["address"]["city"]
                        : "No city"
                      : null}, &nbsp;
                    {specialist
                      ? specialist["address"]
                        ? specialist["address"]["country"]
                        : "No country"
                      : null}
                  </span>
                </Grid.Column>
                <Grid.Column computer={4}>
                  <span>Industry area</span>
                  <h3>{this.renderIndustryName() || "No industry area"}</h3>
                  <span>Experience level</span>
                  <h3>
                    {experienceLevels && specialist
                      ? experienceLevels[specialist.experience_level_id - 1]
                        ? experienceLevels[specialist.experience_level_id - 1][
                            "label"
                          ]
                        : "No  exp lvl"
                      : null}
                  </h3>
                </Grid.Column>
                <Grid.Column computer={4}>
                  <span>Project interests</span>
                  <h3>
                    {specialist && specialist["project_type"]
                      ? this.renderText(specialist["project_type"].name)
                      : null}
                  </h3>
                  <span>Speciality within that niche</span>
                  <h3 className="niche">
                    {specialist
                      ? specialist["specialities"].map((item, key) => (
                          <span key={key}>{item.name}</span>
                        ))
                      : null}
                  </h3>
                </Grid.Column>
              </Grid.Row>

              <SectionHeader
                content="Skills"
                page="industry"
                editCondition={!specialistId}
              />
              <Grid.Row className="skills">
                <Grid.Column computer={16}>
                  <div className="flex-wrapper">
                    {specialist &&
                    specialist["skills"] &&
                    specialist["skills"].length !== 0
                      ? specialist["skills"].map(item => (
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
                editCondition={!specialistId}
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
                    {specialist
                      ? specialist["professional_experience_info"]
                        ? specialist["professional_experience_info"]
                        : "No prof experience"
                      : null}
                  </p>
                </Grid.Column>
              </Grid.Row>

              <SectionHeader
                content="Education"
                page="profile"
                editCondition={!specialistId}
              />
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

              <SectionHeader
                content="Company"
                page="company"
                editCondition={!specialistId}
              />
              <Grid.Row className="company">
                <Grid.Column computer={4}>
                  <span>
                    {specialist
                      ? specialist["company"]
                        ? specialist["company"]["name"]
                        : "No name"
                      : null}, &nbsp;
                  </span>
                  <span>
                    {specialist
                      ? specialist["company"]
                        ? specialist["company"]["company_address"]
                        : "No company"
                      : null}, &nbsp;
                  </span>
                  <br />
                  <span>
                    {specialist
                      ? specialist["company"]
                        ? specialist["company"]["country"]
                        : "No country"
                      : null}, &nbsp;
                  </span>
                  <span>
                    {specialist
                      ? specialist["company"]
                        ? specialist["company"]["city"]
                        : "No city"
                      : null}, &nbsp;
                  </span>
                </Grid.Column>
                <Grid.Column computer={4}>
                  <span>
                    {specialist
                      ? specialist["company"]
                        ? specialist["company"]["registered_name"]
                        : "No registered name"
                      : null}, &nbsp;
                  </span>
                  <br />
                  <span>
                    {specialist
                      ? specialist["company"]
                        ? specialist["company"]["segment"]
                        : "No segment"
                      : null}, &nbsp;
                  </span>
                  <span>
                    {specialist
                      ? specialist["company"]
                        ? specialist["company"]["number_of_employers"]
                        : "No employers"
                      : null}, &nbsp;
                  </span>
                </Grid.Column>
                <Grid.Column computer={4}>
                  <span>
                    {specialist
                      ? specialist["company"]
                        ? specialist["company"]["website"]
                        : "No website"
                      : null}, &nbsp;
                  </span>
                </Grid.Column>
                <Grid.Column computer={4}>
                  <span>
                    {specialist
                      ? specialist["company"]
                        ? specialist["company"]["tell_about"]
                        : "No description"
                      : null}, &nbsp;
                  </span>
                </Grid.Column>
              </Grid.Row>

              {!specialistId && (
                <Fragment>
                  <SectionHeader
                    content="Billing"
                    page="billings"
                    editCondition={!specialistId}
                  />
                  <Grid.Row className="billing">
                    {this.renderBillingData()}
                  </Grid.Row>
                </Fragment>
              )}
            </Grid>
          </StyledProfile>
        </Container>
      </ContainerLarge>
    );
  }
}

function SectionHeader({ content, page, editCondition }) {
  return (
    <Grid.Row className="section-header">
      <Grid.Column computer={6} textAlign="left" floated="left">
        <span className="title">{content}</span>
      </Grid.Column>
      {editCondition && (
        <Grid.Column computer={2} textAlign="right" floated="right">
          <NavLink to={`/dashboard/${page}?edit`}>
            <Dots />
          </NavLink>
        </Grid.Column>
      )}
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
  ({ specialistData, industries, specialistWithId, experienceLevels }) => ({
    specialistWithId,
    industries,
    specialistData,
    experienceLevels
  }),
  {
    showSpecialistData,
    getIndustries,
    showSpecialistWithId,
    getExperienceLevels
  }
)(SpecialistsWithId);
