"use client";

// Adaptado de vercel/ai-elements (packages/elements/src/mic-selector.tsx @ 6a9d5b1),
// Copyright 2023 Vercel, Inc., Apache License 2.0.
// Modificado pela Blips: primitivas Base UI da @blips/ui, ícones Phosphor e tokens da @blips/ui.

import { Button } from "@blips/ui/components/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@blips/ui/components/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@blips/ui/components/popover";
import { cn } from "@blips/ui/lib/utils";
import { CaretUpDownIcon } from "@phosphor-icons/react";
import type { ComponentProps, ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useControllableState } from "../lib/use-controllable-state";

const deviceIdRegex = /\(([\da-fA-F]{4}:[\da-fA-F]{4})\)$/;

const DEFAULT_ERROR_MESSAGE = "Não foi possível listar os microfones.";

interface MicSelectorContextType {
  data: MediaDeviceInfo[];
  value: string | undefined;
  onValueChange?: (value: string) => void;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  width: number;
  setWidth?: (width: number) => void;
}

const MicSelectorContext = createContext<MicSelectorContextType>({
  data: [],
  onOpenChange: undefined,
  onValueChange: undefined,
  open: false,
  setWidth: undefined,
  value: undefined,
  width: 200,
});

// navigator.mediaDevices só existe no navegador e em contexto seguro (HTTPS
// ou localhost). Lido só dentro de efeitos e callbacks, nunca no render.
const getMediaDevices = (): MediaDevices | undefined => {
  if (typeof navigator === "undefined") {
    return undefined;
  }
  return navigator.mediaDevices;
};

export const useAudioDevices = () => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState(false);

  const loadDevicesWithoutPermission = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const mediaDevices = getMediaDevices();
      if (!mediaDevices) {
        throw new Error(DEFAULT_ERROR_MESSAGE);
      }

      const deviceList = await mediaDevices.enumerateDevices();
      const audioInputs = deviceList.filter(
        (device) => device.kind === "audioinput"
      );

      setDevices(audioInputs);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : DEFAULT_ERROR_MESSAGE;

      setError(message);
      console.error("Erro ao listar os dispositivos de áudio:", message);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadDevicesWithPermission = useCallback(async () => {
    if (loading) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const mediaDevices = getMediaDevices();
      if (!mediaDevices) {
        throw new Error(DEFAULT_ERROR_MESSAGE);
      }

      const tempStream = await mediaDevices.getUserMedia({
        audio: true,
      });

      for (const track of tempStream.getTracks()) {
        track.stop();
      }

      const deviceList = await mediaDevices.enumerateDevices();
      const audioInputs = deviceList.filter(
        (device) => device.kind === "audioinput"
      );

      setDevices(audioInputs);
      setHasPermission(true);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : DEFAULT_ERROR_MESSAGE;

      setError(message);
      console.error("Erro ao listar os dispositivos de áudio:", message);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    loadDevicesWithoutPermission();
  }, [loadDevicesWithoutPermission]);

  useEffect(() => {
    const mediaDevices = getMediaDevices();
    if (!mediaDevices) {
      return;
    }

    const handleDeviceChange = () => {
      if (hasPermission) {
        loadDevicesWithPermission();
      } else {
        loadDevicesWithoutPermission();
      }
    };

    mediaDevices.addEventListener("devicechange", handleDeviceChange);

    return () => {
      mediaDevices.removeEventListener("devicechange", handleDeviceChange);
    };
  }, [hasPermission, loadDevicesWithPermission, loadDevicesWithoutPermission]);

  return {
    devices,
    error,
    hasPermission,
    loadDevices: loadDevicesWithPermission,
    loading,
  };
};

// open/onOpenChange do Base UI recebem também os detalhes do evento; aqui
// valem as assinaturas simples do upstream, controladas pelo componente.
export type MicSelectorProps = Omit<
  ComponentProps<typeof Popover>,
  "open" | "onOpenChange" | "defaultOpen"
> & {
  defaultValue?: string;
  value?: string | undefined;
  onValueChange?: (value: string | undefined) => void;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const MicSelector = ({
  defaultValue,
  value: controlledValue,
  onValueChange: controlledOnValueChange,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  ...props
}: MicSelectorProps) => {
  const [value, onValueChange] = useControllableState<string | undefined>({
    defaultProp: defaultValue,
    onChange: controlledOnValueChange,
    prop: controlledValue,
  });
  const [open, onOpenChange] = useControllableState({
    defaultProp: defaultOpen,
    onChange: controlledOnOpenChange,
    prop: controlledOpen,
  });
  const [width, setWidth] = useState(200);
  const { devices, loading, hasPermission, loadDevices } = useAudioDevices();

  useEffect(() => {
    if (open && !hasPermission && !loading) {
      loadDevices();
    }
  }, [open, hasPermission, loading, loadDevices]);

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => onOpenChange(nextOpen),
    [onOpenChange]
  );

  const contextValue = useMemo(
    () => ({
      data: devices,
      onOpenChange: handleOpenChange,
      onValueChange,
      open,
      setWidth,
      value,
      width,
    }),
    [devices, handleOpenChange, onValueChange, open, value, width]
  );

  return (
    <MicSelectorContext.Provider value={contextValue}>
      <Popover {...props} onOpenChange={handleOpenChange} open={open} />
    </MicSelectorContext.Provider>
  );
};

export type MicSelectorTriggerProps = ComponentProps<typeof Button>;

export const MicSelectorTrigger = ({
  children,
  ...props
}: MicSelectorTriggerProps) => {
  const { setWidth } = useContext(MicSelectorContext);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Create a ResizeObserver to detect width changes
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = (entry.target as HTMLElement).offsetWidth;
        if (newWidth) {
          setWidth?.(newWidth);
        }
      }
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    // Clean up the observer when component unmounts
    return () => {
      resizeObserver.disconnect();
    };
  }, [setWidth]);

  return (
    <PopoverTrigger ref={ref} render={<Button variant="outline" {...props} />}>
      {children}
      <CaretUpDownIcon className="shrink-0 text-muted-foreground" size={16} />
    </PopoverTrigger>
  );
};

export type MicSelectorContentProps = ComponentProps<typeof Command> & {
  popoverOptions?: ComponentProps<typeof PopoverContent>;
};

export const MicSelectorContent = ({
  className,
  popoverOptions,
  ...props
}: MicSelectorContentProps) => {
  const { width, onValueChange, value } = useContext(MicSelectorContext);

  return (
    <PopoverContent
      className={cn("p-0", className)}
      style={{ width }}
      {...popoverOptions}
    >
      <Command onValueChange={onValueChange} value={value} {...props} />
    </PopoverContent>
  );
};

export type MicSelectorInputProps = ComponentProps<typeof CommandInput> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

export const MicSelectorInput = ({ ...props }: MicSelectorInputProps) => (
  <CommandInput placeholder="Buscar microfone..." {...props} />
);

export type MicSelectorListProps = Omit<
  ComponentProps<typeof CommandList>,
  "children"
> & {
  children: (devices: MediaDeviceInfo[]) => ReactNode;
};

export const MicSelectorList = ({
  children,
  ...props
}: MicSelectorListProps) => {
  const { data } = useContext(MicSelectorContext);

  return <CommandList {...props}>{children(data)}</CommandList>;
};

export type MicSelectorEmptyProps = ComponentProps<typeof CommandEmpty>;

export const MicSelectorEmpty = ({
  children = "Nenhum microfone encontrado.",
  ...props
}: MicSelectorEmptyProps) => <CommandEmpty {...props}>{children}</CommandEmpty>;

export type MicSelectorItemProps = ComponentProps<typeof CommandItem>;

export const MicSelectorItem = (props: MicSelectorItemProps) => {
  const { onValueChange, onOpenChange } = useContext(MicSelectorContext);

  const handleSelect = useCallback(
    (currentValue: string) => {
      onValueChange?.(currentValue);
      onOpenChange?.(false);
    },
    [onValueChange, onOpenChange]
  );

  return <CommandItem onSelect={handleSelect} {...props} />;
};

export type MicSelectorLabelProps = ComponentProps<"span"> & {
  device: MediaDeviceInfo;
};

export const MicSelectorLabel = ({
  device,
  className,
  ...props
}: MicSelectorLabelProps) => {
  const matches = device.label.match(deviceIdRegex);

  if (!matches) {
    return (
      <span className={className} {...props}>
        {device.label}
      </span>
    );
  }

  const [, deviceId] = matches;
  const name = device.label.replace(deviceIdRegex, "");

  return (
    <span className={className} {...props}>
      <span>{name}</span>
      <span className="text-muted-foreground"> ({deviceId})</span>
    </span>
  );
};

export type MicSelectorValueProps = ComponentProps<"span"> & {
  /** Texto exibido quando nenhum microfone está selecionado. */
  placeholder?: ReactNode;
};

export const MicSelectorValue = ({
  className,
  placeholder = "Selecione o microfone...",
  ...props
}: MicSelectorValueProps) => {
  const { data, value } = useContext(MicSelectorContext);
  const currentDevice = data.find((d) => d.deviceId === value);

  if (!currentDevice) {
    return (
      <span className={cn("flex-1 text-left", className)} {...props}>
        {placeholder}
      </span>
    );
  }

  return (
    <MicSelectorLabel
      className={cn("flex-1 text-left", className)}
      device={currentDevice}
      {...props}
    />
  );
};
