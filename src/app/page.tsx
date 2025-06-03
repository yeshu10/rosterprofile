"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/submit');
  }, [router]);

  return (
    // You can add a loading spinner or message here if needed
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <p className="text-gray-700 dark:text-gray-300">Redirecting to submit page...</p>
    </div>
  );
}
