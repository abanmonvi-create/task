import prisma from "./prisma";

export type PostRecord = {
  id: string;
  title: string;
  content: string | null;
  published: boolean;
};

export async function getPublishedPosts() {
  return prisma.post.findMany({
    where: { published: true },
  });
}

export async function getDraftPosts() {
  return prisma.post.findMany({
    where: { published: false },
  });
}

export async function getPostById(id: string) {
  return prisma.post.findUnique({
    where: { id },
  });
}

export async function createPost(data: {
  title: string;
  content: string;
  published: boolean;
}) {
  return prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
      published: data.published,
    },
  });
}

export async function updatePost(id: string, data: {
  title?: string;
  content?: string;
  published?: boolean;
}) {
  return prisma.post.update({
    where: { id },
    data: {
      ...data,
    },
  });
}
