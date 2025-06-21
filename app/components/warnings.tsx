"use client";

import React, { useState } from "react";
import styles from "./warnings.module.css";
import { ASSISTANT_ID } from "../openai";

const Warnings = () => {
  const [loading, setLoading] = useState(false);
  const [newAssistantId, setNewAssistantId] = useState("");

  const creaAssistant = async () => {
    setLoading(true);

    const response = await fetch("/api/assistants", { method: "POST" });
    const data = await response.json();
    setNewAssistantId(data.assistantId);

    setLoading(false);
  };

  if (ASSISTANT_ID) {
    return null; // Se c'è, non mostra nulla
  }

  return (
    <div className={styles.container}>
      <h1>Configura il tuo Assistente AI</h1>
      <p className={styles.message}>
        Non hai ancora configurato l'ID dell'assistente.
        Creane uno adesso oppure imposta <code>OPENAI_ASSISTANT_ID</code> nel tuo file <code>.env</code>.
      </p>

      {!newAssistantId ? (
        <button
          onClick={creaAssistant}
          disabled={loading}
          className={styles.button}
        >
          {loading ? "Creazione in corso..." : "Crea Assistente"}
        </button>
      ) : (
        <div className={styles.result}>
          Nuovo Assistant ID: <code>{newAssistantId}</code>
        </div>
      )}
    </div>
  );
};

export default Warnings;
