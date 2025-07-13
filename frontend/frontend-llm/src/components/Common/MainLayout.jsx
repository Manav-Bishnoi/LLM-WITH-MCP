import React, { useState } from "react";
import Sidebar from "./Sidebar";

export default function MainLayout({ children }) {
  // For mobile drawer, you could add state here
  return (
    <div className="w-screen h-screen min-h-screen flex flex-row bg-gray-50 overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center h-full overflow-auto">
        <div className="w-full max-w-3xl h-full flex flex-col justify-center p-0 md:p-8 lg:p-16">
          {children}
        </div>
      </div>
      {/* Right Sidebar */}
      <Sidebar />
    </div>
  );
} 