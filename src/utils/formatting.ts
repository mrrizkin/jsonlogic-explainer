/**
 * Formatting utilities for the JSONLogic explainer
 */

/**
 * Format a value for human-readable output
 */
export function formatValue(value: any): string {
  if (typeof value === "string") {
    return `"${value}"`;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (value === null) {
    return "null";
  }

  if (Array.isArray(value)) {
    return `[${value.map(formatValue).join(", ")}]`;
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
}

/**
 * Capitalize the first letter of a string
 */
export function capitalizeFirst(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Capitalize all words in a string
 */
export function capitalizeWords(str: string): string {
  if (!str) return str;
  return str.replace(/\b\w/g, (l) => l.toUpperCase());
}

/**
 * Format an array of values with proper conjunctions
 */
export function formatListWithConjunction(
  items: string[],
  conjunction: "and" | "or" = "and"
): string {
  if (items.length === 0) {
    return "";
  }

  if (items.length === 1) {
    return items[0];
  }

  if (items.length === 2) {
    return `${items[0]} ${conjunction} ${items[1]}`;
  }

  const last = items[items.length - 1];
  const rest = items.slice(0, -1).join(", ");
  return `${rest}, ${conjunction} ${last}`;
}
