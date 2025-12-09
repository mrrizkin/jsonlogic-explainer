import { JsonLogicExplainer } from "../src";

describe("JsonLogicExplainer", () => {
  let explainer: JsonLogicExplainer;

  beforeEach(() => {
    explainer = new JsonLogicExplainer();
  });

  it("should handle basic equality operation", () => {
    const expression = { "===": [{ var: "age" }, 18] };
    const result = explainer.explain(expression);
    expect(result).toContain("age");
    expect(result).toContain("equals");
    expect(result).toContain("18");
  });

  it("should handle greater than operation", () => {
    const expression = { ">": [{ var: "age" }, 18] };
    const result = explainer.explain(expression);
    expect(result).toContain("age");
    expect(result).toContain("is greater than");
    expect(result).toContain("18");
  });

  it("should handle string concatenation", () => {
    const expression = { cat: ["Hello ", { var: "name" }] };
    const result = explainer.explain(expression);
    expect(result).toContain("concatenate");
    expect(result).toContain("Hello");
    expect(result).toContain("name");
  });

  it("should handle conditional if-then-else", () => {
    const expression = {
      if: [{ ">": [{ var: "age" }, 18] }, "adult", "minor"],
    };
    const result = explainer.explain(expression);
    expect(result).toContain("if");
    expect(result).toContain("age");
    expect(result).toContain("then");
    expect(result).toContain("else");
  });

  it("should handle logical AND operation", () => {
    const expression = {
      and: [
        { ">": [{ var: "age" }, 18] },
        { "==": [{ var: "status" }, "active"] },
      ],
    };
    const result = explainer.explain(expression);
    expect(result).toContain("age");
    expect(result).toContain("status");
    expect(result).toContain("and");
  });

  it("should handle logical OR operation", () => {
    const expression = {
      or: [
        { "==": [{ var: "status" }, "active"] },
        { "==": [{ var: "status" }, "pending"] },
      ],
    };
    const result = explainer.explain(expression);
    expect(result).toContain("status");
    expect(result).toContain("or");
  });

  it("should handle variable with default value", () => {
    const expression = { var: ["missing_field", "default_value"] };
    const result = explainer.explain(expression);
    expect(result).toContain("missing_field");
    expect(result).toContain("default_value");
    expect(result).toContain("with default value of");
  });

  it("should handle nested operations", () => {
    const expression = {
      and: [
        { ">": [{ var: "age" }, 18] },
        {
          or: [
            { "==": [{ var: "status" }, "active"] },
            { "==": [{ var: "status" }, "pending"] },
          ],
        },
      ],
    };
    const result = explainer.explain(expression);
    expect(result).toContain("age");
    expect(result).toContain("status");
    expect(result).toContain("and");
    expect(result).toContain("or");
  });
});
