export default (type, callback) => ({
  [`${type}_PENDING`]: (state, action) => ({
    ...state,
    error: null,
    loading: true
  }),

  [`${type}_REJECTED`]: (state, action) => ({
    ...state,
    loading: false,
    error: true
  }),

  [`${type}_FULFILLED`]: (state, action) => ({
    ...state,
    loading: false,
    loaded: true,
    ...callback(state, action)
  })
});
