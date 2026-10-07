"use client";

import {
  Commit,
  CommitAuthor,
  CommitAuthorAvatar,
  CommitHash,
  CommitHeader,
  CommitInfo,
  CommitMessage,
  CommitMetadata,
  CommitSeparator,
  CommitTimestamp,
} from "@blips/ai/components/commit";

const dia = 1000 * 60 * 60 * 24;

const commits = [
  {
    autor: "Ana Souza",
    dias: 0,
    hash: "a3f9c21",
    iniciais: "AS",
    mensagem: "feat(tools): consulta de contratos por CNPJ",
  },
  {
    autor: "Bruno Lima",
    dias: 2,
    hash: "7be04d9",
    iniciais: "BL",
    mensagem: "fix(chat): resposta duplicada no streaming",
  },
  {
    autor: "Carla Dias",
    dias: 5,
    hash: "19c2e7f",
    iniciais: "CD",
    mensagem: "chore: pin do core em v0.15.1",
  },
];

export default function AiCommitList() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-2">
      {commits.map((c) => (
        <Commit key={c.hash}>
          <CommitHeader>
            <CommitAuthor>
              <CommitAuthorAvatar initials={c.iniciais} />
            </CommitAuthor>
            <CommitInfo>
              <CommitMessage>{c.mensagem}</CommitMessage>
              <CommitMetadata>
                <CommitHash>{c.hash}</CommitHash>
                <CommitSeparator />
                <span>{c.autor}</span>
                <CommitSeparator />
                <CommitTimestamp date={new Date(Date.now() - c.dias * dia)} />
              </CommitMetadata>
            </CommitInfo>
          </CommitHeader>
        </Commit>
      ))}
    </div>
  );
}
