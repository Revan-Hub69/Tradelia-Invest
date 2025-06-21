"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Mail, Globe, MessageCircle } from "lucide-react";
import { Toaster, toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast.error(`Errore: ${error.message}`);
    } else {
      toast.success(
        "Registrazione completata! Controlla la tua email per confermare."
      );
      setEmail("");
      setPassword("");
    }

    setLoading(false);
  };

  return (
    <>
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
          <h1 className="mb-4 text-3xl font-bold text-center text-gray-800">
            Registrati su{" "}
            <span className="text-blue-600">Tradelia Invest</span>
          </h1>

          <p className="mb-6 text-center text-gray-500">
            Crea un account per iniziare a gestire strategie e investimenti con
            l’assistente AI.
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
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
              placeholder="Crea una password"
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
              {loading ? "Attendi..." : "Registrati"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Hai già un account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Accedi qui
            </a>
          </div>

          {/* CONTATTI PREMIUM CON COLORI */}
          <div className="mt-6 flex flex-col gap-3 text-sm">
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
        </div>
      </main>

      {/* SONNER TOASTER */}
      <Toaster richColors position="top-center" />
    </>
  );
}

