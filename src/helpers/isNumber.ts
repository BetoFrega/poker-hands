export const isNumber = (value: number | unknown): value is number =>
  typeof value === "number";
