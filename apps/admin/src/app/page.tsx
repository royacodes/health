import { Button } from "@healthy/ui";

export default function AdminDashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="mb-4 text-4xl font-bold">Admin Dashboard</h1>
      </div>
      <div className="mt-8">
        <p className="mb-4 text-lg text-gray-600">Manage your healthy recipes platform.</p>
        <Button>View Recipes</Button>
      </div>
    </main>
  );
}
