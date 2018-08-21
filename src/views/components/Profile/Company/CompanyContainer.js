import { connect } from "react-redux";

import { getUserData } from "@ducks/user/actions";
import { profileOperations } from "@ducks/profile";
import { industryOperations } from "@ducks/industries";
import { modalsOperations } from "@ducks/modals";

import Company from "./Company";

import { getDataForSelect } from "@utilities/selectors";

const mapStateToProps = () => {
  const prepareIndusrries = getDataForSelect();

  return ({
    user: { type },
    profile: { info, company },
    industriesReducer: { industries }
  }) => {
    const allIndustries = prepareIndusrries(industries, "value", "text");

    return {
      initialValues: {
        name: company.name,
        company_address: company.company_address,
        website: company.website,
        number_of_employers: company.number_of_employers,
        country: company.country,
        city: company.city,
        segment: company.segment,
        industry: company.industry_area_id,
        registered_name: company.registered_name,
        tell_about: company.tell_about,
        abn_acn: company.tell_about
      },

      usertype: type,
      avatar: info.avatar,
      industries: allIndustries
    };
  };
};

const mapDispatchToProps = {
  getUserData,
  updateCompany: profileOperations.updateCompany,
  showSubmitErrorModal: modalsOperations.showSubmitErrorModal,
  ...industryOperations
};

export default connect(mapStateToProps, mapDispatchToProps)(Company);
