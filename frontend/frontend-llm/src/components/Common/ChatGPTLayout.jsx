import React from "react";
import Sidebar from "./Sidebar";

export default function ChatGPTLayout({ children }) {
  return (
    <div className="min-h-screen h-screen w-screen bg-gray-50 flex flex-row">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-0 md:p-8 lg:p-16 transition-all duration-300 h-full overflow-auto">
        <div className="w-full max-w-3xl h-full flex flex-col justify-center">
          {children}
        </div>
      </main>
      {/* Right Sidebar (part of flex row, not fixed) */}
      <Sidebar />
    </div>
  );
} 