export type ValidationRule = (value: unknown) => boolean | string;

export const required = (value: unknown) => !!value || "Field is required";
export const password = (value: string) =>
  value.length >= 8 || "Field should be at least 8 characters";
export const email = (value: string) => {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(value) || "Invalid email";
};

export const match = (value1: unknown, value2: unknown) =>
  value1 === value2 ? "" : `fields don't match`;
