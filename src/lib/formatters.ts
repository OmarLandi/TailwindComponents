export interface FormatCurrencyOptions {
  locale?: string;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  currencyDisplay?: 'symbol' | 'code' | 'name' | 'narrowSymbol';
}

export function formatCurrency(value: number, options: FormatCurrencyOptions = {}): string {
  const {
    locale = 'en-US',
    currency = 'USD',
    minimumFractionDigits,
    maximumFractionDigits,
    currencyDisplay,
  } = options;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
    currencyDisplay,
  }).format(value);
}

export interface FormatNumberOptions {
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  currencyDisplay?: 'symbol' | 'code' | 'name' | 'narrowSymbol';
  compact?: boolean;
}

export function formatNumber(value: number, options: FormatNumberOptions = {}): string {
  const {
    locale = 'en-US',
    minimumFractionDigits,
    maximumFractionDigits,
    currencyDisplay,
    compact = false,
  } = options;

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
    currencyDisplay,
    notation: compact ? 'compact' : 'standard',
  }).format(value);
}

export function formatPercent(
  value: number,
  options: Omit<FormatNumberOptions, 'compact'> & { decimals?: number } = {}
): string {
  const { locale = 'en-US', decimals = 0, ...rest } = options;

  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    ...rest,
  }).format(value);
}

export interface FormatDateOptions {
  locale?: string;
  dateStyle?: 'full' | 'long' | 'medium' | 'short';
  timeStyle?: 'full' | 'long' | 'medium' | 'short';
  timeZone?: string;
}

function toDate(value: Date | string | number): Date {
  return value instanceof Date ? value : new Date(value);
}

export function formatDate(value: Date | string | number, options: FormatDateOptions = {}): string {
  const { locale = 'en-US', dateStyle = 'medium', timeZone } = options;

  return new Intl.DateTimeFormat(locale, {
    dateStyle,
    timeZone,
  }).format(toDate(value));
}

export function formatDateTime(
  value: Date | string | number,
  options: FormatDateOptions = {}
): string {
  const { locale = 'en-US', dateStyle = 'medium', timeStyle = 'short', timeZone } = options;

  return new Intl.DateTimeFormat(locale, {
    dateStyle,
    timeStyle,
    timeZone,
  }).format(toDate(value));
}

export function formatTime(
  value: Date | string | number,
  options: Omit<FormatDateOptions, 'dateStyle'> = {}
): string {
  const { locale = 'en-US', timeStyle = 'short', timeZone } = options;

  return new Intl.DateTimeFormat(locale, {
    timeStyle,
    timeZone,
  }).format(toDate(value));
}

export function formatFileSize(bytes: number, decimals = 1): string {
  if (!Number.isFinite(bytes) || bytes < 0) return '0 B';
  if (bytes === 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const index = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
  const value = bytes / Math.pow(1024, index);

  return `${value.toFixed(index === 0 ? 0 : decimals)} ${units[index]}`;
}

export function formatRelativeTime(
  value: Date | string | number,
  baseDate: Date | string | number = new Date(),
  locale = 'en-US'
): string {
  const target = toDate(value).getTime();
  const base = toDate(baseDate).getTime();
  const diffSeconds = Math.round((target - base) / 1000);

  const abs = Math.abs(diffSeconds);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (abs < 60) return rtf.format(diffSeconds, 'second');
  if (abs < 3600) return rtf.format(Math.round(diffSeconds / 60), 'minute');
  if (abs < 86400) return rtf.format(Math.round(diffSeconds / 3600), 'hour');
  if (abs < 2592000) return rtf.format(Math.round(diffSeconds / 86400), 'day');
  if (abs < 31536000) return rtf.format(Math.round(diffSeconds / 2592000), 'month');
  return rtf.format(Math.round(diffSeconds / 31536000), 'year');
}
