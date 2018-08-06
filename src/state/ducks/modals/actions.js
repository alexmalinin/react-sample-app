import * as types from "./types";

export const showSubmitErrorModal = () => ({
  type: types.SUBMIT_ERROR_MODAL_SHOW
});

export const closeSubmitErrorModal = () => ({
  type: types.SUBMIT_ERROR_MODAL_CLOSE
});
