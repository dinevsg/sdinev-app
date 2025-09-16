import { notFound } from 'next/navigation';
import Link from 'next/link';
interface BlogPost {
  title: string;
category: string;
  category_slug: string;
  content: string;
  published_by: string;
  published_at: string;
  read_time: number;
}

// ----------------------------
// REQUIRED FOR STATIC EXPORT
// ----------------------------
// export async function generateStaticParams() {
//   const allParams: { category_slug: string; slug: string }[] = [];

//   const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/categories?format=json`, {
//     cache: "no-store",
//   });
//   if (!categoriesRes.ok) return allParams;
//   const categories: { slug: string }[] = await categoriesRes.json();

//   for (const cat of categories) {
//     const postsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${cat.slug}/?format=json`, {
//       cache: "no-store",
//     });
//     if (!postsRes.ok) continue;
//     const posts: { slug: string }[] = await postsRes.json();

//     posts.forEach((post) => allParams.push({ category_slug: cat.slug, slug: post.slug }));
//   }

//   return allParams;
// }


export async function generateStaticParams() {
  // Fetch all categories
  const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/categories?format=json`, {
    cache: "no-store", // always fetch fresh data
  });
  if (!categoriesRes.ok) return [];

  const categories: { slug: string }[] = await categoriesRes.json();

  // Fetch all posts for each category concurrently
  const allParams = await Promise.all(
    categories.map(async (cat) => {
      const postsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${cat.slug}/?format=json`, {
        cache: "no-store",
      });
      if (!postsRes.ok) return [];

      const posts: { slug: string }[] = await postsRes.json();
      return posts.map((post) => ({ category_slug: cat.slug, slug: post.slug }));
    })
  );

  // Flatten the array of arrays into a single array
  return allParams.flat();
}


type BlogPostPageParams =  Promise<{
  category_slug: string;
  slug: string;
}>;

export default async function BlogPostPage( props: { params: BlogPostPageParams }) {
  const { category_slug, slug } = await props.params; // no await needed

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/${category_slug}/${slug}/?format=json`,
    { cache: 'no-store' }
  );

  if (!res.ok) return notFound();

  const post: BlogPost = await res.json();

  if (!post || !post.title) return notFound();

  return (
    <section className="py-2 xl:py-12">
        <div className="max-w-7xl mx-auto py-12 px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-neutral-main mb-4">
                {post.title}
            </h1>
            <Link href={`/blog/${post.category_slug}`}className="flex w-fit bg-indigo-500/30 text-indigo-300 hover:bg-indigo-500 hover:text-neutral-main transition items-center p-3 leading-none rounded-full text-sm font-semibold">
                {post.category}
            </Link>
            <div className="text-sm font-medium text-neutral-secondary my-4">
                by {post.published_by} ·{' '}
                {new Date(post.published_at).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                })}{' '}
                · {post.read_time} {post.read_time === 1 ? 'min' : 'mins'} read
            </div>
            <article
                className="px-6 prose prose-neutral dark:prose-invert mt-12 text-lg list-disc list-outside [&>ul]:list-disc [&>ol]:list-decimal
                        [&>blockquote]:border-l-4 [&>blockquote]:border-neutral-300 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-neutral-600
                       dark:[&>blockquote]:border-neutral-600 dark:[&>blockquote]:text-neutral-400"
                        dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </div>
    </section>
  );
}