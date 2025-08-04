'use client';

import { ReactNode } from 'react';
import Sidebar from './sidebar';
import Header from './header';

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function DashboardLayout({ 
  children, 
  title = 'Dashboard' 
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-blue-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} />
        <main className="flex-1 overflow-y-auto p-6 bg-blue-50">
          {children}
        </main>
      </div>
    </div>
  );
}