"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store/app-store";
import { syncOfflineSales } from "@/lib/offline/sync";

export function OnlineStatus() {
  const { isOnline, setOnlineStatus } = useAppStore();

  useEffect(() => {
    const update = async () => {
      const online = navigator.onLine;
      setOnlineStatus(online);
      if (online) await syncOfflineSales();
    };
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, [setOnlineStatus]);

  return (
    <div className={`rounded-full px-3 py-1 text-xs font-semibold ${isOnline ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
      {isOnline ? "Online" : "Offline: queued sales will sync later"}
    </div>
  );
}
