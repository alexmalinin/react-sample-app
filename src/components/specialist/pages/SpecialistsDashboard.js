import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
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
  compareObjects,
  getUserRole
} from "../../../helpers/functions";
import { S_REDGUY, S_PASSIVE } from "../../../constans/constans";
import ClientModule from "../../client/ClientModule";
import SearchSpecialist from "./SearchSpecialist";
import NotFound from "../../NotFound";
import SpecialistMyTasks from "./SpecialistMyTasks";

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
      rightSidebarOpened: !!getCookie("rightSidebarOpened") || false
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
      if (params["page"] === "search") {
        if (getUserRole() === S_REDGUY) {
          page = params["page"];
        } else page = "forbidden";
      } else page = params["page"];
    } else if (params["projectId"] && params["projectId"] !== "new") {
      page = "board";
    } else if (params["projectNewModule"] && getUserRole() === S_REDGUY) {
      page = "module";
    } else if (params["specialistId"]) {
      page = "specialist";
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
    const {
      match: { params },
      history,
      location,
      specialistTeams,
      specialistProjects
    } = this.props;

    switch (page) {
      case "profile":
        document.title = "Profile | Digital Village";
        return (
          <SpecialistsProfile
            calculatePagePercent={this.calculatePagePercent}
            collectPropfileData={this.collectPropfileData}
          />
        );
      case "industry":
        document.title = "Industry | Digital Village";
        return (
          <SpecialistIndustry
            calculatePagePercent={this.calculatePagePercent}
            collectPropfileData={this.collectPropfileData}
          />
        );
      case "company":
        document.title = "Company | Digital Village";
        return (
          <SpecialistsCompany
            calculatePagePercent={this.calculatePagePercent}
            collectPropfileData={this.collectPropfileData}
          />
        );
      case "billings":
        document.title = "Billings | Digital Village";
        return (
          <SpecialistsMyBillings
            calculatePagePercent={this.calculatePagePercent}
            collectPropfileData={this.collectPropfileData}
          />
        );
      case "about":
        document.title = "Your profile | Digital Village";
        return <SpecialistsAbout />;
      case "board":
        return (
          <ProjectsBoard
            projectId={params["projectId"]}
            currentEpic={params["moduleId"] || "all"}
            history={history}
          />
        );
      case "teams":
        document.title = "Teams | Digital Village";
        return <Teams teams={specialistTeams} />;
      case "test":
        document.title = "Test | Digital Village";
        return <SpecialistsTest />;
      case "module":
        document.title = "Add module | Digital Village";
        return <ClientModule projectId={params["projectNewModule"]} />;
      case "account":
        document.title = "Billings | Digital Village";
        return <SpecialistAccount />;
      case "year_to_date":
        document.title = "YTD | Digital Village";
        return <SpecialistYTD />;
      case "statement":
        document.title = "Statement | Digital Village";
        return <SpecialistStatement />;
      case "the_village":
        document.title = "The village | Digital Village";
        return <TheVillage />;
      case "forbidden":
        return <NotFound />;
      case "search":
        if (getUserRole() === S_REDGUY) {
          document.title = "Search Specialist | Digital Village";
          return <SearchSpecialist />;
        } else return <Redirect to="/404" />;
      case "specialist":
        return <SpecialistsAbout specialistId={params["specialistId"]} />;
      case "dashboard":
        document.title = "Dashboard | Digital Village";
        return <Dashboard projects={specialistProjects} history={history} />;
      default:
        return <Redirect to="/404" />;
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
