"use client";

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          Roster Profile
        </Link>
      </div>
    </nav>
  );
}
