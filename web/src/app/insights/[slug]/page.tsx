import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextBlock, type PortableTextComponents } from "next-sanity";
import { Container } from "@/components/Container";
import { getPost, getPosts } from "@/lib/content";
import { urlFor } from "@/sanity/image";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getPost((await params).slug);
  return p ? { title: p.title, description: p.excerpt } : {};
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) =>
      value?.asset ? (
        <Image src={urlFor(value).width(1200).url()} alt={value.alt ?? ""} width={1200} height={675} className="my-8 rounded-xl" />
      ) : null,
  },
};

export default async function PostPage({ params }: Props) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  const body = post.body ?? [];
  const isPlain = typeof body[0] === "string";

  return (
    <Container className="max-w-3xl py-16 sm:py-20">
      <Link href="/insights" className="text-sm text-signal hover:underline">← All insights</Link>
      {post.publishedAt && <p className="mt-6 text-sm text-muted">{new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>}
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-ink">{post.title}</h1>
      {post.excerpt && <p className="mt-4 text-xl leading-8 text-muted">{post.excerpt}</p>}
      {post.mainImage?.asset && (
        <Image src={urlFor(post.mainImage).width(1200).height(630).url()} alt={post.mainImage.alt ?? ""} width={1200} height={630} className="mt-8 rounded-2xl" priority />
      )}
      <article className="prose-physiq mt-10">
        {isPlain
          ? (body as string[]).map((para) => <p key={para.slice(0, 40)}>{para}</p>)
          : <PortableText value={body as PortableTextBlock[]} components={components} />}
      </article>
    </Container>
  );
}
