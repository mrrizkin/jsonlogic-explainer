/**
 * Array operator handlers for JSONLogic
 */

import { OperatorHandler } from "../types";
import { formatValue } from "../utils/formatting";

/**
 * Get all array operator handlers
 */
export function getArrayOperators(): { [key: string]: OperatorHandler } {
  return {
    map: handleMap,
    filter: handleFilter,
    reduce: handleReduce,
    all: handleAll,
    none: handleNone,
    some: handleSome,
    merge: handleMerge,
    missing: handleMissing,
    missing_some: handleMissingSome,
  };
}

const handleMap: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length === 2) {
    const [array, operation] = values;
    const arrayVal = explain ? explain(array) : formatValue(array);
    const operationVal = explain ? explain(operation) : formatValue(operation);
    return `map ${arrayVal} with operation ${operationVal}`;
  }
  const valuesVal = explain ? explain(values) : formatValue(values);
  return `map operation with ${valuesVal}`;
};

const handleFilter: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length === 2) {
    const [array, condition] = values;
    const arrayVal = explain ? explain(array) : formatValue(array);
    const conditionVal = explain ? explain(condition) : formatValue(condition);
    return `filter ${arrayVal} where ${conditionVal}`;
  }
  const valuesVal = explain ? explain(values) : formatValue(values);
  return `filter operation with ${valuesVal}`;
};

const handleReduce: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length === 3) {
    const [array, operation, initialValue] = values;
    const arrayVal = explain ? explain(array) : formatValue(array);
    const operationVal = explain ? explain(operation) : formatValue(operation);
    const initialValueVal = explain
      ? explain(initialValue)
      : formatValue(initialValue);
    return `reduce ${arrayVal} with ${operationVal} starting with ${initialValueVal}`;
  }
  const valuesVal = explain ? explain(values) : formatValue(values);
  return `reduce operation with ${valuesVal}`;
};

const handleAll: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length === 2) {
    const [array, condition] = values;
    const arrayVal = explain ? explain(array) : formatValue(array);
    const conditionVal = explain ? explain(condition) : formatValue(condition);
    return `all items in ${arrayVal} satisfy ${conditionVal}`;
  }
  const valuesVal = explain ? explain(values) : formatValue(values);
  return `all operation with ${valuesVal}`;
};

const handleNone: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length === 2) {
    const [array, condition] = values;
    const arrayVal = explain ? explain(array) : formatValue(array);
    const conditionVal = explain ? explain(condition) : formatValue(condition);
    return `no items in ${arrayVal} satisfy ${conditionVal}`;
  }
  const valuesVal = explain ? explain(values) : formatValue(values);
  return `none operation with ${valuesVal}`;
};

const handleSome: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length === 2) {
    const [array, condition] = values;
    const arrayVal = explain ? explain(array) : formatValue(array);
    const conditionVal = explain ? explain(condition) : formatValue(condition);
    return `some items in ${arrayVal} satisfy ${conditionVal}`;
  }
  const valuesVal = explain ? explain(values) : formatValue(values);
  return `some operation with ${valuesVal}`;
};

const handleMerge: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values)) {
    const formattedValues = values.map((v) => {
      return explain ? explain(v) : formatValue(v);
    });
    return `merge arrays: ${formattedValues.join(", ")}`;
  }
  const valuesVal = explain ? explain(values) : formatValue(values);
  return `merge operation with ${valuesVal}`;
};

const handleMissing: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length >= 1) {
    if (values.length === 1 && Array.isArray(values[0])) {
      // Handle the case where the first parameter is an array of required fields
      const requiredFields = values[0]
        .map((field: any) => {
          return explain ? explain(field) : formatValue(field);
        })
        .join(", ");
      return `missing required fields: ${requiredFields}`;
    } else {
      // Handle the case where individual parameters are required
      const requiredFields = values
        .map((field: any) => {
          return explain ? explain(field) : formatValue(field);
        })
        .join(", ");
      return `missing required fields: ${requiredFields}`;
    }
  }
  const valuesVal = explain ? explain(values) : formatValue(values);
  return `check for missing values with ${valuesVal}`;
};

const handleMissingSome: OperatorHandler = (values, _data, explain) => {
  if (Array.isArray(values) && values.length === 2) {
    const [minRequired, fields] = values;
    if (Array.isArray(fields)) {
      const fieldsList = fields
        .map((field: any) => {
          return explain ? explain(field) : formatValue(field);
        })
        .join(", ");
      const minRequiredVal = explain
        ? explain(minRequired)
        : formatValue(minRequired);
      return `missing at least ${minRequiredVal} of these fields: ${fieldsList}`;
    } else {
      const minRequiredVal = explain
        ? explain(minRequired)
        : formatValue(minRequired);
      const fieldsVal = explain ? explain(fields) : formatValue(fields);
      return `missing at least ${minRequiredVal} of field ${fieldsVal}`;
    }
  }
  const valuesVal = explain ? explain(values) : formatValue(values);
  return `check for missing some values with ${valuesVal}`;
};
