"use client";

import {
  Commit,
  CommitActions,
  CommitAuthor,
  CommitAuthorAvatar,
  CommitContent,
  CommitCopyButton,
  CommitFile,
  CommitFileAdditions,
  CommitFileChanges,
  CommitFileDeletions,
  CommitFileIcon,
  CommitFileInfo,
  CommitFilePath,
  CommitFileStatus,
  CommitFiles,
  CommitHash,
  CommitHeader,
  CommitInfo,
  CommitMessage,
  CommitMetadata,
  CommitSeparator,
  CommitTimestamp,
} from "@blips/ai/components/commit";

const hash = "a3f9c21";

// Data fixa relativa ao carregamento: ontem.
const ontem = new Date(Date.now() - 1000 * 60 * 60 * 24);

const arquivos = [
  {
    adicoes: 48,
    caminho: "src/tools/contratos.py",
    remocoes: 0,
    status: "added",
  },
  {
    adicoes: 12,
    caminho: "src/agente.py",
    remocoes: 3,
    status: "modified",
  },
  {
    adicoes: 0,
    caminho: "src/tools/legado.py",
    remocoes: 31,
    status: "deleted",
  },
  {
    adicoes: 2,
    caminho: "docs/ferramentas.md",
    remocoes: 2,
    status: "renamed",
  },
] as const;

export default function AiCommitDemo() {
  return (
    <Commit className="w-full max-w-xl" defaultOpen>
      <CommitHeader>
        <CommitAuthor>
          <CommitAuthorAvatar initials="AS" />
        </CommitAuthor>
        <CommitInfo>
          <CommitMessage>
            feat(tools): consulta de contratos por CNPJ
          </CommitMessage>
          <CommitMetadata>
            <CommitHash>{hash}</CommitHash>
            <CommitSeparator />
            <span>Ana Souza</span>
            <CommitSeparator />
            <CommitTimestamp date={ontem} />
          </CommitMetadata>
        </CommitInfo>
        <CommitActions>
          <CommitCopyButton hash={hash} />
        </CommitActions>
      </CommitHeader>
      <CommitContent>
        <CommitFiles>
          {arquivos.map((arquivo) => (
            <CommitFile key={arquivo.caminho}>
              <CommitFileInfo>
                <CommitFileStatus status={arquivo.status} />
                <CommitFileIcon />
                <CommitFilePath>{arquivo.caminho}</CommitFilePath>
              </CommitFileInfo>
              <CommitFileChanges>
                <CommitFileAdditions count={arquivo.adicoes} />
                <CommitFileDeletions count={arquivo.remocoes} />
              </CommitFileChanges>
            </CommitFile>
          ))}
        </CommitFiles>
      </CommitContent>
    </Commit>
  );
}
