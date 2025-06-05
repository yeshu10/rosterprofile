"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/store";
import Image from "next/image";
import ShareModal from "./ShareModal";
import { FaShare } from "react-icons/fa6";

export default function ProfileHeader() {
  const basicInfo = useSelector(
    (state: RootState) => state.profile.profileData?.basicInfo
  );
  const username = useSelector(
    (state: RootState) => state.profile.profileData?.username
  );
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [profileUrl, setProfileUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setProfileUrl(window.location.href);
    }
  }, []);

  if (!basicInfo || !username) return null;

  return (
    <div className="text-center mb-6">
      <div className="relative w-32 h-32 mx-auto mb-4">
        <div className="w-32 h-32 rounded-full overflow-hidden">
          <Image
            src={
              basicInfo.profileImage ||
              `https://i.pravatar.cc/150?u=${username}`
            }
            alt={basicInfo.name}
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <h1 className="text-2xl font-bold text-gray-900">{basicInfo.name}</h1>
      <p className="text-gray-600">{basicInfo.title}</p>

      <div className="mt-3 flex justify-center items-center gap-3">
        <button className="px-4 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transition">
          Open to work
        </button>

        <button
          onClick={() => setIsShareModalOpen(true)}
          className="p-2 bg-green-600 text-white rounded-md hover:bg-blue-700 transition"
          title="Share profile"
        >
          <FaShare size={18} />

        </button>

        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          profileUrl={profileUrl}
        />
      </div>
    </div>
  );
}

// "use client";

// import { useSelector } from "react-redux";
// import type { RootState } from "@/lib/store";
// import Image from "next/image";

// export default function ProfileHeader() {
//   const basicInfo = useSelector(
//     (state: RootState) => state.profile.profileData?.basicInfo
//   );
//   const username = useSelector(
//     (state: RootState) => state.profile.profileData?.username
//   );
//   const isOpenToWork = true; 

//   if (!basicInfo || !username) return null;

//   return (
//     <div className="text-center mb-6">
//       <div className="relative w-32 h-32 mx-auto mb-4">
//         <div className="w-32 h-32 rounded-full overflow-hidden">
//           <Image
//             src={basicInfo.profileImage || `https://i.pravatar.cc/150?u=${username}`}
//             alt={basicInfo.name}
//             width={128}
//             height={128}
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </div>
//       <h1 className="text-2xl font-bold text-gray-900">{basicInfo.name}</h1>
//       <p className="text-gray-600">{basicInfo.title}</p>
//       {isOpenToWork && (
//         <button className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transition">
//           Open to work
//         </button>
//       )}
//     </div>
//   );
// }
