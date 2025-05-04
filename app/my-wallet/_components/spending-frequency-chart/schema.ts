export type TimePeriodKey = "weekly" | "monthly" | "yearly";

export const defaultTimePeriods: Record<
    TimePeriodKey,
    { labels: string[]; data: number[] }
> = {
    weekly: { labels: [], data: [] },
    monthly: { labels: [], data: [] },
    yearly: { labels: [], data: [] },
};