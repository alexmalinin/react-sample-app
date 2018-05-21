import React, { Component, Fragment } from "react";
import HeaderBasic from "../../layout/HeaderBasic";
import SubHeader from "../../layout/SpecialistsSubHeader";
import { connect } from "react-redux";
import { S_MainContainer } from "../../../styleComponents/layout/S_MainContainer";
import SideBarLeft from "../renders/SideBarLeft";
import SideBarRight from "../../layout/SideBarRight";
import SpecialistsProfile from "./SpecialistsProfile";
import SpecialistsCompany from "./SpecialistsCompany";
import SpecialistIndustry from "./SpecialistIndustry";
import SpecialistsAbout from "./SpecialistsAbout";
import SpecialistsTest from "./SpecialistsTest";
import SpecialistsMyBillings from "./SpecialistsMyBillings";
import SpecialistAccount from "./SpecialistAccount";
import SpecialistYTD from "./SpecialistYTD";
import SpecialistStatement from "./SpecialistStatement";
import TheVillage from "../../TheVillage";
import { projects, days } from "../../../helpers/sidebarDbEmulate";
import ProjectsBoard from "../../ProjectsBoard";
import Dashboard from "../../Dashboard";
import { Container } from "../../../styleComponents/layout/Container";
import {
  showSpecialistData,
  updateSpecialistProfile,
  showAllProjects,
  showProjectWithId,
  showAllEpics,
  showSpecialistProjects,
  showSpecialistTeams,
  showProjectTeam,
  showAllSpecialists
} from "../../../actions/actions";
import Teams from "../../Teams";
import {
  getCookie,
  setCookie,
  checkObjectPropertiesForValues,
  getUserRole
} from "../../../helpers/functions";
import { S_REDGUY, S_PASSIVE } from "../../../constans/constans";
import ClientModule from "../../client/ClientModule";
import SearchSpecialist from "./SearchSpecialist";
import NotFound from "../../NotFound";

const mapPageNameToFieldsCount = {
  profilePercent: 7,
  industryPercent: 10,
  companyPercent: 8,
  billingPercent: 2
};

const pagesToCalculate = ["profile", "industry", "company", "billings"];

class SpecialistsDashboard extends Component {
  constructor() {
    super();
    this.state = {
      profilePercent: null,
      industryPercent: null,
      companyPercent: null,
      billingPercent: null,
      rightSidebarOpened: !!getCookie("rightSidebarOpened") || false,
      isEdited: false
    };
    this.calculatePagePercent = this.calculatePagePercent.bind(this);
  }

  componentWillMount() {
    // this.props.showAllProjects();
    this.props.showSpecialistProjects();
    this.props.showSpecialistTeams();
    this.props.showSpecialistData();
    localStorage.removeItem("user_email");
  }

  collectPropfileData() {
    const {
      first_name,
      last_name,
      email,
      address,
      phone_number
    } = this.props.specialistData;
    const { city, country } = address ? address : {};
    const data = {
      first_name,
      last_name,
      email,
      city,
      country,
      phone_number,
      additionalField: "additionalField"
    };
    return data;
  }

  collectIndustryData() {
    const {
      job_title,
      position,
      industry_title,
      communication_type,
      contact_number,
      hourly_rate,
      experience_level_id,
      project_type,
      available,
      skills: skills_attributes
    } = this.props.specialistData;

    const data = {
      job_title,
      position,
      industry_title,
      industry: {},
      experience_level_id,
      contact_number,
      project_type,
      hourly_rate,
      available,
      skills_attributes,
      communication_type
    };

    return data;
  }

  collectCompanyData() {
    const { company } = this.props.specialistData;
    const {
      name,
      city,
      company_address,
      country,
      industry_area_id,
      number_of_employers,
      segment,
      website
    } = company ? company : {};

    const data = {
      name,
      city,
      company_address,
      country,
      industry_area_id,
      number_of_employers,
      segment,
      website
    };
    return data;
  }

  collectBillingData() {
    const { specialist_billing } = this.props.specialistData;
    const {
      billing_type,
      bank_account_details,
      swift_code,
      company_name,
      manager
    } = specialist_billing ? specialist_billing : {};

    if (billing_type === 0) {
      const data = {
        bank_account_details,
        swift_code
      };
      return data;
    }

    if (billing_type === 1) {
      const data = {
        company_name,
        manager
      };
      return data;
    }

    return {};
  }

  calculatePagePercent(percentName, data) {
    const fieldsCount = mapPageNameToFieldsCount[percentName];

    const keys = Object.keys(data);
    const filledFields = keys.filter(key => data[key]).length;

    let percents = Math.round(filledFields / fieldsCount * 100);
    percents = percents > 100 ? 100 : percents;

    this.setState({
      [percentName]: percents
    });
  }

  calculatePercents() {
    if (this.props.specialistData) {
      const profileData = this.collectPropfileData();
      const industryData = this.collectIndustryData();
      const companyData = this.collectCompanyData();
      const billingData = this.collectBillingData();

      this.calculatePagePercent("profilePercent", profileData);
      this.calculatePagePercent("industryPercent", industryData);
      this.calculatePagePercent("companyPercent", companyData);
      this.calculatePagePercent("billingPercent", billingData);
    }
  }

  toggleRightSidebar = e => {
    this.setState({
      rightSidebarOpened: !this.state.rightSidebarOpened
    });
    setCookie(
      "rightSidebarOpened",
      this.state.rightSidebarOpened ? "" : "open",
      1460
    );
  };

  render() {
    const {
      match: { params },
      specialistTeams,
      changeUserType,
      history
    } = this.props;
    const { rightSidebarOpened, isEdited } = this.state;
    let page;

    const passive = getUserRole() === S_PASSIVE;
    const allowedPages = [
      "about",
      "profile",
      "industry",
      "company",
      "billings"
    ];

    if (passive) {
      if (params["page"]) {
        if (allowedPages.some(page => params["page"] === page)) {
          page = params["page"];
        } else page = "forbidden";
      } else page = "forbidden";
    } else if (params["page"]) {
      page = params["page"];
    } else if (params["projectId"] && params["projectId"] !== "new") {
      page = "board";
    } else if (params["projectNewModule"] && getUserRole() === S_REDGUY) {
      page = "module";
    } else page = "dashboard";

    let sidebarCondition =
      page !== "profile" &&
      page !== "industry" &&
      page !== "company" &&
      page !== "billings" &&
      page !== "forbidden";

    return (
      <div>
        <HeaderBasic
          passive={passive}
          match={this.props.match}
          page={sidebarCondition}
        />
        <S_MainContainer
          sidebarOpened={rightSidebarOpened}
          sidebarCondition={sidebarCondition}
          passive={passive}
        >
          {sidebarCondition ? (
            <Fragment>
              {!passive && (
                <SideBarLeft
                  currentProject={params["projectId"]}
                  currentEpic={params["moduleId"]}
                />
              )}
              {this.renderPage(page)}
              {!passive && (
                <SideBarRight
                  teams={specialistTeams}
                  projects={projects}
                  days={days}
                  opened={rightSidebarOpened}
                  toggle={this.toggleRightSidebar}
                />
              )}
            </Fragment>
          ) : (
            <Container sidebarCondition={sidebarCondition}>
              <SubHeader
                percents={this.state}
                isEdited={isEdited}
                page={page}
                user={changeUserType}
              />
              {this.renderPage(page)}
            </Container>
          )}
        </S_MainContainer>
      </div>
    );
  }

  renderPage = page => {
    switch (page) {
      case "profile":
        return (
          <SpecialistsProfile
            calculatePagePercent={this.calculatePagePercent}
            collectPropfileData={this.collectPropfileData}
          />
        );
      case "industry":
        return (
          <SpecialistIndustry
            calculatePagePercent={this.calculatePagePercent}
            collectPropfileData={this.collectPropfileData}
            handleFormValueChange={this.handleFormValueChange}
          />
        );
      case "company":
        return (
          <SpecialistsCompany
            calculatePagePercent={this.calculatePagePercent}
            collectPropfileData={this.collectPropfileData}
            handleFormValueChange={this.handleFormValueChange}
          />
        );
      case "billings":
        return (
          <SpecialistsMyBillings
            calculatePagePercent={this.calculatePagePercent}
            collectPropfileData={this.collectPropfileData}
            handleFormValueChange={this.handleFormValueChange}
          />
        );
      case "about":
        return <SpecialistsAbout />;
      case "board":
        return (
          <ProjectsBoard
            projectId={this.props.match.params["projectId"]}
            currentEpic={this.props.match.params["moduleId"] || "all"}
            history={this.props.history}
          />
        );
      case "teams":
        return <Teams teams={this.props.specialistTeams} />;
      case "test":
        return <SpecialistsTest />;
      case "module":
        return (
          <ClientModule
            projectId={this.props.match.params["projectNewModule"]}
          />
        );
      case "account":
        return <SpecialistAccount />;
      case "year_to_date":
        return <SpecialistYTD />;
      case "statement":
        return <SpecialistStatement />;
      case "the_village":
        return <TheVillage />;
      case "forbidden":
        return <NotFound />;
      case "search":
        return <SearchSpecialist />;
      case "dashboard":
        return <Dashboard projects={this.props.specialistProjects} />;
      default:
        return <NotFound />;
    }
  };

  handleFormValueChange = obj => {
    if (checkObjectPropertiesForValues(obj)) {
      this.setState({ isEdited: false });
    } else {
      this.setState({ isEdited: true });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.specialistData) {
      if (
        nextProps.specialistData.email &&
        pagesToCalculate.some(page => page === nextProps.match.params["page"])
      ) {
        this.calculatePercents();
      }
      if (getUserRole() !== nextProps.specialistData.role) {
        localStorage.clear();
        window.location.reload();
      }
    }

    let projectId = nextProps.match.params["projectId"];

    if (projectId && nextProps.projectWithId) {
      if (nextProps.projectWithId.id != projectId) {
        nextProps.showProjectWithId(projectId);
        nextProps.showAllEpics(projectId);
        nextProps.showProjectTeam(projectId);
      }
    } else if (projectId) {
      nextProps.showProjectWithId(projectId);
      nextProps.showProjectTeam(projectId);
    }
  }
}

export default connect(
  ({
    changeUserType,
    specialistData,
    confirmPassword,
    educations,
    experiences,
    allProjects,
    projectWithId,
    specialistProjects,
    allTeams,
    specialistTeams
  }) => ({
    changeUserType,
    specialistData,
    confirmPassword,
    educations,
    experiences,
    allProjects,
    projectWithId,
    specialistProjects,
    allTeams,
    specialistTeams
  }),
  {
    showSpecialistData,
    updateSpecialistProfile,
    showAllProjects,
    showProjectWithId,
    showAllEpics,
    showSpecialistProjects,
    showSpecialistTeams,
    showProjectTeam,
    showAllSpecialists
  }
)(SpecialistsDashboard);
