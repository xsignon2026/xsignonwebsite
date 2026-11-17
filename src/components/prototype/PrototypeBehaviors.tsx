"use client";

import { useEffect, useRef } from "react";
import { initPrototypePage, type Feature } from "./prototype-behaviours";

// Switches on the interactive pieces of a page converted from the prototype. Renders nothing.
// `features` is a fixed list written in the page file, so the effect runs once.
export function PrototypeBehaviors({ root, features }: { root: string; features: Feature[] }) {
  const list = useRef(features);
  useEffect(() => {
    const element = document.getElementById(root);
    if (!element) return;
    return initPrototypePage(element, list.current);
  }, [root]);
  return null;
}
