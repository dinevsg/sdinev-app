// src/pages/BlogPostPage.tsx
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface BlogPost {
  title: string;
  category: string;
  category_slug: string;
  content: string;
  content_html: string;
  published_by: string;
  published_at: string;
  read_time: number;
}

export default function BlogPostPage() {
  const { category_slug, slug } = useParams<{ category_slug: string; slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;
    
  useEffect(() => {
    if (!category_slug || !slug) return;

    fetch(`${apiUrl}/blog/${category_slug}/${slug}/?format=json`)
      .then((res) => res.ok ? res.json() : null)
      .then((data: BlogPost | null) => setPost(data))
      .catch(() => setPost(null));
  }, [category_slug, slug]);

  if (!post) return null; // render nothing until data is ready

  return (
    <section className="py-2 xl:py-12">
      <div className="max-w-7xl mx-auto py-12 px-6 lg:px-8">
        <h1 className="text-2xl lg:text-4xl font-bold text-neutral-main mb-4">{post.title}</h1>
        <Link
          to={`/blog/${post.category_slug}`}
          className="flex w-fit bg-indigo-500/30 text-indigo-300 hover:bg-indigo-500 hover:text-neutral-main transition items-center p-3 leading-none rounded-full text-sm font-semibold"
        >
          {post.category}
        </Link>
        <div className="text-sm font-medium text-neutral-secondary my-4">
          by {post.published_by} ·{" "}
          {new Date(post.published_at).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}{" "}
          · {post.read_time} {post.read_time === 1 ? "min" : "mins"} read
        </div>
        <article
          className="px-2 prose prose-neutral dark:prose-invert mt-12 text-md lg:text-lg
                     [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:ml-10
                     [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:ml-10
                     [&>blockquote]:border-l-4 [&>blockquote]:border-neutral-300 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-neutral-600
                     dark:[&>blockquote]:border-neutral-600 dark:[&>blockquote]:text-neutral-400"
          dangerouslySetInnerHTML={{ __html: post.content_html }}
        />
      </div>
    </section>
  );
}