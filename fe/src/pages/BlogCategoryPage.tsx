'use client'

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { stripHtml } from "../../lib/utils";

interface BlogPost {
  id: number;
  title: string;
  category: string;
  content: string;
  picture: string;
  slug: string;
  category_slug: string;
  published_by: string;
  published_at: string;
  read_time: number;
  get_absolute_url: string;
}

export default function BlogCategoryPage() {
  const { category_slug } = useParams<{ category_slug: string }>();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!category_slug) return;

    fetch(`${apiUrl}/blog/${category_slug}/?format=json`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch blog posts for category ${category_slug}`);
        return res.json();
      })
      .then((data: BlogPost[]) => setBlogPosts(data))
      .catch((err) => console.error(err));
  }, [category_slug]);

  if (!blogPosts.length) return <p className="text-center py-10 text-neutral-secondary">No blog posts available in this category.</p>;

  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1, 4);

  return (
    <section className="py-2 xl:py-12">
      <div className="max-w-7xl mx-auto py-8 sm:py-12 px-6 lg:px-8 sm:text-center">
        <p className="mt-1 text-4xl font-bold text-neutral-main sm:text-5xl sm:tracking-tight lg:text-6xl capitalize">
          {category_slug?.replace(/-/g, ' ')}
          <span className="text-5xl font-black text-indigo-500">.</span>
        </p>
        <p className="max-w-3xl mt-5 mx-auto lg:text-lg text-md text-neutral-secondary">
          Articles in this category: {blogPosts.length}
        </p>
      </div>

      <div className="w-full px-6 lg:py-6 pt-6 lg:px-28 mx-auto space-y-6">
        {featuredPost && (
          <div className="flex group flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <Link to={`/blog/${featuredPost.category_slug}/${featuredPost.slug}`}>
                <img
                  src={featuredPost.picture}
                  alt={featuredPost.title}
                  className="group-hover:scale-[1.02] border border-gray-700 w-full h-64 object-cover rounded-2xl shadow-lg transition-all duration-200 group-hover:shadow-gray-700 group-hover:shadow-md"
                />
              </Link>
            </div>
            <div className="md:w-1/2 md:pl-10 py-2 flex flex-col gap-4 pt-6">
              <div className="w-full flex justify-between items-center">
                <Link
                  to={`/blog/${featuredPost.category_slug}`}
                  className="flex bg-indigo-500/30 text-indigo-300 hover:bg-indigo-500 hover:text-neutral-main transition items-center p-3 leading-none rounded-full text-sm font-semibold"
                >
                  {featuredPost.category}
                </Link>
                <Link
                  to={`/blog/${featuredPost.category_slug}/${featuredPost.slug}`}
                  className="hidden group-hover:inline-flex items-center w-max mb-2 text-neutral-secondary text-md font-light transition hover:text-indigo-500"
                >
                  Read more
                  <ChevronRight strokeWidth={1} className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-neutral-main">
                <Link to={`/blog/${featuredPost.category_slug}/${featuredPost.slug}`}>
                  {featuredPost.title}
                </Link>
              </h3>
              <p className="text-md font-light text-neutral-secondary">
                {stripHtml(featuredPost.content).slice(0, 160)}...
              </p>
              <div className="text-sm font-normal w-fit pt-2 text-neutral-secondary border-t border-gray-700">
                by {featuredPost.published_by} ·{" "}
                {new Date(featuredPost.published_at).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                · {featuredPost.read_time} {featuredPost.read_time === 1 ? "min" : "mins"} read
              </div>
            </div>
          </div>
        )}

        {otherPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 xl:gap-6 pt-6 mb-12 xl:mb-0">
            {otherPosts.map((post) => (
              <div key={post.id} className="flex group flex-col h-full">
                <Link to={`/blog/${post.category_slug}/${post.slug}`}>
                  {post.picture ? (
                    <img
                      src={post.picture}
                      alt={post.title}
                      className="border border-gray-700 w-full h-48 object-cover rounded-2xl group-hover:scale-[1.02] shadow-lg transition-all duration-200 group-hover:shadow-gray-700 group-hover:shadow-md"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg">
                      <span className="text-neutral-secondary">No image available</span>
                    </div>
                  )}
                </Link>
                <div className="mt-6 flex-grow flex flex-col gap-2 items-start">
                  <div className="w-full flex justify-between items-center">
                    <Link
                      to={`/blog/${post.category_slug}`}
                      className="flex bg-indigo-500/30 text-indigo-300 hover:bg-indigo-500 hover:text-neutral-main transition items-center p-3 leading-none rounded-full text-sm font-semibold"
                    >
                      {post.category}
                    </Link>
                    <Link
                      to={`/blog/${post.category_slug}/${post.slug}`}
                      className="hidden group-hover:inline-flex items-center w-max mb-2 text-md font-light text-neutral-secondary transition hover:text-indigo-500"
                    >
                      Read more
                      <ChevronRight strokeWidth={1} className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                  <h4 className="text-xl font-bold mt-2 text-neutral-main">
                    <Link to={`/blog/${post.category_slug}/${post.slug}`}>{post.title}</Link>
                  </h4>
                  <p className="text-md font-light text-neutral-secondary line-clamp-4">
                    {stripHtml(post.content).slice(0, 320)}...
                  </p>
                  <div className="text-sm mt-auto font-normal pt-2 text-neutral-secondary border-t border-gray-700">
                    by {post.published_by} ·{" "}
                    {new Date(post.published_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    · {post.read_time} {post.read_time === 1 ? "min" : "mins"} read
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}