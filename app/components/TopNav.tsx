import Link from "next/link";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Posts", href: "/posts" },
  { label: "Drafts", href: "/drafts" },
  { label: "Add Post", href: "/add-post" },
];

export default function TopNav() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Posts App</p>
          <h1 className="text-2xl font-semibold text-slate-950">Publish smarter, save drafts faster</h1>
        </div>
        <nav className="flex flex-wrap items-center gap-2">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
