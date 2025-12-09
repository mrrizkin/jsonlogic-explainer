/**
 * Logical operator handlers for JSONLogic
 */

import { OperatorHandler } from "../types";
import { formatValue } from "../utils/formatting";

/**
 * Get all logical operator handlers
 */
export function getLogicalOperators(): { [key: string]: OperatorHandler } {
  return {
    and: handleAnd,
    or: handleOr,
    "!": handleNot,
    not: handleNot,
    "!!": handleDoubleNot,
  };
}

const handleAnd: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length > 0) {
    const formattedValues = values.map((v) => explain ? explain(v) : formatValue(v));
    return formattedValues.join(" and ");
  }
  return `and operation with ${explain ? explain(values) : formatValue(values)}`;
};

const handleOr: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length > 0) {
    const formattedValues = values.map((v) => explain ? explain(v) : formatValue(v));
    return formattedValues.join(" or ");
  }
  return `or operation with ${explain ? explain(values) : formatValue(values)}`;
};

const handleNot: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length === 1) {
    return `not ${explain ? explain(values[0]) : formatValue(values[0])}`;
  }
  return `not ${explain ? explain(values) : formatValue(values)}`;
};

const handleDoubleNot: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length === 1) {
    return `truthy check for ${explain ? explain(values[0]) : formatValue(values[0])}`;
  }
  return `double not ${explain ? explain(values) : formatValue(values)}`;
};
