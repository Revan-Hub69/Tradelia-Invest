"use client";

import { useRef } from "react";
import { Mic, Paperclip, Send } from "lucide-react";

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
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startSTT = () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Il tuo browser non supporta STT");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "it-IT";
    recognition.interimResults = false;
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setUserInput((prev) => `${prev} ${transcript}`);
    };
    recognition.start();
    recognitionRef.current = recognition;
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 p-4">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-2">
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
          onClick={startSTT}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          <Mic className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => alert("🚀 Implementa file upload qui")}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
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

      <p className="text-xs text-center text-gray-500 dark:text-gray-400">
        ⚠️ Tradelia AI può commettere errori. Usare solo come strumento formativo e per simulazioni. 
        Nessun consiglio finanziario personalizzato. Consulta sempre un professionista prima di operare con denaro reale.
      </p>
    </div>
  );
}
