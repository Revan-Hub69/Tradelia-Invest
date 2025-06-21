"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Mail, Globe, MessageCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(`Errore login: ${error.message}`);
    } else {
      router.push("/chat");
    }

    setLoading(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f9fafb] to-[#e5e7eb] px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <h1 className="mb-4 text-3xl font-bold text-center text-gray-800">
          Accedi a <span className="text-blue-600">Tradelia Invest</span>
        </h1>

        <p className="mb-6 text-center text-gray-500">
          Piattaforma educativa per strategie e investimenti con l’assistente AI.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="La tua email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-blue-600 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-blue-600 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? "Attendi..." : "Accedi"}
          </button>
          {message && (
            <p className="text-center text-sm text-red-600">{message}</p>
          )}
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Non hai un account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Registrati qui
          </Link>
        </div>

        <div className="mt-6 flex flex-col gap-3 text-sm text-blue-600">
          <a
            href="mailto:info@tradelia.org"
            className="flex items-center justify-center gap-2 hover:underline"
          >
            <Mail className="w-4 h-4" /> info@tradelia.org
          </a>
          <a
            href="https://www.tradelia.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 hover:underline"
          >
            <Globe className="w-4 h-4" /> www.tradelia.org
          </a>
          <a
            href="https://wa.me/393311881090"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 hover:underline"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp 3311881090
          </a>
        </div>

        <p className="mt-6 text-center text-xs text-red-600 font-semibold">
          ⚠️ Tradelia Invest fornisce esclusivamente informazioni a scopo formativo.
          Nessun consiglio finanziario personalizzato. Consulta sempre un consulente
          finanziario qualificato prima di investire denaro reale. Valuta attentamente i rischi.
        </p>
      </div>
    </main>
  );
}
