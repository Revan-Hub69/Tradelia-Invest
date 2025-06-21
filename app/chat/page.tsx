"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Chat from "@/app/components/chat"; // o il tuo path corretto

export default function ChatPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/"); // back to home o login
      } else {
        setUser(user);
      }
    };
    checkUser();
  }, [router]);

  if (!user) {
    return <p>Caricamento in corso...</p>;
  }

  return <Chat userId={user.id} />;
}
