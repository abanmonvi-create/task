import { getPublishedPosts } from "../lib/postService";
import Link from "next/link";

export default async function PostsPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">Published posts</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Your live posts</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          This page shows all content that has been published. You can create a new post or manage your saved drafts.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-8 py-14 text-center text-slate-600">
          No published posts found.
          <div className="mt-4">
            <Link
              href="/add-post"
              className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Add your first post
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <article key={post.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-950">{post.title}</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                    {post.content?.slice(0, 160) ?? "No content yet."}
                  </p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                  Published
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
