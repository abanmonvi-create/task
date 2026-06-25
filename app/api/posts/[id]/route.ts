import { NextResponse } from "next/server";
import { updatePost } from "../../../lib/postService";

async function parseRequestBody(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return request.json();
  }

  const formData = await request.formData();
  return {
    title: formData.get("title")?.toString(),
    content: formData.get("content")?.toString(),
    published: formData.get("published") === "true",
  };
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const body = await parseRequestBody(request);
  const { id } = await context.params;

  const updateData: {
    title?: string;
    content?: string;
    published?: boolean;
  } = {};

  if (body.title !== undefined) {
    const trimmed = body.title.trim();
    if (!trimmed) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }
    updateData.title = trimmed;
  }

  if (body.content !== undefined) {
    updateData.content = body.content.trim();
  }

  if (body.published !== undefined) {
    updateData.published = Boolean(body.published);
  }

  const post = await updatePost(id, updateData);

  return NextResponse.json(post);
}
