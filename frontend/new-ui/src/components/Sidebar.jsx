import { NavLink } from 'react-router-dom';
import { MessageCircle, LayoutDashboard, Package, Plus } from 'lucide-react';

const navItems = [
  { to: '/chat', icon: MessageCircle, label: 'Chat' },
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/marketplace', icon: Package, label: 'Marketplace' },
  { to: '/add-tool', icon: Plus, label: 'Add Tool' },
];

export default function Sidebar() {
  return (
    <aside className="hidden sm:flex flex-col gap-6 p-4 w-60 bg-bg-secondary border-r border-border">
      <h1 className="text-xl font-bold text-accent">AI Tools</h1>
      <nav className="flex flex-col gap-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-card ${
                isActive ? 'bg-card text-accent' : 'text-text-secondary'
              }`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
