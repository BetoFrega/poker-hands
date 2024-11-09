import { describe, expect, it } from "@jest/globals";
import { cx } from "./cx";

describe("cx", () => {
  it("should concatenate class names", () => {
    const classNames = ["foo", "bar", "baz"];
    const result = cx(classNames);
    expect(result).toBe("foo bar baz");
  });
  it("should concatenate conditional class names", () => {
    const notTrue = false;
    const classNames = ["foo", notTrue && "no", "baz", !notTrue && "yes"];
    const result = cx(classNames);
    expect(result).toBe("foo baz yes");
  });
});
