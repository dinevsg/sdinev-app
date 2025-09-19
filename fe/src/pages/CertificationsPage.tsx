'use client'
import React, { useState, useEffect } from "react";
import CertificationCard from "../components/CertificationCard";
import { TabsBtn, TabsContent, TabsProvider } from '../components/Tabs';


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/SelectFilter"


// async function fetchCertifications(): Promise<Certification[]> {
//   const res = await fetch("`${apiUrl}/certifications/");
//   if (!res.ok) {
//     throw new Error("Failed to fetch certifications");
//   }
//   return res.json();
// }

interface Certification {
  id: number;
  title: string;
  picture: string;
  provider: string;
  description: string;
  credentials_link: string;
}

export default  function CertificationsPage() {

const [certifications, setCertifications] = useState<Certification[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>("all");
      const apiUrl = import.meta.env.VITE_API_URL;
      
  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const res = await fetch(`${apiUrl}/certifications/`);
        if (!res.ok) throw new Error("Failed to fetch certifications");
        const data = await res.json();
        setCertifications(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCertifications();
  }, []);

  const filteredCerts = selectedProvider === "all"
    ? certifications
    : certifications.filter(cert => cert.provider.toLowerCase() === selectedProvider.toLowerCase());



  return (
    <section className="py-2 xl:py-12">
        <div className="mx-auto w-full px-6 lg:px-28 mb-12">
            <div className="max-w-7xl mx-auto py-8 sm:py-12 sm:px-6 lg:px-8 sm:text-center">
                <p className="mt-1 text-4xl font-bold text-neutral-main sm:text-5xl sm:tracking-tight lg:text-6xl">
                    Certifications<span className="text-5xl font-black text-indigo-500">.</span>
                </p>
                <p className="max-w-3xl mt-5 mx-auto lg:text-lg text-md text-neutral-secondary">
                    A showcase of my latest achievements in Cloud, AI & Data Engineering
                </p>
            </div>


        {/* Mobile SelectFilter */}
        
        <div className="block md:hidden mb-6 ">
          <Select value={selectedProvider} onValueChange={setSelectedProvider}>
            <SelectTrigger>
              <SelectValue placeholder="Select provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="microsoft">Microsoft</SelectItem>
                <SelectItem value="aws">AWS</SelectItem>
                <SelectItem value="github">GitHub</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* ✅ Mobile Certifications Render */}
        <div className="md:hidden min-h-[300px] flex items-center justify-center">
          {filteredCerts.length > 0 ? (
            <div className="grid w-full auto-rows-fr grid-cols-1 items-stretch justify-items-center gap-4 lg:flex">
              {filteredCerts.map((cert, index) => (
                <CertificationCard key={cert.id} cert={cert} index={index} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-secondary items-center text-center">
              No certifications to show
            </p>
          )}
        </div>
        


        {/* Desktop Tabs */}
            <div className='hidden md:block'>
                <TabsProvider defaultValue='all'>
                    <div className='flex justify-center mb-4'>
                        <div className='flex w-full items-center xl:w-fit p-2 xl:p-1 justify-between text-neutral-main border bg-slate-800/20 border-gray-700 rounded-2xl'>
                            <TabsBtn value='all'>
                                <span className='relative z-[2] font-medium'>
                                    All
                                </span>
                            </TabsBtn>
                            <TabsBtn value='microsoft'>
                                <span className='relative z-[2] font-medium '>
                                    Microsoft
                                </span>
                            </TabsBtn>
                            <TabsBtn value='aws'>
                                <span className='relative z-[2] font-medium'>
                                    AWS
                                </span>
                            </TabsBtn>
                            <TabsBtn value='github'>
                                <span className='relative z-[2] font-medium'>
                                    GitHub
                                </span>
                            </TabsBtn>
                        </div>
                    </div>

                    {/* all certifications */}            
                    <TabsContent value="all" className="w-full">
                        <div className="min-h-[520px] flex flex-col items-center justify-center">
                            {Array.isArray(certifications) && certifications.filter(cert => cert.provider.toLowerCase() === 'microsoft').length > 0 ? (
                                <div className="grid w-full auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch justify-items-center gap-4">
                                    {certifications.map((cert, index) => (
                                    <CertificationCard key={cert.id} cert={cert} index={index} />
                                    ))}
                                </div>
                                ) : (
                                <p className="text-sm text-neutral-secondary">No certifications to show</p>
                            )}
                        </div>
                    </TabsContent>

                    {/* Microsoft certifications */}            
                    <TabsContent value="microsoft" className="w-full">
                        <div className="min-h-[520px] flex flex-col items-center justify-center">
                            {Array.isArray(certifications) && certifications.filter(cert => cert.provider.toLowerCase() === 'microsoft').length > 0 ? (
                                <div className="grid w-full auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch justify-items-center gap-4">
                                    {certifications
                                        .filter(cert => cert.provider.toLowerCase() === 'microsoft')
                                        .map((cert, index) => (
                                        <CertificationCard key={cert.id} cert={cert} index={index} />
                                    ))}
                                </div>
                                ) : (
                                <p className="text-sm text-neutral-secondary">No certifications to show</p>
                            )}
                        </div>
                    </TabsContent>


                    {/* AWS certifications */}
                    <TabsContent value="aws" className="w-full">
                        <div className="min-h-[520px] flex flex-col items-center justify-center px-6 py-6 sm:py-8 md:py-12 lg:px-28">
                            {Array.isArray(certifications) && certifications.filter(cert => cert.provider.toLowerCase() === 'aws').length > 0 ? (
                                <div className="grid w-full auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch justify-items-center gap-4">
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
                                <div className="grid w-full auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch justify-items-center gap-4">
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
        </div>
    </section>
  );
}