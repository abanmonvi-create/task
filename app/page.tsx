import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm shadow-slate-200/50">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Welcome</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-950 sm:text-5xl">
              Build posts, save drafts, and publish with confidence.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              This app helps you manage posts and drafts in a clean, easy-to-use interface. Save drafts to come back later, or publish immediately from the same workflow.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/posts"
              className="rounded-3xl bg-slate-950 px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              View Published Posts
            </Link>
            <Link
              href="/drafts"
              className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-4 text-center text-sm font-semibold text-slate-950 transition hover:border-slate-300 hover:bg-slate-100"
            >
              Manage Drafts
            </Link>
            <Link
              href="/add-post"
              className="rounded-3xl border border-emerald-500 bg-emerald-50 px-6 py-4 text-center text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
            >
              Add New Post
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
