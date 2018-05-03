import axios from "axios";
import { SUCCESS } from "../constans/constans";
import { industries } from "../helpers/selects/industries";

export default store => next => action => {
  const { type, getIndustries, ...rest } = action;
  if (!getIndustries) return next(action);
  axios({
    method: "get",
    url: getIndustries
  })
    .then(response => {
      let industryObj = response.data.map(industry => {
        return { value: industry.id, label: industry.name };
      });

      let specialityObj = response.data.map(industry => {
        return {
          [industry.id]: industry.specialities.map(speciality => {
            return { value: speciality.id, label: speciality.name };
          })
        };
      });

      let result = { industry: industryObj, speciality: specialityObj };

      return next({ ...rest, type: type + SUCCESS, payload: result });
    })
    .catch(function(error) {
      console.log(error);
    });
};
