"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSound } from "@/components/sound-provider";
import { contactDetails } from "@/lib/content";

type Status = "idle" | "sending" | "sent" | "error";

function formspreeId() {
  return process.env.NEXT_PUBLIC_FORMSPREE_ID?.trim() || "";
}

function contactEmail() {
  return (
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || contactDetails.email
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const endpointId = formspreeId();
  const { play } = useSound();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    play("whoosh");

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      setError("Please fill in name, email, and a short message.");
      return;
    }

    if (endpointId) {
      setStatus("sending");
      try {
        const res = await fetch(`https://formspree.io/f/${endpointId}`, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: data,
        });
        if (!res.ok) throw new Error("Formspree error");
        setStatus("sent");
        form.reset();
      } catch {
        setStatus("error");
        setError("Something went wrong. Please email me directly.");
      }
      return;
    }

    const subject = encodeURIComponent(
      company ? `Project inquiry — ${company}` : "Project inquiry",
    );
    const body = encodeURIComponent(
      `Hi Sagar,\n\n${message}\n\n— ${name}\n${email}${company ? `\n${company}` : ""}`,
    );
    window.location.href = `mailto:${contactEmail()}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit} noValidate>
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" required />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </div>
      <Field label="Company / project" name="company" autoComplete="organization" />
      <label className="block">
        <span className="type-label text-text-secondary">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          className="type-body mt-2 w-full resize-y border-b border-border-default bg-transparent py-3 text-text-primary outline-none transition-colors placeholder:text-text-secondary focus:border-accent"
          placeholder="What are you building?"
        />
      </label>

      {error ? (
        <p className="type-small text-accent" role="alert">
          {error}
        </p>
      ) : null}
      {status === "sent" && !error ? (
        <p className="type-small text-text-secondary" role="status">
          {endpointId
            ? "Thanks — your message is on its way."
            : "Your email client should open with the message drafted."}
        </p>
      ) : null}

      <Button type="submit" disabled={status === "sending"} className="w-fit">
        {status === "sending" ? (
          <>
            Sending
            <LoaderCircle size={16} className="animate-spin" />
          </>
        ) : (
          <>
            Send message
            <ArrowUpRight size={16} strokeWidth={1.5} />
          </>
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="type-label text-text-secondary">{label}</span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="type-body mt-2 w-full border-b border-border-default bg-transparent py-3 text-text-primary outline-none transition-colors placeholder:text-text-secondary focus:border-accent"
      />
    </label>
  );
}
