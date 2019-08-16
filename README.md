# smoltime

This time lib is very smol.

## Why?

This does the least amount to output time durations in a human-readable fashion.

## How?

```javascript
import smoltime from "smoltime";

// Tell the time from the date given until now
smoltime.tellTimeDuration(+new Date() - 86400000);
// Outputs: "1 d"

// Tell the time between two specific dates
// Note: it's best to give dates in UTC ISO string format
smoltime.tellTimeDuration(
  "2000-01-01T00:00:00.000Z",
  "2009-12-31T23:59:59.999Z"
);
// Outputs: "10.01 y" (this isn't supposed to be super precise, it's smol)

// Tell the time between two specific dates with some extra customisation
smoltime.tellTimeDuration(
  "2000-01-01T00:00:00.000Z",
  "2009-12-31T23:59:59.999Z",
  {
    decimalPlaces: 0,
    // by default all durations are `smoltime.STANDARD_ABBR_DURATIONS` (1 h)
    // but you could also use `smoltime.STANDARD_SHORT_DURATIONS` (1 hr)
    // as well as...
    durations: smoltime.STANDARD_WORD_DURATIONS
  }
);
// Outputs: "10 years"
```

There are few more functions! Go [explore](https://github.com/lvl99/smoltime/tree/master/src/index.ts).

## Installation

### Browser

```html
<script src="//unpkg.com/smoltime@1.0.0/dist/smoltime.umd.js"></script>
<script>
  // window.smoltime should then be available
  console.log(smoltime);
</script>
```

### ES Module

```bash
  npm i smoltime
  yarn add smoltime
```

Then in your source code:

```javascript
// ES5
const smoltime = require("smoltime").default;
const { tellTimeDuration } = require("smoltime");

// ES6/TypeScript
import smoltime from "smoltime";
import { tellTimeDuration } from "smoltime";
```

## Development

To download external dependencies:

```bash
  npm i
```

To run tests (using Jest):

```bash
  npm test
```

## Contribute

Got cool ideas? Have questions or feedback? Found a bug? [Post an issue](https://github.com/lvl99/smoltime/issues)

Added a feature? Fixed a bug? [Post a PR](https://github.com/lvl99/smoltime/compare)

## License

[Apache 2.0](LICENSE.md)
