"use client";

import { useEffect } from "react";

const themeScript = `(function(){try{var c=document.cookie.match(/(?:^|; )Profilio-theme=([^;]*)/);var t=c?decodeURIComponent(c[1]):null;if(!t)t=localStorage.getItem("Profilio-theme");var theme=t&&["light","dark","system"].includes(t)?t:"system";var resolved=theme==="system"?(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"):theme;document.documentElement.dataset.theme=resolved;}catch(e){var fallback=matchMedia&&matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=fallback;}})();`;

export default function ThemeScript() {
  useEffect(() => {
    const id = "theme-init";
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.id = id;
    s.textContent = themeScript;
    document.head.prepend(s);
  }, []);

  return null;
}
