import Link from "next/link";

interface CTABannerProps {
  title: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
  className?: string;
}

export function CTABanner({
  title,
  description = "Get your AI tool in front of thousands of decision-makers.",
  buttonLabel = "Submit Your Tool",
  buttonHref = "/sponsor",
  className = "",
}: CTABannerProps) {
  return (
    <section
      className={`rounded-2xl border border-border bg-card p-8 text-center backdrop-blur sm:p-12 ${className}`}
    >
      <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">{title}</h2>
      {description && (
        <p className="mx-auto mt-3 max-w-xl text-text-secondary">{description}</p>
      )}
      <Link
        href={buttonHref}
        className="mt-6 inline-flex rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-3 font-semibold text-white transition hover:opacity-90"
      >
        {buttonLabel}
      </Link>
    </section>
  );
}
