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
     <section className="py-2 xl:py-12">
            <div className="mx-auto w-full px-6 lg:px-28 mb-12">
                <div className="max-w-7xl mx-auto py-8 sm:py-12 sm:text-center">
                    <p className="mt-1 text-4xl font-bold text-neutral-main sm:text-5xl sm:tracking-tight lg:text-6xl">
                        About me<span className="text-5xl font-black text-indigo-500">.</span>
                    </p>
                    <p className="max-w-3xl mt-5 mx-auto lg:text-lg text-md text-neutral-secondary">
                        Running on coffee, curiosity, and questionable logic                    </p>
                </div>
    <div className="w-full grid lg:grid-cols-3 grid-cols-1 gap-8 items-center">
      {/* Left content (2/3) */}
      <div className="col-span-2 flex flex-col justify-start lg:items-start items-center gap-10">
        <div className="flex flex-col justify-start gap-4">
          <h2
            className="text-lg lg:text-xl font-bold font-manrope text-neutral-main leading-normal"
            dangerouslySetInnerHTML={{ __html: about.title }}
          />
          <article
                className="rose prose-neutral dark:prose-invert mt-12 text-md lg:text-lg
                     [&>ul]:list-disc [&>ul]:pl-2 [&>ul]:ml-6
                           [&>ol]:list-decimal [&>ol]:pl-2 [&>ol]:ml-6
                           [&>blockquote]:ml-2 [&>blockquote]:border-l-4 [&>blockquote]:border-neutral-300 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-neutral-secondary
                           [&>p[style*='margin-left']]:ml-0 [&>p[style*='margin-left']]:pl-0
                           dark:[&>blockquote]:border-neutral-600 dark:[&>blockquote]:text-neutral-secondary text-neutral-secondary"
                dangerouslySetInnerHTML={{ __html: about.content }}
              />
        </div>
      </div>

      {/* Right image */}
{about.image && (
  <div className="flex flex-col-reverse lg:flex-col items-center justify-center gap-6">
    <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-full lg:h-full overflow-hidden rounded-3xl">
      <img
        src={about.image}
        alt={about.title}
        className="w-full h-full object-contain"
      />
    </div>
    <a
      href={about.cv_url}
      download
      className="text-center rounded-2xl w-full sm:w-44 bg-indigo-500/30 text-indigo-300 hover:bg-indigo-500/60 px-7 py-3 text-md font-medium shadow-xl transition"
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