import { describe, it, expect } from 'vitest';

import {
  formatCurrency,
  formatNumber,
  formatPercent,
  formatDate,
  formatDateTime,
  formatFileSize,
  formatRelativeTime,
} from '../src/lib/formatters';

describe('formatters', () => {
  it('formats currency', () => {
    expect(formatCurrency(1234.5, { currency: 'USD', locale: 'en-US' })).toBe('$1,234.50');
  });

  it('formats compact numbers', () => {
    expect(formatNumber(1500, { compact: true, locale: 'en-US' })).toBe('1.5K');
  });

  it('formats percent from a fraction', () => {
    expect(formatPercent(0.1234, { decimals: 1, locale: 'en-US' })).toBe('12.3%');
  });

  it('formats dates', () => {
    const date = new Date('2026-10-28T12:00:00Z');
    expect(formatDate(date, { locale: 'en-US', timeZone: 'UTC' })).toContain('2026');
  });

  it('formats date and time', () => {
    const date = new Date('2026-10-28T12:00:00Z');
    expect(formatDateTime(date, { locale: 'en-US', timeZone: 'UTC' })).toContain('2026');
  });

  it('formats file sizes', () => {
    expect(formatFileSize(0)).toBe('0 B');
    expect(formatFileSize(1024)).toBe('1.0 KB');
    expect(formatFileSize(1048576)).toBe('1.0 MB');
  });

  it('formats relative time', () => {
    const now = new Date('2026-10-28T12:00:00Z');
    const past = new Date('2026-10-28T11:59:00Z');
    expect(formatRelativeTime(past, now, 'en-US')).toContain('minute');
  });
});
