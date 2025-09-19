'use client'

import React, { useState } from 'react';
import { Dialog, DialogPanel, PopoverGroup } from '@headlessui/react';
import { IoMenu, IoCloseSharp } from 'react-icons/io5';
import ButtonHoverUnderLine from './ButtonHoverUnderlined'; // adjust path

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header>
      <nav aria-label="Global" className="container flex max-w-7xl items-center justify-between py-6">
        {/* Logo */}
        <div className="flex lg:flex-1">
            <a href="/" className="flex items-center gap-1 font-bold px-4">
                <span className="text-2xl">SDinev</span>
                <span className="text-5xl text-indigo-500 -mt-4 -ml-1">.</span>
            </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-md px-4"
          >
            <span className="sr-only">Open main menu</span>
            <IoMenu aria-hidden="true" className="w-8 h-8" />
          </button>
        </div>

        {/* Desktop menu */}
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <ButtonHoverUnderLine text="About" href="/about" />
          <ButtonHoverUnderLine text="Certifications" href="/certifications" />
          <ButtonHoverUnderLine text="Projects" href="/projects" />
          <ButtonHoverUnderLine text="Blog" href="/blog" />
          <ButtonHoverUnderLine text="Contact" href="/contact" />
        </PopoverGroup>

        {/* Desktop right side */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm/6 font-semibold">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>

      {/* Mobile menu dialog */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50">
          <DialogPanel className="fixed inset-x-0 z-10 max-h-screen overflow-y-auto bg-bg/90 border-b border-gray-700 rounded-b-3xl backdrop-blur-sm container px-6 py-6 font-sans text-center flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <a href="/" className="flex items-center gap-1 font-bold px-4">
                <span className="text-2xl">SDinev</span>
                <span className="text-5xl text-indigo-500 -mt-4 -ml-1">.</span>
            </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md px-4"
              >
                <span className="sr-only">Close menu</span>
                <IoCloseSharp aria-hidden="true" className="w-6 h-6" />
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
                  Certifications
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
                <a href="/contact" className="block w-full">
                  Contact
                </a>
              </li>
            </ul>
          </DialogPanel>
        </div>
      </Dialog>
    </header>
  );
}