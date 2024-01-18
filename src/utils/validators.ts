export function validateEmail(email: string): string {
  const emailRegex =
    /^[^\.\s][a-zA-Z0-9\-\.]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/i;
  return emailRegex.test(email) ? "" : "Invalid format";
}

export function validateLength(value: string, length: number = 8): string {
  if (!value) return "Field is required";
  return value.length >= length ? "" : `At least ${length} characters`;
}

export function validateExists(value: string): string {
  return validateLength(value, 1);
}

export function validateValuesMatch(
  value1: string,
  value2: string,
  fieldName: string
): string {
  return value1 === value2 ? "" : `${fieldName}s don't match`;
}
