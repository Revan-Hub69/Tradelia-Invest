"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import styles from "./PaginaLogin.module.css";

export default function PaginaLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [messaggio, setMessaggio] = useState("");
  const [caricamento, setCaricamento] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.push("/"); // se già loggato -> home
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
      setMessaggio(" Controlla la tua email! Ti abbiamo inviato un link di conferma per accedere.");
    }
    setCaricamento(false);
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Accedi a Tradelia Invest</h1>
      <input
        type="email"
        placeholder="La tua email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
      />
      <button
        onClick={handleLogin}
        className={styles.button}
        disabled={caricamento || !email}
      >
        {caricamento ? "Invio in corso..." : "Invia link magico"}
      </button>
      {messaggio && <p className={styles.message}>{messaggio}</p>}
    </main>
  );
}
