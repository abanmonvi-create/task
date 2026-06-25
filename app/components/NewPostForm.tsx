"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function NewPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function savePost(published: boolean) {
    if (!title.trim()) {
      setError("Please enter a title before saving.");
      return;
    }

    setError(null);
    setMessage(null);

    startTransition(async () => {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          published,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result?.error || "Unable to save post. Please try again.");
        return;
      }

      setMessage(published ? "Post published successfully." : "Draft saved successfully.");
      setTitle("");
      setContent("");
      router.push(published ? "/posts" : "/drafts");
    });
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">Create a new entry</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950">Write a fresh post or save a draft</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Add a title and content, then choose whether to publish immediately or keep it as a draft.
          </p>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Title
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Example: Working with Databases in Next.js Using Prisma"
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Content
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              rows={8}
              placeholder="Write your article content here..."
              className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </label>
        </div>

        {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}
        {message ? <p className="text-sm font-medium text-emerald-600">{message}</p> : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={() => savePost(false)}
            disabled={isPending}
            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Save Draft
          </button>

          <button
            type="button"
            onClick={() => savePost(true)}
            disabled={isPending}
            className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Add Post
          </button>
        </div>
      </div>
    </section>
  );
}
