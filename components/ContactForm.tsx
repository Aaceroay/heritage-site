"use client";

import { useState, useTransition } from "react";
import { Button } from "./Button";
import { sendContactMessage, type ContactFormState } from "@/app/[locale]/contact/actions";

interface Labels {
  name: string;
  email: string;
  subject: string;
  message: string;
  send: string;
  success: string;
  error: string;
}

const initialState: ContactFormState = { status: "idle" };

export function ContactForm({ labels }: { labels: Labels }) {
  const [state, setState] = useState<ContactFormState>(initialState);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await sendContactMessage(state, formData);
      setState(result);
    });
  }

  return (
    <form action={handleSubmit} noValidate className="max-w-xl space-y-5">
      {/* Honeypot field: hidden from sighted/keyboard users, catches simple bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink dark:text-ink-dark">
          {labels.name} <span aria-hidden="true">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          aria-required="true"
          className="mt-1 w-full rounded-md border border-ink/20 bg-white px-3 py-2 text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brisa-600 dark:border-white/20 dark:bg-white/5 dark:text-ink-dark"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink dark:text-ink-dark">
          {labels.email} <span aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          aria-required="true"
          className="mt-1 w-full rounded-md border border-ink/20 bg-white px-3 py-2 text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brisa-600 dark:border-white/20 dark:bg-white/5 dark:text-ink-dark"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-ink dark:text-ink-dark">
          {labels.subject}
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          className="mt-1 w-full rounded-md border border-ink/20 bg-white px-3 py-2 text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brisa-600 dark:border-white/20 dark:bg-white/5 dark:text-ink-dark"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink dark:text-ink-dark">
          {labels.message} <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-required="true"
          className="mt-1 w-full rounded-md border border-ink/20 bg-white px-3 py-2 text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brisa-600 dark:border-white/20 dark:bg-white/5 dark:text-ink-dark"
        />
      </div>

      <Button type="submit" disabled={isPending}>
        {labels.send}
      </Button>

      <div role="status" aria-live="polite" className="text-sm">
        {state.status === "success" ? <p className="text-brisa-700 dark:text-brisa-300">{labels.success}</p> : null}
        {state.status === "error" ? <p className="text-tierra-600 dark:text-tierra-300">{labels.error}</p> : null}
      </div>
    </form>
  );
}
