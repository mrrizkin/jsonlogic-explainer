/**
 * Type definitions for JSONLogic operations and expressions
 */

// Represents a variable reference in JSONLogic
export type JsonLogicVariable = {
  var: string | number | null;
};

// Represents any JSONLogic expression
export type JsonLogicExpression =
  | JsonLogicVariable
  | { [operator: string]: any }
  | string
  | number
  | boolean
  | null
  | JsonLogicExpression[];

// Function type for operator handlers
export type ExplainCallback = (expression: any) => string;
export type OperatorHandler = (expression: any, _data?: any, explain?: ExplainCallback) => string;

// Configuration options for the explainer
export interface JsonLogicExplainerOptions {
  /**
   * Custom variable name mapping
   */
  variableNames?: { [key: string]: string };

  /**
   * Custom operator descriptions
   */
  operatorNames?: { [key: string]: string };

  /**
   * Whether to include the original JSONLogic in the output
   */
  includeJsonLogic?: boolean;

  /**
   * The data context for variable evaluation
   */
  data?: any;
}
