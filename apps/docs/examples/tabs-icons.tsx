import { Tabs, TabsList, TabsTrigger } from "@blips/ui/components/tabs";
import { AppWindow, Code } from "@phosphor-icons/react";

export function TabsIcons() {
  return (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">
          <AppWindow />
          Preview
        </TabsTrigger>
        <TabsTrigger value="code">
          <Code />
          Code
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
