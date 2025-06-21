"use client";

export default function ChatHeader() {
  return (
    <header className="p-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
      <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">
        Tradelia Invest - Chat
      </h1>
      <span className="text-xs text-green-500">🟢 AI Online</span>
    </header>
  );
}
