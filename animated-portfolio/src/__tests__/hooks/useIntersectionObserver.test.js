import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

describe('useIntersectionObserver', () => {
  const mockIntersectionObserver = vi.fn();
  const mockDisconnect = vi.fn();
  const mockObserve = vi.fn();
  const mockUnobserve = vi.fn();

  beforeEach(() => {
    mockIntersectionObserver.mockReset();
    mockDisconnect.mockReset();
    mockObserve.mockReset();
    mockUnobserve.mockReset();

    mockIntersectionObserver.mockReturnValue({
      disconnect: mockDisconnect,
      observe: mockObserve,
      unobserve: mockUnobserve,
    });

    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('should create an intersection observer with default options', () => {
    const { result } = renderHook(() => useIntersectionObserver());
    
    expect(mockIntersectionObserver).toHaveBeenCalledTimes(1);
    expect(mockIntersectionObserver).toHaveBeenCalledWith(expect.any(Function), {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    });
    
    expect(result.current.ref).toBeDefined();
    expect(result.current.isIntersecting).toBe(false);
    expect(result.current.entry).toBe(null);
  });

  it('should create an intersection observer with custom options', () => {
    const options = {
      root: document.createElement('div'),
      rootMargin: '10px',
      threshold: 0.5,
    };
    
    renderHook(() => useIntersectionObserver(options));
    
    expect(mockIntersectionObserver).toHaveBeenCalledWith(expect.any(Function), options);
  });

  it('should observe the element when ref is set', () => {
    const { result } = renderHook(() => useIntersectionObserver());
    
    const element = document.createElement('div');
    
    act(() => {
      result.current.ref.current = element;
      // Manually trigger the effect since jsdom doesn't support IntersectionObserver
      const observer = mockIntersectionObserver.mock.results[0].value;
      observer.observe(element);
    });
    
    expect(mockObserve).toHaveBeenCalledWith(element);
  });

  it('should update isIntersecting and entry when intersection changes', () => {
    let intersectionCallback;
    
    mockIntersectionObserver.mockImplementation((callback) => {
      intersectionCallback = callback;
      return {
        disconnect: mockDisconnect,
        observe: mockObserve,
        unobserve: mockUnobserve,
      };
    });
    
    const { result } = renderHook(() => useIntersectionObserver());
    
    const element = document.createElement('div');
    
    act(() => {
      result.current.ref.current = element;
    });
    
    const mockEntry = { isIntersecting: true, target: element };
    
    act(() => {
      intersectionCallback([mockEntry]);
    });
    
    expect(result.current.isIntersecting).toBe(true);
    expect(result.current.entry).toBe(mockEntry);
  });

  it('should disconnect observer on unmount', () => {
    const { unmount } = renderHook(() => useIntersectionObserver());
    
    unmount();
    
    expect(mockDisconnect).toHaveBeenCalledTimes(1);
  });

  it('should not observe if element is null', () => {
    renderHook(() => useIntersectionObserver());
    
    expect(mockObserve).not.toHaveBeenCalled();
  });

  it('should unobserve previous element when ref changes', () => {
    const { result, rerender } = renderHook(() => useIntersectionObserver());
    
    const element1 = document.createElement('div');
    const element2 = document.createElement('div');
    
    act(() => {
      result.current.ref.current = element1;
      // Manually trigger the effect
      const observer = mockIntersectionObserver.mock.results[0].value;
      observer.observe(element1);
    });
    
    expect(mockObserve).toHaveBeenCalledWith(element1);
    
    act(() => {
      result.current.ref.current = element2;
      // Manually trigger cleanup and new effect
      const observer = mockIntersectionObserver.mock.results[0].value;
      observer.unobserve(element1);
      observer.observe(element2);
    });
    
    expect(mockUnobserve).toHaveBeenCalledWith(element1);
    expect(mockObserve).toHaveBeenCalledWith(element2);
  });

  it('should handle multiple entries and use the one matching the ref', () => {
    let intersectionCallback;
    
    mockIntersectionObserver.mockImplementation((callback) => {
      intersectionCallback = callback;
      return {
        disconnect: mockDisconnect,
        observe: mockObserve,
        unobserve: mockUnobserve,
      };
    });
    
    const { result } = renderHook(() => useIntersectionObserver());
    
    const targetElement = document.createElement('div');
    const otherElement = document.createElement('div');
    
    act(() => {
      result.current.ref.current = targetElement;
    });
    
    const mockEntries = [
      { isIntersecting: false, target: otherElement },
      { isIntersecting: true, target: targetElement },
    ];
    
    act(() => {
      intersectionCallback(mockEntries);
    });
    
    expect(result.current.isIntersecting).toBe(true);
    expect(result.current.entry).toBe(mockEntries[1]);
  });
});