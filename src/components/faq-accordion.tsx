"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { faqs } from "@/lib/content";

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-ground-strong border-y border-ground-strong">
      {faqs.map((item, index) => {
        const isOpen = open === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <li key={item.q}>
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-accent"
              onClick={() => setOpen(isOpen ? null : index)}
            >
              <span className="flex gap-4 md:gap-6">
                <span className="font-mono text-xs text-soft tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="max-w-2xl font-display text-2xl tracking-tight text-ink md:text-3xl">
                  {item.q}
                </span>
              </span>
              <span className="mt-1 shrink-0 text-accent">
                {isOpen ? (
                  <Minus size={20} strokeWidth={1.5} />
                ) : (
                  <Plus size={20} strokeWidth={1.5} />
                )}
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-6 pl-10 md:pl-14"
            >
              <p className="max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                {item.a}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
