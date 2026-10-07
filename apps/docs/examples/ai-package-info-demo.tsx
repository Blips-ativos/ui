"use client";

import {
  PackageInfo,
  PackageInfoChangeType,
  PackageInfoContent,
  PackageInfoDependencies,
  PackageInfoDependency,
  PackageInfoDescription,
  PackageInfoHeader,
  PackageInfoName,
  PackageInfoVersion,
} from "@blips/ai/components/package-info";

export default function AiPackageInfoDemo() {
  return (
    <div className="w-full max-w-md">
      <PackageInfo
        changeType="major"
        currentVersion="2.8.1"
        name="@blips/ui"
        newVersion="3.0.0"
      >
        <PackageInfoHeader>
          <PackageInfoName />
          <PackageInfoChangeType />
        </PackageInfoHeader>
        <PackageInfoVersion />
        <PackageInfoDescription>
          Componentes migrados do Radix para o Base UI. Troque{" "}
          <code>asChild</code> por <code>render</code> antes de atualizar.
        </PackageInfoDescription>
        <PackageInfoContent>
          <PackageInfoDependencies>
            <PackageInfoDependency name="@base-ui/react" version="^1.0.0" />
            <PackageInfoDependency name="react" version="^19.0.0" />
            <PackageInfoDependency name="tailwindcss" version="^4.1.0" />
          </PackageInfoDependencies>
        </PackageInfoContent>
      </PackageInfo>
    </div>
  );
}
