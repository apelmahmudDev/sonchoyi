export function formatCurrency(value: number, currency: string = "৳", decimals: number = 2): string {
    const formatted = Number(value.toFixed(decimals)).toLocaleString("en-BD", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    return `${currency} ${formatted}`;
}
  