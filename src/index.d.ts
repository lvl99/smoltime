export declare type AcceptedTime = Date | number | string;
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
export declare type DurationLabel = string | DurationLabelVariants;
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
export declare const STANDARD_WORD_DURATIONS: Durations;
export declare const STANDARD_SHORT_DURATIONS: Durations;
export declare const STANDARD_ABBR_DURATIONS: Durations;
export declare const DEFAULT_FORMAT_TIME_DURATION_OPTIONS: FormatTimeDurationOptions;
/**
 * Format a number according to human-readable standards with
 * adding in the thousands and decimal symbols.
 */
export declare function formatNumber(input: number, options?: Partial<FormatNumberOptions>): string;
/**
 * Convert an AcceptedTime input into a Date object.
 */
export declare function getDate(input: AcceptedTime): Date;
/**
 * Get the unix time in miliseconds from a supplied accepted time format.
 */
export declare function getTimeFromDate(input: AcceptedTime): number;
/**
 * Get the right duration label according to the length of the duration.
 */
export declare function getDurationLabel(durationLength: number, label: DurationLabel): string;
/**
 * Format the time according duration length.
 *
 * This convert lengths of time to a shortened label, e.g.
 *
 *   6 m
 *   2.5 h
 *   1 y
 */
export declare function formatTimeDuration(input: AcceptedTime, options?: Partial<FormatTimeDurationOptions>): string;
/**
 * Get the human-readable form of the duration between two times, e.g.
 *
 *   6 m
 *   2.5 h
 *   1 y
 *
 * If timeB not given, it will default to now.
 */
export declare function tellTimeDuration(timeA: AcceptedTime, timeB?: AcceptedTime, options?: Partial<FormatTimeDurationOptions>): string;
