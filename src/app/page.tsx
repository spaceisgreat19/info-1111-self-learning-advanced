// src/app/page.tsx
import React from 'react';
import Header from '../components/Header'; // Import Header
import Image from 'next/image'; // Import Image

export default function Home() {
  return (
    <>
      <Header />
      <main className="p-8 flex flex-col items-center">
        {/* BIG TITLE */}
        <h1 className="text-5xl font-bold mb-8 text-center">
          Strata Management System
        </h1>

        {/* BUILDING INFORMATION */}
        <section className="max-w-4xl text-left mb-12">
          <h2 className="text-3xl font-bold mb-4">About Our Building</h2>
          <p className="mb-4">
            Welcome to our strata-managed apartment building located in the heart of New South Wales.
            This building is managed in accordance with the <strong>Strata Schemes Management Act (2015)</strong>.
          </p>

          <h3 className="text-2xl font-semibold mt-6 mb-2">Building Overview</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Established: 2015</li>
            <li>Number of Units: 45</li>
            <li>Facilities: Swimming pool, gym, shared garden</li>
            <li>Parking: Basement level parking for residents</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-6 mb-2">Owner Responsibilities</h3>
          <p className="mb-4">
            Owners are part of the Owners Corporation and contribute to both the Administrative Fund and the Capital Works Fund.
            These funds cover building maintenance, repairs, and insurance.
          </p>

          <h3 className="text-2xl font-semibold mt-6 mb-2">Contact</h3>
          <p>
            For any inquiries, please reach out to the Strata Committee at:{" "}
            <a href="mailto:contact@stratabuilding.com" className="text-blue-500 underline">
              contact@stratabuilding.com
            </a>
          </p>
        </section>

        {/* IMAGES BELOW */}
        <div className="flex flex-wrap justify-center gap-8">
          <Image
            src="/strata_project.jpg"
            alt="Strata Project"
            width={400}
            height={250}
            className="rounded-lg shadow-lg"
          />
          <Image
            src="/strata.jpg"
            alt="Strata"
            width={400}
            height={250}
            className="rounded-lg shadow-lg"
          />
        </div>
      </main>
    </>
  );
}