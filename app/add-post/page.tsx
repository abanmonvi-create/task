import NewPostForm from "../components/NewPostForm";

export default function AddPostPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">Add new content</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Create a post or save a draft</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Use the form below to write your next post. Click Add Post to publish immediately, or Save Draft to keep it for later.
        </p>
      </div>
      <NewPostForm />
    </main>
  );
}
