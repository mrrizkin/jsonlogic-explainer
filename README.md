# JSONLogic Explainer

A library to convert [JSONLogic](https://github.com/jwadhams/json-logic-js) expressions into human-readable explanations.

## Installation

```bash
npm install jsonlogic-explainer
# or
yarn add jsonlogic-explainer
# or
pnpm add jsonlogic-explainer
```

## Usage

### Basic Usage

```typescript
import { JsonLogicExplainer } from "jsonlogic-explainer";

const explainer = new JsonLogicExplainer();

// Simple equality check
const expression1 = { "===": [{ var: "age" }, 18] };
console.log(explainer.explain(expression1));
// Output: "age equals 18"

// Conditional logic
const expression2 = { if: [{ ">": [{ var: "age" }, 18] }, "adult", "minor"] };
console.log(explainer.explain(expression2));
// Output: "if age is greater than 18 then adult else minor"

// Complex nested operations
const expression3 = {
  and: [
    { ">": [{ var: "age" }, 18] },
    {
      or: [
        { "==": [{ var: "status" }, "active"] },
        { "==": [{ var: "status" }, "pending"] },
      ],
    },
  ],
};
console.log(explainer.explain(expression3));
// Output: "age is greater than 18 and status equals active or status equals pending"
```

### Advanced Usage

You can customize the explainer with options:

```typescript
const explainer = new JsonLogicExplainer({
  variableNames: {
    age: "customer age",
    status: "account status",
  },
  data: {
    // Optional: data context for variable evaluation
  },
});

const expression = { "===": [{ var: "age" }, 18] };
console.log(explainer.explain(expression));
// Output: "customer age equals 18"
```

## Supported JSONLogic Operations

The library supports all major JSONLogic operations:

### Arithmetic Operations

- `+`: Addition (e.g., `[2, 3, 4]` → "2 plus 3 plus 4")
- `-`: Subtraction (e.g., `[10, 5, 3]` → "10 minus 5 minus 3")
- `*`: Multiplication (e.g., `[2, 3, 4]` → "2 times 3 times 4")
- `/`: Division (e.g., `[15, 3, 2]` → "15 divided by 3 divided by 2")
- `%`: Modulo (e.g., `[10, 3]` → "10 modulo 3")
- `abs`: Absolute value (e.g., [-5] → "absolute value of -5")
- `max`: Maximum value (e.g., [1, 5, 3] → "maximum of 1, 5, 3")
- `min`: Minimum value (e.g., [1, 5, 3] → "minimum of 1, 5, 3")

### Comparison Operations

- `==`: Loose equality (e.g., `["hello", "hello"]` → "hello equals hello")
- `===`: Strict equality (e.g., `[18, 18]` → "18 equals 18")
- `!=`: Loose inequality (e.g., `["hello", "world"]` → "hello does not equal world")
- `!==`: Strict inequality (e.g., `[18, "18"]` → "18 does not strictly equal 18")
- `>`: Greater than (e.g., `[10, 5]` → "10 is greater than 5")
- `>=`: Greater than or equal (e.g., `[10, 10]` → "10 is greater than or equal to 10")
- `<`: Less than (e.g., `[5, 10]` → "5 is less than 10")
- `<=`: Less than or equal (e.g., `[5, 5]` → "5 is less than or equal to 5")
- `in`: Value in collection (e.g., `["Ringo", ["John", "Paul", "George", "Ringo"]]` → "Ringo in John, Paul, George, Ringo")

### Logical Operations

- `and`: Logical AND (e.g., `[true, false, true]` → "true and false and true")
- `or`: Logical OR (e.g., `[false, true, false]` → "false or true or false")
- `!`, `not`: Logical NOT (e.g., `true` → "not true")

### Conditional Operations

- `if`: If-then-else logic (e.g., `[condition, "then", "else"]` → "if condition then then else else")

### Array Operations

- `map`: Apply operation to each element
- `filter`: Filter elements based on condition
- `reduce`: Reduce array to single value
- `all`: Check if all elements satisfy condition
- `none`: Check if no elements satisfy condition
- `some`: Check if some elements satisfy condition
- `merge`: Merge arrays
- `in`: Check if value exists in array

### String Operations

- `cat`: Concatenate strings (e.g., `["Hello", " ", "World"]` → "Hello World")
- `substr`: Extract substring (e.g., `["Hello World", 0, 5]` → "substring of Hello World from 0 with length 5")

### Variable Operations

- `var`: Access variables from context (e.g., `"age"` → "age", `["age", 0]` → "age with default value of 0")

## API Reference

### JsonLogicExplainer

Main class for converting JSONLogic expressions to human-readable text.

#### Constructor

```typescript
new JsonLogicExplainer(options?: JsonLogicExplainerOptions)
```

Options:

- `variableNames`: Mapping of variable keys to human-readable names
- `operatorNames`: Custom operator descriptions (not currently implemented)
- `includeJsonLogic`: Whether to include the original JSONLogic in output (not currently implemented)
- `data`: Data context for variable evaluation (not currently implemented)

#### explain(expression: JsonLogicExpression): string

Converts a JSONLogic expression to a human-readable string.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite: `pnpm test`
6. Submit a pull request

## License

MIT
