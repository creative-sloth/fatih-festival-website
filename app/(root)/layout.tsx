import '../globals.css';

// Fallback for `/` when the host ignores public/_redirects (e.g. local `out/` preview).
export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <meta httpEquiv="refresh" content="0; url=/id/" />
        <title>Fatih Festival 3.0</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
