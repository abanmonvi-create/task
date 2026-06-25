"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

interface PublishDraftButtonProps {
  id: string;
}

export default function PublishDraftButton({ id }: PublishDraftButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  async function publish() {
    setMessage(null);

    startTransition(async () => {
      const response = await fetch(`/api/posts/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ published: true }),
      });

      if (!response.ok) {
        setMessage("Unable to publish draft. Please try again.");
        return;
      }

      router.refresh();
    });
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={publish}
        disabled={isPending}
        className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Publish
      </button>
      {message ? <p className="text-xs text-rose-600">{message}</p> : null}
    </div>
  );
}
