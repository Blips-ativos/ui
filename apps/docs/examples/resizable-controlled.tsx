"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@blips/ui/components/resizable";
import * as React from "react";
import type { Layout } from "react-resizable-panels";

export default function ResizableControlled() {
  const [layout, setLayout] = React.useState<Layout>({});

  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-[200px] max-w-md rounded-lg border md:min-w-[450px]"
      onLayoutChange={setLayout}
    >
      <ResizablePanel defaultSize="30%" id="left" minSize="20%">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">
            {Math.round(layout.left ?? 30)}%
          </span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="70%" id="right" minSize="30%">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">
            {Math.round(layout.right ?? 70)}%
          </span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
