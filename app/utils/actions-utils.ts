export type QuickAction = {
  id: string;
  label: string;
  description?: string;
};

// ✅ Lista di azioni
export const quickActions: QuickAction[] = [
  {
    id: "summarize",
    label: "Riassumi testo",
    description: "Riassume un testo in punti chiave",
  },
  {
    id: "translate",
    label: "Traduci in inglese",
    description: "Traduci un testo in inglese fluente",
  },
  {
    id: "generate_code",
    label: "Genera codice",
    description: "Crea uno snippet di codice per un problema specifico",
  },
  {
    id: "fix_grammar",
    label: "Correggi grammatica",
    description: "Corregge errori grammaticali nel testo",
  },
  {
    id: "explain_code",
    label: "Spiega codice",
    description: "Fornisce una spiegazione dettagliata di un pezzo di codice",
  },
];

// ✅ Funzione per ottenere le azioni
export function getQuickActions(): QuickAction[] {
  return quickActions;
}
