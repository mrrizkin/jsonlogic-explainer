/**
 * String operator handlers for JSONLogic
 */

import { OperatorHandler } from "../types";
import { formatValue } from "../utils/formatting";

/**
 * Get all string operator handlers
 */
export function getStringOperators(): { [key: string]: OperatorHandler } {
  return {
    substr: handleSubstr,
    cat: handleCat,
    in: handleInString,
  };
}

const handleSubstr: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length >= 2) {
    const [str, start] = values;
    if (values.length === 3) {
      const [, , length] = values;
      const strVal = explain ? explain(str) : formatValue(str);
      const startVal = explain ? explain(start) : formatValue(start);
      const lengthVal = explain ? explain(length) : formatValue(length);
      return `substring of ${strVal} starting at ${startVal} with length ${lengthVal}`;
    }
    const strVal = explain ? explain(str) : formatValue(str);
    const startVal = explain ? explain(start) : formatValue(start);
    return `substring of ${strVal} starting at ${startVal}`;
  }
  const valuesVal = explain ? explain(values) : formatValue(values);
  return `substring operation with ${valuesVal}`;
};

const handleCat: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length > 0) {
    const formattedValues = values.map((v) => {
      return explain ? explain(v) : formatValue(v);
    });
    return `concatenate ${formattedValues.join(" and ")}`;
  }
  return `concatenate with ${explain ? explain(values) : formatValue(values)}`;
};

const handleInString: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length === 2) {
    const [needle, haystack] = values;
    const needleVal = explain ? explain(needle) : formatValue(needle);
    const haystackVal = explain ? explain(haystack) : formatValue(haystack);
    return `${needleVal} is in ${haystackVal}`;
  }
  const valuesVal = explain ? explain(values) : formatValue(values);
  return `'in' operation with ${valuesVal}`;
};
