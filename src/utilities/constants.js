export const PORT =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_HOST
    : process.env.REACT_APP_API_PROD;

export const IMAGE_PORT =
  process.env.NODE_ENV === "development" ? process.env.REACT_APP_API_HOST : "";

export const BLANK_AVATAR = "/images/icon-avatar.svg";

export const GET = "GET";
export const POST = "POST";
export const PUT = "PUT";
export const DELETE = "DELETE";

export const PENDING = "_PENDING";
export const FULFILLED = "_FULFILLED";
export const REJECTED = "_REJECTED";
