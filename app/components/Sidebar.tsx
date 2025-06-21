"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Moon,
  Sun,
  Menu,
  X,
  PlusCircle,
  History,
  Zap,
} from "lucide-react";
import { useTheme } from "next-themes";
import { supabase } from "@/lib/supabaseClient";

export default function Sidebar({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [threads, setThreads] = useState<any[]>([]);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const toggleSidebar = () => setIsOpen(!isOpen);

  // FETCH THREADS
  useEffect(() => {
    if (userId) {
      fetchThreads();
    }
  }, [userId]);

  const fetchThreads = async () => {
    const { data, error } = await supabase
      .from("threads")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!error) setThreads(data);
  };

  // NEW CHAT
  const handleNewChat = async () => {
    const { data, error } = await supabase
      .from("threads")
      .insert([{ user_id: userId }])
      .select()
      .single();

    if (!error && data) {
      router.push(`/chat/${data.id}`);
      toggleSidebar(); // chiudi su mobile
    }
  };

  // LOGOUT
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <>
      {/* MOBILE TOGGLE */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded bg-blue-600 text-white"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#0A192F] text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 md:static md:flex-shrink-0`}
      >
        <div className="flex flex-col h-full p-4 overflow-y-auto">
          {/* LOGO */}
          <Link href="/" className="mb-8 block">
            <img
              src="/logo.png"
              alt="Tradelia Invest"
              className="h-10 mx-auto"
            />
          </Link>

          {/* NAV */}
          <nav className="flex-1 flex flex-col gap-4">
            <button
              onClick={handleNewChat}
              className="flex items-center gap-2 hover:text-blue-400"
            >
              <PlusCircle className="w-5 h-5" /> Nuova Chat
            </button>

            <div>
              <div className="flex items-center gap-2 text-sm mb-1 text-gray-400 uppercase">
                <History className="w-4 h-4" /> Storico Chat
              </div>
              <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
                {threads.length === 0 ? (
                  <p className="text-xs text-gray-500">Nessuna chat</p>
                ) : (
                  threads.map((thread) => (
                    <Link
                      key={thread.id}
                      href={`/chat/${thread.id}`}
                      onClick={() => setIsOpen(false)}
                      className="text-sm truncate hover:text-blue-400"
                    >
                      {thread.openai_thread_id || "Nuova conversazione"}
                    </Link>
                  ))
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm mb-1 text-gray-400 uppercase">
                <Zap className="w-4 h-4" /> Funzioni Rapide
              </div>
              <button className="text-sm hover:text-blue-400">
                📈 Analizza Portfolio
              </button>
              <button className="text-sm hover:text-blue-400">
                📊 Genera Report
              </button>
            </div>
          </nav>

          {/* FOOTER */}
          <div className="border-t border-blue-800 pt-4 flex flex-col gap-4">
            {/* Toggle Tema */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center gap-2 hover:text-blue-400"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="w-5 h-5" /> Light Mode
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5" /> Dark Mode
                </>
              )}
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 hover:text-blue-400"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
