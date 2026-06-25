import { getDraftPosts, type PostRecord } from "../lib/postService";
import Link from "next/link";
import PublishDraftButton from "../components/PublishDraftButton";

export default async function DraftsPage() {
  const drafts: PostRecord[] = await getDraftPosts();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">Drafts</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Saved drafts</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Manage your draft posts here. Open a draft to edit it or publish it directly from the list.
        </p>
      </div>

      {drafts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-8 py-14 text-center text-slate-600">
          No drafts found.
          <div className="mt-4">
            <Link
              href="/add-post"
              className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Save a draft now
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {drafts.map((draft) => (
            <div key={draft.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-950">{draft.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {draft.content?.slice(0, 140) ?? "No content yet."}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/drafts/${draft.id}`}
                    className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                  >
                    Edit Draft
                  </Link>
                  <PublishDraftButton id={draft.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
