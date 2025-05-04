export type TimePeriodKey =  "daily"| "weekly" | "monthly";

export const defaultTimePeriods: Record<
    TimePeriodKey,
    { labels: string[]; data: number[] }
> = {
    daily: { labels: [], data: [] },
    weekly: { labels: [], data: [] },
    monthly: { labels: [], data: [] },
};