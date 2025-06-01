"use client";
import { useRouter } from "next/navigation";
import PortfolioForm from "../components/PortfolioForm";

export default function SubmitPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <PortfolioForm onSuccess={(username) => router.push(`/profile/${username}`)} />
    </div>
  );
} 