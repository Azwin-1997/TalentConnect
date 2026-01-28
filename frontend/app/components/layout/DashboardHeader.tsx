"use client";

import { useState } from "react";
import { Search, Bell, ChevronDown, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function DashboardHeader() {
  const { user, logout } = useAuth();
  const [notificationCount] = useState(3);
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex h-16 items-center gap-4 px-6">
        {/* Logo */}
        <h1 className="text-blue-600 font-semibold text-lg">
          TalentConnect
        </h1>

        {/* Search */}
        <div className="flex-1 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search jobs, companies, skills..."
              className=" text-black w-full pl-10 h-10 rounded-lg border border-gray-200
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 relative">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100">
            <Bell className="w-5 h-5 text-gray-600" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500
                               text-white text-xs rounded-full flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 h-10 px-3 rounded-lg hover:bg-gray-100"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600
                              rounded-full flex items-center justify-center text-white">
                <User className="w-4 h-4" />
              </div>
              <span className="hidden sm:inline text-gray-700">
                {user?.name ?? ""}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white border
                              border-gray-200 rounded-lg shadow-lg">
                <div className="px-3 py-2 border-b">
                  <p className="text-sm font-medium">{user?.name ?? ""}</p>
                  <p className="text-xs text-gray-500">{user?.email ?? ""}</p>
                </div>

                <a
                  href="/profile"
                  className="block w-full text-left px-3 py-2 hover:bg-gray-50"
                >
                  Profile
                </a>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-50">
                  Settings
                </button>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-50">
                  Help & Support
                </button>

                <div className="border-t">
                  <button
                    type="button"
                    onClick={() => { setOpen(false); logout(); }}
                    className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
