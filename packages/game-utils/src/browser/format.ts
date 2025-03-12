let formatter = new Intl.NumberFormat("en-UK", {
  minimumFractionDigits: 1,
  minimumIntegerDigits: 2,
});

export function formatNumber(number: number): string {
  return formatter.format(number);
}

export function setFormatter(
  locales: Intl.LocalesArgument = "en-UK",
  options: Intl.NumberFormatOptions = {
    minimumFractionDigits: 1,
    minimumIntegerDigits: 2,
  },
): void {
  formatter = new Intl.NumberFormat(locales, options);
}
