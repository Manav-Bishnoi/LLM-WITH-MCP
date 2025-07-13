import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Package, Plus, MessageCircle, Menu, ChevronLeft, ChevronRight, User } from "lucide-react";

const navItems = [
  { path: "/", label: "Chat", icon: MessageCircle },
  { path: "/dashboard", label: "Dashboard", icon: Home },
  { path: "/marketplace", label: "Marketplace", icon: Package },
  { path: "/add-tool", label: "Add Tool", icon: Plus },
];

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <aside className={`sidebar${collapsed ? ' sidebar-collapsed' : ''}` + " hidden sm:flex"} style={{ minWidth: collapsed ? 64 : 90, maxWidth: collapsed ? 64 : 260 }}>
      {/* Logo */}
      <div className="sidebar-logo flex items-center justify-center w-full">
        <Menu className="sidebar-icon" onClick={() => setCollapsed((c) => !c)} title={collapsed ? "Expand" : "Collapse"} />
        {!collapsed && <span className="ml-2">ChatGPT</span>}
      </div>
      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-icon${isActive(item.path) ? ' active' : ''}`}
              title={item.label}
            >
              <Icon />
              {!collapsed && <span className="ml-2 text-base">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      {/* Avatar */}
      <div className="sidebar-avatar mt-auto mb-4">
        <User />
      </div>
    </aside>
  );
} 