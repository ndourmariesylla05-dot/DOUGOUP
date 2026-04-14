import { useState, ReactNode } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import BottomNavbar from './BottomNavbar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="lg:ml-72">
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 sticky top-0 z-20">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-[#7a4e2d] hover:bg-[#d8c3a5]/20 p-2 rounded-lg"
          >
            <Menu size={24} />
          </button>
          <h2 className="text-lg font-semibold text-[#7a4e2d]">DOUGOUP</h2>
        </header>

        <main className="p-4 lg:p-6 pb-20 lg:pb-6">
          {children}
        </main>
      </div>

      <BottomNavbar />
    </div>
  );
}
