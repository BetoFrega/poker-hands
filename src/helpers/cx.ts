/**
 * A simple utility function to concatenate class names.
 */
export const cx = (input: (string | boolean | undefined)[]): string =>
  input
    .filter((x) => typeof x === "string")
    .join(" ")
    .trim();
