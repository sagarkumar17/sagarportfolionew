"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
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

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

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
        if (!res.ok) throw new Error("Formspree rejected the submission.");
        setStatus("sent");
        form.reset();
      } catch {
        setStatus("error");
        setError("Couldn’t send via Formspree. Try email instead.");
      }
      return;
    }

    const subject = encodeURIComponent(
      `Portfolio inquiry${company ? ` — ${company}` : ""}`,
    );
    const body = encodeURIComponent(
      `Hi Sagar,\n\n${message}\n\n— ${name}\n${email}${company ? `\n${company}` : ""}`,
    );
    window.location.href = `mailto:${contactEmail()}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-6"
      noValidate
    >
      <p className="text-xs uppercase tracking-[0.16em] text-soft">
        {endpointId
          ? "Sends via Formspree"
          : "Opens your email client (mailto) — set NEXT_PUBLIC_FORMSPREE_ID for hosted submit"}
      </p>

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
        <span className="text-xs uppercase tracking-[0.14em] text-soft">
          Message
        </span>
        <textarea
          name="message"
          required
          rows={5}
          className="mt-2 w-full resize-y border-b border-ground-strong bg-transparent py-3 text-lg text-ink outline-none transition-colors placeholder:text-soft focus:border-accent"
          placeholder="What are you building?"
        />
      </label>

      {error ? (
        <p className="text-sm text-accent" role="alert">
          {error}
        </p>
      ) : null}
      {status === "sent" && !error ? (
        <p className="text-sm text-muted" role="status">
          {endpointId
            ? "Thanks — your message is on its way."
            : "Your email client should open with the message drafted."}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-fit items-center gap-2 bg-ink px-7 py-3.5 text-sm tracking-wide text-background transition-colors hover:bg-accent disabled:opacity-60"
      >
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
      </button>
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
      <span className="text-xs uppercase tracking-[0.14em] text-soft">
        {label}
      </span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="mt-2 w-full border-b border-ground-strong bg-transparent py-3 text-lg text-ink outline-none transition-colors placeholder:text-soft focus:border-accent"
      />
    </label>
  );
}
