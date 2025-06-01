interface ProfileDisplayProps {
  username: string;
}

export default function ProfileDisplay({ username }: ProfileDisplayProps) {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-2 capitalize">{username}'s Profile</h1>
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-1">Basic Info</h2>
          <div className="text-gray-600">(Name, intro, etc. will appear here)</div>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-1">Employers / Clients</h2>
          <div className="text-gray-600">(Employers/clients info will appear here)</div>
        </section>
      </div>
    </main>
  );
}
