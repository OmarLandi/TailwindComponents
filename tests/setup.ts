import '@testing-library/jest-dom';

globalThis.ResizeObserver ??= class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

globalThis.IntersectionObserver ??= class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  root: Element | null = null;
  rootMargin: string = '';
  thresholds: ReadonlyArray<number> = [];
  scrollMargin = '';
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
};

Object.defineProperty(globalThis, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

HTMLCanvasElement.prototype.getContext = () => null;

Element.prototype.hasPointerCapture ??= () => false;
Element.prototype.setPointerCapture ??= () => {};
Element.prototype.releasePointerCapture ??= () => {};
Element.prototype.scrollIntoView ??= () => {};

if (typeof globalThis.PointerEvent === 'undefined') {
  class MockPointerEvent extends Event {
    button = 0;
    pointerType = 'mouse';
    constructor(type: string, props?: Record<string, unknown>) {
      super(type, props);
      if (typeof props?.button === 'number') this.button = props.button;
      if (typeof props?.pointerType === 'string') this.pointerType = props.pointerType;
    }
  }
  globalThis.PointerEvent = MockPointerEvent as unknown as typeof PointerEvent;
}
