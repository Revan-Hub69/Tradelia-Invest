"use client";

import { Mail, Globe, MessageCircle, LogIn, UserPlus } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">
          Benvenuto su <span className="text-blue-600">Tradelia Invest</span>
        </h1>

        <p className="mb-8 text-gray-500">
          Piattaforma educativa per imparare strategie di investimento
          con l’assistente AI.
        </p>

        <div className="flex flex-col gap-4">
          <a
            href="/login"
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 transition"
          >
            <LogIn className="w-4 h-4" /> Accedi
          </a>
          <a
            href="/register"
            className="flex items-center justify-center gap-2 rounded-xl border border-blue-600 px-4 py-3 font-semibold text-blue-600 hover:bg-blue-50 transition"
          >
            <UserPlus className="w-4 h-4" /> Registrati
          </a>
        </div>

        {/* CONTATTI PREMIUM CON COLORI */}
        <div className="mt-8 flex flex-col gap-3 text-sm">
          <a
            href="mailto:info@tradelia.org"
            className="flex items-center justify-center gap-2 hover:underline"
          >
            <Mail className="w-4 h-4 text-blue-600" /> info@tradelia.org
          </a>
          <a
            href="https://www.tradelia.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 hover:underline"
          >
            <Globe className="w-4 h-4 text-teal-600" /> www.tradelia.org
          </a>
          <a
            href="https://wa.me/393311881090"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 hover:underline"
          >
            <MessageCircle className="w-4 h-4 text-green-600" /> WhatsApp 3311881090
          </a>
        </div>

        {/* DISCLAIMER NEUTRO */}
        <p className="mt-6 text-center text-xs text-gray-500 font-semibold">
          ⚠️ Tradelia Invest fornisce esclusivamente informazioni a scopo formativo.
          Nessun consiglio finanziario personalizzato. Consulta sempre un consulente
          finanziario qualificato prima di investire denaro reale. Valuta attentamente i rischi.
        </p>
      </div>
    </main>
  );
}
