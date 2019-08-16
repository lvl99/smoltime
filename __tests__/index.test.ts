import * as time from "../src/index";

describe("formatNumber", () => {
  it("should format human-readable numbers with default options", () => {
    expect(time.formatNumber(1)).toBe("1");
    expect(time.formatNumber(123)).toBe("123");
    expect(time.formatNumber(1234)).toBe("1,234");
    expect(time.formatNumber(0.1234)).toBe("0.1234");
    expect(time.formatNumber(-1000000.123456)).toBe("-1,000,000.123456");
  });

  it("should format human-readable numbers with custom options", () => {
    const fnA = (input: any) =>
      time.formatNumber(input, {
        delimiter: " ",
        decimal: ","
      });

    expect(fnA(1)).toBe("1");
    expect(fnA(123)).toBe("123");
    expect(fnA(1234)).toBe("1 234");
    expect(fnA(0.1234)).toBe("0,1234");
    expect(fnA(-1000000.123456)).toBe("-1 000 000,123456");

    const fnB = (input: any) =>
      time.formatNumber(input, {
        groupLength: 2,
        delimiter: " ",
        decimal: ",",
        decimalPlaces: 2
      });

    expect(fnB(1)).toBe("1");
    expect(fnB(123)).toBe("1 23");
    expect(fnB(1234)).toBe("12 34");
    expect(fnB(0.1234)).toBe("0,12");
    expect(fnB(-1000000.123456)).toBe("-1 00 00 00,12");
  });
});

describe("getDate", () => {
  it("should pass the Date input object", () => {
    const input = new Date();
    expect(time.getDate(input)).toBe(input);
  });

  it("should convert string to Date", () => {
    expect(time.getDate("2019-08-16")).toBeInstanceOf(Date);
    expect(time.getDate("2019-08-16T12:00:00")).toBeInstanceOf(Date);
    expect(time.getDate("2019-08-16T12:00:00.000Z")).toBeInstanceOf(Date);
    expect(time.getDate("1234567890000")).toBeInstanceOf(Date);
  });

  it("should convert number to Date", () => {
    expect(time.getDate(1234567890000)).toBeInstanceOf(Date);
    expect(time.getDate(+new Date())).toBeInstanceOf(Date);
  });
});

describe("getTimeFromDate", () => {
  it("should extract the time in milliseconds from the date", () => {
    const expectedTime = 1565974512123;
    const testDateString = "2019-08-16T16:55:12.123Z";
    const testDate = new Date(testDateString);
    const testStringNumber = `${expectedTime}`;

    expect(time.getTimeFromDate(testDate)).toBe(expectedTime);
    expect(time.getTimeFromDate(testDateString)).toBe(expectedTime);
    expect(time.getTimeFromDate(testStringNumber)).toBe(expectedTime);
    expect(time.getTimeFromDate(expectedTime)).toBe(expectedTime);
  });
});

describe("formatTimeDuration", () => {
  it("should format a time duration based on default options", () => {
    const { durations } = time.DEFAULT_FORMAT_TIME_DURATION_OPTIONS;

    for (const durationName in durations) {
      if (durations.hasOwnProperty(durationName)) {
        const duration = durations[durationName];
        const min = duration.min || 1;
        expect(time.formatTimeDuration(min)).toBe(
          `1 ${time.getDurationLabel(min, duration.label)}`
        );
      }
    }
  });

  it("should format a time duration based on custom options", () => {
    const durations = time.STANDARD_WORD_DURATIONS;

    for (const durationName in durations) {
      if (durations.hasOwnProperty(durationName)) {
        const duration = durations[durationName];
        const min = duration.min || 1;
        expect(
          time.formatTimeDuration(min, {
            ...time.DEFAULT_FORMAT_TIME_DURATION_OPTIONS,
            durations
          })
        ).toBe(`1 ${time.getDurationLabel(1, duration.label)}`);
      }
    }
  });

  it("should format a time duration's numbers based on custom options", () => {
    const durations = time.STANDARD_WORD_DURATIONS;
    const numberFormat = {
      spacer: ": ",
      decimal: ",",
      decimalPlaces: 1
    };

    const fn = (input: number) =>
      time.formatTimeDuration(input, {
        ...time.DEFAULT_FORMAT_TIME_DURATION_OPTIONS,
        ...numberFormat,
        durations
      });

    expect(fn(500)).toBe(`500: miliseconds`);
    expect(fn(1000)).toBe(`1: second`);
    expect(fn(1500)).toBe(`1,5: seconds`);
    expect(fn(604800000)).toBe(`1: week`);
    expect(fn(907200000)).toBe(`1,5: weeks`);
  });
});

describe("tellTimeDuration", () => {
  it("should tell the time duration for a single time to now with default options", () => {
    const date = +new Date() - 1;
    expect(time.tellTimeDuration(date)).toBe("1 ms");
  });

  it("should tell the time duration between two times with default options", () => {
    const dateA = new Date("2019-08-15T16:55:12.123Z");
    const dateB = new Date("2019-08-16T16:55:12.123Z");
    expect(time.tellTimeDuration(dateA, dateB)).toBe("1 d");
    expect(time.tellTimeDuration(dateB, dateA)).toBe("1 d");
  });

  it("should tell the time duration between two times with custom options", () => {
    const dateA = new Date("2019-08-15T00:00:00.000Z");
    const dateB = new Date("2019-08-16T00:00:00.000Z");
    expect(
      time.tellTimeDuration(dateA, dateB, {
        spacer: ": ",
        decimal: ",",
        decimalPlaces: 1,
        durations: time.STANDARD_WORD_DURATIONS
      })
    ).toBe("1: day");
  });
});
