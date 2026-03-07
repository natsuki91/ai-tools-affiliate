import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold text-text-primary">404 — Page not found</h1>
      <p className="mt-2 text-text-secondary">The page you’re looking for doesn’t exist.</p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 font-semibold text-white transition hover:opacity-90"
      >
        Back to home
      </Link>
    </div>
  );
}
