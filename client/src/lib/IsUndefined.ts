export function IsUndefined(value: unknown) {
  if (
    typeof value === "undefined" ||
    value === "" ||
    value === undefined ||
    value === null
  ) {
    return true;
  }
  return false;
}
