import Link from "next/link";

const categories = [
  { slug: "writing", name: "Writing", count: 12, icon: "✍️" },
  { slug: "image", name: "Image & Design", count: 8, icon: "🎨" },
  { slug: "productivity", name: "Productivity", count: 15, icon: "⚡" },
  { slug: "coding", name: "Coding", count: 10, icon: "💻" },
  { slug: "marketing", name: "Marketing", count: 7, icon: "📣" },
  { slug: "seo", name: "SEO", count: 5, icon: "🔍" },
];

export function Categories() {
  return (
    <section className="border-t border-border bg-surface px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold text-text-primary">Top Categories</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition hover:border-primary/30 hover:bg-card/80"
            >
              <span className="text-2xl" aria-hidden>{cat.icon}</span>
              <div>
                <span className="font-medium text-text-primary">{cat.name}</span>
                <span className="ml-2 text-sm text-text-secondary">{cat.count} tools</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
