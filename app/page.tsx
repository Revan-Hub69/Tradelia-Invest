"use client";

import React from "react";
import Link from "next/link";
import styles from "./page.module.css";

const Home = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Benvenuto su Tradelia Invest</h1>
      <p className={styles.subtitle}>
        Tradelia Invest è una piattaforma educativa per la gestione di strategie e investimenti con il supporto di un assistente AI.
      </p>
      <Link href="/chat" className={styles.cta}>
        Vai alla Chat
      </Link>
      <div className={styles.contacts}>
        <a href="mailto:info@tradelia.org" rel="noopener noreferrer">info@tradelia.org</a>
        <a href="https://www.tradelia.org" target="_blank" rel="noopener noreferrer">www.tradelia.org</a>
        <a href="https://wa.me/393311881090" target="_blank" rel="noopener noreferrer">WhatsApp 3311881090</a>
      </div>
      <p className={styles.disclaimer}>
        Tradelia Invest fornisce esclusivamente informazioni a scopo formativo. Nessun consiglio finanziario personalizzato. Si invita a valutare attentamente i rischi prima di operare sui mercati.
      </p>
    </main>
  );
};

export default Home;
