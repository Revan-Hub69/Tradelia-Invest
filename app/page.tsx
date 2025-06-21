"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import styles from "./page.module.css";

const Home = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect se già loggato
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) router.push("/chat");
    };
    checkSession();
  }, [router]);

  // Submit form login/registrazione
  const handleSubmit = async (e) => {
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
    <main className={styles.main}>
      <h1 className={styles.title}>Benvenuto su Tradelia Invest</h1>
      <p className={styles.subtitle}>
        Tradelia Invest è una piattaforma educativa per la gestione di strategie e investimenti con l’assistente AI.
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="La tua email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.cta} disabled={loading}>
          {loading ? "Attendi..." : "Accedi / Registrati"}
        </button>
        {message && <p className={styles.message}>{message}</p>}
      </form>

      <div className={styles.contacts}>
        <a href="mailto:info@tradelia.org" rel="noopener noreferrer">info@tradelia.org</a>
        <a href="https://www.tradelia.org" target="_blank" rel="noopener noreferrer">www.tradelia.org</a>
        <a href="https://wa.me/393311881090" target="_blank" rel="noopener noreferrer">WhatsApp 3311881090</a>
      </div>

      <p className={styles.disclaimer}>
        Tradelia Invest fornisce esclusivamente informazioni a scopo formativo.
        Nessun consiglio finanziario personalizzato.
        Si invita a valutare attentamente i rischi prima di operare sui mercati.
      </p>
    </main>
  );
};

export default Home;
