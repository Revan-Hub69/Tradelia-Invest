"use client";

import React from "react";
import Link from "next/link";
import styles from "./page.module.css";

const categories = [
  { id: "chat", label: "Apri Chat", href: "/chat" },
  { id: "azioni", label: "Azioni Rapide", href: "/azioni" },
  { id: "portafoglio", label: "Portafoglio", href: "#" },
  { id: "analisi", label: "Analisi", href: "#" },
];

const Home = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Benvenuto su Tradelia Invest</h1>
      <p className={styles.subtitle}>
        La tua piattaforma per gestire investimenti e strategie con l’assistente AI.
      </p>
      <div className={styles.container}>
        {categories.map((cat) => (
          <Link key={cat.id} href={cat.href} className={styles.category}>
            {cat.label}
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Home;
