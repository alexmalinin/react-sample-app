import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import { userOperations } from "state/ducks/users";

import CompanySpecialist from "./CompanySpecialist";
import CompanyClient from "./CompanyClient";

const mapStateToProps = state => ({
  initialValues: state.user.company
});

const mapDispatchToProps = () => ({
  ...userOperations
});

const enchancer = connect(mapStateToProps, mapDispatchToProps);

const SForm = reduxForm({
  form: "SpecCompanyForm"
})(CompanySpecialist);

const CForm = reduxForm({
  form: "SpecCompanyForm"
})(CompanyClient);

export const Specialist = enchancer(SForm);
export const Client = enchancer(CForm);
