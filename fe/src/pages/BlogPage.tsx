// src/pages/BlogPage.tsx
import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const navigate = useNavigate();
        const apiUrl = import.meta.env.VITE_API_URL;
        
   const [error, setError,] = useState<string | null>(null);
        // const [loading, setLoading] = useState(true);
   useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const res = await fetch(`${apiUrl}/blog/?format=json`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data: BlogPost[] = await res.json();
        setBlogPosts(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to fetch blog posts");
    //   } finally {
    //     setLoading(false);
      }
    };
    fetchBlogPosts();
  }, [apiUrl]);

  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1, 4);

  const handleNavigate = (url: string) => {
    navigate(url);
  };


  // ✅ no "Loading..." flash here
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!featuredPost && blogPosts.length === 0) return null;

    return (
        <section className="py-2 xl:py-12">
            <div className="mx-auto w-full px-6 lg:px-28">
                <div className="max-w-7xl mx-auto py-8 sm:py-12 sm:text-center">
                    <p className="mt-1 text-4xl font-bold text-neutral-main sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Blog<span className="text-5xl font-black text-indigo-500">.</span>
                    </p>
                    <p className="max-w-3xl mt-5 mx-auto lg:text-lg text-md text-neutral-secondary">
                        Sharing knowledge: Stories and insights from Cloud, ML & Data Engineering
                    </p>
                </div>
                <div className="w-full lg:py-6 pt-6 mx-auto space-y-12">
                    {featuredPost && (
                <div className="flex group flex-col md:flex-row">
                    <div className="w-full md:w-1/2">
                        <img
                            src={featuredPost.picture}
                            alt={featuredPost.title}
                            className="group-hover:scale-[1.02] border border-gray-700 w-full h-64 object-contain rounded-2xl shadow-lg transition-all duration-200 group-hover:shadow-gray-700 group-hover:shadow-md cursor-pointer"
                            onClick={() =>
                            handleNavigate(`/blog/${featuredPost.category_slug}/${featuredPost.slug}`)
                            }
                        />
                    </div>
                <div className="md:w-1/2 md:pl-10 py-2 flex flex-col gap-4 pt-6">
                    <div className="w-full flex justify-between items-center">
                        <button
                            className="flex bg-indigo-500/30 text-indigo-300 hover:bg-indigo-500 hover:text-neutral-main transition items-center p-3 leading-none rounded-full text-sm font-semibold"
                            onClick={() =>
                            handleNavigate(`/blog/${featuredPost.category_slug}`)
                            }
                        >
                        {featuredPost.category}
                        </button>
                        <button
                    className="hidden group-hover:inline-flex items-center w-max mb-2 text-neutral-secondary text-md font-light transition hover:text-indigo-500"
                    onClick={() =>
                      handleNavigate(`/blog/${featuredPost.category_slug}/${featuredPost.slug}`)
                    }
                  >
                    Read more
                    <ChevronRight strokeWidth={1} className="ml-1 h-4 w-4" />
                  </button>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-neutral-main cursor-pointer"
                    onClick={() =>
                      handleNavigate(`/blog/${featuredPost.category_slug}/${featuredPost.slug}`)
                    }>
                  {featuredPost.title}
                </h3>
                <p className="text-md font-light text-neutral-secondary">
                  {stripHtml(featuredPost.content).slice(0, 160)}...
                </p>
                <div className="text-sm font-normal w-fit pt-2 text-neutral-secondary border-t border-gray-700">
                  by {featuredPost.published_by} ·{" "}
                  {new Date(featuredPost.published_at).toLocaleDateString(
                    undefined,
                    { month: "short", day: "numeric", year: "numeric" }
                  )}{" "}
                  · {featuredPost.read_time} {featuredPost.read_time === 1 ? "min" : "mins"} read
                </div>
              </div>
            </div>
          )}

          {otherPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 xl:gap-6 pt-6 mb-12 xl:mb-0">
              {otherPosts.map((post) => (
                <div key={post.id} className="flex group flex-col h-full">
                  <img
                    src={post.picture || ""}
                    alt={post.title}
                    className={`border border-gray-700 w-full h-48 object-contain rounded-2xl transition-all duration-200 group-hover:scale-[1.02] shadow-lg group-hover:shadow-gray-700 group-hover:shadow-md ${
                      !post.picture ? "hidden" : ""
                    }`}
                    onClick={() =>
                      handleNavigate(`/blog/${post.category_slug}/${post.slug}`)
                    }
                  />
                  {!post.picture && (
                    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg">
                      <span className="text-neutral-secondary">No image available</span>
                    </div>
                  )}
                  <div className="mt-6 flex-grow flex flex-col gap-2 items-start">
                    <div className="w-full flex justify-between items-center">
                      <button
                        className="flex bg-indigo-500/30 text-indigo-300 hover:bg-indigo-500 hover:text-neutral-main transition items-center p-3 leading-none rounded-full text-sm font-semibold"
                        onClick={() =>
                          handleNavigate(`/blog/${post.category_slug}`)
                        }
                      >
                        {post.category}
                      </button>
                      <button
                        className="hidden group-hover:inline-flex items-center w-max mb-2 text-md font-light text-neutral-secondary transition hover:text-indigo-500"
                        onClick={() =>
                          handleNavigate(`/blog/${post.category_slug}/${post.slug}`)
                        }
                      >
                        Read more
                        <ChevronRight strokeWidth={1} className="ml-1 h-4 w-4" />
                      </button>
                    </div>
                    <h4
                      className="text-xl font-semibold mt-2 text-neutral-main cursor-pointer"
                      onClick={() =>
                        handleNavigate(`/blog/${post.category_slug}/${post.slug}`)
                      }
                    >
                      {post.title}
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
          ) : (
            <p className="text-neutral-secondary">No blog posts available.</p>
          )}
        </div>
      </div>
    </section>
  );
}