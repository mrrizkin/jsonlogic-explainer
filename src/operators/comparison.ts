/**
 * Comparison operator handlers for JSONLogic
 */

import { OperatorHandler } from "../types";
import { formatValue } from "../utils/formatting";

/**
 * Get all comparison operator handlers
 */
export function getComparisonOperators(): { [key: string]: OperatorHandler } {
  return {
    "==": handleEquality,
    "===": handleStrictEquality,
    "!=": handleInequality,
    "!==": handleStrictInequality,
    ">": handleGreaterThan,
    ">=": handleGreaterThanOrEqual,
    "<": handleLessThan,
    "<=": handleLessThanOrEqual,
    in: handleIn,
  };
}

const handleEquality: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length >= 2) {
    const formattedValues = values.map((v) => explain ? explain(v) : formatValue(v));
    return `${formattedValues[0]} equals ${formattedValues[1]}`;
  }
  return `equality check with ${explain ? explain(values) : formatValue(values)}`;
};

const handleStrictEquality: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length >= 2) {
    const formattedValues = values.map((v) => explain ? explain(v) : formatValue(v));
    return `${formattedValues[0]} strictly equals ${formattedValues[1]}`;
  }
  return `strict equality check with ${explain ? explain(values) : formatValue(values)}`;
};

const handleInequality: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length >= 2) {
    const formattedValues = values.map((v) => explain ? explain(v) : formatValue(v));
    return `${formattedValues[0]} does not equal ${formattedValues[1]}`;
  }
  return `inequality check with ${explain ? explain(values) : formatValue(values)}`;
};

const handleStrictInequality: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length >= 2) {
    const formattedValues = values.map((v) => explain ? explain(v) : formatValue(v));
    return `${formattedValues[0]} does not strictly equal ${formattedValues[1]}`;
  }
  return `strict inequality check with ${explain ? explain(values) : formatValue(values)}`;
};

const handleGreaterThan: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length === 2) {
    const formattedValues = values.map((v) => explain ? explain(v) : formatValue(v));
    return `${formattedValues[0]} is greater than ${formattedValues[1]}`;
  }
  return `greater than comparison with ${explain ? explain(values) : formatValue(values)}`;
};

const handleGreaterThanOrEqual: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length === 2) {
    const formattedValues = values.map((v) => explain ? explain(v) : formatValue(v));
    return `${formattedValues[0]} is greater than or equal to ${formattedValues[1]}`;
  }
  return `greater than or equal comparison with ${explain ? explain(values) : formatValue(values)}`;
};

const handleLessThan: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length === 2) {
    const formattedValues = values.map((v) => explain ? explain(v) : formatValue(v));
    return `${formattedValues[0]} is less than ${formattedValues[1]}`;
  }
  return `less than comparison with ${explain ? explain(values) : formatValue(values)}`;
};

const handleLessThanOrEqual: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length === 2) {
    const formattedValues = values.map((v) => explain ? explain(v) : formatValue(v));
    return `${formattedValues[0]} is less than or equal to ${formattedValues[1]}`;
  }
  return `less than or equal comparison with ${explain ? explain(values) : formatValue(values)}`;
};

const handleIn: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length === 2) {
    const formattedValues = values.map((v) => explain ? explain(v) : formatValue(v));
    return `${formattedValues[0]} is in ${formattedValues[1]}`;
  }
  return `'in' operation with ${explain ? explain(values) : formatValue(values)}`;
};
