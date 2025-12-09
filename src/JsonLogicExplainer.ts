import {
  JsonLogicExpression,
  JsonLogicExplainerOptions,
  OperatorHandler,
} from "./types";
import { formatValue } from "./utils/formatting";
import { getArithmeticOperators } from "./operators/arithmetic";
import { getComparisonOperators } from "./operators/comparison";
import { getLogicalOperators } from "./operators/logical";
import { getConditionalOperators } from "./operators/conditional";
import { getArrayOperators } from "./operators/array";
import { getStringOperators } from "./operators/string";
import { getVariableOperators } from "./operators/variable";

/**
 * Main class for converting JSONLogic expressions to human-readable text.
 */
export class JsonLogicExplainer {
  private options: JsonLogicExplainerOptions;
  private operatorHandlers: Map<string, OperatorHandler>;

  constructor(options: JsonLogicExplainerOptions = {}) {
    this.options = {
      variableNames: {},
      operatorNames: {},
      includeJsonLogic: false,
      data: {},
      ...options,
    };

    // Initialize all operator handlers
    this.operatorHandlers = new Map();
    this.initializeOperators();
  }

  /**
   * Initialize all operator handlers
   */
  private initializeOperators(): void {
    // Register all operator handlers
    const allOperators = {
      ...getArithmeticOperators(),
      ...getComparisonOperators(),
      ...getLogicalOperators(),
      ...getConditionalOperators(),
      ...getArrayOperators(),
      ...getStringOperators(),
      ...getVariableOperators(),
    };

    Object.entries(allOperators).forEach(([op, handler]) => {
      this.operatorHandlers.set(op, handler);
    });
  }

  /**
   * Convert a JSONLogic expression to human-readable text
   * @param expression The JSONLogic expression to convert
   * @returns Human-readable explanation of the expression
   */
  public explain(expression: JsonLogicExpression): string {
    if (expression === null || expression === undefined) {
      return "null";
    }

    // If it's a primitive value, return it directly
    if (typeof expression !== "object") {
      return formatValue(expression);
    }

    // If it's an array, process each element
    if (Array.isArray(expression)) {
      return expression.map((item) => this.explain(item)).join(", ");
    }

    // At this point, expression is an object
    // Check if it's a variable reference (has 'var' key)
    if ("var" in expression) {
      const varKey = (expression as any).var;
      return this.handleVariable(varKey);
    }

    // Find the operator in the expression
    const operator = Object.keys(expression)[0];
    if (!operator) {
      return "empty expression";
    }

    // Get the operator handler
    const handler = this.operatorHandlers.get(operator);
    if (!handler) {
      return `unknown operation: ${operator}`;
    }

    // Extract the values associated with the operator
    const values = (expression as any)[operator];

    // Call the appropriate handler
    return handler(values, this.options.data, (expr) => this.explain(expr));
  }

  /**
   * Handle variable references
   */
  private handleVariable(varKey: any): string {
    if (varKey === null || varKey === "") {
      return this.getVariableName(varKey as string);
    }

    // Handle variable with default value: {"var": ["field", "default"]}
    if (Array.isArray(varKey) && varKey.length === 2) {
      const [field, defaultValue] = varKey;
      const fieldName = this.getVariableName(field as string);
      return `${fieldName} with default value of ${formatValue(defaultValue)}`;
    }

    // Simple variable reference
    return this.getVariableName(varKey as string);
  }

  /**
   * Get the formatted name for a variable, using custom mapping if available
   */
  private getVariableName(key: string): string {
    // Use custom variable name if provided
    if (this.options.variableNames && this.options.variableNames[key]) {
      return this.options.variableNames[key];
    }

    if (key === null || key === "") {
      return "null";
    }

    // Use lowercase for simple variable names (like age, score, etc.)
    return key.toLowerCase();
  }
}
