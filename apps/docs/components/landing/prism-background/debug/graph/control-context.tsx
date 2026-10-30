"use client";

import { createContext, type ReactNode, useContext, useMemo } from "react";

import type { PrismControls } from "../../types";

export type PrismControlsUpdater = (controls: PrismControls) => PrismControls;

interface DebugControlContextValue {
  readonly controls: PrismControls;
  updateControls(updater: PrismControlsUpdater): void;
}

const DebugControlContext = createContext<DebugControlContextValue | null>(
  null
);

interface DebugControlProviderProps extends DebugControlContextValue {
  readonly children: ReactNode;
}

export function DebugControlProvider({
  children,
  controls,
  updateControls,
}: DebugControlProviderProps) {
  const value = useMemo(
    () => ({ controls, updateControls }),
    [controls, updateControls]
  );
  return <DebugControlContext value={value}>{children}</DebugControlContext>;
}

export function useDebugControls(): DebugControlContextValue {
  const value = useContext(DebugControlContext);
  if (!value)
    throw new Error("Node controls must be inside DebugControlProvider.");
  return value;
}
