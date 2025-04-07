import { MDXRemote } from "next-mdx-remote/rsc";
interface ParamsSignature {
  params: Promise<{ id: string }>;
}

export default async function DocsPage({ params }: ParamsSignature) {
  const { id } = await params;
  const docsContent = await fetch(`http://localhost:3001/docs/${id}`);
  const buffer = await docsContent.arrayBuffer()
  const content = new TextDecoder().decode(buffer);
  
  return <MDXRemote source={content} />;
}
