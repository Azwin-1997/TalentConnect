"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Target,
  FileText,
  MessageSquare,
  Bookmark,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "My Profile", icon: User, href: "/profile" },
    { label: "Job Matches", icon: Target, href: "/jobs" },
    { label: "Applications", icon: FileText, href: "/applications" },
    { label: "Messages", icon: MessageSquare, href: "/messages", badge: 5 },
    { label: "Saved Jobs", icon: Bookmark, href: "/saved" },
    { label: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <aside
      className={`sticky top-16 h-[calc(100vh-4rem)] border-r bg-white transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full">
        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors relative ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs bg-blue-600 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span className="ml-2">Collapse</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
