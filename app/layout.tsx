import type { Metadata } from "next";
import "./globals.css";

// This root layout only wraps <html>/<body>; all real layout (header, footer,
// language) lives in app/[locale]/layout.tsx. Root-level requests to "/" are
// redirected to the default locale by middleware.ts.
export const metadata: Metadata = {
  metadataBase: new URL("https://example-scholar.edu"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
