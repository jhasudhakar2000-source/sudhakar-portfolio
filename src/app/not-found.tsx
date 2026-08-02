import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-shell py-24">
      <p className="text-muted">404</p>
      <h1 className="mt-3 font-display text-4xl">Page not found.</h1>
      <Link className="mt-8 inline-block underline underline-offset-4" href="/">
        Return home
      </Link>
    </div>
  );
}
