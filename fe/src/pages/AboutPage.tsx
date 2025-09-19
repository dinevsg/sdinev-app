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

  if (!about) return <p>Loading...</p>; // guard before rendering

  return (
     <section className="py-2 xl:py-12">
            <div className="mx-auto w-full px-6 lg:px-28">
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
        <div className="flex flex-col justify-start lg:items-start items-center gap-4">
          <h2
            className="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center"
            dangerouslySetInnerHTML={{ __html: about.title }}
          />
          <p
            className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center"
            dangerouslySetInnerHTML={{ __html: about.content }}
          />
        </div>

        <a
                href={about.cv_url}
                download
                className="sm:w-fit w-full px-3.5 py-2 bg-indigo-600 hover:bg-indigo-800 
                           transition-all duration-700 ease-in-out rounded-lg 
                           shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] 
                           justify-center items-center flex text-white text-sm font-medium leading-6"
              >
                Download CV
              </a>
      </div>

      {/* Right image (1/3) */}
      {about.image && (
        <img
          className="lg:mx-0 mx-auto h-full rounded-3xl object-cover"
          src={about.image}
          alt={about.title}
        />
      )}
    </div>
    </div>
    </section>
  );
}