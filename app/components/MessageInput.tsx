"use client";

import { Mic, Send, Paperclip } from "lucide-react";

export default function MessageInput({
  userInput,
  setUserInput,
  handleSubmit,
  inputDisabled,
}: {
  userInput: string;
  setUserInput: (v: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  inputDisabled: boolean;
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-gray-200 dark:border-gray-700 p-4 flex gap-2"
    >
      <input
        type="text"
        placeholder="Scrivi la tua domanda..."
        className="flex-1 rounded-full border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm text-gray-800 dark:text-gray-100 focus:outline-none"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        disabled={inputDisabled}
      />
      <button
        type="button"
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
        onClick={() => alert("🚀 Implementa STT qui!")}
      >
        <Mic className="w-5 h-5" />
      </button>
      <button
        type="button"
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
        onClick={() => alert("🚀 Implementa file upload qui!")}
      >
        <Paperclip className="w-5 h-5" />
      </button>
      <button
        type="submit"
        disabled={inputDisabled}
        className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
}
