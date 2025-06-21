"use client";

import React from "react";
import { getQuickActions } from "@/app/utils/actions-utils";
import styles from "./quick-actions-widget.module.css";

const QuickActionsWidget = () => {
  const actions = getQuickActions();

  return (
    <div className={styles.widget}>
      <h2 className={styles.title}>Azioni Rapide</h2>
      <div className={styles.actionsContainer}>
        {actions.map((action) => (
          <button
            key={action.id}
            className={styles.actionButton}
            onClick={() => {
              // Qui puoi gestire cosa fa ogni azione
              console.log(`Azione selezionata: ${action.id}`);
            }}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsWidget;
