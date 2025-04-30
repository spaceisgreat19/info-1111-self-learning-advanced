import React from 'react';
import Header from '../components/Header'; // Import the Header component

export default function BuildingInfo() {
  return (
    <>
      <Header />
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-4">About Our Building</h1>
        <p className="mb-4">
          Welcome to our strata-managed apartment building located in the heart of New South Wales.
          This building is managed in accordance with the <strong>Strata Schemes Management Act (2015)</strong>.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Building Overview</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Established: 2015</li>
          <li>Number of Units: 45</li>
          <li>Facilities: Swimming pool, gym, shared garden</li>
          <li>Parking: Basement level parking for residents</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Owner Responsibilities</h2>
        <p className="mb-4">
          Owners are part of the Owners Corporation and contribute to both the Administrative Fund and the Capital Works Fund.
          These funds cover building maintenance, repairs, and insurance.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Contact</h2>
        <p>
          For any inquiries, please reach out to the Strata Committee at: <a href="mailto:contact@stratabuilding.com" className="text-blue-500 underline">contact@stratabuilding.com</a>
        </p>
      </main>
    </>
  );
}