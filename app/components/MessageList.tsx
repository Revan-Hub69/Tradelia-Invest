"use client";

import MessageBubble from "./MessageBubble";

type Props = {
  messages: { role: "user" | "assistant" | "code"; text: string }[];
  scrollRef: React.RefObject<HTMLDivElement>;
};

export default function MessageList({ messages, scrollRef }: Props) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6">
      {messages.map((msg, i) => (
        <MessageBubble key={i} role={msg.role} text={msg.text} />
      ))}
      <div ref={scrollRef} />
    </div>
  );
}
