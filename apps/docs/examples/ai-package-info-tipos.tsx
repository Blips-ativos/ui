"use client";

import { PackageInfo } from "@blips/ai/components/package-info";

export default function AiPackageInfoTipos() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <PackageInfo
        changeType="minor"
        currentVersion="0.15.1"
        name="blips-agents-core"
        newVersion="0.16.0"
      />
      <PackageInfo
        changeType="patch"
        currentVersion="4.0.2"
        name="shiki"
        newVersion="4.0.3"
      />
      <PackageInfo changeType="added" name="ansi-to-react" newVersion="6.2.6" />
      <PackageInfo
        changeType="removed"
        currentVersion="0.468.0"
        name="lucide-react"
      />
    </div>
  );
}
