# JSONLogic Explainer

A library to convert JSONLogic expressions into human-readable explanations.

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
// Output: "Age Equals 18"

// Conditional logic
const expression2 = { if: [{ ">": [{ var: "age" }, 18] }, "adult", "minor"] };
console.log(explainer.explain(expression2));
// Output: "If Age Is Greater Than 18 Then adult Else minor"

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
// Output: "Age Is Greater Than 18 And Status Equals active Or Status Equals pending"
```

### Advanced Usage

You can customize the explainer with options:

```typescript
const explainer = new JsonLogicExplainer({
  variableNames: {
    age: "Customer Age",
    status: "Account Status",
  },
  data: {
    // Optional: data context for variable evaluation
  },
});

const expression = { "===": [{ var: "age" }, 18] };
console.log(explainer.explain(expression));
// Output: "Customer Age Equals 18"
```

## Supported JSONLogic Operations

The library supports all major JSONLogic operations:

### Arithmetic Operations

- `+`, `-`, `*`, `/`, `%`: Addition, subtraction, multiplication, division, modulo
- `abs`, `max`, `min`: Absolute value, maximum, minimum

### Comparison Operations

- `==`, `===`: Equality checks
- `!=`, `!==`: Inequality checks
- `>`, `>=`, `<`, `<=`: Greater than, greater than or equal, less than, less than or equal
- `in`: Check if value is in array

### Logical Operations

- `and`, `or`: Logical AND and OR
- `!`, `not`: Logical NOT

### Conditional Operations

- `if`: If-then-else logic
- `?:`: Ternary operator

### Array Operations

- `map`, `filter`, `reduce`: Array transformations
- `all`, `none`, `some`: Array predicate checks
- `merge`: Array merging
- `missing`, `missing_some`: Missing field checks

### String Operations

- `cat`: String concatenation
- `substr`: Substring extraction
- `in`: Substring check

### Variable Operations

- `var`: Variable access with optional default values

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
