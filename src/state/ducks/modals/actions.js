import * as types from "./types";

export const showSubmitErrorModal = () => ({
  type: types.SUBMIT_ERROR_MODAL_SHOW
});

export const closeSubmitErrorModal = () => ({
  type: types.SUBMIT_ERROR_MODAL_CLOSE
});

export const showConfirmSubmitModal = payload => ({
  type: types.CONFIRM_SUBMIT_MODAL_SHOW,
  payload
});

export const closeConfirmSubmitModal = () => ({
  type: types.CONFIRM_SUBMIT_MODAL_CLOSE
});
