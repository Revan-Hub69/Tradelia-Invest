"use client";

import { Sparkles } from "lucide-react";

export default function ChatHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
      <div className="flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-blue-600" />
        <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">
          Tradelia AI Chat
        </h1>
      </div>
      <span className="text-xs text-green-500 animate-pulse">🟢 Online</span>
    </header>
  );
}
