import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  Container,
  ContainerLarge
} from "../../../styleComponents/layout/Container";
import StyledProfile from "../../../styleComponents/StyledProfile";
import AboutSubHeader from "../../layout/SpecialistAboutSubHeader";

import {
  showSpecialistData,
  showClientData,
  getIndustries,
  showSpecialistWithId,
  getExperienceLevels
} from "../../../actions/actions";

import RednerProfile from "../renders/RenderProfile";
import { getUserType } from "../../../helpers/functions";
import { SPECIALIST } from "../../../constants/user";

class About extends Component {
  componentDidMount() {
    const {
      match: { params },
      getIndustries,
      getExperienceLevels,
      showSpecialistData,
      showSpecialistWithId,
      showClientData
    } = this.props;

    const { specialistId } = params;

    if (getUserType() === SPECIALIST) {
      getIndustries();
      getExperienceLevels();
      specialistId ? showSpecialistWithId(specialistId) : showSpecialistData();
    } else {
      showClientData();
      getIndustries();
    }
  }

  renderIndustryName = id => {
    const { industries } = this.props;

    let industry = null;

    if (industries && industries["industry"] && id) {
      industry = industries["industry"][id - 1].label;
    }

    return industry;
  };

  renderExperienceLevel = () => {
    const { user, experienceLevels } = this.props;

    return experienceLevels && user
      ? experienceLevels[user.experience_level_id - 1]
        ? experienceLevels[user.experience_level_id - 1]["label"]
        : "No  exp lvl"
      : null;
  };

  getServices = data => {
    if (!data) {
      return null;
    }

    return {
      title: "Services",
      link: "/dashboard/industry?edit",
      fields: [
        {
          label: "I am a:",
          value: data.position || "No position"
        },
        {
          label: "Position:",
          value: data.job_title || "No position"
        },
        {
          label: "Industry title:",
          value: data.industry_title || "No industry"
        },
        {
          label: "Hourly rate:",
          value: data.hourly_rate || "No hourly rate"
        },
        {
          label: "Digital industry:",
          value:
            this.renderIndustryName(data.industry_area_id) ||
            "No digital industry"
        },
        {
          label: "Project interest:",
          value:
            (data.project_type && data.project_type.name) ||
            "No project interest"
        },
        {
          label: "Experience level:",
          value: this.renderExperienceLevel() || "No experience level"
        },
        {
          label: "Best contact number",
          value: data.contact_number || "No contact number"
        },
        {
          label: "Avaliability:",
          value: data.available || "No avaliability"
        }
      ]
    };
  };

  getCompany = data => {
    if (!data) return null;

    const {
      name,
      segment,
      website,
      country,
      industry_area_id,
      number_of_employers,
      company_address,
      city
    } = data;

    return {
      title: "Company",
      link: "/dashboard/company?edit",
      fields: [
        {
          label: "Company name:",
          value: name || "No company name"
        },
        {
          label: "Segment:",
          value: segment || "No segment"
        },
        {
          label: "Website:",
          value: website || "No website"
        },
        {
          label: "Country:",
          value: country || "No country"
        },
        {
          label: "Industry:",
          value: this.renderIndustryName(industry_area_id) || "no industry"
        },
        {
          label: "Number of employers:",
          value: number_of_employers || "No employers"
        },
        {
          label: "Company address:",
          value: company_address || "No company address"
        },
        {
          label: "City:",
          value: city || "No city"
        }
      ]
    };
  };

  getBillings = data => {
    if (!data) return null;

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
    } = data;

    switch (billing_type) {
      case 0:
        return {
          title: "Billings",
          subtitle: "Credit card",
          link: `/dashboard/${
            getUserType() === SPECIALIST ? "billings" : "billing"
          }?edit`,
          fields: [
            {
              label: "Name on card:",
              value: card_name || "No card name"
            },
            {
              label: "Card number:",
              value: card_number || "No card number"
            }
          ]
        };

      case 1:
        return {
          title: "Billings",
          subtitle: "Direct Payment",
          link: `/dashboard/${
            getUserType() === SPECIALIST ? "billings" : "billing"
          }?edit`,
          fields: [
            {
              label: "Correspond bank:",
              value: correspondent_bank || "No correspondent bank"
            },
            {
              label: "Beneficiary bank:",
              value: beneficiary_bank || "No beneficiary bank"
            },
            {
              label: "Beneficiary name:",
              value: beneficiary_name || "No beneficiary name"
            },
            {
              label: "Swift code:",
              value: swift_code || "No Swift code"
            },
            {
              label: "IBAN:",
              value: iban || "No IBAN"
            },
            {
              label: "Purpose of payment:",
              value: purpose_of_payment || "No purpose"
            },
            {
              label: "Beneficiary account:",
              value: beneficiary_account || "No beneficiary account"
            }
          ]
        };
      default:
        return {
          title: "Billings",
          subtitle: "No information"
        };
    }
  };

  render() {
    const {
      match: { params },
      user,
      specialistWithId
    } = this.props;

    const { specialistId } = params;

    const activeUser = specialistId ? specialistWithId : user;

    if (activeUser) {
      document.title =
        activeUser.first_name +
        " " +
        activeUser.last_name +
        " | Digital Village";
    }

    let data = {};

    if (activeUser) {
      data = {
        avatar: (activeUser.avatar && activeUser.avatar.url) || false,
        name: `${activeUser.first_name} ${activeUser.last_name}`,
        email: activeUser.email,
        phone: activeUser.phone_number,
        position: activeUser.position,
        address:
          activeUser.address &&
          activeUser.address.city + ", " + activeUser.address.country,
        experience: activeUser.professional_experience_info,
        description: activeUser.description,
        skills: activeUser.skills,
        communications: activeUser.communication_type
      };
    }

    let educationsExperience = activeUser ? activeUser["educations"] : null;
    let workExperience = activeUser ? activeUser["work_experiences"] : null;

    const services =
        getUserType() === SPECIALIST ? this.getServices(activeUser) : null,
      company = this.getCompany(activeUser && activeUser.company),
      billings = this.getBillings(activeUser && activeUser.billing);

    return (
      <ContainerLarge>
        <AboutSubHeader />
        <Container indentBot dashboardContainer sidebarCondition transparent>
          <StyledProfile>
            <RednerProfile
              data={data}
              services={services}
              company={company}
              billings={billings}
              educationsExperience={educationsExperience}
              workExperience={workExperience}
              editCondition={!specialistId}
            />
          </StyledProfile>
        </Container>
      </ContainerLarge>
    );
  }
}

const mapStateToProps = state => {
  if (getUserType() === SPECIALIST) {
    return {
      specialistId: state.specialistId,
      specialistWithId: state.specialistWithId,
      industries: state.industries,
      user: state.specialistData,
      experienceLevels: state.experienceLevels
    };
  } else {
    return {
      industries: state.industries,
      user: state.clientData
    };
  }
};

export default connect(mapStateToProps, {
  showSpecialistData,
  showClientData,
  getIndustries,
  showSpecialistWithId,
  getExperienceLevels
})(withRouter(About));
