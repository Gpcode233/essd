"use client";

import { useState, useEffect } from "react";
import { Icons } from "./icons";

interface AdminAuthGateProps {
  children: React.ReactNode;
}

const ADMIN_PASSWORD = "Kilaniessd@5377";
const AUTH_STORAGE_KEY = "essd_admin_authenticated";

export default function AdminAuthGate({ children }: AdminAuthGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (auth === "true") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    if (passwordInput === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_STORAGE_KEY, "true");
      setIsAuthenticated(true);
    } else {
      setErrorMsg("Incorrect organizer access key. Please enter the valid security password.");
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    setPasswordInput("");
  };

  // Loading state while checking localStorage
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-essd-black flex items-center justify-center text-essd-gold font-mono text-xs">
        Verifying Security Key...
      </div>
    );
  }

  // If not authenticated, show password challenge gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-essd-black flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-essd-charcoal border-4 border-essd-gold p-6 sm:p-8 shadow-[8px_8px_0px_#0A0A0C] text-essd-cream space-y-6">
          
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-essd-black border-2 border-essd-gold flex items-center justify-center mx-auto text-essd-gold shadow-[0_0_15px_rgba(232,169,39,0.3)]">
              <Icons.Shield size={28} />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-essd-gold block">
                Secretariat Security Gate
              </span>
              <h2 className="text-2xl font-black font-display uppercase tracking-tight text-essd-cream mt-0.5">
                Organizer Access
              </h2>
            </div>
            <p className="text-xs text-essd-cream-muted font-sans leading-relaxed">
              Enter the official ESSD 2026 organizer password to access tournament controls, registration rosters, and live score management.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-950/90 border border-red-500 text-red-200 text-xs font-mono flex items-start gap-2">
              <Icons.Alert size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-essd-gold uppercase mb-1.5">
                Security Password *
              </label>
              <input
                type="password"
                required
                placeholder="Enter password..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-essd-black border-2 border-essd-border focus:border-essd-gold px-4 py-2.5 text-sm text-essd-cream font-mono focus:outline-none transition-colors"
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-essd-gold text-essd-black hover:bg-essd-orange hover:text-white font-display font-black text-sm uppercase tracking-wider border-2 border-essd-cream shadow-[3px_3px_0px_#0A0A0C] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <Icons.Shield size={16} />
              Unlock Organizer Dashboard
            </button>
          </form>

          <div className="pt-3 border-t border-essd-border text-center text-[10px] font-mono text-essd-cream-muted">
            Enugu State Secondary Schools Debate Championship 2026
          </div>
        </div>
      </div>
    );
  }

  // If authenticated, render children with top logout banner
  return (
    <div>
      <div className="bg-essd-black border-b border-essd-border/80 px-4 py-1.5 text-xs font-mono text-essd-cream-muted flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          <span className="text-essd-gold font-bold uppercase">Organizer Session Active</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-essd-orange hover:underline font-bold uppercase text-[11px]"
        >
          Lock / Logout
        </button>
      </div>
      {children}
    </div>
  );
}
