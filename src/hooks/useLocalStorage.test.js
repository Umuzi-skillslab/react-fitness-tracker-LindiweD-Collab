import { renderHook, act } from '@testing-library/react';
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('returns the initial value when nothing is stored yet', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  test('persists an updated value to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(window.localStorage.getItem('test-key')).toBe(JSON.stringify('updated'));
  });

  test('reads a previously stored value back on mount', () => {
    window.localStorage.setItem('existing-key', JSON.stringify({ a: 1 }));
    const { result } = renderHook(() => useLocalStorage('existing-key', {}));
    expect(result.current[0]).toEqual({ a: 1 });
  });
});
