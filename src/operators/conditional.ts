/**
 * Conditional operator handlers for JSONLogic
 */

import { OperatorHandler } from "../types";
import { formatValue } from "../utils/formatting";

/**
 * Get all conditional operator handlers
 */
export function getConditionalOperators(): { [key: string]: OperatorHandler } {
  return {
    if: handleIf,
    "?:": handleTernary,
  };
}

const handleIf: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length >= 3) {
    // JSONLogic if can have multiple condition-value pairs followed by a default
    // Format: [condition1, value1, condition2, value2, ..., default]

    if (values.length % 2 === 0) {
      // Even number of elements means no default value
      const parts = [];
      for (let i = 0; i < values.length; i += 2) {
        if (i < values.length - 1) {
          parts.push(
            `if ${explain ? explain(values[i]) : formatValue(values[i])} then ${explain ? explain(values[i + 1]) : formatValue(values[i + 1])}`
          );
        }
      }
      return parts.join(" else ") + " else nothing";
    } else {
      // Odd number of elements means there's a default value
      const parts = [];
      for (let i = 0; i < values.length - 1; i += 2) {
        parts.push(
          `if ${explain ? explain(values[i]) : formatValue(values[i])} then ${explain ? explain(values[i + 1]) : formatValue(values[i + 1])}`
        );
      }
      // Add "else" part with the last element as default
      parts[parts.length - 1] =
        parts[parts.length - 1] +
        ` else ${explain ? explain(values[values.length - 1]) : formatValue(values[values.length - 1])}`;
      return parts.join(" else ");
    }
  }
  return `if statement with ${explain ? explain(values) : formatValue(values)}`;
};

const handleTernary: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length === 3) {
    const [condition, trueValue, falseValue] = values;
    return `if ${explain ? explain(condition) : formatValue(condition)} then ${explain ? explain(trueValue) : formatValue(
      trueValue
    )} else ${explain ? explain(falseValue) : formatValue(falseValue)}`;
  }
  return `ternary operation with ${explain ? explain(values) : formatValue(values)}`;
};
