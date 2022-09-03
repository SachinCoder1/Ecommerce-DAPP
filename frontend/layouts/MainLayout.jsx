import React from "react";
import Head from "next/head";
import { ThemeProvider } from "@material-tailwind/react";

import Navbar from "../components/navbar/Navbar";

export default function MainLayout({ metaTitle, metaDescription, children }) {
  return (
    <div className="bg-gray-200 min-h-screen">
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
        <Navbar />
      </nav>
      <main className="md:mx-5 px-3 my-5 py-5 md:px-5">{children}</main>
    </div>
  );
}
