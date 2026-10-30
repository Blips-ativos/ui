"use client";

import * as React from "react";

// Substitui o hook de estado controlável do Radix que o AI Elements usa:
// estado que pode ser controlado (prop) ou não controlado (defaultProp), com
// onChange chamado nos dois casos. Mesma assinatura do Radix.
export function useControllableState<T>({
  prop,
  defaultProp,
  onChange,
}: {
  prop?: T;
  defaultProp: T;
  onChange?: (value: T) => void;
}): [T, (next: T | ((prev: T) => T)) => void] {
  const [uncontrolled, setUncontrolled] = React.useState(defaultProp);
  const isControlled = prop !== undefined;
  const value = isControlled ? (prop as T) : uncontrolled;
  const valueRef = React.useRef(value);
  valueRef.current = value;
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;

  const setValue = React.useCallback(
    (next: T | ((prev: T) => T)) => {
      const resolved =
        typeof next === "function"
          ? (next as (prev: T) => T)(valueRef.current)
          : next;
      if (Object.is(resolved, valueRef.current)) return;
      if (!isControlled) setUncontrolled(resolved);
      onChangeRef.current?.(resolved);
    },
    [isControlled]
  );

  return [value, setValue];
}
