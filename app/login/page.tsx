// app/login/page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementa login/registrazione con Supabase Auth
    console.log({ email, password });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f9fafb] to-[#e5e7eb] px-4">
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
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 transition"
          >
            Accedi / Registrati
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-gray-400">
          Tradelia Invest fornisce esclusivamente informazioni a scopo formativo. 
          Nessun consiglio finanziario personalizzato.
        </p>
        <div className="mt-4 text-center text-sm text-blue-600">
          <Link href="mailto:info@tradelia.org">info@tradelia.org</Link> |{" "}
          <Link href="https://www.tradelia.org">www.tradelia.org</Link> |{" "}
          <Link href="https://wa.me/393311881090">WhatsApp</Link>
        </div>
      </div>
    </main>
  );
}
