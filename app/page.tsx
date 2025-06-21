"use client";

import React from "react";
import styles from "./page.module.css";

const Home = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        Benvenuto su Tradelia Invest
      </h1>
      <p className={styles.subtitle}>
        La tua piattaforma per gestire investimenti e strategie con l’assistente AI.
      </p>
    </main>
  );
};

export default Home;
