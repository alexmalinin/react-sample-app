export function getUserType(state) {
  return state.signIn.auth.userType;
}

export function getUserId(state) {
  return state.signIn.auth.user_id;
}

export function getAuth(state) {
  return state.signIn.auth;
}
