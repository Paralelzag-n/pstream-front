export function validateEmail(email: string): string {
  const emailRegex = /^[^\.\s][\w\-\.{2,}]+@([\w-]+\.)+[\w-]{2,}$/;
  return emailRegex.test(email) ? "" : "Invalid email";
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
