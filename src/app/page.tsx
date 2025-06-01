import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-6 sm:p-12">
      <Image
        src="/next.svg"
        alt="Next.js Logo"
        width={120}
        height={28}
        className="dark:invert mb-6"
        priority
      />
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">
        ✅ Everything is working!
      </h1>
      <p className="text-sm sm:text-base text-center mb-6 max-w-md">
        Tailwind CSS, Dark Mode, Images, and Font Configurations are all set up correctly.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition"
        >
          Go to Next.js
        </a>
        <a
          href="https://tailwindcss.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 transition"
        >
          Learn Tailwind
        </a>
      </div>
    </div>
  );
}
