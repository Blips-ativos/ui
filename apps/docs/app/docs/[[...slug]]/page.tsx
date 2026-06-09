import { notFound } from "next/navigation";
import { DocsPager } from "@/components/docs-pager";
import { DocsToc } from "@/components/docs-toc";
import { mdxComponents } from "@/components/mdx-components";
import { source } from "@/lib/source";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_16rem]">
      <article className="mx-auto w-full max-w-3xl px-4 py-8 lg:px-8 lg:py-10">
        <div className="text-muted-foreground mb-3 text-sm font-medium">
          Documentação
        </div>
        <h1 className="font-display scroll-m-20 text-3xl font-bold tracking-tight">
          {page.data.title}
        </h1>
        {page.data.description ? (
          <p className="text-muted-foreground mt-2 text-lg text-balance">
            {page.data.description}
          </p>
        ) : null}
        <div data-slot="docs" className="mt-8">
          <MDX components={mdxComponents} />
        </div>
        <div className="mt-10">
          <DocsPager tree={source.pageTree} url={page.url} />
        </div>
      </article>

      <aside className="hidden xl:block">
        <DocsToc toc={page.data.toc} />
      </aside>
    </div>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
