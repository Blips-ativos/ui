"use client";

import { Terminal } from "@blips/ai/components/terminal";
import { useState } from "react";

const saida = [
  "\u001b[1m$ make check\u001b[0m",
  "\u001b[36mruff check\u001b[0m ........ \u001b[32mok\u001b[0m",
  "\u001b[36mruff format --check\u001b[0m \u001b[32mok\u001b[0m",
  "\u001b[36mmypy src\u001b[0m .......... \u001b[32mSuccess: no issues found in 48 source files\u001b[0m",
  "\u001b[36mpytest\u001b[0m ............ \u001b[33m1 skipped\u001b[0m, \u001b[32m212 passed\u001b[0m in 8.41s",
].join("\n");

export default function AiTerminalDemo() {
  const [output, setOutput] = useState(saida);

  return (
    <div className="w-full max-w-2xl">
      <Terminal onClear={() => setOutput("")} output={output} />
    </div>
  );
}
