'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User, Home } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  if (!user) return null;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/feed" className="text-2xl font-bold text-blue-600">
              Community
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link href="/feed" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                <Home size={20} />
                <span>Feed</span>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href={`/profile/${user.id}`} className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{user.username?.[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="hidden md:block text-sm font-medium">{user.username}</span>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut size={16} />
              <span className="hidden md:block ml-1">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
