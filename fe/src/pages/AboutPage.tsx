'use client'

import { useEffect, useState } from "react";

interface AboutSection {
  title: string;
  content: string;
  image: string | null;
  cv_url: string
}

export default function AboutSectionComponent() {
  const [about, setAbout] = useState<AboutSection | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch(`${apiUrl}/vanilla/about/?format=json`);
        if (!res.ok) throw new Error("Failed to fetch About section");
        const data: AboutSection = await res.json();
        setAbout(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAbout();
  }, []);

  if (!about) return null; // guard before rendering

  return (
//      <section className="py-2 xl:py-12">
//             <div className="w-full px-6 lg:px-28 mb-12">
//                 <div className="max-w-7xl mx-auto py-8 sm:py-12 sm:text-center">
//                     <p className="mt-1 text-4xl font-bold text-neutral-main sm:text-5xl sm:tracking-tight lg:text-6xl">
//                         About me<span className="text-5xl font-black text-indigo-500">.</span>
//                     </p>
//                     <p className="max-w-3xl mt-5 mx-auto lg:text-lg text-md text-neutral-secondary">
//                         Running on coffee, curiosity, and questionable logic                    </p>
//                 </div>
//     <div className="w-full grid lg:grid-cols-3 grid-cols-1 gap-8 items-center">
//       {/* Left content (2/3) */}
//       <div className="col-span-2 flex flex-col justify-start lg:items-start items-center gap-10">
//         <div className="flex flex-col justify-start gap-4">
//           <h2
//             className="text-lg lg:text-xl font-bold font-manrope text-neutral-main leading-normal"
//             dangerouslySetInnerHTML={{ __html: about.title }}
//           />
//           <article
//                 className="rose prose-neutral dark:prose-invert text-md lg:text-md
//                      [&>ul]:list-disc [&>ul]:pl-2 [&>ul]:ml-6
//                            [&>ol]:list-decimal [&>ol]:pl-2 [&>ol]:ml-6
//                            [&>blockquote]:ml-2 [&>blockquote]:border-l-4 [&>blockquote]:border-neutral-300 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-neutral-secondary
//                            [&>p[style*='margin-left']]:ml-0 [&>p[style*='margin-left']]:pl-0
//                            dark:[&>blockquote]:border-neutral-600 dark:[&>blockquote]:text-neutral-secondary text-neutral-secondary"
//                 dangerouslySetInnerHTML={{ __html: about.content }}
//               />
//         </div>
//       </div>

//       {/* Right image */}
// {about.image && (
//   <div className="w-full flex flex-col items-center justify-center gap-6 px-0 lg:px-0">
//     <div className="w-full max-w-md h-64 overflow-hidden rounded-3xl">
//       <img
//         src={about.image}
//         alt={about.title}
//         className="w-full h-full object-contain"
//       />
//     </div>
//     <a
//       href={about.cv_url}
//       download
//       className="flex w-full lg:w-64 items-center justify-center text-center rounded-2xl bg-indigo-500/30 text-indigo-300 hover:bg-indigo-500/60 px-7 py-3 text-md font-medium shadow-xl transition"
//     >
//       Download CV
//     </a>
//   </div>
// )}

//     </div>
//     </div>
//     </section>
<section className="py-2 xl:py-12">
  <div className="mx-auto w-full px-6 lg:px-24 mb-12">
    {/* Heading */}
    <div className="max-w-7xl mx-auto py-8 sm:py-12 sm:text-center">
      <p className="mt-1 text-4xl font-bold text-neutral-main sm:text-5xl sm:tracking-tight lg:text-6xl">
        About me<span className="text-5xl font-black text-indigo-500">.</span>
      </p>
      <p className="max-w-3xl mt-5 mx-auto lg:text-lg text-md text-neutral-secondary">
        Running on coffee, curiosity, and questionable logic
      </p>
    </div>

    {/* Grid: left 2/3, right 1/3 */}
    <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Left: text 2/3 */}
      <div className="w-full lg:col-span-2 flex flex-col gap-6">
        <h2
          className="text-lg lg:text-xl font-bold font-manrope text-neutral-main leading-normal"
          dangerouslySetInnerHTML={{ __html: about.title }}
        />
        <article
          className="prose prose-lg prose-neutral dark:prose-invert blog-content
                     [&>ul]:list-disc [&>ul]:pl-2 lg:[&>ul]:pl-12 [&>ul]:ml-6
                           [&>ol]:list-decimal [&>ol]:pl-2 lg:[&>ol]:pl-12 [&>ol]:ml-6
                           [&>blockquote]:ml-2 lg:[&>blockquote]:ml-12 [&>blockquote]:border-l-4 [&>blockquote]:border-neutral-300 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-neutral-secondary
                           [&>p[style*='margin-left']]:ml-0 [&>p[style*='margin-left']]:pl-0
                           lg:[&>p>img]:mx-auto
                           dark:[&>blockquote]:border-neutral-600 dark:[&>blockquote]:text-neutral-secondary text-neutral-secondary"
          dangerouslySetInnerHTML={{ __html: about.content }}
        />
      </div>

      {/* Right: image + button 1/3 */}
      {about.image && (
        <div className="w-full lg:col-span-1 flex flex-col items-center gap-6 justify-center h-full">
          <div className="w-full max-w-lg h-80 overflow-hidden rounded-3xl">
            <img
              src={about.image}
              alt={about.title}
              className="w-full h-full object-contain transform"
            />
          </div>
          <a
            href={about.cv_url}
            download
            className="flex w-full lg:w-64 items-center justify-center text-center rounded-2xl bg-indigo-500/30 text-indigo-300 hover:bg-indigo-500/60 px-7 py-3 text-md font-medium shadow-xl transition"
          >
            Download CV
          </a>
        </div>
      )}
    </div>
  </div>
</section>
  );
}