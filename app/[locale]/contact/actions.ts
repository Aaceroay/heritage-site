"use server";

export interface ContactFormState {
  status: "idle" | "success" | "error";
}

/**
 * Handles contact form submissions.
 *
 * By default this only validates input and rejects obvious bot submissions
 * (via the honeypot field). To actually deliver email, wire in a provider
 * such as Resend, Postmark, or your institution's SMTP relay using the
 * RESEND_API_KEY / CONTACT_TO_EMAIL environment variables (see .env.example)
 * and replace the TODO block below.
 */
export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const honeypot = formData.get("company");
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    // Silently "succeed" for bots so they don't learn the honeypot failed.
    return { status: "success" };
  }

  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !message.trim() ||
    !email.includes("@")
  ) {
    return { status: "error" };
  }

  try {
    // TODO: send email via your provider of choice, e.g.:
    //
    // await fetch("https://api.resend.com/emails", {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     from: "Contact form <contact@yourdomain.edu>",
    //     to: process.env.CONTACT_TO_EMAIL,
    //     reply_to: email,
    //     subject: `New message from ${name}`,
    //     text: message,
    //   }),
    // });

    return { status: "success" };
  } catch {
    return { status: "error" };
  }
}
