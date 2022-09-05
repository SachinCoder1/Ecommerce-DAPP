import Link from 'next/link'
import React from 'react'
import Logo from '../../subcomponents/logo/Logo'

export default function ErrorPage({title, description, image, alt}) {
  return (
    <div>
      <div className="min-w-screen min-h-screen bg-blue-100 flex items-center p-5 lg:p-20 overflow-hidden relative">
        <div className="flex-1 min-h-full min-w-full rounded-3xl bg-white shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left">
          <div className="w-full md:w-1/2">
            <div className="mb-10 lg:mb-20">
              <Logo />
            </div>
            <div className="mb-10 md:mb-20 text-gray-600 font-light">
              <h1 className="font-black uppercase text-3xl lg:text-5xl text-primary mb-10">
                {title}
              </h1>
              <p>{description}</p>
              <p>Use the Go Back button below.</p>
            </div>
            <div className="mb-20 md:mb-0">
              <Link href="/">
                <button className="text-lg font-light outline-none focus:outline-none transform transition-all hover:scale-110 text-primary hover:text-primary-darker">
                  <i className="mdi mdi-arrow-left mr-2"></i>Home
                </button>
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/2 text-center">
            <img src={image} alt={alt} />
          </div>
        </div>
        <div className="w-64 md:w-96 h-96 md:h-full bg-blue-200 bg-opacity-30 absolute -top-64 md:-top-96 right-20 md:right-32 rounded-full pointer-events-none -rotate-45 transform"></div>
        <div className="w-96 h-full bg-yellow-200 bg-opacity-20 absolute -bottom-96 right-64 rounded-full pointer-events-none -rotate-45 transform"></div>
      </div>
    </div>
  )
}
