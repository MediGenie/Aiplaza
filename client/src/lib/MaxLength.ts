export function MaxLength(value: number, legnth: number) {
  if (
    typeof value === "undefined" ||
    value === 0 ||
    value === undefined ||
    value === null ||
    value > legnth
  ) {
    return true;
  }
  return false;
}
