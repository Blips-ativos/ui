import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@blips/ui/components/resizable";

export default function ResizableVertical() {
  return (
    <ResizablePanelGroup
      orientation="vertical"
      className="min-h-[200px] max-w-md rounded-lg border md:min-w-[450px]"
    >
      <ResizablePanel defaultSize="25%">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Cabeçalho</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="75%">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Conteúdo</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
