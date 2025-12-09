/**
 * Variable operator handlers for JSONLogic
 */

import { OperatorHandler } from "../types";
import { formatValue } from "../utils/formatting";

/**
 * Get all variable operator handlers
 */
export function getVariableOperators(): { [key: string]: OperatorHandler } {
  return {
    var: handleVar,
  };
}

// Note: The 'var' operator is handled directly in the main class,
// so we provide a basic handler here for completeness
const handleVar: OperatorHandler = (values, _data, _explain) => {
  if (typeof values === "string") {
    // Don't capitalize variable names - return them as lowercase for natural language
    return values.toLowerCase();
  } else if (Array.isArray(values) && values.length === 2) {
    const [field, defaultValue] = values;
    // Format field name as lowercase but keep default value formatting
    return `${String(field).toLowerCase()} with default ${formatValue(defaultValue)}`;
  } else if (values === null || values === "") {
    return "null";
  } else {
    return String(values).toLowerCase();
  }
};
