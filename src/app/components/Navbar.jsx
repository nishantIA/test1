"use client";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

export default function Navbar() {
  const pathname = usePathname();
  const navigation = [
    { title: "Dashboard", path: "/ia-hubs/dashboard" },
    { title: "Customers", path: "/ia-hubs/customers" },
    { title: "Occupancy", path: "/ia-hubs/occupancy" },
    { title: "Payments", path: "/ia-hubs/payments" },
    { title: "Inventory", path: "/ia-hubs/inventory" },
  ];

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="relative flex flex-shrink-0 items-center">
                  {/* <Image src={'/assets/logos/IA-logo.png'} fill alt='IA-logo'/> */}
                  <img
                    className="block h-5 w-auto lg:hidden"
                    src="/assets/logos/IA-logo.png"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-6 w-auto lg:block"
                    src="/assets/logos/IA-logo.png"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  {navigation.map((navItem) => {
                    return (
                      <Link
                        key={navItem.path}
                        href={navItem.path}
                        className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${pathname===navItem.path?"border-indigo-500 text-gray-900":"border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"}`}
                      >
                        {navItem.title}
                      </Link>
                    );
                  })}
                 
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
