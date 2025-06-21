"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const Home = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect se già loggato
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) router.push("/chat");
    };
    checkSession();
  }, [router]);

  // Submit form login/registrazione
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // 1️⃣ Prova login
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      // 2️⃣ Se login fallisce, prova registrazione
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setMessage(`Errore: ${signUpError.message}`);
      } else {
        setMessage("Registrato! Controlla la tua email per confermare.");
      }
    } else {
      router.push("/chat");
    }

    setLoading(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <h1 className="mb-4 text-3xl font-bold text-center text-gray-800">
          Benvenuto su <span className="text-blue-600">Tradelia Invest</span>
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
            {loading ? "Attendi..." : "Accedi / Registrati"}
          </button>
          {message && (
            <p className="text-center text-sm text-red-600">{message}</p>
          )}
        </form>

        <div className="mt-6 text-center text-sm text-blue-600 space-x-4">
          <a href="mailto:info@tradelia.org" rel="noopener noreferrer">
            info@tradelia.org
          </a>
          <a
            href="https://www.tradelia.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.tradelia.org
          </a>
          <a
            href="https://wa.me/393311881090"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp 3311881090
          </a>
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          Tradelia Invest fornisce esclusivamente informazioni a scopo formativo.
          Nessun consiglio finanziario personalizzato. Si invita a valutare attentamente i rischi prima di operare sui mercati.
        </p>
      </div>
    </main>
  );
};

export default Home;
