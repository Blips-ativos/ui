"use client";

import { MicSelectorLabel } from "@blips/ai/components/mic-selector";

// Dispositivos fixos no formato do MediaDeviceInfo, só para mostrar a
// formatação do rótulo: o sufixo "(vendor:product)" sai em cor secundária.
function dispositivo(deviceId: string, label: string): MediaDeviceInfo {
  return {
    deviceId,
    groupId: "grupo-1",
    kind: "audioinput",
    label,
    toJSON: () => ({ deviceId, label }),
  };
}

const dispositivos = [
  dispositivo("padrao", "Padrão - Microfone do MacBook Pro"),
  dispositivo("usb-1", "Headset USB Logitech H390 (046d:0a44)"),
  dispositivo("usb-2", "Microfone de lapela Boya (1a86:7523)"),
];

export default function AiMicSelectorLabel() {
  return (
    <ul className="flex flex-col gap-2 text-sm">
      {dispositivos.map((d) => (
        <li key={d.deviceId}>
          <MicSelectorLabel device={d} />
        </li>
      ))}
    </ul>
  );
}
