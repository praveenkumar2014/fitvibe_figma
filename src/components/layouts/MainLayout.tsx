import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNavigation } from '../navigation/BottomNavigation';
import { TopHeader } from '../navigation/TopHeader';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopHeader />
      <main className="pb-20 pt-16">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
}