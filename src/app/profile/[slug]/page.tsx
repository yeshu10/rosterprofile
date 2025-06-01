import ProfileDisplay from "../../components/ProfileDisplay";

interface ProfilePageProps {
  params: { slug: string };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = params;
  return <ProfileDisplay username={slug} />;
} 