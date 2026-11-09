"use client";

import { useEffect } from "react";
import { initHome } from "./home-behaviors";

// Switches on the Home page's interactive pieces once the page is in the browser. It renders nothing.
export function HomeBehaviors() {
  useEffect(() => {
    const root = document.getElementById("view-home");
    if (!root) return;
    return initHome(root);
  }, []);
  return null;
}
