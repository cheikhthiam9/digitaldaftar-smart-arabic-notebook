import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { MobileHeader } from './MobileHeader';

export function AppLayout() {
  const { isAuthenticated } = useAuthStore();

  // Redirect to landing if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <MobileHeader />

        {/* Page content */}
        <main className="flex-1">
          <Outlet />
        </main>

        {/* Mobile Bottom Nav */}
        <BottomNav />
      </div>
    </div>
  );
}
