import DashboardHeader from "../components/layout/DashboardHeader";
import DashboardSidebar from "../components/layout/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader />

      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Page Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
