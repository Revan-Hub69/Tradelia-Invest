"use client";

import { useState, useEffect, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import ChatHeader from "@/components/ChatHeader";
import MessageList from "@/components/MessageList";
import MessageInput from "@/components/MessageInput";
import { AssistantStream } from "openai/lib/AssistantStream";
import { AssistantStreamEvent } from "openai/resources/beta/assistants/assistants";
import { RequiredActionFunctionToolCall } from "openai/resources/beta/threads/runs/runs";

export default function ChatPage() {
  const userId = "TODO_USER_ID"; // pass userId dinamico qui!
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [threadId, setThreadId] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [messages]);

  useEffect(() => {
    fetch(`/api/assistants/threads`, {
      method: "POST",
      body: JSON.stringify({ userId }),
    })
      .then((res) => res.json())
      .then((data) => setThreadId(data.threadId));
  }, [userId]);

  const sendMessage = async (text: string) => {
    const response = await fetch(
      `/api/assistants/threads/${threadId}/messages`,
      { method: "POST", body: JSON.stringify({ content: text }) }
    );
    const stream = AssistantStream.fromReadableStream(response.body);
    handleStream(stream);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    sendMessage(userInput);
    setMessages((p) => [...p, { role: "user", text: userInput }]);
    setUserInput("");
    setInputDisabled(true);
  };

  const handleStream = (stream: AssistantStream) => {
    stream.on("textCreated", () => appendMessage("assistant", ""));
    stream.on("textDelta", (delta) => delta.value && appendToLast(delta.value));
    stream.on("event", (event) => {
      if (event.event === "thread.run.completed") setInputDisabled(false);
    });
  };

  const appendMessage = (role: string, text: string) => {
    setMessages((p) => [...p, { role, text }]);
  };
  const appendToLast = (text: string) => {
    setMessages((p) => {
      const last = p[p.length - 1];
      return [...p.slice(0, -1), { ...last, text: last.text + text }];
    });
  };

  return (
    <div className="flex h-screen">
      <Sidebar userId={userId} />
      <div className="flex flex-col flex-1">
        <ChatHeader />
        <MessageList messages={messages} scrollRef={scrollRef} />
        <MessageInput
          userInput={userInput}
          setUserInput={setUserInput}
          handleSubmit={handleSubmit}
          inputDisabled={inputDisabled}
        />
      </div>
    </div>
  );
}
