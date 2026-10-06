import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@blips/ui/components/resizable";

export default function ResizableHandleDemo() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-[200px] max-w-md rounded-lg border md:min-w-[450px]"
    >
      <ResizablePanel defaultSize="25%">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Barra lateral</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="75%">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Conteúdo</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
