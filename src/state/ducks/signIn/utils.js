import {
  CLIENT,
  SPECIALIST,
  S_ACTIVE,
  S_CORE,
  S_PASSIVE,
  S_REDGUY
} from "../../../utilities";

export function getUserType(role) {
  if (role === "customer") {
    return CLIENT;
  } else if (
    [S_ACTIVE, S_CORE, S_PASSIVE, S_REDGUY].some(s_type => s_type === role)
  ) {
    return SPECIALIST;
  } else {
    return null;
  }
}
