export const required = value => (value ? undefined : "Required");
export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
export const date = value =>
  value && /\d{2}\/\d{2}\/\d{4}/i.test(value) ? "Invalid date" : undefined;
export const number = value =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const maxLength = max => value =>
  value && value.length > max
    ? `Must be no more than ${max} characters`
    : undefined;
export const minLength2 = minLength(2);
export const minLength8 = minLength(8);
export const maxLength4 = maxLength(4);
export const maxLength20 = maxLength(20);
