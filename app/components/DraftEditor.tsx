"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

interface DraftEditorProps {
  post: {
    id: string;
    title: string;
    content: string | null;
  };
}

export default function DraftEditor({ post }: DraftEditorProps) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content ?? "");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function updateDraft(publish = false) {
    if (!title.trim()) {
      setError("Please enter a title before saving.");
      return;
    }

    setError(null);
    setMessage(null);

    startTransition(async () => {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          published: publish,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result?.error || "Unable to save changes. Please try again.");
        return;
      }

      if (publish) {
        router.push("/posts");
      } else {
        setMessage("Draft updated successfully.");
        router.refresh();
      }
    });
  }

  return (
    <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">Draft editor</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-950">Update, save, or publish this draft</h2>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-slate-700">
          Title
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Content
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={10}
            className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </label>
      </div>

      {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}
      {message ? <p className="text-sm font-medium text-emerald-600">{message}</p> : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
        <button
          type="button"
          onClick={() => updateDraft(false)}
          disabled={isPending}
          className="rounded-full border border-slate-300 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Save Draft
        </button>

        <button
          type="button"
          onClick={() => updateDraft(true)}
          disabled={isPending}
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Publish Post
        </button>
      </div>
    </div>
  );
}
