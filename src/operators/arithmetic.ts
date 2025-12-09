/**
 * Arithmetic operator handlers for JSONLogic
 */

import { OperatorHandler } from "../types";
import { formatValue } from "../utils/formatting";

/**
 * Get all arithmetic operator handlers
 */
export function getArithmeticOperators(): { [key: string]: OperatorHandler } {
  return {
    "+": handleAddition,
    "-": handleSubtraction,
    "*": handleMultiplication,
    "/": handleDivision,
    "%": handleModulo,
    abs: handleAbs,
    max: handleMax,
    min: handleMin,
  };
}

const handleAddition: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length >= 2) {
    const formattedValues = values.map((v) => {
      return explain ? explain(v) : formatValue(v);
    });
    return `${formattedValues.join(" plus ")}`;
  }
  if (Array.isArray(values) && values.length === 1) {
    const value0Val = explain ? explain(values[0]) : formatValue(values[0]);
    return `positive ${value0Val}`;
  }
  const valuesVal = explain ? explain(values) : formatValue(values);
  return `addition with ${valuesVal}`;
};

const handleSubtraction: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length === 1) {
    const value0Val = explain ? explain(values[0]) : formatValue(values[0]);
    return `negative ${value0Val}`;
  }
  if (Array.isArray(values) && values.length >= 2) {
    const formattedValues = values.map((v) => {
      return explain ? explain(v) : formatValue(v);
    });
    return `${formattedValues[0]} minus ${formattedValues
      .slice(1)
      .join(" minus ")}`;
  }
  const valuesVal = explain ? explain(values) : formatValue(values);
  return `subtraction with ${valuesVal}`;
};

const handleMultiplication: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length >= 2) {
    const formattedValues = values.map((v) => {
      return explain ? explain(v) : formatValue(v);
    });
    return `${formattedValues.join(" times ")}`;
  }
  const valuesVal = explain ? explain(values) : formatValue(values);
  return `multiplication with ${valuesVal}`;
};

const handleDivision: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length === 2) {
    const formattedValues = values.map((v) => {
      return explain ? explain(v) : formatValue(v);
    });
    return `${formattedValues[0]} divided by ${formattedValues[1]}`;
  }
  if (Array.isArray(values) && values.length > 2) {
    const formattedValues = values.map((v) => {
      return explain ? explain(v) : formatValue(v);
    });
    return `${formattedValues[0]} divided by ${formattedValues
      .slice(1)
      .join(" divided by ")}`;
  }
  const valuesVal = explain ? explain(values) : formatValue(values);
  return `division with ${valuesVal}`;
};

const handleModulo: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length === 2) {
    const formattedValues = values.map((v) => {
      return explain ? explain(v) : formatValue(v);
    });
    return `${formattedValues[0]} modulo ${formattedValues[1]}`;
  }
  const valuesVal = explain ? explain(values) : formatValue(values);
  return `modulo with ${valuesVal}`;
};

const handleAbs: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length === 1) {
    const value0Val = explain ? explain(values[0]) : formatValue(values[0]);
    return `absolute value of ${value0Val}`;
  }
  const valuesVal = explain ? explain(values) : formatValue(values);
  return `absolute value with ${valuesVal}`;
};

const handleMax: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values)) {
    if (values.length === 1 && Array.isArray(values[0])) {
      // max can take an array as a single parameter
      const innerValues = values[0].map((v) => {
        return explain ? explain(v) : formatValue(v);
      });
      return `maximum of [${innerValues.join(", ")}]`;
    }
    // max can take multiple parameters
    const formattedValues = values.map((v) => {
      return explain ? explain(v) : formatValue(v);
    });
    return `maximum of ${formattedValues.join(", ")}`;
  }
  const valuesVal = explain ? explain(values) : formatValue(values);
  return `maximum with ${valuesVal}`;
};

const handleMin: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values)) {
    if (values.length === 1 && Array.isArray(values[0])) {
      // min can take an array as a single parameter
      const innerValues = values[0].map((v) => {
        return explain ? explain(v) : formatValue(v);
      });
      return `minimum of [${innerValues.join(", ")}]`;
    }
    // min can take multiple parameters
    const formattedValues = values.map((v) => {
      return explain ? explain(v) : formatValue(v);
    });
    return `minimum of ${formattedValues.join(", ")}`;
  }
  const valuesVal = explain ? explain(values) : formatValue(values);
  return `minimum with ${valuesVal}`;
};
