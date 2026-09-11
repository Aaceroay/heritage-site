export function SkipToContent({ label }: { label: string }) {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brisa-700 focus:px-4 focus:py-2 focus:text-white"
    >
      {label}
    </a>
  );
}
