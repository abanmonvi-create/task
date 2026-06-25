import { getPostById } from "../../lib/postService";
import DraftEditor from "../../components/DraftEditor";
import Link from "next/link";

interface DraftPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DraftPage({ params }: DraftPageProps) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post || post.published) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm shadow-slate-200/50">
          <p className="text-xl font-semibold text-slate-950">Draft not found</p>
          <p className="mt-3 text-sm text-slate-600">This draft either does not exist or has already been published.</p>
          <Link
            href="/drafts"
            className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Back to drafts
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <DraftEditor post={post} />
    </main>
  );
}
