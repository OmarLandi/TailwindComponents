import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useMediaQuery } from '../src/hooks/useMediaQuery';

describe('useMediaQuery', () => {
  it('returns a boolean', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 0px)'));
    expect(typeof result.current).toBe('boolean');
  });
});
