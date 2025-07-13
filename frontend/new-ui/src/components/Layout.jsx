import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-bg text-text">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center p-4 md:p-10 lg:p-16">
        {children}
      </main>
    </div>
  );
}
