export interface DebouncedFunction<TArgs extends unknown[]> {
  (...args: TArgs): void;
  /** Cancels any pending invocation. */
  cancel: () => void;
}

/**
 * Creates a debounced wrapper around `fn`. The wrapper postpones invocation
 * until `ms` milliseconds have elapsed since the last call.
 *
 * @param fn The function to debounce.
 * @param ms Delay in milliseconds. Defaults to 100ms.
 */
export function debounce<TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  ms = 100
): DebouncedFunction<TArgs> {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const debounced = ((...args: TArgs) => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      fn(...args);
    }, ms);
  }) as DebouncedFunction<TArgs>;

  debounced.cancel = () => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return debounced;
}
