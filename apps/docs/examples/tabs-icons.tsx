import { Tabs, TabsList, TabsTrigger } from "@blips/ui/components/tabs";
import { AppWindowIcon, CodeIcon } from "@phosphor-icons/react";

export default function TabsIcons() {
  return (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">
          <AppWindowIcon data-icon="inline-start" />
          Visualizar
        </TabsTrigger>
        <TabsTrigger value="code">
          <CodeIcon data-icon="inline-start" />
          Código
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
