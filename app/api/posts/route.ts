import { NextResponse } from "next/server";
import { createPost } from "../../lib/postService";

async function parseRequestBody(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return request.json();
  }

  const formData = await request.formData();
  return {
    title: formData.get("title")?.toString() ?? "",
    content: formData.get("content")?.toString() ?? "",
    published: formData.get("published") === "true",
  };
}

export async function POST(request: Request) {
  const body = await parseRequestBody(request);

  if (!body.title?.trim()) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }

  const post = await createPost({
    title: body.title.trim(),
    content: body.content?.trim() ?? "",
    published: Boolean(body.published),
  });

  return NextResponse.json(post, { status: 201 });
}
