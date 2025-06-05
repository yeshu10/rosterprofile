"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

// ✅ Declare it outside the component to avoid changing dependency array
const fullText = 'Where Talent Meets Opportunity';

export default function RootPage() {
  const router = useRouter();
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const restartTimeout = setTimeout(() => {
        setTypedText('');
        setCurrentIndex(0);
      }, 2000);
      return () => clearTimeout(restartTimeout);
    }
  }, [currentIndex]); // ✅ No need to include `fullText` here now

  const handleRedirect = () => {
    router.push('/submit');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-center px-4">
      <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-black mb-4">
        {typedText}
      </p>
      <p className="text-gray-800 text-base sm:text-lg max-w-xl italic mb-6">
        No matter who you are or where you're from — this is your space to grow.
        <br />
        Take control of your future with one bold move.
      </p>
      <button
        onClick={handleRedirect}
        className="px-6 py-3 bg-black text-white text-sm sm:text-base rounded-md hover:bg-gray-800 transition"
      >
        Begin Your Journey
      </button>
    </div>
  );
}




// "use client";

// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

// export default function RootPage() {
//   const router = useRouter();

//   useEffect(() => {
//     router.push('/submit');
//   }, [router]);

//   return (
//     // You can add a loading spinner or message here if needed
//     <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
//       <p className="text-gray-700 dark:text-gray-300">Redirecting to submit page...</p>
//     </div>
//   );
// }
