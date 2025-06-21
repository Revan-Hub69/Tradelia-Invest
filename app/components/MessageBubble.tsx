"use client";

import Markdown from "react-markdown";

export default function MessageBubble({
  role,
  text,
}: {
  role: "user" | "assistant" | "code";
  text: string;
}) {
  const base =
    "max-w-[75%] px-5 py-3 rounded-2xl mb-2 text-sm leading-relaxed shadow transition";

  if (role === "user") {
    return (
      <div className={`ml-auto bg-gradient-to-br from-blue-600 to-blue-500 text-white ${base}`}>
        {text}
      </div>
    );
  }

  if (role === "assistant") {
    return (
      <div className={`mr-auto bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 ${base}`}>
        <Markdown>{text}</Markdown>
      </div>
    );
  }

  if (role === "code") {
    return (
      <pre className="bg-gray-200 dark:bg-gray-900 text-xs p-4 rounded-lg overflow-x-auto mb-2 font-mono">
        {text}
      </pre>
    );
  }

  return null;
}
