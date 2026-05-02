"use client";

import { useState } from "react";
import { Search, Plus, Bell } from "lucide-react";

/**
 * Topbar
 * @param {Object}   props
 * @param {string}   props.userInitials
 * @param {number}   props.notificationCount
 * @param {Function} props.onCreateNew
 * @param {Function} props.onSearch
 */
export default function Topbar({
  userInitials = "AH",
  notificationCount = 1,
  onCreateNew,
  onSearch,
}) {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <header className="flex items-center justify-between flex-wrap gap-3 px-6 py-3 bg-white border-b border-gray-100 shrink-0">
      <div className="relative md:w-1/2 w-full">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          value={search}
          onChange={handleSearch}
          placeholder="Search anything..."
          className="w-full pl-8 pr-3 py-2 text-xs rounded-lg bg-gray-50 border border-gray-100 focus:outline-none focus:border-[#4CAF50] transition-colors"
        />
      </div>
      <div className="flex items-center justify-between md:w-50 w-full gap-3">
        <button
          onClick={onCreateNew}
          className="flex items-center gap-1.5 bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors"
        >
          <Plus size={13} />
          Create New
        </button>
        <div className="flex">
          <button className="relative p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Bell size={16} className="text-gray-500" />
            {notificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
            )}
          </button>
          <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-white text-xs font-bold">
            {userInitials}
          </div>
        </div>
      </div>
    </header>
  );
}
