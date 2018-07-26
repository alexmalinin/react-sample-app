import * as types from "./types";
import omit from "lodash/omit";
import { createReducer } from "../../utils";
import { FULFILLED, REJECTED, PENDING } from "../../../utilities";

const initialState = {
  loading: false,
  loaded: false,
  channels: {},
  error: null
};

const channelsReducer = createReducer(initialState)({
  [types.CHANNELS_SHOW]: (state, action) => ({
    ...state,
    channels: {
      ...state.channels,
      ...action.payload
    }
  }),

  [types.CHANNEL_CREATE + PENDING]: (state, action) => ({
    ...state,
    loading: true
  }),

  [types.CHANNEL_CREATE + FULFILLED]: (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    channels: {
      ...state.channels,
      [payload.data.id]: payload.data
    }
  }),

  [types.CHANNEL_UPDATE + PENDING]: (state, action) => ({
    ...state,
    loading: true
  }),

  [types.CHANNEL_UPDATE + FULFILLED]: (state, { payload }) => ({
    ...state,
    loading: false,
    channels: {
      ...state.channels,
      [payload.data.id]: payload.data
    }
  }),

  [types.CHANNEL_DELETE + PENDING]: (state, action) => ({
    ...state,
    loading: true
  }),

  [types.CHANNEL_DELETE + FULFILLED]: (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    channels: {
      ...omit(state.channels, payload.data.id)
    }
  }),

  [types.CHANNEL_DELETE + REJECTED]: (state, action) => ({
    ...state,
    loading: false,
    error: true
  })
});

export default channelsReducer;
