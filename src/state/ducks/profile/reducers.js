import { combineReducers } from "redux";
import * as types from "./types";
import * as utils from "./utils";
import { createReducer } from "../../utils";
import { FULFILLED } from "../../../utilities";

const initialState = {};

const infoReducer = createReducer(initialState)({
  [types.USER_DATA_SHOW + FULFILLED]: (state, { payload }) => ({
    ...utils.getUserInfo(payload.data)
  }),

  [types.USER_PROFILE_UPDATE + FULFILLED]: (state, { payload }) => ({
    ...state,
    ...utils.getUserInfo(payload.data)
  }),

  [types.EDUCATION_CARD_WITH_ID_EDIT + FULFILLED]: (state, { payload }) => ({
    ...state,
    educations: [...payload.data.educations]
  }),

  [types.EXPERIENCE_CARD_WITH_ID_EDIT + FULFILLED]: (state, { payload }) => ({
    ...state,
    work_experiences: [...payload.data.work_experiences]
  })
});

const industryReducer = createReducer(initialState)({
  [types.USER_DATA_SHOW + FULFILLED]: (state, { payload }) => ({
    ...utils.getSpecialistIndustry(payload.data)
  }),

  [types.USER_INDUSTRY_UPDATE + FULFILLED]: (state, { payload }) => ({
    ...state,
    ...utils.getSpecialistIndustry(payload.data)
  })
});

const companyRecuder = createReducer(initialState)({
  [types.USER_DATA_SHOW + FULFILLED]: (state, { payload }) => ({
    ...payload.data.company
  }),

  [types.USER_COMPANY_UPDATE + FULFILLED]: (state, { payload }) => ({
    ...payload.data.company
  })
});

const billingsReducer = createReducer(initialState)({
  [types.USER_DATA_SHOW + FULFILLED]: (state, { payload }) => ({
    ...payload.data.billing
  }),

  [types.USER_BILLINGS_UPDATE + FULFILLED]: (state, { payload }) => ({
    ...payload.data.billing
  })
});

export default combineReducers({
  info: infoReducer,
  industry: industryReducer,
  company: companyRecuder,
  billings: billingsReducer
});
