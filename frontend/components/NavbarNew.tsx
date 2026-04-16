'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="shadow-md bg-white tracking-wide relative z-50">
      <section className="flex items-center flex-wrap lg:justify-center gap-4 py-2.5 sm:px-10 px-4 border-gray-200 border-b min-h-[70px]">
        <div className="left-10 absolute z-50 hidden lg:flex bg-gray-100 border border-gray-300 items-center px-4 py-2.5 rounded focus-within:bg-transparent">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" className="cursor-pointer fill-gray-400 mr-2.5 inline-block w-[18px] h-[18px]">
            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z" />
          </svg>
          <input type="text" placeholder="Search..." className="outline-none bg-transparent w-full text-sm" />
        </div>

        <Link href="/" className="hidden sm:block">
          <img src="https://readymadeui.com/readymadeui.svg" alt="logo" className="w-36" />
        </Link>
        <Link href="/" className="block sm:hidden">
          <img src="https://readymadeui.com/readymadeui-short.svg" alt="logo" className="w-9" />
        </Link>

        <div className="lg:absolute lg:right-10 flex items-center ml-auto space-x-8">
          <span className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" className="cursor-pointer fill-gray-800 hover:fill-blue-700 inline-block" viewBox="0 0 64 64">
              <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" />
            </svg>
            <span className="absolute left-auto -ml-1 top-0 rounded-full bg-blue-600 px-1 py-0 text-xs min-w-[15px] text-center text-white">1</span>
          </span>
          <span className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" className="cursor-pointer fill-gray-800 hover:fill-blue-700 inline-block" viewBox="0 0 512 512">
              <path d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15z" />
            </svg>
            <span className="absolute left-auto -ml-1 top-0 rounded-full bg-blue-600 px-1 py-0 text-xs min-w-[15px] text-center text-white">4</span>
          </span>
          <div className="inline-block cursor-pointer border-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" className="hover:fill-blue-700">
              <circle cx="10" cy="7" r="6" />
              <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" />
            </svg>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap justify-center sm:px-10 px-4 py-3 relative">
        {menuOpen && <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setMenuOpen(false)} />}

        <div className={`lg:block ${menuOpen ? 'fixed inset-y-0 left-0 z-50 w-2/3 max-w-[320px] bg-white p-4 shadow-md overflow-auto' : 'hidden lg:relative lg:w-full lg:bg-transparent lg:p-0 lg:shadow-none lg:overflow-visible'}`}>
          <button
            type="button"
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border border-gray-200 cursor-pointer"
            onClick={() => setMenuOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-black" viewBox="0 0 320.591 320.591">
              <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" />
              <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" />
            </svg>
          </button>

          <ul className="lg:flex lg:gap-x-10 space-y-3 lg:space-y-0 lg:space-x-0">
            <li className="lg:hidden border-b border-gray-300 pb-4 px-3">
              <Link href="/" className="block">
                <img src="https://readymadeui.com/readymadeui.svg" alt="logo" className="w-36" />
              </Link>
            </li>
            <li className="border-b border-gray-300 px-3 py-3 lg:border-none lg:px-0 lg:py-0">
              <Link href="/" className="hover:text-blue-700 text-blue-700 block font-medium text-[15px]">
                Home
              </Link>
            </li>
            <li className="group relative border-b border-gray-300 px-3 py-3 lg:border-none lg:px-0 lg:py-0">
              <button type="button" className="hover:text-blue-700 text-slate-900 font-medium text-[15px] flex items-center gap-1">
                Store
                <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" className="inline-block" viewBox="0 0 24 24">
                  <path d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z" />
                </svg>
              </button>

              <ul className="absolute left-0 top-full mt-2 hidden lg:block z-50 space-y-2 shadow-lg bg-white min-w-[230px] px-6 py-4">
                <li className="border-b border-gray-300 py-3">
                  <Link href="/shop?category=Furniture" className="hover:text-blue-700 text-slate-900 font-normal text-[15px] flex items-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" className="inline-block" viewBox="0 0 64 64">
                      <path d="M61.92 30.93a7.076 7.076 0 0 0-6.05-5.88 8.442 8.442 0 0 0-.87-.04V22A15.018 15.018 0 0 0 40 7H24A15.018 15.018 0 0 0 9 22v3.01a8.442 8.442 0 0 0-.87.04 7.076 7.076 0 0 0-6.05 5.88A6.95 6.95 0 0 0 7 38.7V52a3.009 3.009 0 0 0 3 3v6a1 1 0 0 0 1 1h3a1 1 0 0 0 .96-.73L16.75 55h30.5l1.79 6.27A1 1 0 0 0 50 62h3a1 1 0 0 0 1-1v-6a3.009 3.009 0 0 0 3-3V38.7a6.95 6.95 0 0 0 4.92-7.77ZM11 22A13.012 13.012 0 0 1 24 9h16a13.012 13.012 0 0 1 13 13v3.3a6.976 6.976 0 0 0-5 6.7v3.18a3 3 0 0 0-1-.18H17a3 3 0 0 0-1 .18V32a6.976 6.976 0 0 0-5-6.7Zm37 16v5H16v-5a1 1 0 0 1 1-1h30a1 1 0 0 1 1 1ZM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15z" />
                    </svg>
                    Furniture Store
                  </Link>
                </li>
                <li className="border-b border-gray-300 py-3">
                  <Link href="/shop?category=Electronics" className="hover:text-blue-700 text-slate-900 font-normal text-[15px] flex items-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" className="inline-block" viewBox="0 0 1700 1700">
                      <path d="M916.7 1269.4c-10.7 0-20.4-7.2-23.2-18l-29.9-114.7c-3.3-12.8 4.3-25.9 17.2-29.3 12.8-3.3 25.9 4.3 29.3 17.2l29.9 114.7c3.3 12.8-4.3 25.9-17.2 29.3-2 .5-4.1.8-6.1.8zm-169.4 0c-2 0-4-.3-6.1-.8-12.8-3.3-20.5-16.4-17.2-29.3l29.9-114.7c3.3-12.8 16.4-20.5 29.3-17.2 12.8 3.3 20.5 16.4 17.2 29.3l-29.9 114.7c-2.8 10.8-12.6 18-23.2 18zM1066.6 1358.8H597.4c-13.3 0-24-10.7-24-24 0-62.6 50.9-113.5 113.5-113.5h290.4c62.6 0 113.5 50.9 113.5 113.5-.2 13.3-10.9 24-24.2 24zm-440.7-48H1038c-9.6-24.3-33.3-41.5-60.9-41.5H686.8c-27.6.1-51.3 17.3-60.9 41.5zM276.4 762.7c-13.3 0-24-10.7-24-24V395c0-29.7 24.2-53.9 53.9-53.9h1051.4c29.7 0 53.9 24.2 53.9 53.9v297.8c0 13.3-10.7 24-24 24s-24-10.7-24-24V395c0-3.2-2.6-5.9-5.9-5.9H306.3c-3.2 0-5.9 2.6-5.9 5.9v343.7c0 13.2-10.7 24-24 24zm904.5 392H446.5c-13.3 0-24-10.7-24-24s10.7-24 24-24h734.3c13.3 0 24 10.7 24 24s-10.6 24-23.9 24zm0-120.8H446.5c-13.3 0-24-10.7-24-24s10.7-24 24-24h734.3c13.3 0 24 10.7 24 24s-10.6 24-23.9 24z" />
                    </svg>
                    Electronic Store
                  </Link>
                </li>
                <li className="border-b border-gray-300 py-3">
                  <Link href="/shop?category=Fashion" className="hover:text-blue-700 text-slate-900 font-normal text-[15px] flex items-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" className="inline-block" viewBox="0 0 407.7 407.7">
                      <path d="M405.5 118.021a7.93 7.93 0 0 0-.29-.29l-84.16-74.8a7.994 7.994 0 0 0-2.64-1.6l-60.88-21.76a8 8 0 0 0-10.72 7.12c0 1.76-2.64 42.32-43.2 42.96-40.8-.64-43.36-41.2-43.44-42.96a8 8 0 0 0-10.64-7.12l-60.8 22c-.976.357-1.872.9-2.64 1.6l-83.6 74.56a8 8 0 0 0 0 11.6l66.56 67.28v184a8 8 0 0 0 8 8h253.6a8 8 0 0 0 8-8v-184l66.56-67.28a8 8 0 0 0 .29-11.31zm-67.09 55.79v-37.12a8 8 0 0 0-16 0v235.52H84.73v-235.52a8 8 0 0 0-16 0v37.2l-49.2-49.84 76.16-68.16 50.08-18.08c6.204 31.966 37.147 52.851 69.113 46.647 23.607-4.582 42.065-23.04 46.647-46.647l50.08 18.08 75.92 68.16-49.12 49.76z" />
                    </svg>
                    Fashion Store
                  </Link>
                </li>
                <li className="border-b border-gray-300 py-3">
                  <Link href="/shop?category=Shoes" className="hover:text-blue-700 text-slate-900 font-normal text-[15px] flex items-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" className="inline-block" viewBox="0 0 512 512">
                      <path d="M434.1 243.904h-5.955a95.572 95.572 0 0 1-61.022-22.072l-117.812-98.055a49.716 49.716 0 0 0-31.743-11.481c-27.361 0-49.621 22.26-49.621 49.621v11.586c0 22.572-18.364 40.937-40.937 40.937-15.844 0-30.407-9.279-37.102-23.639l-3.261-6.995c-7.434-15.944-23.604-26.246-41.195-26.246C20.39 157.56 0 177.949 0 203.012v118.792c0 42.954 34.946 77.9 77.9 77.9h356.2c42.954 0 77.9-34.946 77.9-77.9 0-42.954-34.946-77.9-77.9-77.9zm0 125.8H77.9c-17.829 0-33.403-9.799-41.65-24.287h439.5c-8.247 14.488-23.821 24.287-41.65 24.287zM30 315.419V203.012c0-8.521 6.932-15.452 15.452-15.452 5.98 0 11.478 3.503 14.005 8.923l3.261 6.994c11.601 24.884 36.837 40.963 64.293 40.963 39.115 0 70.937-31.822 70.937-70.937v-11.586c0-10.819 8.802-19.621 19.621-19.621a19.66 19.66 0 0 1 12.552 4.54l28.901 24.055-32.93 32.93 21.213 21.213 34.872-34.871 13.031 10.846-31.444 31.444 21.213 21.213 33.386-33.385 13.031 10.846-29.958 29.958 21.213 21.213 32.115-32.115c21.284 15.35 47.024 23.723 73.383 23.723h5.955c24.246 0 44.328 18.112 47.461 41.513H30z" />
                    </svg>
                    Shoes Store
                  </Link>
                </li>
              </ul>
            </li>
            <li className="border-b border-gray-300 px-3 py-3 lg:border-none lg:px-0 lg:py-0">
              <Link href="#" className="hover:text-blue-700 text-slate-900 font-medium text-[15px] block">
                Feature
              </Link>
            </li>
            <li className="border-b border-gray-300 px-3 py-3 lg:border-none lg:px-0 lg:py-0">
              <Link href="#" className="hover:text-blue-700 text-slate-900 font-medium text-[15px] block">
                Blog
              </Link>
            </li>
            <li className="border-b border-gray-300 px-3 py-3 lg:border-none lg:px-0 lg:py-0">
              <Link href="#" className="hover:text-blue-700 text-slate-900 font-medium text-[15px] block">
                About
              </Link>
            </li>
            <li className="border-b border-gray-300 px-3 py-3 lg:border-none lg:px-0 lg:py-0">
              <Link href="#" className="hover:text-blue-700 text-slate-900 font-medium text-[15px] block">
                Contact
              </Link>
            </li>
            <li className="border-b border-gray-300 px-3 py-3 lg:border-none lg:px-0 lg:py-0">
              <Link href="#" className="hover:text-blue-700 text-slate-900 font-medium text-[15px] block">
                Source
              </Link>
            </li>
            <li className="border-b border-gray-300 px-3 py-3 lg:border-none lg:px-0 lg:py-0">
              <Link href="#" className="hover:text-blue-700 text-slate-900 font-medium text-[15px] block">
                Partner
              </Link>
            </li>
            <li className="border-b border-gray-300 px-3 py-3 lg:border-none lg:px-0 lg:py-0">
              <Link href="#" className="hover:text-blue-700 text-slate-900 font-medium text-[15px] block">
                More
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex ml-auto lg:hidden">
          <button type="button" className="cursor-pointer" onClick={() => setMenuOpen(true)}>
            <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
