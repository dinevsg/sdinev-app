'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles } from '@/components/Sparkles'
import { HyperText } from "@/components/HyperText";
import { OrbitingCircles } from "@/components/OrbitingCircle";
import CertificationCard from "@/components/CertificationCard";
import Icons from "@/components/IconsCircle";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/DotPattern";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/Terminal";

import { TabsBtn, TabsContent, TabsProvider } from '@/components/Tabs';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ExternalLink } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ProjectsAccordion"
import { stripHtml } from '@/lib/utils';


type Certification = {
    id: number;
  title: string;
  provider: string;
  description: string;
  credentials_link: string;
  picture: string;
};

type BlogPost = {
  id: number;
  title: string;
  category: string;
  content: string;
    slug: string;
    category_slug: string;
  picture: string;
  published_by: string;
  published_at: string; // date string
  read_time: number;
  get_absolute_url: string;
};

type Project = {
  id: number
  title: string
  picture: string | null
  description: string
  stack: string[]
  github_link: string | null
  live_link: string | null
}

const Home = () => {

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
        };

    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [projects, setProjects] = useState<Project[]>([])


useEffect(() => {
  fetch('http://localhost:8000/api/certifications/latest/?format=json')
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then((data) => setCertifications(data))
    .catch((error) => console.error('Failed to fetch certifications:', error));
}, []);

useEffect(() => {
    fetch('http://localhost:8000/api/blog/latest/?format=json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setBlogPosts(data))
      .catch((error) => console.error('Failed to fetch blog posts:', error));
  }, []);

   useEffect(() => {
    fetch("http://localhost:8000/api/projects/latest/?format=json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        return res.json()
      })
      .then((data) => setProjects(data))
      .catch((error) =>
        console.error("Failed to fetch projects:", error)
      )
  }, [])

  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1, 4); // next 3 posts

  return (
    <>
   {/* #################### hero section #################### */}
    <section className="py-12 xl:py-32">
        <div className="container mx-auto max-w-3xl">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight xl:text-6xl">
                    Aloha, <br />
                    <span className='font-normal'>I'm </span><HyperText className='' as="span">Stanislav Dinev</HyperText>
                </h1>
                <p className="mt-8 text-sm xl:text-lg text-neutral-secondary font-medium">
                    A Data Engineer who loves to dive deep into the clouds. <br />
                    Constantly learning, evolving, and pushing boundaries to stay ahead in the ever-changing world of technology.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="/projects" className="rounded-2xl w-full sm:w-44 bg-indigo-600 hover:bg-indigo-500  px-7 py-3 text-md font-medium shadow-xl transition">
                        View my work
                    </a>
                    <a href="#about" className="rounded-2xl flex justify-center w-full sm:w-44 gap-2 bg-indigo-600/10 hover:bg-indigo-600/50  px-7 py-3 text-md font-medium shadow-xl transition">
                        More of me
                        {/* <span aria-hidden="true"> */}
                            {/* <ChevronDown className='' strokeWidth={1} /> */}
                        {/*</span> */}
                    </a>
                </div>
            </div>
        </div>
        <div className='absolute xl:bottom-24 bottom-92 z-[-1] h-[500px] w-full overflow-hidden [mask-image:radial-gradient(100%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#3273ff,transparent_90%)] before:opacity-40 after:absolute'>
            <Sparkles
                density={1800}
                speed={1.2}
                color='#48b6ff'
                direction='top'
                className='absolute inset-x-0 bottom-0 h-full w-full '
            />
        </div>

    </section>
    {/* #################### end hero section #################### */}

    {/* #################### about section #################### */}
    <section id="about" className="py-6 xl:py-12"> 
        <div className="mx-auto lg:px-28 px-6 w-full">
            <div className="items-center w-full flex">
                <h2 className="text-dark text-2xl font-semibold dark:text-slate-200 whitespace-nowrap">
                    <span className="font-thin">About </span>
                    <span className="font-bold">me</span>
                </h2>
                <div className="flex-grow border-b border-gray-700 mx-7" />
        </div>
        </div>
        <div className="px-6 pt-6 mx-auto box-border flex flex-col items-center content-center leading-6 text-black border-0 border-gray-300 border-solid md:flex-row"> 
            <div className="relative flex h-[420px] w-full flex-col items-center justify-center overflow-hidden">
                <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
        )}
      />
                <OrbitingCircles iconSize={45}>
                    <Icons.pyspark />
                    <Icons.python />
                    <Icons.fabric />
                    <Icons.azure />
                </OrbitingCircles>
                <OrbitingCircles iconSize={35} radius={100} reverse speed={2}>
                    <Icons.github />
                    <Icons.sql />
                    <Icons.django />
                    <Icons.tailwind />
                </OrbitingCircles>
            </div>
            <div className="box-border order-first w-full border-solid  md:pl-10 md:order-none">
                <h2 className="py-2 text-xl font-extrabold text-neutral-main leading-tight lg:text-3xl md:text-2xl">
                    Data Nerd
                </h2>
                <p className="py-2 m-0 leading-7 text-neutral-secondary text-sm xl:text-lg sm:pr-12 xl:pr-32">
                    I specialize in designing and implementing robust data architectures that support complex analytics and business intelligence.
                    Understanding the critical role of data in today's world, my passion for growth has led me to explore Machine Learning and engage with Data Security on the Cloud.
                </p>
                <p className="py-2 m-0 leading-7 text-neutral-secondary text-sm xl:text-lg sm:pr-12 xl:pr-32 text-md">
                    You can find insightful articles about Data, Machine Learning and Cloud technologies, where I share my thoughts, experiences, and the latest trends in these fields.
                </p>
                <ul className="py-2 flex items-center gap-4 leading-6 text-neutral-main">
                    <li className="box-border flex items-center relative py-1 pl-0 text-leftborder-solid">
                        <a href="https://www.linkedin.com/in/sdinev/" target="_blank" className="hover:text-indigo-500 transition">
                            <span className="sr-only">Linkedin</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="currentColor" viewBox="0 0 64 64">
                                <path d="M40.227,12C51.145,12,52,12.854,52,23.773v16.453C52,51.145,51.145,52,40.227,52H23.773C12.855,52,12,51.145,12,40.227	V23.773C12,12.854,12.855,12,23.773,12H40.227z M25.029,43V26.728h-5.057V43H25.029z M22.501,24.401	c1.625,0,2.947-1.322,2.947-2.949c0-1.625-1.322-2.947-2.947-2.947c-1.629,0-2.949,1.32-2.949,2.947S20.87,24.401,22.501,24.401z M44,43v-8.925c0-4.382-0.946-7.752-6.067-7.752c-2.46,0-4.109,1.349-4.785,2.628H33.08v-2.223h-4.851V43h5.054v-8.05	c0-2.122,0.405-4.178,3.036-4.178c2.594,0,2.628,2.427,2.628,4.315V43H44z"></path>
                                </svg>
                        </a>
                    </li>
                    <li className="box-border flex items-center relative py-1 pl-0 text-left border-solid">
                        <a href="https://github.com/dinevsg" target="_blank" className="hover:text-indigo-500 transition">
                            <span className="sr-only">GitHub</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9" fill="currentColor" viewBox="0 0 64 64">
                                <path d="M32,10c12.15,0,22,9.85,22,22c0,9.768-6.369,18.045-15.179,20.916c0.002-0.008,0.006-0.021,0.006-0.021	s-1.485-0.696-1.453-1.938c0.035-1.367,0-4.556,0-5.727c0-2.01-1.272-3.434-1.272-3.434s9.977,0.112,9.977-10.533	c0-4.107-2.147-6.245-2.147-6.245s1.128-4.385-0.39-6.245c-1.701-0.184-4.749,1.626-6.05,2.472c0,0-2.062-0.846-5.492-0.846	c-3.43,0-5.492,0.846-5.492,0.846c-1.301-0.846-4.348-2.656-6.05-2.472c-1.518,1.86-0.39,6.245-0.39,6.245s-2.147,2.137-2.147,6.245	c0,10.645,9.977,10.533,9.977,10.533s-1.005,1.136-1.225,2.806c-0.696,0.236-1.721,0.528-2.549,0.528	c-2.165,0-3.812-2.105-4.416-3.078c-0.595-0.96-1.815-1.766-2.953-1.766c-0.749,0-1.115,0.375-1.115,0.803s1.05,0.727,1.743,1.521	c1.461,1.674,1.435,5.438,6.641,5.438c0.565,0,1.719-0.139,2.588-0.256c-0.005,1.185-0.007,2.436,0.012,3.167	c0.031,1.242-1.453,1.938-1.453,1.938s0.004,0.012,0.006,0.021C16.369,50.045,10,41.768,10,32C10,19.85,19.85,10,32,10z"></path>
                                </svg>
                        </a>
                    </li>
                    <li className="box-border relative py-1 pl-0 text-left border-solid">
                        <a href="http://x.com/dinevsg" target="_blank" className="hover:text-indigo-500 transition">
                            <span className="sr-only">X</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-7" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M 2.3671875 3 L 9.4628906 13.140625 L 2.7402344 21 L 5.3808594 21 L 10.644531 14.830078 L 14.960938 21 L 21.871094 21 L 14.449219 10.375 L 20.740234 3 L 18.140625 3 L 13.271484 8.6875 L 9.2988281 3 L 2.3671875 3 z M 6.2070312 5 L 8.2558594 5 L 18.033203 19 L 16.001953 19 L 6.2070312 5 z"></path>
                            </svg>
                        </a>
                    </li>
                    <li className="box-border relative py-1 pl-0 text-left border-solid">
                        <a href="mailto:dinevsg@outlook.com" className="hover:text-indigo-500 transition">
                            <span className="sr-only">Email</span>
                            <svg  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"  fill="currentColor"  className="w-8 h-7 icon icon-tabler icons-tabler-filled icon-tabler-mail"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M22 7.535v9.465a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-9.465l9.445 6.297l.116 .066a1 1 0 0 0 .878 0l.116 -.066l9.445 -6.297z" /><path d="M19 4c1.08 0 2.027 .57 2.555 1.427l-9.555 6.37l-9.555 -6.37a2.999 2.999 0 0 1 2.354 -1.42l.201 -.007h14z" /></svg>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </section>
    {/* #################### end about section #################### */}

    {/* #################### projects section #################### */}
    <section id="projects" className="py-6 xl:py-12"> 
        {/* <div className="mx-auto lg:px-28 px-6 w-full">
            <div className="border-stroke border-gray-700 items-center justify-stretch border-b md:flex">
                <div className="mb-2 w-full flex items-center justify-between">
                    <h2 className="text-dark mb-2 text-2xl font-semibold dark:text-slate-200">
                        <span className="font-thin">Latest </span><span className="font-bold">projects</span>
                    </h2>
                    <Link href="/projects"
                className="mb-2 flex items-center text-md font-light text-neutral-secondary transition hover:text-indigo-500"
                >
                See all
                <ChevronRight strokeWidth={1} />
                </Link>
                </div>
            </div>
        </div> */}
        <div className="mx-auto lg:px-28 px-6 w-full">
  <div className="items-center w-full flex">
    <h2 className="text-dark text-2xl font-semibold dark:text-slate-200 whitespace-nowrap">
      <span className="font-thin">Latest </span>
      <span className="font-bold">projects</span>
    </h2>

    <div className="flex-grow border-b border-gray-700 mx-7" />

    <Link
      href="/projects"
      className="flex items-center text-md font-light text-neutral-secondary transition hover:text-indigo-500 whitespace-nowrap"
    >
      See all
      <ChevronRight strokeWidth={1} className="ml-1 h-4 w-4" />
    </Link>
  </div>
</div>
        <div className="w-full px-6 lg:py-6 pt-6 lg:px-28 mx-auto gap-10 box-border flex flex-col items-center content-center leading-6  border-gray-300 border-solid md:flex-row-reverse"> 
            <div className="relative flex h-[420px] w-full flex-col items-center justify-center overflow-hidden">
            <Terminal>
      <TypingAnimation className="text-neutral-main">&gt; initializing dev profile --sdinev</TypingAnimation>
 
      <AnimatedSpan delay={1500} className="text-neutral-main">
        <span>&gt; echo Loading thoughts...</span>
      </AnimatedSpan>
 
      <AnimatedSpan delay={2000} className="text-green-300">
        <span>✔ Data flows like river</span>
      </AnimatedSpan>
 
      <AnimatedSpan delay={2500} className="text-green-300">
        <span>✔ Code builds the bridge</span>
      </AnimatedSpan>
 
      <AnimatedSpan delay={3000} className="text-green-300">
        <span>✔ Parsing complexity</span>
      </AnimatedSpan>
 
      <AnimatedSpan delay={3500} className="text-green-300">
        <span>✔ Connecting dots in the cloud</span>
      </AnimatedSpan>
 
      <AnimatedSpan delay={4000} className="text-green-300">
        <span>✔ Training intelligence</span>
      </AnimatedSpan>
 
      <AnimatedSpan delay={4500} className="text-green-300">
        <span>✔ Calibrating neural networks</span>
      </AnimatedSpan>
 
      <AnimatedSpan delay={5000} className="text-green-300">
        <span>✔ Turning ideas into algorithms</span>
      </AnimatedSpan>
 
      <AnimatedSpan delay={5500} className="text-orange-300">
        <span>✔ Installing dependencies</span>
      </AnimatedSpan>
 
      <AnimatedSpan delay={6000} className="text-indigo-400">
        <span>ℹ Unlocking the secrets within:</span>
        <span className="pl-2">- mind_matrix.py</span>
      </AnimatedSpan>
 
      <TypingAnimation delay={6500} className="text-neutral-main">
        Project initialization completed.
      </TypingAnimation>
 
      <TypingAnimation delay={7000} className="text-neutral-main">
        Welcome aboard!
      </TypingAnimation>
    </Terminal>
    </div>
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
        {projects.map((project, index) => (
          <AccordionItem key={project.id} value={`item-${index + 1}`}>
            <AccordionTrigger>{project.title}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              {/* Description */}
              <div>{project.description}

              </div>

              {/* Stack / tags */}
              <div className="flex gap-2 flex-wrap mt-2 ">
                {project.stack.map((tag) => (
                  <span key={tag} className="badge badge-primary rounded-2xl px-4 py-1 text-sm font-medium bg-indigo-500/30 text-indigo-300">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4">
                {project.github_link && (
                  <Link
      href={project.github_link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 rounded-full w-36 py-2 text-sm  font-semibold transition hover:bg-indigo-500 bg-gray-700 text-neutral-main"
    >
      GitHub
      <ExternalLink className="-mt-1" size={16} strokeWidth={2} />
    </Link>
  )}
  {project.live_link && (
    <Link
      href={project.live_link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex justify-center text-center items-center gap-1 w-36 py-2 rounded-full bg-gray-700 text-neutral-main text-sm font-semibold hover:bg-indigo-500 transition"
    >
      Live Demo
      <ExternalLink className="-mt-1" size={16} strokeWidth={2} />
    </Link>
                )}
              </div>

              {/* Image */}
              {project.picture && (
                <img
                  src={project.picture}
                  alt={project.title}
                  className="rounded-lg shadow mt-4"
                />
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
        </div>
    </section>
    {/* #################### end project section #################### */}

    {/* #################### certifications section #################### */}
    <section className="py-6 xl:py-12">
 <div className="mx-auto lg:px-28 px-6 w-full">
  <div className="items-center w-full flex">
    <h2 className="text-dark text-2xl font-semibold dark:text-slate-200 whitespace-nowrap">
      <span className="font-thin">Latest </span>
      <span className="font-bold">certifications</span>
    </h2>

    <div className="flex-grow border-b border-gray-700 mx-7" />

    <Link
      href="/certifications"
      className="flex items-center text-md font-light text-neutral-secondary transition hover:text-indigo-500 whitespace-nowrap"
    >
      See all
      <ChevronRight strokeWidth={1} className="ml-1 h-4 w-4" />
    </Link>
  </div>
</div>
  {/* <div className="mx-auto flex w-full items-center justify-items-center justify-between gap-4 px-6 pt-12 lg:flex lg:px-28"> */}
    <div className=''>
      <TabsProvider defaultValue='microsoft'>
        {/* <div className='flex justify-center mt-10'>
          <div className='flex items-center w-fit p-1 text-neutral-main border bg-slate-800/20 border-gray-700 rounded-2xl'>
            <TabsBtn value='all'>
              <span className='relative z-[2] uppercase'>All</span>
            </TabsBtn>
            <TabsBtn value='microsoft'>
              <span className='relative z-[2] font-medium '>Microsoft</span>
            </TabsBtn>
            <TabsBtn value='aws'>
              <span className='relative z-[2] font-medium'>AWS</span>
            </TabsBtn>
            <TabsBtn value='github'>
              <span className='relative z-[2] font-medium'>GitHub</span>
            </TabsBtn>
          </div>
        </div> */}


        {/* All certifications */}
        <TabsContent value='all' className='w-full'>
            <div className="mx-auto grid w-full auto-rows-fr grid-cols-1 items-stretch justify-items-center gap-4 px-6 py-6 sm:py-8 md:py-12 lg:flex lg:px-28">
                {Array.isArray(certifications) &&
                    certifications.map((cert, index) => (
                    <CertificationCard key={cert.id} cert={cert} index={index} />
                ))}
            </div>
        </TabsContent>

        {/* Microsoft certifications */}            
        <TabsContent value="microsoft" className="w-full">
  <div className="min-h-[520px] flex flex-col items-center justify-center px-6 py-6 sm:py-8 md:py-12 lg:px-28">
    {Array.isArray(certifications) && certifications.filter(cert => cert.provider.toLowerCase() === 'microsoft').length > 0 ? (
      <div className="grid w-full auto-rows-fr grid-cols-1 items-stretch justify-items-center gap-4 lg:flex">
        {certifications
          .filter(cert => cert.provider.toLowerCase() === 'microsoft')
          .map((cert, index) => (
            <CertificationCard key={cert.id} cert={cert} index={index} />
          ))}
      </div>
    ) : (
      <p className="text-md text-neutral-secondary">No certifications to show.</p>
    )}
  </div>
</TabsContent>


        {/* AWS certifications */}
        <TabsContent value="aws" className="w-full">
  <div className="min-h-[520px] flex flex-col items-center justify-center px-6 py-6 sm:py-8 md:py-12 lg:px-28">
    {Array.isArray(certifications) && certifications.filter(cert => cert.provider.toLowerCase() === 'aws').length > 0 ? (
      <div className="grid w-full auto-rows-fr grid-cols-1 items-stretch justify-items-center gap-4 lg:flex">
        {certifications
          .filter(cert => cert.provider.toLowerCase() === 'aws')
          .map((cert, index) => (
            <CertificationCard key={cert.id} cert={cert} index={index} />
          ))}
      </div>
    ) : (
      <p className="text-sm text-neutral-secondary">No certifications to show</p>
    )}
  </div>
</TabsContent>

        {/* GitHub certifications */}
        <TabsContent value="github" className="w-full">
  <div className="min-h-[520px] flex flex-col items-center justify-center px-6 py-6 sm:py-8 md:py-12 lg:px-28">
    {Array.isArray(certifications) && certifications.filter(cert => cert.provider.toLowerCase() === 'github').length > 0 ? (
      <div className="grid w-full auto-rows-fr grid-cols-1 items-stretch justify-items-center gap-4 lg:flex">
        {certifications
          .filter(cert => cert.provider.toLowerCase() === 'github')
          .map((cert, index) => (
            <CertificationCard key={cert.id} cert={cert} index={index} />
          ))}
      </div>
    ) : (
      <p className="text-sm text-neutral-secondary">No certifications to show</p>
    )}
  </div>
</TabsContent>
      </TabsProvider>
    </div>
</section>
    {/* #################### end certifications section #################### */}


{/* #################### blog section #################### */}
<section className="py-6 xl:py-12">
        <div className="mx-auto lg:px-28 px-6 w-full">
  <div className="items-center w-full flex">
    <h2 className="text-dark text-2xl font-semibold dark:text-slate-200 whitespace-nowrap">
      <span className="font-thin">Latest </span>
      <span className="font-bold">posts</span>
    </h2>

    <div className="flex-grow border-b border-gray-700 mx-7" />

    <Link
      href="/blog"
      className="flex items-center text-md font-light text-neutral-secondary transition hover:text-indigo-500 whitespace-nowrap"
    >
      See all
      <ChevronRight strokeWidth={1} className="ml-1 h-4 w-4" />
    </Link>
  </div>
</div>

        <div className="w-full px-6 lg:py-6 pt-6 lg:px-28 mx-auto space-y-6">
          {featuredPost && (
            <div className="flex group pt-4 flex-col md:flex-row">
              <div className="w-full md:w-1/2">
                <Link href={`/blog/${featuredPost.category_slug}/${featuredPost.slug}`}>
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
                        href={`/blog/${featuredPost.category_slug}`}className="flex bg-indigo-500/30 text-indigo-300 hover:bg-indigo-500 hover:text-neutral-main transition items-center p-3 leading-none rounded-full text-sm font-semibold">
                        {featuredPost.category}
                    </Link>
                  <Link href={`/blog/${featuredPost.category_slug}/${featuredPost.slug}`} className="hidden group-hover:inline-flex items-center w-max mb-2 text-neutral-secondary text-md font-light transition hover:text-indigo-500">
                    Read more
                   <ChevronRight strokeWidth={1} className="ml-1 h-4 w-4" />
                  </Link>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-neutral-main">
                  <Link href={`/blog/${featuredPost.category_slug}/${featuredPost.slug}`}>{featuredPost.title}</Link>
                </h3>
                <p className="text-md font-light text-neutral-secondary">
                  {stripHtml(featuredPost.content).slice(0, 160)}...
                </p>
                <div className="text-sm font-normal w-fit pt-2 text-neutral-secondary border-t border-gray-700">
                  by {featuredPost.published_by} · {new Date(featuredPost.published_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} · {featuredPost.read_time} {featuredPost.read_time === 1 ? 'min' : 'mins'} read
                </div>
              </div>
            </div>
          )}

          {otherPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 xl:gap-6 pt-6 mb-12 xl:mb-0">
              {otherPosts.map((post) => (
                <div key={post.id} className="flex group flex-col h-full">
                  <Link href={`/blog/${post.category_slug}/${post.slug}`}>
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
                        href={`/blog/${post.category_slug}`}className="flex bg-indigo-500/30 text-indigo-300 hover:bg-indigo-500 hover:text-neutral-main transition items-center p-3 leading-none rounded-full text-sm font-semibold">
                        {post.category}
                    </Link>
                      <Link href={`/blog/${post.category_slug}/${post.slug}`} className="hidden group-hover:inline-flex items-center w-max mb-2 text-md font-light text-neutral-secondary transition hover:text-indigo-500">
                        Read more
                        <ChevronRight strokeWidth={1} className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                    <h4 className="text-xl font-bold mt-2 text-neutral-main">
                      <Link href={`/blog/${post.category_slug}/${post.slug}`}>{post.title}</Link>
                    </h4>
                     <p className="text-md font-light text-neutral-secondary line-clamp-4">
                                          {stripHtml(post.content).slice(0, 320)}...
                                        </p>
                    <div className="text-sm mt-auto font-normal pt-2 text-neutral-secondary border-t border-gray-700">
                      by {post.published_by} · {new Date(post.published_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} · {post.read_time} {post.read_time === 1 ? 'min' : 'mins'} read
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-neutral-secondary">No blog posts available.</p>
          )}
        </div>
      </section>
        </>
    );
    };

    export default Home;
