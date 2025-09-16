'use client';

import { useEffect, useState } from "react";
import { Button } from "../components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/card";
import { BorderBeam } from "../components/BorderBeam";
import { ExternalLink } from "lucide-react";

interface Project {
  id: number;
  title: string;
  picture: string | null;
  description: string;
  stack: string[];
  github_link: string | null;
  live_link: string | null;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${apiUrl}/projects/`);
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [apiUrl]);

  if (loading) return <p className="text-center text-neutral-secondary">Loading projects...</p>;

  return (
    <section className="py-2 xl:py-12">
      <div className="mx-auto w-full px-6 lg:px-28 mb-12">
        <div className="max-w-7xl mx-auto py-8 sm:py-12 sm:px-6 lg:px-8 sm:text-center">
          <p className="mt-1 text-4xl font-bold text-neutral-main sm:text-5xl sm:tracking-tight lg:text-6xl">
            Projects<span className="text-5xl font-black text-indigo-500">.</span>
          </p>
          <p className="max-w-3xl mt-5 mx-auto lg:text-lg text-md text-neutral-secondary">
            Exploring the intersection of creativity and engineering
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="w-full relative h-84 bg-slate-800/20 rounded-2xl flex flex-col border-gray-700"
            >
              <div className="flex flex-col flex-grow overflow-hidden rounded-2xl">
                <CardHeader>
                  <CardTitle className="w-full font-bold text-sm lg:text-xl text-neutral-main">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-sm xl:text-base text-neutral-secondary">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col gap-2 flex-grow">
                  <div className="mt-auto flex flex-col gap-3">
                    <div className="flex gap-2 flex-wrap mt-2">
                      {project.stack.map((tag) => (
                        <span
                          key={tag}
                          className="badge badge-primary rounded-2xl px-4 py-1 text-sm font-medium bg-indigo-500/30 text-indigo-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2 mt-auto">
                      {project.github_link && (
                        <a
                          href={project.github_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex justify-center items-center gap-1 w-36 py-1 rounded-full bg-gray-700 text-neutral-main text-sm font-semibold hover:bg-indigo-500 transition"
                        >
                          GitHub <ExternalLink size={16} strokeWidth={2} />
                        </a>
                      )}
                      {project.live_link && (
                        <a
                          href={project.live_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex justify-center items-center gap-1 w-36 py-2 rounded-full bg-gray-700 text-neutral-main text-sm font-semibold hover:bg-indigo-500 transition"
                        >
                          Live Demo <ExternalLink size={16} strokeWidth={2} />
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </div>

              <BorderBeam
                duration={8}
                size={100}
                className="absolute inset-0 rounded-2xl pointer-events-none"
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}