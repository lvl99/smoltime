type Required<T> = T extends object
  ? { [P in keyof T]-?: NonNullable<T[P]> }
  : T;

export type AcceptedTime = Date | number | string;

export interface FormatNumberOptions {
  delimiter: string;
  decimal: string;
  groupLength?: number;
  decimalPlaces?: number;
}

export interface DurationLabelVariants {
  one: string;
  many: string;
  zero?: string;
}

export type DurationLabel = string | DurationLabelVariants;

export interface Duration {
  min: number;
  max: number;
  label: DurationLabel;
}

export interface Durations {
  [durationName: string]: Duration;
}

export interface FormatTimeDurationOptions extends FormatNumberOptions {
  spacer: string;
  durations: Durations;
}

const S = 1000;
const M = 60 * S;
const H = 60 * M;
const D = 24 * H;
const W = 7 * D;
const MO = 30 * D;
const Y = 365 * D;

export const STANDARD_WORD_DURATIONS: Durations = {
  ms: {
    min: 0,
    max: S,
    label: {
      one: "milisecond",
      many: "miliseconds"
    }
  },
  s: {
    min: S,
    max: M,
    label: {
      one: "second",
      many: "seconds"
    }
  },
  m: {
    min: M,
    max: H,
    label: {
      one: "minute",
      many: "minutes"
    }
  },
  h: {
    min: H,
    max: D,
    label: {
      one: "hour",
      many: "hours"
    }
  },
  d: {
    min: D,
    max: W,
    label: {
      one: "day",
      many: "days"
    }
  },
  w: {
    min: W,
    max: MO,
    label: {
      one: "week",
      many: "weeks"
    }
  },
  mo: {
    min: MO,
    max: Y,
    label: {
      one: "month",
      many: "months"
    }
  },
  y: {
    min: Y,
    max: Infinity,
    label: {
      one: "year",
      many: "years"
    }
  }
};

export const STANDARD_SHORT_DURATIONS: Durations = {
  ms: {
    min: 0,
    max: S,
    label: "ms"
  },
  s: {
    min: S,
    max: M,
    label: "sec"
  },
  m: {
    min: M,
    max: H,
    label: "min"
  },
  h: {
    min: H,
    max: D,
    label: "hr"
  },
  d: {
    min: D,
    max: W,
    label: "d"
  },
  w: {
    min: W,
    max: MO,
    label: "wk"
  },
  mo: {
    min: MO,
    max: Y,
    label: "mon"
  },
  y: {
    min: Y,
    max: Infinity,
    label: "yr"
  }
};

export const STANDARD_ABBR_DURATIONS: Durations = {
  ms: {
    min: 0,
    max: S,
    label: "ms"
  },
  s: {
    min: S,
    max: M,
    label: "s"
  },
  m: {
    min: M,
    max: H,
    label: "m"
  },
  h: {
    min: H,
    max: D,
    label: "h"
  },
  d: {
    min: D,
    max: W,
    label: "d"
  },
  w: {
    min: W,
    max: MO,
    label: "w"
  },
  mo: {
    min: MO,
    max: Y,
    label: "mo"
  },
  y: {
    min: Y,
    max: Infinity,
    label: "y"
  }
};

export const DEFAULT_FORMAT_TIME_DURATION_OPTIONS: FormatTimeDurationOptions = {
  spacer: " ",
  durations: STANDARD_ABBR_DURATIONS,
  // FormatNumberOptions
  delimiter: " ",
  groupLength: 3,
  decimal: ".",
  decimalPlaces: 2
};

function round(input: any, decimalPlaces: number = 1) {
  return +(+input.toFixed(decimalPlaces));
}

/**
 * Format a number according to human-readable standards with
 * adding in the thousands and decimal symbols.
 */
export function formatNumber(
  input: number,
  options?: Partial<FormatNumberOptions>
) {
  const _options: Required<FormatNumberOptions> = {
    delimiter: ",",
    decimal: ".",
    groupLength: 3,
    decimalPlaces: 0,
    ...options
  };
  const useInput = String(input).split(".");
  return (
    // Process the integer numbers by adding in the thousands symbols.
    useInput[0]
      .split("")
      .reverse()
      .reduce(
        (acc, number, index) =>
          `${acc}${
            index % _options.groupLength === 0 ? _options.delimiter : ""
          }${number}`
      )
      .split("")
      .reverse()
      .join("") +
    (useInput[1] !== undefined
      ? `${_options.decimal}${
          // Crop to specific decimal places
          _options.decimalPlaces && _options.decimalPlaces > 0
            ? useInput[1].substring(0, _options.decimalPlaces)
            : useInput[1]
        }`
      : "")
  );
}

/**
 * Convert an AcceptedTime input into a Date object.
 */
export function getDate(input: AcceptedTime): Date {
  // Already a Date
  if (input instanceof Date) {
    return input;
  }
  // "123456789000"
  else if (typeof input === "string" && /^\d+$/.test(input)) {
    return new Date(+input);
  }

  // "YYYY-MM-DD"
  // "YYYY-MM-DDTHH:MM:SS"
  // "YYYY-MM-DDTHH:MM:SS.000Z"
  // 123456789000
  return new Date(input);
}

/**
 * Get the unix time in miliseconds from a supplied accepted time format.
 */
export function getTimeFromDate(input: AcceptedTime): number {
  const date = getDate(input);
  return date.getTime();
}

/**
 * Get the right duration label according to the length of the duration.
 */
export function getDurationLabel(
  durationLength: number,
  label: DurationLabel
): string {
  if (label.hasOwnProperty("one") && label.hasOwnProperty("many")) {
    const _label = label as DurationLabelVariants;
    return durationLength === 0 && _label.hasOwnProperty("zero") && _label.zero
      ? _label.zero
      : durationLength === 1
      ? _label.one
      : _label.many;
  }

  return String(label);
}

/**
 * Format the time according duration length.
 *
 * This convert lengths of time to a shortened label, e.g.
 *
 *   6 m
 *   2.5 h
 *   1 y
 */
export function formatTimeDuration(
  input: AcceptedTime,
  options?: Partial<FormatTimeDurationOptions>
): string {
  const _options = {
    ...DEFAULT_FORMAT_TIME_DURATION_OPTIONS,
    ...options
  };
  const _input = getTimeFromDate(input);
  const totalDurations = Object.values(_options.durations).length;
  let output = "";
  let countDurations = 0;
  if (_input > 0) {
    for (const durationName in _options.durations) {
      if (_options.durations.hasOwnProperty(durationName)) {
        const duration = _options.durations[durationName];
        countDurations++;

        if (
          (_input >= duration.min && _input < duration.max) ||
          countDurations === totalDurations
        ) {
          const _time =
            duration.min > 0
              ? round(_input / duration.min, _options.decimalPlaces)
              : _input;
          output = `${String(_time).replace(".", _options.decimal)}${
            _options.spacer
          }${getDurationLabel(_time, duration.label)}`;
          break;
        }
      }
    }
    return output;
  } else {
    return `0${_options.spacer}${getDurationLabel(
      0,
      Object.values(_options.durations)[0].label
    )}`;
  }
}

/**
 * Get the human-readable form of the duration between two times, e.g.
 *
 *   6 m
 *   2.5 h
 *   1 y
 *
 * If timeB not given, it will default to now.
 */
export function tellTimeDuration(
  timeA: AcceptedTime,
  timeB?: AcceptedTime,
  options: Partial<
    FormatTimeDurationOptions
  > = DEFAULT_FORMAT_TIME_DURATION_OPTIONS
): string {
  const useTimes = [timeA, timeB || +new Date()].map(getTimeFromDate);
  const endTime = Math.max(...useTimes);
  const startTime = Math.min(...useTimes);
  return formatTimeDuration(endTime - startTime, options);
}
