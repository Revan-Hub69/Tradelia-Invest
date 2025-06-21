"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function PaginaLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [messaggio, setMessaggio] = useState("");
  const [caricamento, setCaricamento] = useState(false);

  // Controlla se l'utente è già loggato
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.push("/"); // reindirizza alla home
      }
    };
    checkSession();
  }, [router]);

  const handleLogin = async () => {
    setCaricamento(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMessaggio(`Errore: ${error.message}`);
    } else {
      setMessaggio("✅ Controlla la tua email! Ti abbiamo inviato un link magico per accedere.");
    }
    setCaricamento(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Accedi</h1>
      <input
        type="email"
        placeholder="La tua email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded mb-2 w-64"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={caricamento || !email}
      >
        {caricamento ? "Invio in corso..." : "Invia link magico"}
      </button>
      {messaggio && <p className="mt-4 text-center">{messaggio}</p>}
    </main>
  );
}
