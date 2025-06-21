"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Chat from "@/app/components/chat";

export default function PaginaChat() {
  const [utente, setUtente] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setUtente(user);
      }
    };
    getUser();
  }, [router]);

  if (!utente) {
    return <p>Caricamento in corso...</p>;
  }

  return <Chat userId={utente.id} />;
}
