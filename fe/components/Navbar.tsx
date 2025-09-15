'use client'

import Link from 'next/link';
import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  IoMenu,
  IoCloseSharp,
} from 'react-icons/io5'
import ButtonHoverUnderLine from "@/components/ButtonHoverUnderlined";

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
        <header>
            <nav aria-label="Global" className="container flex max-w-7xl items-center justify-between py-6">
                <div className="flex lg:flex-1">
                    <Link href="/" className="text-2xl font-bold">
                        <span>SDinev</span><span className="text-3xl text-indigo-500">.</span>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
                        >
                        <span className="sr-only">Open main menu</span>
                        <IoMenu aria-hidden="true" className="size-6" />
                    </button>
                </div>
                <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                    <ButtonHoverUnderLine text="About" href="/about" />
                    <ButtonHoverUnderLine text="Certifications" href="/certifications" />
                    <ButtonHoverUnderLine text="Projects" href="/projects" />
                    <ButtonHoverUnderLine text="Blog" href="/blog" />
                    <ButtonHoverUnderLine text="Contact" href="/contact" />
                </PopoverGroup>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="#" className="text-sm/6 font-semibold">
                        Log in <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50">
    <DialogPanel className="fixed inset-x-0 z-10 max-h-svh overflow-y-auto bg-bg/90 border-b border-gray-700 rounded-b-3xl  backdrop-blur-sm container px-6 py-6 font-normal text-center flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <a href="#" className="text-2xl font-bold">
          <span>SDinev</span>
          <span className="text-3xl text-indigo-500">.</span>
        </a>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(false)}
          className="-m-2.5 rounded-md p-2.5"
        >
          <span className="sr-only">Close menu</span>
          <IoCloseSharp aria-hidden="true" className="size-6" />
        </button>
      </div>

      <ul className="space-y-2 text-xl font-medium">
        <li className="py-4">
          <a href="/about" className="block w-full">
            About
          </a>
        </li>
        <li className="py-4 border-t border-gray-700">
          <a href="/certifications" className="block w-full">
            Certification
          </a>
        </li>
        <li className="py-4 border-t border-gray-700">
          <a href="/projects" className="block w-full">
            Projects
          </a>
        </li>
        <li className="py-4 border-t border-gray-700">
          <a href="/blog" className="block w-full">
            Blog
          </a>
        </li>
        <li className="py-4 border-t border-gray-700">
          <a href="/contacts" className="block w-full">
            Contact
          </a>
        </li>
        <li className="mt-4 w-full">
          {/* <a
            href="/login"
            className="block rounded-lg border border-slate-200 bg-slate-900 px-4 py-2 text-center font-medium tracking-wide text-slate-100 hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:opacity-100 active:outline-offset-0 dark:border-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:focus-visible:outline-blue-600"
          >
            Log in
          </a> */}
        </li>
      </ul>
    </DialogPanel>
  </div>
            </Dialog>
        </header>
  )
}
