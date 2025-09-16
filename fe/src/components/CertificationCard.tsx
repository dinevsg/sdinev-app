// src/components/CertificationCard.tsx
import React from 'react';
import { ExternalLink } from 'lucide-react';

interface Cert {
  id: number;
  title: string;
  provider: string;
  picture: string;
  description: string;
  credentials_link: string;
}

interface Props {
  cert: Cert;
  index: number;
}

const CertificationCard: React.FC<Props> = ({ cert, index }) => (
  <article
    key={cert.id}
    className="group flex h-full w-full flex-col rounded-2xl border shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-gray-700 hover:shadow-md border-gray-700 bg-slate-800/20"
  >
    {/* Image Section */}
    <div className="h-48 overflow-hidden md:h-44">
      <div className="relative w-full h-full">
        <img
          src={cert.picture}
          alt={cert.title}
          className="absolute inset-0 h-full w-full object-contain pt-6 text-main-neutral"
        />
      </div>
    </div>

    {/* Text Section */}
    <div className="flex flex-1 flex-col gap-4 p-6">
      <div className="flex h-14 flex-col items-center justify-center gap-4 md:flex-row md:gap-12">
        <h3 className="text-lg font-bold text-neutral-main lg:text-xl">{cert.title}</h3>
      </div>

      <div
        id={`certDescription-${index}`}
        className="mb-2 flex flex-1 flex-col overflow-hidden text-md font-normal text-neutral-secondary"
      >
        <div className="mb-2 inline-flex w-max items-center rounded-2xl px-4 py-1 text-sm font-medium bg-indigo-500/30 text-indigo-300">
          <span>{cert.provider}</span>
        </div>
        <span className="text-left">
          <span className="font-bold text-gray-100">Skills measured:</span>{" "}
          {cert.description.length > 110
            ? `${cert.description.slice(0, 110)}...`
            : cert.description}
        </span>
      </div>

      <a
        href={cert.credentials_link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-2 text-md font-normal transition hover:bg-indigo-500 bg-gray-700 text-main-neutral"
      >
        See credentials
        <ExternalLink className="-mt-1" size={17} strokeWidth={2} />
      </a>
    </div>
  </article>
);

export default CertificationCard;