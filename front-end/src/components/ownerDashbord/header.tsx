'use client';

import { Bell, Search } from 'react-feather';

export default function Header({ title }: { title: string }) {
  return (
    <header className="bg-white shadow-sm p-4 border-b border-blue-100">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-blue-950">{title}</h1>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-blue-50 text-blue-800">
            <Search size={18} />
          </button>
          <button className="p-2 rounded-full hover:bg-blue-50 text-blue-800 relative">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
}